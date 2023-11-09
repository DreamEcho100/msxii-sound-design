import { z } from "zod";
import {
  oneProductByHandleQuerySchema,
  oneProductRecommendationsQuerySchema,
} from "~/libs/shopify/client/products";
import { createTRPCRouter, publicProcedure } from "~/server/libs/trpc";

export const shopifyProductsRouter = createTRPCRouter({
  getManyBasic: publicProcedure
    .input(
      z.object({
        limit: z.number().min(5).max(100),
        cursor: z.string().min(1).nullish(),
        title: z.string().optional().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const items = await ctx.shopify.products.queries
        .manyBasic({
          first: input.limit,
          cursor: input.cursor,
          query: {
            title: input?.title ? `${input.title}*` : undefined,
          },
        })
        .then((result) => result.products);

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (items.pageInfo.hasNextPage) {
        nextCursor = items.edges[items.edges.length - 1]!.cursor;
      }

      return {
        items,
        nextCursor,
        hasNextPage: items.pageInfo.hasNextPage,
      };
    }),

  getOneByHandle: publicProcedure
    .input(oneProductByHandleQuerySchema)
    .query(
      async ({ ctx, input }) =>
        (await ctx.shopify.products.queries.getOneByHandle(input))
          .productByHandle,
    ),

  getOneHTMLDescriptionByHandle: publicProcedure
    .input(oneProductByHandleQuerySchema)
    .query(
      async ({ ctx, input }) =>
        (
          await ctx.shopify.products.queries.getOneHTMLDescriptionByHandle(
            input,
          )
        ).productByHandle,
    ),

  getOneRecommendations: publicProcedure
    .input(oneProductRecommendationsQuerySchema)
    .query(
      async ({ ctx, input }) =>
        (await ctx.shopify.products.queries.recommendations(input))
          .productRecommendations,
    ),
});
