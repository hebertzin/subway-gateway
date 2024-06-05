import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRoles() {
  await prisma.roles.deleteMany();

  await prisma.roles.createMany({
    data: [
      {
        id: "665fdcce-8795-4cec-8c91-0ff1c47e5284",
        name: "Admin",
        description: "Responsible for managing system resources",
      },
      {
        id: "faf787c0-6b97-4dae-84e4-ca947c790bf2",
        name: "Train Operator",
        description: "Operates trains, maintains schedules, ensures safety, and communicates with the control center.",
      },
      {
        id: "b7df9f50-0b5c-45f9-ae54-5c37de8c97ae",
        name: "Ticket Booth Attendant",
        description: "Assists passengers with ticket purchases and travel information, and handles transactions.",
      },
      {
        id: "477b3243-8a2e-484f-baf2-18bf7f08aa31",
        name: "Maintains technical services",
        description: "Responsible for attending technical services",
      },
      {
        id: "8659bc51-fbef-42e7-a0c5-39fe219d2e27",
        name: "Passenger",
        description: "Uses the subway for transportation, plans journeys, buys tickets, and receives service updates.",
      },
    ],
  });

  console.log("Roles seeded successfully");
}

seedRoles()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
