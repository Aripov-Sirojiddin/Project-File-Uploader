const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(parentId, name) {
  const folder = await prisma.folders.create({
    data: {
      parentId: parentId,
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
      parentId: parentId,
    },
  });

  return folders;
}

async function getParentId(id) {
  const folders = await prisma.folders.findFirst({
    where: {
      id: id,
    },
  });

  return folders.parentId;
}

module.exports = {
  create,
  getParentId,
  getAllByParentId,
};
