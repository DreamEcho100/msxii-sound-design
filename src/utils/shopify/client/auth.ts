import { gql } from 'graphql-request';
import { z } from 'zod';
import { TSHOPIFY_ERRORS_CODES } from '../errors';
import { graphQLClient } from './utils';
import { Customer } from '../types';

export const customerAccessTokenCreateInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(5)
});
const customerAccessTokenCreateMutation = async (
	input: z.infer<typeof customerAccessTokenCreateInputSchema>
) => {
	/**
	 * @description [customerAccessTokenCreate](https://shopify.dev/docs/api/storefront/2023-04/mutations/customeraccesstokencreate)
	 * Creates a customer access token.
	 * The customer access token is required to modify the customer object in any way.
	 *
	 *  Requires `unauthenticated_write_customers` access scope.
	 */
	const template = gql`
		mutation customerAccessTokenCreate(
			$input: CustomerAccessTokenCreateInput!
		) {
			customerAccessTokenCreate(input: $input) {
				customerUserErrors {
					code
					field
					message
				}
				customerAccessToken {
					accessToken
					expiresAt
				}
			}
		}
	`;

	return (await graphQLClient.request(template, { input })) as {
		customerAccessTokenCreate: {
			customerAccessToken: {
				accessToken: string;
				expiresAt: string;
			};
			customerUserErrors: {
				// https://shopify.dev/docs/api/storefront/2023-04/enums/CustomerErrorCode
				code: TSHOPIFY_ERRORS_CODES;
				field: string[];
				message: string;
			}[];
		};
	};
};

const customerAccessTokenInputSchema = z.object({
	customerAccessToken: z.string()
});
const customerDataByAccessTokenQuery = async (
	input: z.infer<typeof customerAccessTokenInputSchema>
) => {
	// https://shopify.dev/docs/api/storefront/2023-04/objects/Customer
	const template = gql`
	query {
	customer(customerAccessToken: ${JSON.stringify(input.customerAccessToken)}) {
		id
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
		}
		
	}
}
 `;

	return (await graphQLClient.request(template)) as { customer: Customer };
};

const customerAccessTokenDeleteSchema = z.object({
	customerAccessToken: z.string()
});
const customerAccessTokenDeleteMutation = async (
	input: z.infer<typeof customerAccessTokenDeleteSchema>
) => {
	const template = gql`
		mutation customerAccessTokenDelete($customerAccessToken: String!) {
			customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
				deletedAccessToken
				deletedCustomerAccessTokenId
				userErrors {
					field
					message
				}
			}
		}
	`;

	return (await graphQLClient.request(template, input)) as {
		// customerAccessTokenCreate: {
		// customerAccessToken: {
		// 	customerAccessToken: string;
		// 	expiresAt: string;
		// };
		// customerUserErrors: {
		// 	// https://shopify.dev/docs/api/storefront/2023-04/enums/CustomerErrorCode
		// 	code: TSHOPIFY_ERRORS_CODES;
		// 	field: string[];
		// 	message: string;
		// }[];
		// };
	};
};

const customerCreateSchema = z.object({
	acceptsMarketing: z.boolean(),
	email: z.string().email(),
	phone: z.string().optional(),
	password: z.string().min(8),
	firstName: z.string().min(2),
	lastName: z.string().min(2)
});
const customerCreateMutation = async (
	input: z.infer<typeof customerCreateSchema>
) => {
	const template = gql`
		mutation customerCreate($input: CustomerCreateInput!) {
			customerCreate(input: $input) {
				customerUserErrors {
					code
					field
					message
				}
				customer {
					id
					firstName
					lastName
					acceptsMarketing
					defaultAddress {
						address1
						address2
						city
						company
						country
						province
						zip
					}
					createdAt
				}
			}
		}
	`;

	return (await graphQLClient.request(template, { input })) as {
		// customerAccessTokenCreate: {
		// customerAccessToken: {
		// 	customerAccessToken: string;
		// 	expiresAt: string;
		// };
		// customerUserErrors: {
		// 	// https://shopify.dev/docs/api/storefront/2023-04/enums/CustomerErrorCode
		// 	code: TSHOPIFY_ERRORS_CODES;
		// 	field: string[];
		// 	message: string;
		// }[];
		// };
	};
};

const auth = {
	mutation: {
		customer: {
			accessTokenCreate: customerAccessTokenCreateMutation,
			accessTokenDelete: customerAccessTokenDeleteMutation,
			create: customerCreateMutation
		}
	},
	query: { customer: { dataByAccessToken: customerDataByAccessTokenQuery } }
};

export default auth;
