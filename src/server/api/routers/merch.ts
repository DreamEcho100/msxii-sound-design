import { TRPCError } from '@trpc/server';

import { z } from 'zod';

import { ShopifyProduct } from '~/utils/types';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { merchesData } from '~/utils/appData/merch';


export const merchRouter = createTRPCRouter({
	getAll: publicProcedure.query(() => {
		return merchesData;
	}),
	getOneByHandle: publicProcedure.input(z.string()).query(({ input }) => {
		const product = merchesData.find((item) => item.handle === input);

		if (!product) throw new TRPCError({ code: 'NOT_FOUND' });

		return product;
	})
});