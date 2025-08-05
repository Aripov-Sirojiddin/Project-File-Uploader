const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getById(id) {
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

async function getByEmail(email) {
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
async function createRootFolder(ownerId, username) {
  const rootFolder = await prisma.root.create({
    data: {
      userId: ownerId,
      name: `${username.split(" ").join("-").toLowerCase()}-root`,
    },
  });

  return rootFolder;
}

async function create(name, email, password = null) {
  const user = await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  await createRootFolder(user.id, user.name);
  return user;
}

async function find(id) {
  return await prisma.users.findFirst({
    where: {
      id: Number(id),
    },
  });
}

module.exports = {
  getById,
  getByEmail,
  create,
  find,
};
