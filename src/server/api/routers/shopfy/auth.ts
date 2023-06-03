import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure
} from '~/server/api/trpc';
import { customerAccessTokenCreateInputSchema } from '~/utils/shopify/client/auth';

export const shopifyAuthRouter = createTRPCRouter({
	login: publicProcedure
		.input(customerAccessTokenCreateInputSchema)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.cookieManger)
				throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

			const accessTokenInfo = await ctx.shopifyClient.auth.mutation.customer
				.accessTokenCreate(input)
				.then((result) => result.customerAccessTokenCreate.customerAccessToken);

			console.log('accessTokenInfo.accessToken', accessTokenInfo.accessToken);

			ctx.cookieManger.setOne('accessToken', accessTokenInfo.accessToken, {
				maxAge:
					(new Date(accessTokenInfo.expiresAt).getTime() - Date.now()) / 1000,
				httpOnly: true,
				secure: true,
				sameSite: 'strict'
			});

			console.log(
				"ctx.cookieManger.getOne('accessToken')",
				ctx.cookieManger.getOne('accessToken')
			);

			// ctx.shopifyClient.auth.query.customer.accessToken;
		})
});
