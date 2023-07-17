import { blogRouter } from './routers/blog';
import { customPagesRouter } from './routers/custom-pages';
import { merchRouter } from './routers/merch';
import { createTRPCRouter } from '~/server/api/trpc';
import { shopifyRouter } from './routers/shopify';
import { dashboardRouter } from './routers/dashboard';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	customPages: customPagesRouter,
	blog: blogRouter,
	merch: merchRouter,
	shopify: shopifyRouter,
	dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
