// seeds/users.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  await prisma.users.deleteMany();

  await prisma.users.createMany({
    data: [
      {
        username: "Hebert",
        password: "20304060",
        email: "hebertsantos@gmail.com",
        role_id: "665fdcce-8795-4cec-8c91-0ff1c47e5284",
        phone: "55 13996612070",
        street: "Av Paulista",
        country: "Brasil",
        nationality: "Brasileira",
        state: "São Paulo",
        city: "São Paulo",
        postal_code: "11714140",
        gender: "Masculino",
        date_of_birth: new Date("2004-10-13"),
        languages: "Português",
      },
      {
        username: "Mariana",
        password: "40506070",
        email: "mariana.silva@gmail.com",
        role_id: "b7df9f50-0b5c-45f9-ae54-5c37de8c97ae",
        phone: "55 11999887766",
        street: "Rua das Flores",
        country: "Brasil",
        nationality: "Brasileira",
        state: "Rio de Janeiro",
        city: "Rio de Janeiro",
        postal_code: "20040002",
        gender: "Feminino",
        date_of_birth: new Date("1995-05-23"),
        languages: "Português, Inglês",
      },
    ],
  });
}

seedUsers()
  .then(async () => {
    console.log("Users seeded successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
