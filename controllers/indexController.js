const folderModel = require("../models/folders");

async function getAllUsers(req, res) {
  const authenticated = await req.isAuthenticated();
  if (authenticated) {
    const folders = await folderModel.getAllByParentId(global.parentId);

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
  getAllUsers,
};
