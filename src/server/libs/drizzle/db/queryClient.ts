import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import drizzleSchemaWithRelations from "./SchemaWithRelations";
import { z } from "zod";

const pool = postgres(z.string().nonempty().parse(process.env.DATABASE_URL));

const drizzleQueryClient = drizzle(pool, {
  schema: drizzleSchemaWithRelations,
  logger: !!process.env.IsDrizzleLoggerOn,
});

export default drizzleQueryClient;
