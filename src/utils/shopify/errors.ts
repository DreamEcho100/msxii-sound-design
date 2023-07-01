/**
 * [`CustomerErrorCode`](https://shopify.dev/docs/api/storefront/2023-04/enums/CustomerErrorCode) `version: 2023-04latest`
 * @description Possible error codes that can be returned by `CustomerUserError`.
 */
export const SHOPIFY_CUSTOMER_ERRORS_CODES_MAP = {
	/** Customer already enabled. */
	ALREADY_ENABLED: 'ALREADY_ENABLED',
	/** Input email contains an invalid domain name. */
	BAD_DOMAIN: 'BAD_DOMAIN',
	/** The input value is blank. */
	BLANK: 'BLANK',
	/** Input contains HTML tags. */
	CONTAINS_HTML_TAGS: 'CONTAINS_HTML_TAGS',
	/** Input contains URL. */
	CONTAINS_URL: 'CONTAINS_URL',
	/** Customer is disabled. */
	CUSTOMER_DISABLED: 'CUSTOMER_DISABLED',
	/** The input value is invalid. */
	INVALID: 'INVALID',
	/** Multipass token is not valid. */
	INVALID_MULTIPASS_REQUEST: 'INVALID_MULTIPASS_REQUEST',
	/** Address does not exist. */
	NOT_FOUND: 'NOT_FOUND',
	/** Input password starts or ends with whitespace. */
	PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE:
		'PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE',
	/** The input value is already taken. */
	TAKEN: 'TAKEN',
	/** Invalid activation token. */
	TOKEN_INVALID: 'TOKEN_INVALID',
	/** The input value is too long. */
	TOO_LONG: 'TOO_LONG',
	/** The input value is too short. */
	TOO_SHORT: 'TOO_SHORT',
	/** Unidentified customer. */
	UNIDENTIFIED_CUSTOMER: 'UNIDENTIFIED_CUSTOMER'
};

/**
 * [`CheckoutErrorCode`](https://shopify.dev/docs/api/storefront/2023-04/enums/CheckoutErrorCode) `version: 2023-04latest`
 * @description Possible error codes that can be returned by `CheckoutUserError`.
 */
export const SHOPIFY_CHECKOUT_ERRORS_CODES_MAP = {
	/** Checkout is already completed. */
	ALREADY_COMPLETED: 'ALREADY_COMPLETED',
	/** Input email contains an invalid domain name. */
	BAD_DOMAIN: 'BAD_DOMAIN',
	/** The input value is blank. */
	BLANK: 'BLANK',
	/** Cart does not meet discount requirements notice. */
	CART_DOES_NOT_MEET_DISCOUNT_REQUIREMENTS_NOTICE:
		'CART_DOES_NOT_MEET_DISCOUNT_REQUIREMENTS_NOTICE',
	/** Customer already used once per customer discount notice. */
	CUSTOMER_ALREADY_USED_ONCE_PER_CUSTOMER_DISCOUNT_NOTICE:
		'CUSTOMER_ALREADY_USED_ONCE_PER_CUSTOMER_DISCOUNT_NOTICE',
	/** Discount already applied. */
	DISCOUNT_ALREADY_APPLIED: 'DISCOUNT_ALREADY_APPLIED',
	/** Discount code isn't working right now. Please contact us for help. */
	DISCOUNT_CODE_APPLICATION_FAILED: 'DISCOUNT_CODE_APPLICATION_FAILED',
	/** Discount disabled. */
	DISCOUNT_DISABLED: 'DISCOUNT_DISABLED',
	/** Discount expired. */
	DISCOUNT_EXPIRED: 'DISCOUNT_EXPIRED',
	/** Discount limit reached. */
	DISCOUNT_LIMIT_REACHED: 'DISCOUNT_LIMIT_REACHED',
	/** Discount not found. */
	DISCOUNT_NOT_FOUND: 'DISCOUNT_NOT_FOUND',
	/** Checkout is already completed. */
	EMPTY: 'EMPTY',
	/** Queue token has expired. */
	EXPIRED_QUEUE_TOKEN: 'EXPIRED_QUEUE_TOKEN',
	/** Gift card has already been applied. */
	GIFT_CARD_ALREADY_APPLIED: 'GIFT_CARD_ALREADY_APPLIED',
	/** Gift card code is invalid. */
	GIFT_CARD_CODE_INVALID: 'GIFT_CARD_CODE_INVALID',
	/** Gift card currency does not match checkout currency. */
	GIFT_CARD_CURRENCY_MISMATCH: 'GIFT_CARD_CURRENCY_MISMATCH',
	/** Gift card has no funds left. */
	GIFT_CARD_DEPLETED: 'GIFT_CARD_DEPLETED',
	/** Gift card is disabled. */
	GIFT_CARD_DISABLED: 'GIFT_CARD_DISABLED',
	/** Gift card is expired. */
	GIFT_CARD_EXPIRED: 'GIFT_CARD_EXPIRED',
	/** Gift card was not found. */
	GIFT_CARD_NOT_FOUND: 'GIFT_CARD_NOT_FOUND',
	/** Gift card cannot be applied to a checkout that contains a gift card. */
	GIFT_CARD_UNUSABLE: 'GIFT_CARD_UNUSABLE',
	/** The input value should be greater than or equal to the minimum value allowed. */
	GREATER_THAN_OR_EQUAL_TO: 'GREATER_THAN_OR_EQUAL_TO',
	/** Higher value discount applied. */
	HIGHER_VALUE_DISCOUNT_APPLIED: 'HIGHER_VALUE_DISCOUNT_APPLIED',
	/** The input value is invalid. */
	INVALID: 'INVALID',
	/** Cannot specify country and presentment currency code. */
	INVALID_COUNTRY_AND_CURRENCY: 'INVALID_COUNTRY_AND_CURRENCY',
	/** Input Zip is invalid for country provided. */
	INVALID_FOR_COUNTRY: 'INVALID_FOR_COUNTRY',
	/** Input Zip is invalid for country and province provided. */
	INVALID_FOR_COUNTRY_AND_PROVINCE: 'INVALID_FOR_COUNTRY_AND_PROVINCE',
	/** Invalid province in country. */
	INVALID_PROVINCE_IN_COUNTRY: 'INVALID_PROVINCE_IN_COUNTRY',
	/** Queue token is invalid. */
	INVALID_QUEUE_TOKEN: 'INVALID_QUEUE_TOKEN',
	/** Invalid region in country. */
	INVALID_REGION_IN_COUNTRY: 'INVALID_REGION_IN_COUNTRY',
	/** Invalid state in country. */
	INVALID_STATE_IN_COUNTRY: 'INVALID_STATE_IN_COUNTRY',
	/** The input value should be less than the maximum value allowed. */
	LESS_THAN: 'LESS_THAN',
	/** The input value should be less than or equal to the maximum value allowed. */
	LESS_THAN_OR_EQUAL_TO: 'LESS_THAN_OR_EQUAL_TO',
	/** Line item was not found in checkout. */
	LINE_ITEM_NOT_FOUND: 'LINE_ITEM_NOT_FOUND',
	/** Checkout is locked. */
	LOCKED: 'LOCKED',
	/** Maximum number of discount codes limit reached. */
	MAXIMUM_DISCOUNT_CODE_LIMIT_REACHED: 'MAXIMUM_DISCOUNT_CODE_LIMIT_REACHED',
	/** Missing payment input. */
	MISSING_PAYMENT_INPUT: 'MISSING_PAYMENT_INPUT',
	/** Not enough in stock. */
	NOT_ENOUGH_IN_STOCK: 'NOT_ENOUGH_IN_STOCK',
	/** Input value is not supported. */
	NOT_SUPPORTED: 'NOT_SUPPORTED',
	/** The input value needs to be blank. */
	PRESENT: 'PRESENT',
	/** Product is not published for this customer. */
	PRODUCT_NOT_AVAILABLE: 'PRODUCT_NOT_AVAILABLE',
	/** Shipping rate expired. */
	SHIPPING_RATE_EXPIRED: 'SHIPPING_RATE_EXPIRED',
	/** Throttled during checkout. */
	THROTTLED_DURING_CHECKOUT: 'THROTTLED_DURING_CHECKOUT',
	/** The input value is too long. */
	TOO_LONG: 'TOO_LONG',
	/** The amount of the payment does not match the value to be paid. */
	TOTAL_PRICE_MISMATCH: 'TOTAL_PRICE_MISMATCH',
	/** Unable to apply discount. */
	UNABLE_TO_APPLY: 'UNABLE_TO_APPLY'
};
