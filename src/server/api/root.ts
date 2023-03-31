import { blogRouter } from './routers/blog';
import { customPagesRouter } from './routers/custom-pages';
import { merchesRouter } from './routers/merches';
import { createTRPCRouter } from '~/server/api/trpc';
import { productsRouter } from '~/server/api/routers/products';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	products: productsRouter,
	customPages: customPagesRouter,
	blog: blogRouter,
	merches: merchesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
