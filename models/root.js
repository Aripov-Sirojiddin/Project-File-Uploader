const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(ownerId, username) {
  const rootFolder = await prisma.root.create({
    data: {
      userId: ownerId,
      name: `${username.split(" ").join("-").toLowerCase()}-root`,
    },
  });

  return rootFolder;
}

async function getId(ownerId) {
  const rootFolder = await prisma.root.findFirst({
    where: {
      ownerId: ownerId,
    },
  });

  return rootFolder.id;
}

module.exports = {
  create,
  getId,
};
