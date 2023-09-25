import {
  getQQLManyCollectionTextSchema,
  oneCollectionByHandleQuerySchema,
} from "~/libs/shopify/client/collections";
import { createTRPCRouter, publicProcedure } from "~/server/libs/trpc";

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
    .query(async ({ ctx, input }) => {
      const items = (
        await ctx.shopify.collections.queries.getOneByHandle(input)
      ).collectionByHandle;

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (items.products.pageInfo.hasNextPage) {
        nextCursor =
          items.products.edges[items.products.edges.length - 1]!.cursor;
      }

      return {
        items,
        nextCursor,
        hasNextPage: items.products.pageInfo.hasNextPage,
      };
    }),
});
