const db = require("../models/db.js");

async function getAllUsers(req, res) {
  res.render("pages/index");
}

module.exports = {
  getAllUsers,
};
