import { PrismaClient } from "@prisma/client";
import { loadEnv } from "../env/env";

const prisma = new PrismaClient();

export const init = async () => {
  const envVars = await loadEnv();
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: envVars.DATABASE_URL,
      },
    },
  });
  await prisma.$connect();
  return { envVars, prisma };
};

export { prisma };
