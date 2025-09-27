import { PrismaClient } from "@prisma/client";
import { sampleData } from "./data-service";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.deleteMany();

    await prisma.category.createMany({
      data: sampleData.categories,
    });

    console.log("DB seeded successfully!");
  } catch (err) {
    console.log(err);
    throw new Error("failed to seeding db!");
  }
}

main();
