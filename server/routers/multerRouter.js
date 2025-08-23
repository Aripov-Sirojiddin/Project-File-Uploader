const { Router } = require("express");
const { upload } = require("../controllers/multerController");
const { rename } = require("fs");
const path = require("path");
const { createFileRecord } = require("../controllers/fileController");
const multerRouter = Router();

multerRouter.post(
  "/upload",
  upload,
  function (req, res, next) {
    const originalFile = req.file.path;
    const newFile = path.join(
      __dirname,
      "..",
      "uploads",
      `${req.body.userId}-${req.file.originalname}`
    );
    rename(originalFile, newFile, (err) => {
      if (err) {
        console.error("Error renaming file:", err);
        return;
      }
      console.log("File renamed successfully!");
    });
    res.status(200).json({ message: "File uploaded successfully" });
  },
  createFileRecord
);

module.exports = { multerRouter };
