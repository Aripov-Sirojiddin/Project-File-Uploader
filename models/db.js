const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getUserByUsername(username) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch (err) {
    console.error("Error finding user: " + err);
    throw err;
  }
}

module.exports = {
  getUserByUsername,
};
