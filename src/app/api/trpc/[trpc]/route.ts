import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "~/server/api/root";
import { env } from "~/env.mjs";
// import { createTRPCContext } from "~/server/api/trpc";
import { drizzleSchema } from "~/server/utils/drizzle/db/SchemaWithRelations";
import drizzleQueryClient from "~/server/utils/drizzle/db/queryClient";
// import { getCookieManger } from "~/utils/cookies";
import shopify from "~/utils/shopify/client";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: (_opts) => ({
      drizzleQueryClient,
      drizzleSchema,
      shopify,
    }),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
