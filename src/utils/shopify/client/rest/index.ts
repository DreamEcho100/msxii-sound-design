import '@shopify/shopify-api/adapters/node';
import { ApiVersion, shopifyApi } from '@shopify/shopify-api';
import { env } from 'process';

const shopifyRestClient = shopifyApi({
	// The next 4 values are typically read from environment variables for added security
	apiKey: env.SHOPIFY_API_KEY!,
	apiSecretKey: env.SHOPIFY_API_SECRET!,
	scopes: ['read_products'],
	hostName: 'msxii-sound.myshopify.com',
	apiVersion: ApiVersion.April23,
	isEmbeddedApp: false
});

export default shopifyRestClient;
