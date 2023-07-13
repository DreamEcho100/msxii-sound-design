import { TRPCError } from '@trpc/server';

import { z } from 'zod';

import { CustomPages } from '~/utils/appData';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const customPagesRouter = createTRPCRouter({
	getAll: publicProcedure.query(() => {
		return CustomPages;
	}),
	getOne: publicProcedure
		.input(
			z.object({ slug: z.string().optional(), category: z.string().optional() })
		)
		.query(({ input }) => {
			if (!input.slug && !input.category)
				throw new TRPCError({ code: 'BAD_REQUEST' });

			const product = CustomPages.find(
				(item) =>
					(typeof input.slug === 'undefined' || item.slug === input.slug) &&
					(typeof input.category === 'undefined' ||
						item.category === input.category)
			);

			if (!product) throw new TRPCError({ code: 'NOT_FOUND' });

			return product;
		})
});
