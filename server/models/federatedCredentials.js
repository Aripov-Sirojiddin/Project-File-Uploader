const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function create(id, provider, subject) {
  return await prisma.federated_credentials.create({
    data: {
      user_id: `${id}`,
      provider: provider,
      subject: subject,
    },
  });
}

async function find(provider, subject) {
  return await prisma.federated_credentials.findFirst({
    where: {
      provider: provider,
      subject: subject,
    },
  });
}
module.exports = {
  create,
  find,
};
