import { GraphQLClient } from 'graphql-request';
import { env } from '~/env.mjs';

export const ACCESS_TOKEN_KEY = 'customerAccessToken';

export const graphQLClient = new GraphQLClient(env.SHOPIFY_STORE_URL, {
	headers: {
		'X-Shopify-Storefront-Access-Token': env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN
	}
});
