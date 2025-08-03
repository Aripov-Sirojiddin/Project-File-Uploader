const db = require("../models/db.js");

async function getAllUsers(req, res) {
  const users = await db.getAllUsers();
  res.render("pages/index", { users: users });
}

module.exports = {
  getAllUsers,
};
