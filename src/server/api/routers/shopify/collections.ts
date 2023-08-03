import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import {
	getQQLManyCollectionTextSchema,
	oneCollectionByHandleQuerySchema,
} from '~/utils/shopify/client/collections';

export const shopifyCollectionsHandlesRouter = createTRPCRouter({
	getAll: publicProcedure.query(
		async ({ ctx }) => await ctx.shopify.collections.queries.allHandles(),
	),
});

export const shopifyCollectionsRouter = createTRPCRouter({
	getMany: publicProcedure
		.input(getQQLManyCollectionTextSchema)
		.query(
			async ({ ctx, input }) =>
				(await ctx.shopify.collections.queries.many(input)).collections,
		),
	getAllBasic: publicProcedure
		.input(getQQLManyCollectionTextSchema)
		.query(
			async ({ ctx, input }) =>
				(await ctx.shopify.collections.queries.many(input)).collections,
		),
	handles: shopifyCollectionsHandlesRouter,
	getOneByHandle: publicProcedure
		.input(oneCollectionByHandleQuerySchema)
		.query(
			async ({ ctx, input }) =>
				(await ctx.shopify.collections.queries.getOneByHandle(input))
					.collectionByHandle,
		),
});
