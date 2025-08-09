const folderModel = require("../models/folders");
const userModel = require("../models/user");

async function getUser(req, res) {
  const userId = req.params.userid;
  const user = await userModel.getById(userId);

  delete user.password;

  res.json({ user });
}

async function getAllFolders(req, res) {
  const authenticated = await req.isAuthenticated();
  if (authenticated) {
    const folders = await folderModel.getAllByParentId(
      global.folderId,
      req.user.id
    );

    res.render("pages/logedin", {
      name: req.user.name,
      createFolder: false,
      folders: folders,
    });
  } else {
    res.render("pages/index");
  }
}

module.exports = {
  getUser,
  getAllFolders,
};
