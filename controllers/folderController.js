const folderModel = require("../models/folders");
const rootModel = require("../models/root");

async function getCreateView(req, res) {
  res.render("pages/logedin", { name: req.user.name, createFolder: true });
}

async function createFolder(req, res) {
  console.dir(req.body.name);
  console.log(await rootModel.getId(req.user.id));
  res.redirect("/");
}

module.exports = {
  getCreateView,
  createFolder,
};
