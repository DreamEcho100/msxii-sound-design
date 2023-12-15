import { createTRPCRouter } from "~/server/libs/trpc";
import { shopifyCustomersRouter } from "./customers";
import { shopifyBlogsRouter } from "./blogs";
import { shopifyCheckoutsRouter } from "./checkouts";
import { shopifyCollectionsRouter } from "./collections";
import { shopifyProductsRouter } from "./products";

export const shopifyRouter = createTRPCRouter({
  customers: shopifyCustomersRouter,
  collections: shopifyCollectionsRouter,
  products: shopifyProductsRouter,
  blog: shopifyBlogsRouter,
  checkouts: shopifyCheckoutsRouter,
});
