import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { getQQLCollectionBasicTextSchema } from '~/utils/shopify/client/gql/collections';

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
	getAllBasic: publicProcedure
		.input(getQQLCollectionBasicTextSchema)
		.query(
			async ({ ctx, input }) =>
				(await ctx.shopify.gqlClient.collections.queries.allBasic(input))
					.collections
		),
	handles: shopifyCollectionsHandlesRouter
});
