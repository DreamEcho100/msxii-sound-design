import { TRPCError } from '@trpc/server';

import { z } from 'zod';

import { shopifyFakeProductsData } from '~/utils/appData';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const productsRouter = createTRPCRouter({
	getAll: publicProcedure.query(() => {
		return shopifyFakeProductsData;
	}),
	getOneByHandle: publicProcedure.input(z.string()).query(({ input }) => {
		const product = shopifyFakeProductsData.find(
			(item) => item.handle === input
		);

		if (!product) throw new TRPCError({ code: 'NOT_FOUND' });

		return product;
	}),
	getManyByTags: publicProcedure
		.input(
			z.object({
				tags: z.array(z.string())
			})
		)
		.query(({ input }) => {
			const product = shopifyFakeProductsData.filter((item) =>
				item.tags.some((tag) => input.tags.includes(tag))
			);

			if (!product) throw new TRPCError({ code: 'NOT_FOUND' });

			return product;
		})
});
