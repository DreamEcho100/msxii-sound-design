import { cookies } from "next/headers";
import { appRouter } from "~/server/api/root";
import { getServerAuthSession } from "~/server/libs/next-auth";
import { db } from "~/server/libs/prisma";
import drizzleQueryClient from "~/server/libs/drizzle/db/queryClient";
import { drizzleSchema } from "~/server/libs/drizzle/db/SchemaWithRelations";
import shopify from "~/libs/shopify/client";

// import { appRouter } from '~/server';

export const getServerClient = async () =>
  appRouter.createCaller({
    session: await getServerAuthSession(),
    db: db,
    drizzleQueryClient: drizzleQueryClient,
    drizzleSchema: drizzleSchema,
    shopify: shopify,
    getCookieManger: () => {
      console.log("___", typeof window);
      return cookies();
    },
  });
