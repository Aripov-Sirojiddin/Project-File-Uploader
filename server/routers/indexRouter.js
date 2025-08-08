const { Router } = require("express");
const { getUser, getAllFolders } = require("../controllers/indexController.js");
const passport = require("passport");
const indexRouter = Router();

indexRouter.get(
  "/user/:userid",
  passport.authenticate("jwt", { session: false }),
  getUser
);
indexRouter.get(
  "/api",
  passport.authenticate("jwt", { session: false }),
  getAllFolders
);

module.exports = indexRouter;
