const { Router } = require("express");
const { getAllUsers } = require("../controllers/indexController.js");
const indexRouter = Router();

indexRouter.get("/", getAllUsers);
indexRouter.get("/new", getAllUsers);



module.exports = indexRouter;
