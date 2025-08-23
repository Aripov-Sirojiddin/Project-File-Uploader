const { createFile } = require("../models/file");

async function createFileRecord(req, res) {
  const fileRecord = createFile(
    req.body.parentId,
    req.file.mimetype,
    req.file.originalname,
    req.user.id,
    req.file.size
  );
  if (fileRecord) {
    res.status(200).json({ fileRecord });
  } else {
    res.status(501).json({ error: "Something went wrong on our end..." });
  }
}

module.exports = { createFileRecord };
