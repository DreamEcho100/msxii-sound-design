import shopifyGQLClient from './gql';
import shopifyRestClient from './rest';

export const shopify = {
	gqlClient: shopifyGQLClient,
	restClient: shopifyRestClient
};

export default shopify;
