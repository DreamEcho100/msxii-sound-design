/**
 * [`CustomerErrorCode`](https://shopify.dev/docs/api/storefront/2023-04/enums/CustomerErrorCode) `version: 2023-04latest`
 * @description Possible error codes that can be returned by CustomerUserError.
 */
export const SHOPIFY_ERRORS_CODES_MAP = {
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
