import { gql } from 'graphql-request';
import { z } from 'zod';
import { type Collection, ShopifyError } from '../../types';
import { graphQLClient, customerGQLFields } from '../utils';
// import type { Customer, ShopifyError } from '../../../types';

const collectionSchemaText = `edges {
	node {
		description
		descriptionHtml
		handle
		id
		onlineStoreUrl
		title
		updatedAt
		collections(first: 250) {
			edges {
				node {
					id
					title
					availableForSale
					descriptionHtml
					vendor
					publishedAt
					onlineStoreUrl
					productType
					handle
					images(first: 250) {
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
				}
			}
		}
	}
}`;

const allCollectionsHandlesQuery = async () =>
	// input: z.infer<typeof customerAccessTokenInputSchema>
	{
		// https://shopify.dev/docs/api/storefront/2023-04/queries/collections
		const template = gql`
			query {
				collections(first: 250) {
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

const allCollectionsQuery = async () =>
	// input: z.infer<typeof customerAccessTokenInputSchema>
	{
		// https://shopify.dev/docs/api/storefront/2023-04/queries/collections
		const template = gql`
				query {
					collections(first: 250) {
						${collectionSchemaText}
					}
				}
			`;

		return (await graphQLClient.request(template)) as {
			collections: Collection[];
		};
	};

const collections = {
	queries: { all: allCollectionsQuery, allHandles: allCollectionsHandlesQuery }
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
const template = gql`
	query {
		collections(first: 250) {
			edges {
				node {
					description
					descriptionHtml
					handle
					id
					onlineStoreUrl
					title
					updatedAt
					collections(first: 250) {
						edges {
							node {
								availableForSale
								createdAt
								description
								descriptionHtml
								handle
								id
								isGiftCard
								onlineStoreUrl
								productType
								publishedAt
								requiresSellingPlan
								title
								totalInventory
								updatedAt
								vendor
							}
						}
					}
				}
			}
		}
	}
`;
