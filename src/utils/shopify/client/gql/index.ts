import auth from './auth';
import collections from './collections';
import products from './products';
import blogs from './blogs';

const shopifyGQLClient = {
	auth,
	collections,
	products,
	blogs
};

export default shopifyGQLClient;
