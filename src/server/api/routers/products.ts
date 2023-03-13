import { TRPCError } from '@trpc/server';

import { z } from 'zod';

import { shopifyFakeProductsData } from '~/utils/appData';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const productsRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`
			};
		}),

	getAll: publicProcedure.query(() => {
		return shopifyFakeProductsData;
	}),
	getOneByHandle: publicProcedure.input(z.string()).query(({ input }) => {
		const product = shopifyFakeProductsData.find(
			(item) => item.handle === input
		);

		if (!product) throw new TRPCError({ code: 'NOT_FOUND' });

		return product;
	})
});
