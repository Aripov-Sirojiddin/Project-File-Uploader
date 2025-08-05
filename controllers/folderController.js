const folderModel = require("../models/folders");

async function getCreateView(req, res) {
  const folders = await folderModel.getAllByParentId(global.parentId);
  res.render("pages/logedin", {
    name: req.user.name,
    createFolder: true,
    folders: folders,
  });
}

async function openFolder(req, res) {
  const folderId = req.param.folderId;
  console.log(folderId);
}

async function createFolder(req, res) {
  folderModel.create(global.parentId, req.body.name);
  res.redirect("/");
}

module.exports = {
  getCreateView,
  openFolder,
  createFolder,
};
