const db = require("../models/user.js");

async function getAllUsers(req, res) {
  const authenticated = await req.isAuthenticated();
  if (authenticated) {
    res.render("pages/index", { isAuthenticated: true, name: req.user.name });
  } else {
    res.render("pages/index", { isAuthenticated: false });
  }
}

module.exports = {
  getAllUsers,
};
