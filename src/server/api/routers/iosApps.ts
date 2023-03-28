import { TRPCError } from '@trpc/server';

import { z } from 'zod';

import { IOSProducts } from '~/utils/appData';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const iosAppsRouter = createTRPCRouter({
	getAll: publicProcedure.query(() => {
		return IOSProducts;
	}),
	getOneBySlug: publicProcedure.input(z.string()).query(({ input }) => {
		const product = IOSProducts.find((item) => item.slug === input);

		if (!product) throw new TRPCError({ code: 'NOT_FOUND' });

		return product;
	})
});
