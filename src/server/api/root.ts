import { blogRouter } from "./routers/blog";
import { customPagesRouter } from "./routers/custom-pages";
// import { createTRPCRouter } from '~/server/api/trpc';
import { shopifyRouter } from "./routers/shopify";
import { dashboardRouter } from "./routers/dashboard";
import { createTRPCRouter, publicProcedure } from "../libs/trpc";
import {
  TRPCError,
  type inferRouterInputs,
  type inferRouterOutputs,
} from "@trpc/server";
import { z } from "zod";
import { env } from "~/libs/env.mjs";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  customPages: customPagesRouter,
  blog: blogRouter,
  shopify: shopifyRouter,
  dashboard: dashboardRouter,
  subscribeToEmailList: publicProcedure
    .input(z.string().email())
    .mutation(async ({ input }) => {
      // Credit to: https://agirlcodes.medium.com/setup-a-newsletter-with-next-js-and-mailchimp-d9933cfd785e
      try {
        const response = await fetch(
          `https://${env.MAIL_CHIMP_DC}.api.mailchimp.com/3.0/lists/${env.MAIL_CHIMP_AUDIENCE_ID}/members`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `api_key ${env.MAIL_CHIMP_API_KEY}`,
            },
            body: JSON.stringify({
              email_address: input,
              status: "subscribed",
            }),
          },
        );
        if (response.status >= 400) {
          const result = (await response.json()) as {
            title: string;
            status: number;
            detail: string;
            instance: string;
          };
          console.error("result", result);

          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `There was an error subscribing to the newsletter.
${result.title}`,
            //  Shoot me an email at ...@gmail and I'll add you to the list.`
          });
        }
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : JSON.stringify(error),
        });
      }
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
