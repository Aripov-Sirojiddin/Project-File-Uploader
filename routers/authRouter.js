const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");

const authRouter = express.Router();

authRouter.get("/", (req, res, next) => {
  res.render("pages/login");
});

authRouter.get("/federated/google", passport.authenticate("google"));

module.exports = authRouter;
