const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.users.findMany();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
