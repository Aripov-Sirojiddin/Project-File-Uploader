const folderModel = require("../models/folders");

async function getAllUsers(req, res) {
  const authenticated = await req.isAuthenticated();
  if (authenticated) {
    res.render("pages/logedin", {
      name: req.user.name,
      createFolder: false,
    });
  } else {
    res.render("pages/index");
  }
}

module.exports = {
  getAllUsers,
};
