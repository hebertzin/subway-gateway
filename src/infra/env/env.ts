import { config } from "dotenv";
import { z } from "zod";

export const loadEnv = async () => {
  const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
  config({ path: envFile });

  const envSchema = z.object({
    NODE_ENV: z.enum(["prod", "test"]).default("test"),
    DATABASE_URL: z.string().optional(),
  });
  const env = envSchema.safeParse(process.env);
  if (!env.success) {
    console.error("Invalid environment variables:", env.error.format());
    process.exit(1);
  }
  const databaseUrl =
    env.data.NODE_ENV === "test"
      ? env.data.DATABASE_URL
      : env.data.DATABASE_URL;

  if (!databaseUrl) {
    console.error("DATABASE_URL is not set for the production environment.");
    process.exit(1);
  }
  return {
    ...env.data,
    DATABASE_URL: databaseUrl,
  };
};
