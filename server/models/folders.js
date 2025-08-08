const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(parentId, name, userId) {
  const folder = await prisma.files.create({
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

async function getAllByParentId(parentId, ownerId) {
  const folders = await prisma.files.findMany({
    where: {
      ownerId: ownerId,
      parentId: parentId,
      type: "folder",
    },
  });

  return folders;
}

async function getParentId(id) {
  const folders = await prisma.files.findFirst({
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
