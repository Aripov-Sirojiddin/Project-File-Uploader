const { Router } = require("express");
const { getAllFolders } = require("../controllers/indexController.js");
const indexRouter = Router();

indexRouter.get("/api", getAllFolders);

module.exports = indexRouter;
