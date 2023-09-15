import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getQQLManyCollectionTextSchema,
  oneCollectionByHandleQuerySchema,
} from "~/utils/shopify/client/collections";

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
      const items = await ctx.shopify.collections.queries.getOneByHandle(input);

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (items.collectionByHandle.products.pageInfo.hasNextPage) {
        nextCursor =
          items.collectionByHandle.products.edges[
            items.collectionByHandle.products.edges.length - 1
          ]!.cursor;
      }

      return {
        items: items.collectionByHandle.products.edges,
        nextCursor,
        hasNextPage: items.collectionByHandle.products.pageInfo.hasNextPage,
      };
    }),
});
