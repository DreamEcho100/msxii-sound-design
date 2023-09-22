import { createTRPCRouter } from "~/server/libs/trpc";
import { shopifyAuthRouter } from "./auth";
import { shopifyBlogsRouter } from "./blogs";
import { shopifyCheckoutsRouter } from "./checkouts";
import { shopifyCollectionsRouter } from "./collections";
import { shopifyProductsRouter } from "./products";

export const shopifyRouter = createTRPCRouter({
	auth: shopifyAuthRouter,
	collections: shopifyCollectionsRouter,
	products: shopifyProductsRouter,
	blog: shopifyBlogsRouter,
	checkouts: shopifyCheckoutsRouter
});
