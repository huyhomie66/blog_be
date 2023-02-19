const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 1000; i++) {
    await prisma.blog.create({
      data: {
        title: faker.internet.domainName(),
        content: faker.lorem.paragraphs(),
        createdBy: faker.date.past()
      }
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  })
  .then((e) => console.log("finish"));
