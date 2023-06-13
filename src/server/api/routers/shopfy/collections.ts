import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const shopifyCollectionsHandlesRouter = createTRPCRouter({
	getAll: publicProcedure.query(
		async ({ ctx }) =>
			await ctx.shopify.gqlClient.collections.queries.allHandles()
	)
});

export const shopifyCollectionsRouter = createTRPCRouter({
	getAll: publicProcedure.query(
		async ({ ctx }) => await ctx.shopify.gqlClient.collections.queries.all()
	),
	getAllBasic: publicProcedure.query(
		async ({ ctx }) =>
			await ctx.shopify.gqlClient.collections.queries.allBasic()
	),
	handles: shopifyCollectionsHandlesRouter
});
