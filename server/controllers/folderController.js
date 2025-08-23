const folderModel = require("../models/folders");

async function openFolder(req, res) {
  const folderId = req.params.folderId;
  const folders = await folderModel.getAllByParentId(folderId, req.user.id);
  if (folders) {
    res.status(200).json({ folders });
  } else {
    res.status(501).json({ error: "Something went wrong on our end..." });
  }
}

async function createFolder(req, res) {
  const newFolder = await folderModel.create(
    req.body.parentId,
    req.body.name,
    req.body.userId
  );
  if (newFolder) {
    res.status(200).json({ message: "Success", folder: newFolder });
  } else {
    res.status(501).json({
      error: "Couldn't create folder, something went wrong on our end.",
    });
  }
}

async function updateFolder(req, res) {
  const { folderId } = req.params;
  const { name } = req.body;
  try {
    const updatedFolder = await folderModel.updateName(folderId, name);
    if (updatedFolder.name === name) {
      res.status(200).json({ message: "Success", folder: updatedFolder });
    } else {
      res.status(501).json({
        error: "Couldn't update folder, something went wrong on our end.",
      });
    }
  } catch (e) {
    res.status(501).json({ error: e });
  }
}

module.exports = {
  openFolder,
  createFolder,
  updateFolder,
};
