import { createTRPCRouter } from '~/server/api/trpc';
import { shopifyAuthRouter } from './auth';
import { shopifyCollectionsRouter } from './collections';

export const shopifyRouter = createTRPCRouter({
	auth: shopifyAuthRouter,
	shopifyCollections: shopifyCollectionsRouter
});
