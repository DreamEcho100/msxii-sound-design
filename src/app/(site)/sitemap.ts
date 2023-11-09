// import { getAllProducts } from '~/server/controllers/products';

import { type MetadataRoute } from "next";
import shopify from "~/libs/shopify/client";
import { getBaseUrl } from "~/libs/utils";
import drizzleQueryClient from "~/server/libs/drizzle/db/queryClient";

const BASE_URL = getBaseUrl();

type Sitemap = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}[];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const products = await getAllProducts({
  // 	typesToExclude: ['Sound Editing Software'],
  // });

  const sitemap: Sitemap = [];

  sitemap.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  });

  const staticPaths = ["blog", "collections", "products"];
  staticPaths.forEach((item) => {
    sitemap.push({
      url: `${BASE_URL}/${item}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });
  });

  await Promise.all([
    drizzleQueryClient.query.pgCategory
      .findMany({
        columns: { name: true },
        with: {
          pgs: {
            columns: {
              slug: true,
            },
          },
        },
      })
      .then((result) => {
        for (const category of result) {
          sitemap.push({
            url: `${BASE_URL}/${category.name}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
          });

          for (const page of category.pgs) {
            if (!page.slug) continue;

            sitemap.push({
              url: `${BASE_URL}/${category.name}/${page.slug}`,
              lastModified: new Date(),
              changeFrequency: "monthly",
              priority: 1,
            });
          }
        }
      }),
    shopify.collections.queries.allHandles().then((collectionsHandles) => {
      for (const handle of collectionsHandles) {
        sitemap.push({
          url: `${BASE_URL}/collections/${handle}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 1,
        });
      }
    }),
    shopify.products.queries.getManyHandles().then((result) => {
      for (const product of result.products.edges) {
        sitemap.push({
          url: `${BASE_URL}/products/${product.node.handle}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 1,
        });
      }
    }),
    shopify.blogs.articles.queries.allIdsAndHandles().then((result) => {
      const gidBase = "gid://shopify/Article/";
      for (const item of result.articles.edges) {
        ({
          params: { id: item.node.id.replace(gidBase, "") },
        });

        sitemap.push({
          url: item.node.id.replace(gidBase, `${BASE_URL}/blog/`), //`${BASE_URL}/${item}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 1,
        });
      }
    }),
  ]);

  return sitemap;
}
