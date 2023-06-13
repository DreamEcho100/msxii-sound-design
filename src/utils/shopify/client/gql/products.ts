import { gql } from 'graphql-request';
import { z } from 'zod';
import { Edges, type Product } from '../../types';
import { graphQLClient } from '../utils';
// import type { Customer, ShopifyError } from '../../../types';

export const gqlProductSchemaText = `id
title
availableForSale
description
vendor
publishedAt
onlineStoreUrl
productType
handle
createdAt
updatedAt
priceRange {
	maxVariantPrice {
		amount
		currencyCode
	}
	minVariantPrice {
		amount
		currencyCode
	}
}
compareAtPriceRange {
	maxVariantPrice {
		amount
		currencyCode
	}
	minVariantPrice {
		amount
		currencyCode
	}
}
featuredImage {
	id
	src
	altText
	width
	height
}
images(first: 100) {
	edges {
		node {
			id
			src
			altText
			width
			height
		}
	}
}
variants(first: 100) {
	edges {
		node {
			id
			title
			image {
				id
				src
				altText
				width
				height
			}
			price {
				amount
				currencyCode
			}
			compareAtPrice {
				amount
				currencyCode
			}
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
	maxVariantPrice {
		amount
		currencyCode
	}
	minVariantPrice {
		amount
		currencyCode
	}
}
compareAtPriceRange {
	maxVariantPrice {
		amount
		currencyCode
	}
	minVariantPrice {
		amount
		currencyCode
	}
}
featuredImage {
	id
	src
	altText
	width
	height
}
variants(first: 100) {
	edges {
		node {
			id
			title
			image {
				id
				src
				altText
				width
				height
			}
			price {
				amount
				currencyCode
			}
			compareAtPrice {
				amount
				currencyCode
			}
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
) =>
	// input: z.infer<typeof customerAccessTokenInputSchema>
	{
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

const products = {
	queries: { all: allProductsQuery }
};

export default products;
