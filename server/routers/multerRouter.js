const { Router } = require("express");
const { upload } = require("../controllers/multerController");
const multerRouter = Router();

multerRouter.post("/upload", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    } else {
      return res.status(200).json({ message: "Image uploaded successfully!" });
    }
  });
});

module.exports = { multerRouter };
