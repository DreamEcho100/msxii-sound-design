import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import {
	allProductsQuerySchema,
	oneProductByHandleQuerySchema
} from '~/utils/shopify/client/gql/products';

export const shopifyProductsRouter = createTRPCRouter({
	getAll: publicProcedure
		// .input(allProductsQuerySchema)
		.query(
			async ({ ctx, input }) =>
				await ctx.shopify.gqlClient.products.queries.all({
					first: 100,
					query: {
						available_for_sale: true,
						// title: input.query.title ? `${input.query.title}*` : undefined,
						title: 'dru*'
					}
				})
		),

	//  = { handle: 'schlump-loops-2' }
	getOneByHandle: publicProcedure
		.input(oneProductByHandleQuerySchema)
		.query(
			async ({ ctx, input }) =>
				(await ctx.shopify.gqlClient.products.queries.getOneByHandle(input))
					.productByHandle
		)
});
