const { Router } = require("express");
const folderRouter = Router();
const passport = require("passport");
const {
  openFolder,
  createFolder,
  updateFolder,
} = require("../controllers/folderController");

folderRouter.get(
  "/:folderId",
  passport.authenticate("jwt", { session: false }),
  openFolder
);
folderRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createFolder
);
folderRouter.patch(
  "/update/name/:folderId",
  passport.authenticate("jwt", { session: false }),
  updateFolder
);

module.exports = folderRouter;
