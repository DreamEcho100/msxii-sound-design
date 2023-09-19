import { gql } from "graphql-request";
import { z } from "zod";
import { type EdgesWithPagination, type Product } from "../types";
import { graphQLClient } from "./_utils";
import { gqlPriceText, gqlImageText } from "./utils";

export const gqlProductSchemaText = `id
title
availableForSale
description
descriptionHtml
vendor
publishedAt
onlineStoreUrl
productType
handle
createdAt
updatedAt
priceRange {
	maxVariantPrice { ${gqlPriceText} }
	minVariantPrice { ${gqlPriceText} }
}
compareAtPriceRange {
	maxVariantPrice { ${gqlPriceText} }
	minVariantPrice { ${gqlPriceText} }
}
featuredImage { ${gqlImageText} }
images(first: 100) {
	edges {
		node { ${gqlImageText} }
	}
}
variants(first: 100) {
	edges {
		node {
			id
			title
			image { ${gqlImageText} }
			price { ${gqlPriceText} }
			compareAtPrice { ${gqlPriceText} }
		}
	}
}`;
export const gqlProductBasicSchemaText = `id
title
availableForSale
vendor
publishedAt
productType
handle
createdAt
updatedAt
priceRange {
	maxVariantPrice { ${gqlPriceText} }
	minVariantPrice { ${gqlPriceText} }
}
compareAtPriceRange {
	maxVariantPrice { ${gqlPriceText} }
	minVariantPrice { ${gqlPriceText} }
}
featuredImage { ${gqlImageText} }
variants(first: 1) {
	edges {
		node {
			id
			title
			image { ${gqlImageText} }
			price { ${gqlPriceText} }
			compareAtPrice { ${gqlPriceText} }
		}
	}
}`;

export const manyProductsQuerySchema = z.object({
  first: z.number().min(0).max(250),
  query: z
    .object({
      title: z.string().optional(),
      available_for_sale: z.boolean().optional(),
    })
    .optional(),
  cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
});

const manyProductsQuery = async (
  input: z.infer<typeof manyProductsQuerySchema>,
) => {
  // https://shopify.dev/docs/api/storefront/2023-04/queries/products

  const queryStr =
    input.query &&
    Object.keys(input.query)
      .map((key) =>
        !input.query![key as keyof NonNullable<(typeof input)["query"]>]
          ? undefined
          : `${key}:${
              input.query![key as keyof NonNullable<(typeof input)["query"]>]
            }`,
      )
      .filter(Boolean)
      .join(" AND ");

  const template = gql`
				query getProducts($first: Int${queryStr ? ", $query: String" : ""}) {
					products(first: $first${queryStr ? ", query: $query" : ""}${
            !input.cursor ? "" : `after: "${input.cursor}"`
          }) {
						edges {
							cursor
							node {
								${gqlProductSchemaText}
							}
						}
						pageInfo {
							hasNextPage
							hasPreviousPage
						}
					}
				}
			`;

  return await graphQLClient.request<{
    products: EdgesWithPagination<Product>;
  }>(template, {
    first: input.first,
    query: queryStr,
  });
};

export const oneProductByHandleQuerySchema = z.object({ handle: z.string() });
const oneProductByHandleQuery = async (
  input: z.infer<typeof oneProductByHandleQuerySchema>,
) => {
  // https://shopify.dev/docs/api/storefront/2023-04/queries/productByHandle
  const template = gql`query ($handle: String!) {
		productByHandle(handle: $handle) {
			${gqlProductSchemaText}
		}
	}`;

  return await graphQLClient.request<{
    productByHandle: Product;
  }>(template, input);
};

export const oneProductHTMLDescriptionByHandleQuerySchema = z.object({
  handle: z.string(),
});
const oneProductHTMLDescriptionByHandleQuery = async (
  input: z.infer<typeof oneProductHTMLDescriptionByHandleQuerySchema>,
) => {
  // https://shopify.dev/docs/api/storefront/2023-04/queries/productByHandle
  const template = gql`
    query ($handle: String!) {
      productByHandle(handle: $handle) {
        descriptionHtml
      }
    }
  `;

  return await graphQLClient.request<{
    productByHandle: Product;
  }>(template, input);
};

export const oneProductRecommendationsQuerySchema = z.object({
  productId: z.string(),
});
const oneProductRecommendationsQuery = async (
  input: z.infer<typeof oneProductRecommendationsQuerySchema>,
) => {
  // https://shopify.dev/docs/api/storefront/2023-04/queries/productRecommendations
  const template = gql`query productRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
			${gqlProductSchemaText}
		}
	}`;

  return await graphQLClient.request<{
    productRecommendations: Product[];
  }>(template, input);
};

const products = {
  queries: {
    many: manyProductsQuery,
    getOneByHandle: oneProductByHandleQuery,
    getOneHTMLDescriptionByHandle: oneProductHTMLDescriptionByHandleQuery,
    recommendations: oneProductRecommendationsQuery,
  },
};

export default products;
