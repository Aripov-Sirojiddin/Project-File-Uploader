const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(parentId, name) {
  const folder = await prisma.folder.create({
    data: {
      parentId: parentId,
      name: name,
      size: 0,
      date: Date.now(),
    },
  });

  return folder;
}

async function getAllByParentId(parentId) {
  const folders = await prisma.folder.findMany({
    where: {
      parentId: parentId,
    },
  });

  return folders;
}

module.exports = {
  create,
  getAllByParentId,
};
