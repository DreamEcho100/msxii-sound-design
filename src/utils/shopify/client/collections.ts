import { gql } from 'graphql-request';
import { type Collection, type Edges, type BasicCollection } from '../types';
import { graphQLClient } from './_utils';
import { gqlProductSchemaText } from './products';
import { z } from 'zod';

// , filters: { available: true }
const gqlCollectionSchemaText = `description
		handle
		id
		onlineStoreUrl
		title
		updatedAt
		products(first: 100) {
			edges {
				node {
					${gqlProductSchemaText}
				}
			}
		}`;

export const getQQLManyCollectionTextSchema = z
	.object({
		collectionsFirst: z.number().min(5).max(100).optional().default(25),
		productsFirst: z.number().min(5).max(100).optional().default(25),
	})
	.optional()
	.default({
		collectionsFirst: 10,
		productsFirst: 10,
	});

const getQQLManyCollectionText = (
	input?: z.infer<typeof getQQLManyCollectionTextSchema>,
) => {
	// const query = !input?.query;
	// const queryText = !query
	// 	? ''
	// 	: Object.keys(query)
	// 			.map((key) => `"${key}:${query[key as keyof typeof query]}"`)
	// 			.join(' AND ');

	// ${!queryText ? '' : `query: ${queryText}, `}
	// , filters: { available: true }
	const first = input?.productsFirst ?? 10;

	return `description
	handle
	id
	onlineStoreUrl
	title
	updatedAt
	products(first: ${first}) {
		edges {
			node {
				${gqlProductSchemaText}
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
			(await graphQLClient.request<{
				collections: {
					edges: {
						node: {
							handle: string;
						};
					}[];
				};
			}>(template))
		).collections.edges.map((edge) => edge.node.handle);
	};

// const allCollectionsQuery = async () => {
// 	// https://shopify.dev/docs/api/storefront/2023-04/queries/collections
// 	const template = gql`
// 						query {
// 							collections(first: 100) {
// 								edges {
// 									node {
// 										${gqlCollectionSchemaText}
// 									}
// 								}
// 							}
// 						}
// 					`;

// 	return (await graphQLClient.request(template)) as {
// 		collections: Edges<Collection>[];
// 	};
// };
const manyCollectionsQuery = async (
	input?: z.infer<typeof getQQLManyCollectionTextSchema>,
) => {
	// https://shopify.dev/docs/api/storefront/2023-04/queries/collections
	const template = gql`
						query {
							collections(first: ${input?.collectionsFirst}) {
								edges {
									node {
										${getQQLManyCollectionText(input)}
									}
								}
							}
						}
					`;

	return (await graphQLClient.request<{
		collections: Edges<BasicCollection>;
	}>(template)) ;
};

export const oneCollectionByHandleQuerySchema = z.object({
	handle: z.string(),
});
const oneCollectionByHandleQuery = async (
	input: z.infer<typeof oneCollectionByHandleQuerySchema>,
) => {
	// https://shopify.dev/docs/api/storefront/2023-04/queries/collectionByHandle
	const template = gql`query ($handle: String!) {
		collectionByHandle(handle: $handle) {
			${gqlCollectionSchemaText}
		}
	}`;

	return (await graphQLClient.request<{
		collectionByHandle: Collection;
	}>(template, input)) ;
};

const collections = {
	queries: {
		// all: allCollectionsQuery,
		many: manyCollectionsQuery,
		allHandles: allCollectionsHandlesQuery,
		getOneByHandle: oneCollectionByHandleQuery,
	},
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
