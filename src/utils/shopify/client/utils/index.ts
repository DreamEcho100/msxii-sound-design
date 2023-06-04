import { TRPCError } from '@trpc/server';
import { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';
import { GraphQLClient } from 'graphql-request';
import { env } from '~/env.mjs';
import { ShopifyError } from '../../types';

export const ACCESS_TOKEN_KEY = 'customerAccessToken';

export const graphQLClient = new GraphQLClient(env.SHOPIFY_STORE_URL, {
	headers: {
		'X-Shopify-Storefront-Access-Token': env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN
	}
});

export const handleShopifyErrors = (
	customerUserErrors: ShopifyError[],
	options?: {
		errorCodeMessageMap?: { [key in ShopifyError['code']]?: string };
		code: TRPC_ERROR_CODE_KEY;
		customMessage?: string;
	}
) => {
	if (customerUserErrors.length > 0)
		throw new TRPCError({
			code: options?.code || 'INTERNAL_SERVER_ERROR',
			message: [
				options?.errorCodeMessageMap,
				...customerUserErrors.map((item) =>
					options?.errorCodeMessageMap?.[item.code]
						? options.errorCodeMessageMap[item.code]
						: item.message
				)
			]
				.filter(Boolean)
				.join('. \n')
		});
};

export const customerGQLFields = `id
firstName
lastName
acceptsMarketing
email
phone
createdAt
updatedAt
defaultAddress {
	id
	address1
	address2
	city
	company
	country
	zip
	province
	phone
}
addresses(first:250) {
	 edges{
		 node{
			 id
			 address1
			 address2
			 city
			 company
			 country
			 firstName
			 lastName
			 province
			 zip
			 phone
		 }
	 }
}
orders(first:250) {
	edges {
		node{
			id
			orderNumber
			email
			name
			phone
			cancelReason
			canceledAt
			edited
			financialStatus
			fulfillmentStatus
			statusUrl
			totalPrice {
				amount
				currencyCode
			}
			totalShippingPrice {
				amount
				currencyCode
			}
			totalTax {
				amount
				currencyCode
			}
			totalRefunded{
				amount
				currencyCode
			}
			lineItems(first:250){
					edges{
						node{
							currentQuantity
							quantity
							title
							originalTotalPrice { 
								amount
								currencyCode
							}
							variant {
								id
								image {
									id
									height
									width
									url
									altText
								}
								price {
									amount
									currencyCode
								}
								product {
									id
									handle
									title
									totalInventory
									availableForSale
									description
									images(first:250){
										edges { 
											node {
													id
													width
													height
													url
											}
										}
									}
									updatedAt
									createdAt
								}
								quantityAvailable
								title
							}
						}
					}
			}
			processedAt
		}
	}
}`;
