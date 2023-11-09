import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "~/libs/env.mjs";

export type EncryptedUserAccessToKen = {
  payload: {
    shopifyAccessToken: string;
    shopifyUserId: string;
    shopifyUserEmail: string;
  };
  iat: number;
  exp: number;
};

export const encryptedShopifyUserData = (params: {
  expiresAtInSec: number;
  shopifyAccessToken: string;
  shopifyUserId: string;
  shopifyUserEmail: string;
}) => {
  const expiresInMS = new Date(params.expiresAtInSec).getTime();

  return jwt.sign(
    {
      payload: {
        shopifyAccessToken: params.shopifyAccessToken,
        shopifyUserId: params.shopifyUserId,
        shopifyUserEmail: params.shopifyUserEmail,
      },
    },
    env.JWT_TOKEN_KEY,
    { expiresIn: Math.floor(expiresInMS / 1000) },
  );
};

export const getDecryptedShopifyUserDataFromAccessToKen = (token: unknown) => {
  if (typeof token !== "string" || token.length < 3)
    throw new Error("Access token not found");

  const decoded = jwt.verify(token, env.JWT_TOKEN_KEY);

  return z
    .object({
      payload: z.object({
        shopifyAccessToken: z.string().min(1),
        shopifyUserId: z.string().min(1),
        shopifyUserEmail: z.string().email(),
      }),
      iat: z.number(),
      exp: z.number(),
    })
    .parse(decoded);
};
