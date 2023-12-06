import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import drizzleSchemaWithRelations from "./SchemaWithRelations";
import { z } from "zod";

const globalForPrisma = globalThis as unknown as {
  // eslint-disable-next-line @typescript-eslint/ban-types
  drizzleQueryClient: PostgresJsDatabase<typeof drizzleSchemaWithRelations>;
};

const drizzleQueryClient = (() => {
  if (globalForPrisma.drizzleQueryClient)
    return globalForPrisma.drizzleQueryClient;

  const pool = postgres(z.string().min(1).parse(process.env.DATABASE_URL));
  return drizzle(pool, {
    schema: drizzleSchemaWithRelations,
    logger: !!process.env.IsDrizzleLoggerOn,
  });
})();

export default drizzleQueryClient;
