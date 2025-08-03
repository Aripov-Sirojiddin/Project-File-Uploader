let users = ["Max"];

function getAllUsers() {
  return users;
}

function createUser(name) {
  users.push(name);
}

module.exports = {
  getAllUsers,
  createUser,
};
