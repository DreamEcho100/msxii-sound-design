import { blogRouter } from "./routers/blog";
import { customPagesRouter } from "./routers/custom-pages";
// import { createTRPCRouter } from '~/server/api/trpc';
import { shopifyRouter } from "./routers/shopify";
import { dashboardRouter } from "./routers/dashboard";
import { createTRPCRouter } from "../libs/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  customPages: customPagesRouter,
  blog: blogRouter,
  shopify: shopifyRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
