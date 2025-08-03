const { Router } = require("express");

const authRouter = Router();

authRouter.get("/", (req, res, next) => {
  res.render("pages/login");
});


module.exports = authRouter;
