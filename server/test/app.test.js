// test/setup.test.js
const { exec } = require("child_process");
const { promisify } = require("util");
const { PrismaClient } = require("@prisma/client");
const chai = require("chai");
const expect = chai.expect;

const execPromise = promisify(exec);
const prisma = new PrismaClient();

before(async () => {
  await execPromise("./node_modules/.bin/prisma generate");
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
  await prisma.$connect();
});

after(async () => {
  await prisma.$disconnect();
});

describe("User Model", () => {
  it("should create a new user", async () => {
    const user = await prisma.user.create({
      data: {
        firstname: "John",
        lastname: "Does",
        email: "john@example.com",
        password: "password",
        confirm_password: "password",
      },
    });
    expect(user).to.have.property("id");
  });
});
