const folderModel = require("../models/folders");
const rootModel = require("../models/root");

async function getCreateView(req, res) {
  res.render("pages/logedin", { name: req.user.name, createFolder: true });
}

async function createFolder(req, res) {
  const rootFolder = await rootModel.getId(req.user.id);
  folderModel.create(rootFolder.id, req.body.name);
  res.redirect("/"); 
}

module.exports = {
  getCreateView,
  createFolder,
};
