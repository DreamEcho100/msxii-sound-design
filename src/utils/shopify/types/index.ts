import { SHOPIFY_ERRORS_CODES_MAP } from '../errors';

export type TSHOPIFY_ERRORS_CODES = keyof typeof SHOPIFY_ERRORS_CODES_MAP;

export type Edges<Node> = { edges: { node: Node }[] };
export type EdgesWithPagination<Node> = {
	edges: { cursor: string; node: Node }[];
	pageInfo: {
		hasNextPage: boolean;
		hasPreviousPage: boolean;
	};
};

export type ShopifyError = {
	// https://shopify.dev/docs/api/storefront/2023-04/enums/CustomerErrorCode
	code: TSHOPIFY_ERRORS_CODES;
	field: string[];
	message: string;
};

export interface Customer {
	id: string;
	firstName: string;
	lastName: string;
	acceptsMarketing: boolean;
	email: string;
	phone: string | null;
	createdAt: string;
	updatedAt: string;
	defaultAddress: {
		id: string;
		address1: string | null;
		address2: string | null;
		city: string | null;
		company: string | null;
		country: string;
		zip: string | null;
		province: string | null;
		phone: string | null;
	};
	addresses: Edges<{
		id: string;
		address1: string | null;
		address2: string | null;
		city: string | null;
		company: string | null;
		country: string;
		firstName: string;
		lastName: string;
		province: string | null;
		zip: string | null;
		phone: string | null;
	}>;
	orders: Edges<any>;
}

export type ShopifyImage = {
	id: string;
	src: string;
	url: string;
	altText?: string;
	width: number;
	height: number;
};
// https://shopify.dev/docs/api/storefront/2023-04/objects/MoneyV2
export type ShopifyMoneyV2 = {
	amount: string;
	currencyCode: string;
};

export type ShopifyProductVariant = {
	id: string;
	title: string;
	image: ShopifyImage;
	price: ShopifyMoneyV2;
	compareAtPrice?: ShopifyMoneyV2;
};

export type Product = {
	id: string;
	title: string;
	availableForSale: boolean;
	description: string;
	descriptionHtml: string;
	vendor: string;
	publishedAt: string;
	onlineStoreUrl?: string;
	productType: string;
	handle: string;
	featuredImage: ShopifyImage;
	priceRange: {
		maxVariantPrice: ShopifyMoneyV2;
		minVariantPrice: ShopifyMoneyV2;
	};
	compareAtPriceRange: {
		maxVariantPrice: ShopifyMoneyV2;
		minVariantPrice: ShopifyMoneyV2;
	};
	images: Edges<ShopifyImage>;
	variants: Edges<ShopifyProductVariant>;
};
export type BasicProduct = {
	id: string;
	title: string;
	availableForSale: boolean;
	description: string;
	vendor: string;
	publishedAt: string;
	onlineStoreUrl?: string;
	productType: string;
	handle: string;
	featuredImage: ShopifyImage;

	priceRange: {
		maxVariantPrice: {
			amount: '369.99';
			currencyCode: 'USD';
		};
		minVariantPrice: {
			amount: '369.99';
			currencyCode: 'USD';
		};
	};
	compareAtPriceRange: {
		maxVariantPrice: {
			amount: '437.84';
			currencyCode: 'USD';
		};
		minVariantPrice: {
			amount: '437.84';
			currencyCode: 'USD';
		};
	};
	images: Edges<ShopifyImage>;
	variants: Edges<ShopifyProductVariant>;
};

export type Collection = {
	description: string;
	descriptionHtml: string;
	handle: string;
	id: string;
	onlineStoreUrl: string;
	title: string;
	updatedAt: string;
	products: Edges<Product>;
};

export type BasicCollection = {
	description: string;
	descriptionHtml: string;
	handle: string;
	id: string;
	onlineStoreUrl: string;
	title: string;
	updatedAt: string;
	products: Edges<BasicProduct>;
};

export type BasicArticle = {
	handle: string;
	id: string;
	onlineStoreUrl: string;
	excerpt: string;
	excerptHtml: string;
	title: string;
	publishedAt: string;
	tags: string[];
	image: {
		id: string;
		src: string;
		url: string;
		altText: null;
		width: number;
		height: number;
	};
	authorV2: {
		bio: string;
		email: string;
		firstName: string;
		lastName: string;
		name: string;
	};
	blog: {
		id: string;
		handle: string;
		title: string;
	};
};
export type Article = {
	handle: string;
	id: string;
	onlineStoreUrl: string;
	content: string;
	contentHtml: string;
	excerpt: string;
	excerptHtml: string;
	title: string;
	publishedAt: string;
	tags: string[];
	image: {
		id: string;
		src: string;
		url: string;
		altText: null;
		width: number;
		height: number;
	};
	seo: {
		title: string | null;
		description: string | null;
	};
	authorV2: {
		bio: string;
		email: string;
		firstName: string;
		lastName: string;
		name: string;
	};
	blog: {
		id: string;
		handle: string;
		title: string;
	};
};
