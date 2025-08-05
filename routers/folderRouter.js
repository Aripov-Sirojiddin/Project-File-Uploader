const { Router } = require("express");
const folderRouter = Router();
const {
  getCreateView,
  openFolder,
  createFolder,
} = require("../controllers/folderController");

folderRouter.get("/create", getCreateView);
folderRouter.get("/:folderId", openFolder);
folderRouter.post("/create", createFolder);

module.exports = folderRouter;
