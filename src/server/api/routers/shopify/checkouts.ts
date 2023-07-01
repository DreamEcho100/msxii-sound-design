import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { getShopifyClient } from '~/utils/shopify/client/_utils';
import {
	addManyCheckoutLineItemsSchema,
	createOneCheckoutSchema,
	getOneCheckoutSchema,
	removeManyCheckoutLineItemsSchema,
	updateManyCheckoutLineItemsSchema
} from '~/utils/zod/schemas/shopify/checkout';

export const shopifyCheckoutsRouter = createTRPCRouter({
	createOne: publicProcedure
		.input(createOneCheckoutSchema)
		.mutation(
			async ({ ctx, input }) => await getShopifyClient().checkout.create(input)
		),
	getOne: publicProcedure
		.input(getOneCheckoutSchema)
		.query(
			async ({ ctx, input }) => await getShopifyClient().checkout.fetch(input)
		),
	lineItems: createTRPCRouter({
		addMany: publicProcedure
			.input(addManyCheckoutLineItemsSchema)
			.mutation(
				async ({ ctx, input }) =>
					await getShopifyClient().checkout.addLineItems(
						input.checkoutId,
						input.lineItems
					)
			),
		updateMany: publicProcedure
			.input(updateManyCheckoutLineItemsSchema)
			.mutation(
				async ({ ctx, input }) =>
					await getShopifyClient().checkout.updateLineItems(
						input.checkoutId,
						input.lineItems
					)
			),
		removeMany: publicProcedure
			.input(removeManyCheckoutLineItemsSchema)
			.mutation(
				async ({ ctx, input }) =>
					await getShopifyClient().checkout.removeLineItems(
						input.checkoutId,
						input.lineItemIds
					)
			)
	})
});
