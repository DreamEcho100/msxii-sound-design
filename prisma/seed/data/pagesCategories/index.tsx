// import { createId } from '@paralleldrive/cuid2';

// NOTICE: The counter is set manually.
export const iosAppPagesPageCategory = {
	id: 'j9tcino1tb4i6z51tpnjho9g',
	name: 'ios-apps' as const,
	counter: 5,
	hasSubPages: true,
	isAPage: true,
};
export const aboutPageCategory = {
	id: 'olr0j2np96eoydnmmt77vcxo',
	name: 'about' as const,
	counter: 1,
	hasSubPages: false,
	isAPage: true,
};
export const supportPageCategory = {
	id: 'r1s8ys9l2zxhukai30mnyx89',
	name: 'support' as const,
	counter: 1,
	hasSubPages: false,
	isAPage: true,
};
export const policiesPageCategory = {
	id: 'lnlog3gquw4s612c9ctypcq6',
	name: 'policies' as const,
	counter: 1,
	hasSubPages: true,
	isAPage: true,
};
export const merchPageCategory = {
	id: 'bkn7jft2ecnpt9ih8o05zpuv',
	name: 'merch' as const,
	counter: 1,
	hasSubPages: false,
	isAPage: true,
};
export const blueLabelPageCategory = {
	id: 'gymm72pshbbv47oezq4lm3sa',
	name: 'blue-label' as const,
	counter: 1,
	hasSubPages: false,
	isAPage: true,
};
export const productsPageCategory = {
	id: 'jxhw3jtc4opuu0eg4y7nb07l',
	name: 'products' as const,
	counter: 1,
	hasSubPages: true,
	isAPage: true,
};

const pagesCategories = [
	...new Set([
		iosAppPagesPageCategory,
		aboutPageCategory,
		supportPageCategory,
		policiesPageCategory,
		merchPageCategory,
		blueLabelPageCategory,
		productsPageCategory,
	]),
];

export default pagesCategories;

// ('merch-page');
// ('merch-page');
