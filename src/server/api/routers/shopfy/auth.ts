import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure
} from '~/server/api/trpc';
import { customerAccessTokenCreateInputSchema } from '~/utils/shopify/client/auth';
import { ACCESS_TOKEN_KEY } from '~/utils/shopify/client/utils';

export const shopifyAuthRouter = createTRPCRouter({
	login: publicProcedure
		.input(customerAccessTokenCreateInputSchema)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.cookieManger)
				throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

			const accessTokenInfo = await ctx.shopifyClient.auth.mutation.customer
				.accessTokenCreate(input)
				.then((result) => {
					if (result.customerAccessTokenCreate.customerUserErrors.length > 0)
						throw new TRPCError({
							code: 'BAD_REQUEST',
							message: [
								'please check your email and password',
								...result.customerAccessTokenCreate.customerUserErrors.map(
									(item) => item.message
								)
							].join('. \n')
						});

					return result.customerAccessTokenCreate.customerAccessToken;
				});

			const data =
				await ctx.shopifyClient.auth.query.customer.dataByAccessToken({
					customerAccessToken: accessTokenInfo.accessToken
				});

			ctx.cookieManger.setOne(ACCESS_TOKEN_KEY, accessTokenInfo.accessToken, {
				maxAge:
					(new Date(accessTokenInfo.expiresAt).getTime() - Date.now()) / 1000,
				httpOnly: true,
				secure: true,
				sameSite: 'strict'
			});

			return {
				customer: data.customer,
				accessToken: accessTokenInfo.accessToken
			};
		}),

	checkAccessToken: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.cookieManger)
			throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

		const customerAccessToken = ctx.cookieManger.getOne(ACCESS_TOKEN_KEY);

		if (
			typeof customerAccessToken !== 'string' ||
			customerAccessToken.length < 3
		)
			throw new TRPCError({ code: 'FORBIDDEN' });

		const data = await ctx.shopifyClient.auth.query.customer.dataByAccessToken({
			customerAccessToken
		});

		return {
			customer: data.customer,
			accessToken: customerAccessToken
		};
	}),

	signOut: protectedProcedure.mutation(async ({ ctx }) => {
		const data =
			(await ctx.shopifyClient.auth.mutation.customer.accessTokenDelete({
				customerAccessToken: ctx.accessToken
			})) as {
				customerAccessTokenDelete: {
					deletedAccessToken: string;
					deletedCustomerAccessTokenId: string;
					userErrors: [];
				};
			};

		ctx.cookieManger.deleteOne(ACCESS_TOKEN_KEY);

		return data;
	})
});
