const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/user");
const federatedCredentials = require("../models/federatedCredentials");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const authRouter = express.Router();
require("dotenv").config();

//Authentication Using Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile", "email"],
    },
    async function verify(issuer, profile, cb) {
      try {
        const email = profile.emails[0].value;
        // Check if the federated credentials exist

        const result = await federatedCredentials.find(issuer, profile.id);

        if (result === null) {
          // If no federated credentials, insert a new user

          const insertUserResult = await userModel.create(
            profile.displayName,
            email
          );
          const id = insertUserResult.id;

          // Insert federated credentials
          await federatedCredentials.create(id, issuer, profile.id);

          const user = {
            id: id,
            name: profile.displayName,
            email: email,
          };
          return cb(null, user);
        } else {
          // If federated credentials exist, retrieve the user
          const user = await userModel.find(result.user_id);

          if (user === null) {
            return cb(null, false); // User not found
          }
          return cb(null, user); // Return the user
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

//Authentication using LocalStrategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userModel.getByEmail(email);
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = userModel.getById(id);
    done(null, user);
  } catch (err) {
    return done(err);
  }
});

authRouter.post(
  "/signup",
  [
    body("email").trim().isEmail().withMessage("Please enter a valid email."),
    body("email").custom(async (value) => {
      const user = await userModel.getByEmail(value);
      if (user) {
        throw new Error("Email already in use.");
      }
    }),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password cannot be empty.")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("confirm_password").custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match.");
      }
    }),
  ],
  async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      await userModel.create(
        `${req.body.firstname} ${req.body.lastname}`,
        req.body.email,
        await bcrypt.hash(req.body.password, 10)
      );
      res.status(200).json({ errors: [] });
    } else {
      res.status(400).json({
        errors: result.errors,
      });
    }
  }
);

authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      delete user.password;
      return res.status(200).json({ user });
    });
  })(req, res, next);
});

//Google authentication with passport.js
authRouter.get("/login/google", passport.authenticate("google"));

authRouter.get("/oauth2/redirect/google", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("http://localhost:5173/close");
    });
  })(req, res, next);
});

module.exports = authRouter;
