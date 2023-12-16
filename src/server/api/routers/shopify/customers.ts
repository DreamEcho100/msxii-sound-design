// import {  } from '~/utils/shopify/client/auth';
import { handleShopifyErrors } from "~/libs/shopify/client/_utils/index";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  encryptedShopifyUserData,
  getDecryptedShopifyUserDataFromAccessToKen,
} from "~/server/libs/shopify";
import {
  createTRPCRouter,
  customerProtectedProcedure,
  publicProcedure,
} from "~/server/libs/trpc";
import {
  customerAccessTokenCreateInputSchema,
  customerUpdateAddressSchema,
  customerUpdateSchema,
} from "~/libs/shopify/schema/customers";
import { ACCESS_TOKEN_COOKIE_KEY } from "~/libs/shopify";

export const shopifyCustomersRouter = createTRPCRouter({
  register: publicProcedure
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
      const data = await ctx.shopify.customers.mutations
        .create(input)
        .then((result) => {
          handleShopifyErrors(result.customerCreate.customerUserErrors, {
            code: "BAD_REQUEST",
            errorCodeMessageMap: {
              TAKEN:
                "Email has already been taken, check your email for confirmation",
            },
          });

          return result;
        });

      const accessTokenInfo = await ctx.shopify.customers.mutations
        .createAccessToken({ email: input.email, password: input.password })
        .then((result) => {
          handleShopifyErrors(
            result.customerAccessTokenCreate.customerUserErrors,
            {
              code: "BAD_REQUEST",
              customMessage: "please check your email and password",
            },
          );

          return result.customerAccessTokenCreate.customerAccessToken;
        });

      const expiresAtInMS = new Date(accessTokenInfo.expiresAt).getTime();

      const encryptedAccessToken = encryptedShopifyUserData({
        expiresAtInSec: Math.floor(expiresAtInMS / 1000),
        shopifyAccessToken: accessTokenInfo.accessToken,
        shopifyUserId: data.customerCreate.customer.id,
        shopifyUserEmail: data.customerCreate.customer.email,
      });

      const cookiesStore = ctx.getCookieManger();

      cookiesStore.set(ACCESS_TOKEN_COOKIE_KEY, encryptedAccessToken, {
        maxAge: (expiresAtInMS - Date.now()) / 1000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      return data.customerCreate.customer;
    }),

  login: publicProcedure
    .input(z.object(customerAccessTokenCreateInputSchema))
    .mutation(async ({ ctx, input }) => {
      const accessTokenInfo = await ctx.shopify.customers.mutations
        .createAccessToken(input)
        .then((result) => {
          handleShopifyErrors(
            result.customerAccessTokenCreate.customerUserErrors,
            {
              code: "BAD_REQUEST",
              customMessage: "please check your email and password",
            },
          );

          return result.customerAccessTokenCreate.customerAccessToken;
        });

      const data = await ctx.shopify.customers.queries.dataByAccessToken({
        customerAccessToken: accessTokenInfo.accessToken,
      });

      const expiresAtInMS = new Date(accessTokenInfo.expiresAt).getTime();

      const encryptedAccessToken = encryptedShopifyUserData({
        expiresAtInSec: Math.floor(expiresAtInMS / 1000),
        shopifyAccessToken: accessTokenInfo.accessToken,
        shopifyUserId: data.customer.id,
        shopifyUserEmail: data.customer.email,
      });

      const cookiesStore = ctx.getCookieManger();
      cookiesStore.set(ACCESS_TOKEN_COOKIE_KEY, encryptedAccessToken, {
        maxAge: (expiresAtInMS - Date.now()) / 1000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      return data.customer;
    }),

  checkAccessToken: publicProcedure.query(async ({ ctx }) => {
    let shopifyAccessToken: string;
    try {
      const cookiesStore = ctx.getCookieManger();
      shopifyAccessToken = getDecryptedShopifyUserDataFromAccessToKen(
        cookiesStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value,
      ).payload.shopifyAccessToken;
    } catch (error) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Access token not found",
      });
    }

    const data = await ctx.shopify.customers.queries.dataByAccessToken({
      customerAccessToken: shopifyAccessToken,
    });

    return data.customer;
  }),

  signOut: customerProtectedProcedure.mutation(async ({ ctx }) => {
    const cookiesStore = ctx.getCookieManger();
    cookiesStore.delete(ACCESS_TOKEN_COOKIE_KEY);

    const data = (await ctx.shopify.customers.mutations.deleteAccessToken({
      customerAccessToken:
        ctx.shopifyUserDecryptedData.payload.shopifyAccessToken,
    })) as {
      customerAccessTokenDelete: {
        deletedAccessToken: string;
        deletedCustomerAccessTokenId: string;
        userErrors: [];
      };
    };

    return data;
  }),

  updateOneBasic: customerProtectedProcedure
    .input(z.object(customerUpdateSchema))
    .mutation(async ({ ctx, input }) => {
      console.log("input", input);
      const data = await ctx.shopify.customers.mutations
        .update(input, ctx.shopifyUserDecryptedData.payload.shopifyAccessToken)
        .then((result) => {
          handleShopifyErrors(result.customerUpdate.customerUserErrors, {
            code: "BAD_REQUEST",
          });

          return result;
        });

      return data;
    }),

  addresses: createTRPCRouter({
    createOne: customerProtectedProcedure
      .input(z.object(customerUpdateAddressSchema))
      .mutation(async ({ ctx, input }) => {
        const data = await ctx.shopify.customers.mutations
          .createAddress(
            input,
            ctx.shopifyUserDecryptedData.payload.shopifyAccessToken,
          )
          .then((result) => {
            handleShopifyErrors(result.customerAddress.customerUserErrors, {
              code: "BAD_REQUEST",
            });

            return result;
          });

        return data;
      }),

    updateOne: customerProtectedProcedure
      .input(z.object(customerUpdateAddressSchema))
      .mutation(async ({ ctx, input }) => {
        const data = await ctx.shopify.customers.mutations
          .updateAddress(
            input,
            ctx.shopifyUserDecryptedData.payload.shopifyAccessToken,
          )
          .then((result) => {
            handleShopifyErrors(result.customerAddress.customerUserErrors, {
              code: "BAD_REQUEST",
            });

            return result;
          });

        return data;
      }),

    deleteOne: customerProtectedProcedure
      .input(z.object(customerUpdateAddressSchema))
      .mutation(async ({ ctx, input }) => {
        const data = await ctx.shopify.customers.mutations
          .deleteAddress(
            input,
            ctx.shopifyUserDecryptedData.payload.shopifyAccessToken,
          )
          .then((result) => {
            handleShopifyErrors(result.customerAddress.customerUserErrors, {
              code: "BAD_REQUEST",
            });

            return result;
          });

        return data;
      }),
  }),
});
