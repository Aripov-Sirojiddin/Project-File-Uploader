const { Router } = require("express");
const { getAllUsers } = require("../controllers/indexController.js");
const indexRouter = Router();

indexRouter.get("/", getAllUsers);



module.exports = indexRouter;
