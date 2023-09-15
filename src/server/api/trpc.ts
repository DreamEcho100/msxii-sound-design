/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { TRPCError, initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type NextApiRequest, type NextApiResponse } from "next";
import superjson from "superjson";
import { ZodError } from "zod";
// import { prisma } from "~/server/db";
import { ACCESS_TOKEN_COOKIE_KEY } from "~/utils/shopify";

import shopify from "../../utils/shopify/client/index";
import drizzleQueryClient from "~/server/utils/drizzle/db/queryClient";
import { getDecryptedShopifyUserDataFromAccessToKen } from "~/server/utils/shopify";
import { allowedAdminEmails } from "~/utils";
import { drizzleSchema } from "~/server/utils/drizzle/db/SchemaWithRelations";
import { getCookieManger } from "~/utils/cookies";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

type CreateContextOptions = {
  req?: NextApiRequest;
  res?: NextApiResponse;
};
// Record<string, never>;

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
export const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {
    // prisma,
    drizzleQueryClient,
    drizzleSchema,
    shopify,
    getCookieManger: () => getCookieManger(_opts.req, _opts.res),
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({ req: _opts.req, res: _opts.res });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  let shopifyUserDecryptedData: ReturnType<
    typeof getDecryptedShopifyUserDataFromAccessToKen
  >;

  try {
    const cookiesStore = ctx.getCookieManger();
    shopifyUserDecryptedData = getDecryptedShopifyUserDataFromAccessToKen(
      cookiesStore.get(ACCESS_TOKEN_COOKIE_KEY),
    );
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Access token not found",
    });
  }

  return next({
    ctx: {
      shopifyUserDecryptedData,
      // infers the `session` as non-nullable
      // session: { ...ctx.session, user: ctx.session.user }
    },
  });
});
const enforceAdminAuthed = t.middleware(({ ctx, next }) => {
  let shopifyUserDecryptedData: ReturnType<
    typeof getDecryptedShopifyUserDataFromAccessToKen
  >;

  try {
    const cookiesStore = ctx.getCookieManger();
    shopifyUserDecryptedData = getDecryptedShopifyUserDataFromAccessToKen(
      cookiesStore.get(ACCESS_TOKEN_COOKIE_KEY),
    );

    if (
      !allowedAdminEmails.includes(
        shopifyUserDecryptedData.payload.shopifyUserEmail,
      )
    )
      throw new Error("not authorized");
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Access token not found",
    });
  }

  return next({
    ctx: {
      shopifyUserDecryptedData,
      // infers the `session` as non-nullable
      // session: { ...ctx.session, user: ctx.session.user }
    },
  });
});
const printInputs = t.middleware(
  ({ input, rawInput, path, meta, ctx, next }) => {
    console.log("input", input);
    console.log("rawInput", rawInput);
    console.log("path", path);
    console.log("meta", meta);

    return next({ ctx });
  },
);

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const customerProtectedProcedure = t.procedure.use(enforceUserIsAuthed);
export const adminProtectedProcedure = t.procedure.use(enforceAdminAuthed);
export const printInputsProcedure = t.procedure.use(printInputs);
