const folderModel = require("../models/folders");
const rootModel = require("../models/root");

async function getCreateView(req, res) {
  res.render("pages/logedin", { name: req.user.name, createFolder: true });
}

async function createFolder(req, res) {
  console.log(global.parentId);
  res.redirect("/");
}

module.exports = {
  getCreateView,
  createFolder,
};
