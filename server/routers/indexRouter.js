const { Router } = require("express");
const { getUser, getAllFolders } = require("../controllers/indexController.js");
const indexRouter = Router();

indexRouter.get("/user/:userid", getUser)
indexRouter.get("/api", getAllFolders);

module.exports = indexRouter;
