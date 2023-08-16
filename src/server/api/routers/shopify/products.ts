import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  oneProductByHandleQuerySchema,
  oneProductRecommendationsQuerySchema,
} from "~/utils/shopify/client/products";
import { z } from "zod";

export const shopifyProductsRouter = createTRPCRouter({
  getManyBasic: publicProcedure
    .input(
      z.object({
        limit: z.number().min(5).max(100),
        cursor: z.string().nonempty().nullish(),
        title: z.string().optional().nullable(),
      }),
    )
    .query(
      async ({ ctx, input }) =>
        await ctx.shopify.products.queries.many({
          first: input.limit,
          cursor: input.cursor,
          query: {
            // available_for_sale: true,
            title: input?.title ? `${input.title}*` : undefined,
          },
        }),
    ),

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
