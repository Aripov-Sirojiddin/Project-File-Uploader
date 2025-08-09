const folderModel = require("../models/folders");

async function getCreateView(req, res) {
  const folders = await folderModel.getAllByParentId(
    global.folderId,
    req.user.id
  );
  res.render("pages/logedin", {
    name: req.user.name,
    createFolder: true,
    folders: folders,
  });
}
async function getFolderParentId(req, res) {
  global.folderId = await folderModel.getParentId(global.folderId);
  res.redirect("/");
}

async function openFolder(req, res) {
  const folderId = Number(req.params.folderId);
  const folders = await folderModel.getAllByParentId(folderId, req.user.id);
  if (folders) {
    res.status(200).json({ folders });
  } else {
    res.status(401).json({ error: "Something went wrong on our end..." });
  }
}

async function createFolder(req, res) {
  const newFolder = await folderModel.create(
    req.body.parentId,
    req.body.name,
    req.body.userId
  );
  res.status(200).json({ message: "Success", folder: newFolder });
}

module.exports = {
  getCreateView,
  openFolder,
  getFolderParentId,
  createFolder,
};
