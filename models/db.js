const pool = require("./pool");

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users")
  return rows;
}

function createUser(name) {
  users.push(name);
}

module.exports = {
  getAllUsers,
  createUser,
};
