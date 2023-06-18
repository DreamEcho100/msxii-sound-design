import { gql } from 'graphql-request';
import { z } from 'zod';
import { Edges, type Product } from '../../types';
import { graphQLClient } from '../utils';
// import type { Customer, ShopifyError } from '../../../types';

const gqlImageText = `{ id src url altText width height }`;

const gqlPriceText = `{ amount currencyCode }`;

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
	maxVariantPrice ${gqlPriceText}
	minVariantPrice ${gqlPriceText}
}
compareAtPriceRange {
	maxVariantPrice ${gqlPriceText}
	minVariantPrice ${gqlPriceText}
}
featuredImage ${gqlImageText}
images(first: 100) {
	edges {
		node ${gqlImageText}
	}
}
variants(first: 100) {
	edges {
		node {
			id
			title
			image ${gqlImageText}
			price ${gqlPriceText}
			compareAtPrice ${gqlPriceText}
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
	maxVariantPrice ${gqlPriceText}
	minVariantPrice ${gqlPriceText}
}
compareAtPriceRange {
	maxVariantPrice ${gqlPriceText}
	minVariantPrice ${gqlPriceText}
}
featuredImage ${gqlImageText}
variants(first: 100) {
	edges {
		node {
			id
			title
			image ${gqlImageText}
			price ${gqlPriceText}
			compareAtPrice ${gqlPriceText}
		}
	}
}`;

export const allProductsQuerySchema = z.object({
	first: z.number().min(0).max(250),
	query: z.object({
		title: z.string().optional(),
		available_for_sale: z.boolean().optional()
	})
});

const allProductsQuery = async (
	input: z.infer<typeof allProductsQuerySchema>
) => {
	// https://shopify.dev/docs/api/storefront/2023-04/queries/products
	const template = gql`
				query getProducts($first: Int, $query: String) {
					products(first: $first, query: $query) {
						edges {
							cursor
							node {
								${gqlProductSchemaText}
							}
						}
					}
				}
			`;

	const query = input.query;

	return (await graphQLClient.request(template, {
		first: input.first,
		query: Object.keys(query)
			.map((key) => `${key}:${query[key as keyof typeof query]}`)
			.join(' AND ')
	})) as {
		products: Edges<Product>;
	};
};

export const oneProductByHandleQuerySchema = z.object({ handle: z.string() });
const oneProductByHandleQuery = async (
	input: z.infer<typeof oneProductByHandleQuerySchema>
) => {
	// https://shopify.dev/docs/api/storefront/2023-04/queries/productByHandle
	const template = gql`query ($handle: String!) {
		productByHandle(handle: $handle) {
			${gqlProductSchemaText}
		}
	}`;

	return (await graphQLClient.request(template, input)) as {
		productByHandle: Product;
	};
};

const products = {
	queries: { all: allProductsQuery, getOneByHandle: oneProductByHandleQuery }
};

export default products;
