import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '~/server/api/trpc';
import { customerAccessTokenCreateInputSchema } from '~/utils/shopify/client/auth';
import { handleShopifyErrors } from '~/utils/shopify/client/_utils';
import { ACCESS_TOKEN_COOKIE_KEY } from '~/utils/shopify';
import {
	encryptedShopifyUserData,
	getDecryptedShopifyUserDataFromAccessToKen,
} from '~/server/utils/shopify';

export const shopifyAuthRouter = createTRPCRouter({
	register: protectedProcedure
		.input(
			z.object({
				firstName: z.string().min(2),
				lastName: z.string().min(2),
				email: z.string().email(),
				password: z.string().min(8),
				phone: z.string().optional(),
				acceptsMarketing: z.boolean(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const data = await ctx.shopify.auth.customer.mutations
				.create(input)
				.then((result) => {
					handleShopifyErrors(result.customerCreate.customerUserErrors, {
						code: 'BAD_REQUEST',
						errorCodeMessageMap: {
							TAKEN:
								'Email has already been taken, check your email for confirmation',
						},
					});

					return result;
				});

			const accessTokenInfo = await ctx.shopify.auth.customer.mutations
				.accessTokenCreate({ email: input.email, password: input.password })
				.then((result) => {
					handleShopifyErrors(
						result.customerAccessTokenCreate.customerUserErrors,
						{
							code: 'BAD_REQUEST',
							customMessage: 'please check your email and password',
						},
					);

					return result.customerAccessTokenCreate.customerAccessToken;
				});

			const expiresAtInMS = new Date(accessTokenInfo.expiresAt).getTime();

			const encryptedAccessToken = encryptedShopifyUserData({
				expiresAtInSec: Math.floor(expiresAtInMS / 1000),
				shopifyAccessToken: accessTokenInfo.accessToken,
				shopifyUserId: data.customerCreate.customer.id,
			});

			ctx.cookieManger.setOne(ACCESS_TOKEN_COOKIE_KEY, encryptedAccessToken, {
				maxAge: (expiresAtInMS - Date.now()) / 1000,
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
			});

			return data.customerCreate.customer;
		}),

	login: publicProcedure
		.input(customerAccessTokenCreateInputSchema)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.cookieManger)
				throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

			const accessTokenInfo = await ctx.shopify.auth.customer.mutations
				.accessTokenCreate(input)
				.then((result) => {
					handleShopifyErrors(
						result.customerAccessTokenCreate.customerUserErrors,
						{
							code: 'BAD_REQUEST',
							customMessage: 'please check your email and password',
						},
					);

					return result.customerAccessTokenCreate.customerAccessToken;
				});

			const data = await ctx.shopify.auth.customer.queries.dataByAccessToken({
				customerAccessToken: accessTokenInfo.accessToken,
			});

			const expiresAtInMS = new Date(accessTokenInfo.expiresAt).getTime();

			const encryptedAccessToken = encryptedShopifyUserData({
				expiresAtInSec: Math.floor(expiresAtInMS / 1000),
				shopifyAccessToken: accessTokenInfo.accessToken,
				shopifyUserId: data.customer.id,
			});

			ctx.cookieManger.setOne(ACCESS_TOKEN_COOKIE_KEY, encryptedAccessToken, {
				maxAge: (expiresAtInMS - Date.now()) / 1000,
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
			});

			return data.customer;
		}),

	checkAccessToken: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.cookieManger)
			throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

		let shopifyAccessToken: string;

		try {
			shopifyAccessToken = getDecryptedShopifyUserDataFromAccessToKen(
				ctx.cookieManger.getOne(ACCESS_TOKEN_COOKIE_KEY),
			).payload.shopifyAccessToken;
		} catch (error) {
			throw new TRPCError({
				code: 'FORBIDDEN',
				message: 'Access token not found',
			});
		}

		const data = await ctx.shopify.auth.customer.queries.dataByAccessToken({
			customerAccessToken: shopifyAccessToken,
		});

		return data.customer;
	}),

	signOut: protectedProcedure.mutation(async ({ ctx }) => {
		const data = (await ctx.shopify.auth.customer.mutations.accessTokenDelete({
			customerAccessToken:
				ctx.shopifyUserDecryptedData.payload.shopifyAccessToken,
		})) as {
			customerAccessTokenDelete: {
				deletedAccessToken: string;
				deletedCustomerAccessTokenId: string;
				userErrors: [];
			};
		};

		ctx.cookieManger.deleteOne(ACCESS_TOKEN_COOKIE_KEY);

		return data;
	}),
});
