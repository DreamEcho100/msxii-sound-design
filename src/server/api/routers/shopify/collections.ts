import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import {
	getQQLCollectionBasicTextSchema,
	oneCollectionByHandleQuerySchema
} from '~/utils/shopify/client/collections';

export const shopifyCollectionsHandlesRouter = createTRPCRouter({
	getAll: publicProcedure.query(
		async ({ ctx }) => await ctx.shopify.collections.queries.allHandles()
	)
});

export const shopifyCollectionsRouter = createTRPCRouter({
	getAll: publicProcedure.query(
		async ({ ctx }) => await ctx.shopify.collections.queries.all()
	),
	getAllBasic: publicProcedure
		.input(getQQLCollectionBasicTextSchema)
		.query(
			async ({ ctx, input }) =>
				(await ctx.shopify.collections.queries.allBasic(input)).collections
		),
	handles: shopifyCollectionsHandlesRouter,
	getOneByHandle: publicProcedure
		.input(oneCollectionByHandleQuerySchema)
		.query(
			async ({ ctx, input }) =>
				(await ctx.shopify.collections.queries.getOneByHandle(input))
					.collectionByHandle
		)
});
