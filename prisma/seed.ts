import { PrismaClient } from '@prisma/client';
import { seedRoles } from './seeds/roles';
import { seedUsers } from './seeds/users';


async function main() {
  await seedRoles();
  await seedUsers()
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
