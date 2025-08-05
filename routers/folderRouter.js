const { Router } = require("express");
const folderRouter = Router();
const {
  getCreateView,
  createFolder,
} = require("../controllers/folderController");

folderRouter.get("/create", getCreateView);
folderRouter.post("/create", createFolder);

module.exports = folderRouter;
