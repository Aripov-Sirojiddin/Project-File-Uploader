const db = require("../models/db.js");

async function getAllUsers(req, res) {
  res.render("pages/index", { isAuthenticated: req.isAuthenticated() });
}

module.exports = {
  getAllUsers,
};
