const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const pool = require("../models/pool");

const authRouter = express.Router();
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile"],
    },
    async function verify(issuer, profile, cb) {
      try {
        // Check if the federated credentials exist
        const result = await pool.query(
          "SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2",
          [issuer, profile.id]
        );
        if (result.rows.length === 0) {
          // If no federated credentials, insert a new user
          const insertUserResult = await pool.query(
            "INSERT INTO users (name) VALUES ($1) RETURNING id",
            [profile.displayName]
          );
          const id = insertUserResult.rows[0].id;

          // Insert federated credentials
          await pool.query(
            "INSERT INTO federated_credentials (user_id, provider, subject) VALUES ($1, $2, $3)",
            [id, issuer, profile.id]
          );

          const user = {
            id: id,
            name: profile.displayName,
          };
          return cb(null, user);
        } else {
          // If federated credentials exist, retrieve the user
          const userResult = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [result.rows[0].user_id]
          );

          if (userResult.rows.length === 0) {
            return cb(null, false); // User not found
          }
          return cb(null, userResult.rows[0]); // Return the user
        }
      } catch (err) {
        return cb(err); // Handle any errors
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

authRouter.get("/login", (req, res, next) => {
  res.render("pages/login");
});

authRouter.get("/login/federated/google", passport.authenticate("google"));

authRouter.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = authRouter;
