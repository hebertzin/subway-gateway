import { PrismaClient } from '@prisma/client';
import { seedRoles } from './seeds/roles';


async function main() {
  await seedRoles();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    const prisma = new PrismaClient();
    await prisma.$disconnect();
  });
