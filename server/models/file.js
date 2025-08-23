const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function createFile(parentId, fileType, fileName, ownerId, size) {
  const file = await prisma.files.create({
    data: {
      parentId: parentId,
      ownerId: ownerId,
      name: fileName,
      type: fileType,
      size: size,
      data: new Date(Date.now()),
    },
  });
  return file;
}

module.exports = { createFile };
