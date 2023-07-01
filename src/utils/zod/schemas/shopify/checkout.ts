import { z } from 'zod';

export const createOneCheckoutSchema = z
	.object({
		email: z.string().email().optional(),
		lineItems: z
			.array(
				z.object({
					// customAttributes?: AttributeInput[];
					quantity: z.number().min(1),
					variantId: z.string()
				})
			)
			.optional()
	})
	.optional();

export const getOneCheckoutSchema = z.string().min(1);

export const addManyCheckoutLineItemsSchema = z.object({
	checkoutId: z.string().min(1),
	lineItems: z
		.array(
			z.object({
				// customAttributes?: AttributeInput[];
				quantity: z.number().min(1),
				variantId: z.string()
			})
		)
		.min(1)
});
export const updateManyCheckoutLineItemsSchema = z.object({
	checkoutId: z.string().min(1),
	lineItems: z
		.array(
			z.object({
				// customAttributes?: AttributeInput[];
				id: z.string().min(1),
				quantity: z.number().min(1),
				variantId: z.string()
			})
		)
		.min(1)
});
export const removeManyCheckoutLineItemsSchema = z.object({
	checkoutId: z.string().min(1),
	lineItemIds: z.array(z.string().min(1)).min(1)
});
