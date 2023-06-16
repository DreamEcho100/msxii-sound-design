import { gql } from 'graphql-request';
import { type Collection, Edges, BasicCollection } from '../../types';
import { graphQLClient } from '../utils';
import { gqlProductBasicSchemaText, gqlProductSchemaText } from './products';
import { z } from 'zod';
// import type { Customer, ShopifyError } from '../../../types';

const gqlCollectionSchemaText = `edges {
	node {
		description
		handle
		id
		onlineStoreUrl
		title
		updatedAt
		products(first: 100, filters: { available: true }) {
			edges {
				node {
					${gqlProductSchemaText}
				}
			}
		}
	}
}`;

export const getQQLCollectionBasicTextSchema = z
	.object({
		productsFirst: z.number().min(5).max(100).optional()
	})
	.optional();

const getQQLCollectionBasicText = (
	input?: z.infer<typeof getQQLCollectionBasicTextSchema>
) => {
	// const query = !input?.query;
	// const queryText = !query
	// 	? ''
	// 	: Object.keys(query)
	// 			.map((key) => `"${key}:${query[key as keyof typeof query]}"`)
	// 			.join(' AND ');

	// ${!queryText ? '' : `query: ${queryText}, `}
	const first = input?.productsFirst || 10;

	return `edges {
	node {
		handle
		id
		title
		updatedAt
		products(first: ${first}, filters: { available: true }) {
			edges {
				node {
					${gqlProductBasicSchemaText}
				}
			}
		}
	}
}`;
};

const allCollectionsHandlesQuery = async () =>
	// input: z.infer<typeof customerAccessTokenInputSchema>
	{
		// https://shopify.dev/docs/api/storefront/2023-04/queries/collections
		const template = gql`
			query {
				collections(first: 100) {
					edges {
						node {
							handle
						}
					}
				}
			}
		`;

		return (
			(await graphQLClient.request(template)) as {
				collections: {
					edges: {
						node: {
							handle: string;
						};
					}[];
				};
			}
		).collections.edges.map((edge) => edge.node.handle);
	};

const allCollectionsQuery = async () => {
	// https://shopify.dev/docs/api/storefront/2023-04/queries/collections
	const template = gql`
						query {
							collections(first: 100) {
								${gqlCollectionSchemaText}
							}
						}
					`;

	return (await graphQLClient.request(template)) as {
		collections: Edges<Collection>[];
	};
};
const allCollectionsBasicQuery = async (
	input?: z.infer<typeof getQQLCollectionBasicTextSchema>
) => {
	// https://shopify.dev/docs/api/storefront/2023-04/queries/collections
	const template = gql`
						query {
							collections(first: 100) {
								${getQQLCollectionBasicText(input)}
							}
						}
					`;

	return (await graphQLClient.request(template)) as {
		collections: Edges<BasicCollection>;
	};
};

const collections = {
	queries: {
		all: allCollectionsQuery,
		allBasic: allCollectionsBasicQuery,
		allHandles: allCollectionsHandlesQuery
	}
};

export default collections;

/*
	
							image
							metafield
							seo
*/
/*
										compareAtPriceRange
										featuredImage
										metafield
										options
										priceRange
										seo
										tags
										variantBySelectedOptions
	*/
// https://shopify.dev/docs/api/storefront/2023-04/objects/Customer
// const template = gql`
// 	query {
// 		collections(first: 250) {
// 			edges {
// 				node {
// 					description
// 					descriptionHtml
// 					handle
// 					id
// 					onlineStoreUrl
// 					title
// 					updatedAt
// 					collections(first: 250) {
// 						edges {
// 							node {
// 								availableForSale
// 								createdAt
// 								description
// 								descriptionHtml
// 								handle
// 								id
// 								isGiftCard
// 								onlineStoreUrl
// 								productType
// 								publishedAt
// 								requiresSellingPlan
// 								title
// 								totalInventory
// 								updatedAt
// 								vendor
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// `;
