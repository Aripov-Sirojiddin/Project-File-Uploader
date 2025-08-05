const folderModel = require("../models/folders");

async function getCreateView(req, res) {
  const folders = await folderModel.getAllByParentId(global.folderId);
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
  const folders = await folderModel.getAllByParentId(folderId);
  global.folderId = folderId;

  res.render("pages/logedin", {
    name: req.user.name,
    createFolder: false,
    folders: folders,
  });
}

async function createFolder(req, res) {
  folderModel.create(global.folderId, req.body.name);
  res.redirect("/");
}

module.exports = {
  getCreateView,
  openFolder,
  getFolderParentId,
  createFolder,
};
