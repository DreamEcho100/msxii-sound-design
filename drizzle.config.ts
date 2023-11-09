import type { Config } from "drizzle-kit";
import { z } from "zod";
import { config } from "dotenv";

config();

export default {
  schema: "./src/server/utils/drizzle/db/schema.ts",
  out: "./src/server/utils/drizzle/db",
  driver: "pg",
  dbCredentials: {
    connectionString: z.string().min(1).parse(process.env.DATABASE_URL),
  },
} satisfies Config;
