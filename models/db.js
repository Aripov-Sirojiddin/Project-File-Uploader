const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getUserById(id) {
  try {
    const user = await prisma.await.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (err) {
    console.error("Error finding user: " + err);
    throw err;
  }
}

async function createUser(name, email) {
  return await prisma.users.create({
    data: {
      name: name,
      email: email,
    },
  });
}


async function findFederatedCredential(provider, subject) {
  return await prisma.federated_credentials.findFirst({
    where: {
      provider: provider,
      subject: subject,
    },
  });
}
module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  findFederatedCredential,
};
