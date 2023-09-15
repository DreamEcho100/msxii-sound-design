import { cookies } from "next/headers";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { CHECKOUT_ID_COOKIE_KEY } from "~/utils/shopify";
import { getShopifyClient } from "~/utils/shopify/client/_utils";
import {
  addManyCheckoutLineItemsSchema,
  createOneCheckoutSchema,
  getOneCheckoutSchema,
  removeManyCheckoutLineItemsSchema,
  updateManyCheckoutLineItemsSchema,
} from "~/utils/zod/schemas/shopify/checkout";

export const shopifyCheckoutsRouter = createTRPCRouter({
  createOne: publicProcedure
    .input(createOneCheckoutSchema)
    .mutation(async ({ ctx, input }) => {
      const checkout = await getShopifyClient().checkout.create(input);

      const cookiesStore = cookies();
      cookiesStore.set(CHECKOUT_ID_COOKIE_KEY, checkout.id, {
        // maxAge:
        // 	(new Date(accessTokenInfo.expiresAt).getTime() - Date.now()) / 1000,
        maxAge: 60 * 60 * 24 * 30,
        // httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      return checkout;
    }),
  getOne: publicProcedure
    .input(getOneCheckoutSchema)
    .query(async ({ input }) => await getShopifyClient().checkout.fetch(input)),
  lineItems: createTRPCRouter({
    addMany: publicProcedure
      .input(addManyCheckoutLineItemsSchema)
      .mutation(
        async ({ input }) =>
          await getShopifyClient().checkout.addLineItems(
            input.checkoutId,
            input.lineItems,
          ),
      ),
    updateMany: publicProcedure
      .input(updateManyCheckoutLineItemsSchema)
      .mutation(
        async ({ input }) =>
          await getShopifyClient().checkout.updateLineItems(
            input.checkoutId,
            input.lineItems,
          ),
      ),
    removeMany: publicProcedure
      .input(removeManyCheckoutLineItemsSchema)
      .mutation(
        async ({ input }) =>
          await getShopifyClient().checkout.removeLineItems(
            input.checkoutId,
            input.lineItemIds,
          ),
      ),
  }),
});
