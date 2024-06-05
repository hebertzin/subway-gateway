import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRoles() {
  await prisma.roles.deleteMany();

  await prisma.roles.createMany({
    data: [
      {
        name: 'Admin',
        description: 'Responsible for managing a resource'
      },
      {
        name: 'Train Operator',
        description: 'Responsible for operating the train'
      },
      {
        name: 'Ticket Booth Attendant',
        description: 'Responsible for attending the box office'
      }
    ]
  });

  console.log("Roles seeded successfully");
}
