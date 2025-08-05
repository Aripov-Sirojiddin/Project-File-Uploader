const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(parentId, name) {
  const folder = await prisma.folders.create({
    data: {
      parentId: Number(parentId),
      name: name,
      size: 0,
      date: new Date(Date.now()),
    },
  });

  return folder;
}

async function getAllByParentId(parentId) {
  const folders = await prisma.folders.findMany({
    where: {
      parentId: Number(parentId),
    },
  });

  return folders;
}

module.exports = {
  create,
  getAllByParentId,
};
