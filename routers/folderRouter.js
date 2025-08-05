const { Router } = require("express");
const folderRouter = Router();
const { getCreateView } = require("../controllers/folderController");

folderRouter.get("/create", getCreateView);

module.exports = folderRouter;
