const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(name) {
  const folder = await prisma.folder.create({
    data: {
      name: name,
      size: 0,
      date: Date.now(),
    },
  });

  return folder;
}

module.exports = {
  create,
};
