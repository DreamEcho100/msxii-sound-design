import { createTRPCRouter } from '~/server/api/trpc';
import { shopifyAuthRouter } from './auth';
import { shopifyCollectionsRouter } from './collections';
import { shopifyProductsRouter } from './products';
import { shopifyBlogsRouter } from './blogs';
import { shopifyCheckoutsRouter } from './checkouts';

export const shopifyRouter = createTRPCRouter({
	auth: shopifyAuthRouter,
	collections: shopifyCollectionsRouter,
	products: shopifyProductsRouter,
	blog: shopifyBlogsRouter,
	checkouts: shopifyCheckoutsRouter
});
