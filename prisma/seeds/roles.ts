import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRoles() {
  await prisma.roles.deleteMany();

  await prisma.roles.createMany({
    data: [
      {
        id: '665fdcce-8795-4cec-8c91-0ff1c47e5284',
        name: 'Admin',
        description: 'Responsible for managing a resource'
      },
      {
        name: 'Train Operator',
        description: 'Responsible for operating the train'
      },
      {
        id: 'b7df9f50-0b5c-45f9-ae54-5c37de8c97ae',
        name: 'Ticket Booth Attendant',
        description: 'Responsible for attending the box office'
      }
    ]
  });

  console.log("Roles seeded successfully");
}
