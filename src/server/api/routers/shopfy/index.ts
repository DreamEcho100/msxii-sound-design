import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { shopifyAuthRouter } from './auth';

export const shopifyRouter = createTRPCRouter({
	auth: shopifyAuthRouter
});
