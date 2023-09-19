import { CHECKOUT_ID_COOKIE_KEY } from "~/libs/shopify";
import { getShopifyClient } from "~/libs/shopify/client/_utils";
import { createTRPCRouter, publicProcedure } from "~/server/libs/trpc";

export const shopifyCheckoutsRouter = createTRPCRouter({
  // createOne: publicProcedure
  //   .input(createOneCheckoutSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     const checkout = await getShopifyClient().checkout.create(input);
  //     const cookiesStore = ctx.getCookieManger();
  //     cookiesStore.set(CHECKOUT_ID_COOKIE_KEY, checkout.id, {
  //       // maxAge:
  //       // 	(new Date(accessTokenInfo.expiresAt).getTime() - Date.now()) / 1000,
  //       maxAge: 60 * 60 * 24 * 30,
  //       // httpOnly: true,
  //       secure: true,
  //       sameSite: "strict",
  //     });
  //     return checkout;
  //   }),
  // getOne: publicProcedure
  //   .input(getOneCheckoutSchema)
  //   .query(async ({ input }) => await getShopifyClient().checkout.fetch(input)),
  // lineItems: createTRPCRouter({
  //   addMany: publicProcedure
  //     .input(addManyCheckoutLineItemsSchema)
  //     .mutation(
  //       async ({ input }) =>
  //         await getShopifyClient().checkout.addLineItems(
  //           input.checkoutId,
  //           input.lineItems,
  //         ),
  //     ),
  //   updateMany: publicProcedure
  //     .input(updateManyCheckoutLineItemsSchema)
  //     .mutation(
  //       async ({ input }) =>
  //         await getShopifyClient().checkout.updateLineItems(
  //           input.checkoutId,
  //           input.lineItems,
  //         ),
  //     ),
  //   removeMany: publicProcedure
  //     .input(removeManyCheckoutLineItemsSchema)
  //     .mutation(
  //       async ({ input }) =>
  //         await getShopifyClient().checkout.removeLineItems(
  //           input.checkoutId,
  //           input.lineItemIds,
  //         ),
  //     ),
  // }),
});
