import { SHOPIFY_ERRORS_CODES_MAP } from '../errors';

export type TSHOPIFY_ERRORS_CODES = keyof typeof SHOPIFY_ERRORS_CODES_MAP;

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
	addresses: {
		edges: {
			node: {
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
			};
		}[];
	};
	orders: {
		edges: any[];
	};
}
