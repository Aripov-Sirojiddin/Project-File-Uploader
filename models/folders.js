const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(parentId, name, userId) {
  const folder = await prisma.file.create({
    data: {
      parentId: parentId,
      ownerId: userId,
      name: name,
      type: "folder",
      size: 0,
      date: new Date(Date.now()),
    },
  });

  return folder;
}

async function getAllByParentId(parentId) {
  const folders = await prisma.file.findMany({
    where: {
      parentId: parentId,
    },
  });

  return folders;
}

async function getParentId(id) {
  const folders = await prisma.file.findFirst({
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
