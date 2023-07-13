import { getShopifyClient } from './_utils';

const getOneCheckoutByIdGQLQuery = async () => {
	return await getShopifyClient().checkout.fetch(
		'gid://shopify/Checkout/a5033bfa016933b1d6313a5f079c4050?key=c92f2c8b1e368e75dcfe2f21a89755b3',
	);
};

const checkout = {
	queries: {
		getOne: getOneCheckoutByIdGQLQuery,
	},
};

export default checkout;
