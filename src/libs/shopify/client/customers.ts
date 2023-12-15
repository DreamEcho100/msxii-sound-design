import { gql } from "graphql-request";
import { z } from "zod";
import type {
  ShopifyCustomer,
  ShopifyErrorShape,
  SHOPIFY_CUSTOMER_ERRORS_CODES,
  ShopifyAddress,
} from "../types";
import { graphQLClient, customerGQLFields } from "./_utils";
import { TRPCError } from "@trpc/server";
import {
  customerAccessTokenCreateInputSchema,
  customerCreateAddressSchema,
  customerUpdateAddressSchema,
  customerUpdateSchema,
} from "~/libs/shopify/schema/customers";

const customerAccessTokenCreateInputSchema_ = z.object(
  customerAccessTokenCreateInputSchema,
);
const customerAccessTokenCreateMutation = async (
  input: z.infer<typeof customerAccessTokenCreateInputSchema_>,
) => {
  /**
   * @description [customerAccessTokenCreate](https://shopify.dev/docs/api/storefront/2023-10/mutations/customeraccesstokencreate)
   * Creates a customer access token.
   * The customer access token is required to modify the customer object in any way.
   *
   *  Requires `unauthenticated_write_customers` access scope.
   */
  const template = gql`
    mutation customerAccessTokenCreate(
      $input: CustomerAccessTokenCreateInput!
    ) {
      customerAccessTokenCreate(input: $input) {
        customerUserErrors {
          code
          field
          message
        }
        customerAccessToken {
          accessToken
          expiresAt
        }
      }
    }
  `;

  return await graphQLClient.request<{
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string;
        expiresAt: string;
      };
      customerUserErrors: ShopifyErrorShape<SHOPIFY_CUSTOMER_ERRORS_CODES>[];
    };
  }>(template, { input });
};

const customerAccessTokenInputSchema = z.object({
  customerAccessToken: z.string(),
});
const customerDataByAccessTokenQuery = async (
  input: z.infer<typeof customerAccessTokenInputSchema>,
) => {
  // https://shopify.dev/docs/api/storefront/2023-10/objects/Customer
  const template = gql`
	query {
	customer(customerAccessToken: ${JSON.stringify(input.customerAccessToken)}) {
		${customerGQLFields}
	}
}
 `;

  return await graphQLClient.request<{
    customer: ShopifyCustomer;
  }>(template);
};

const customerAccessTokenDeleteSchema = z.object({
  customerAccessToken: z.string(),
});
const customerAccessTokenDeleteMutation = async (
  input: z.infer<typeof customerAccessTokenDeleteSchema>,
) => {
  const template = gql`
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors {
          field
          message
        }
      }
    }
  `;

  return await graphQLClient.request<{
    // customerAccessTokenCreate: {
    // customerAccessToken: {
    // 	customerAccessToken: string;
    // 	expiresAt: string;
    // };
    // customerUserErrors: {
    // 	// https://shopify.dev/docs/api/storefront/2023-10/enums/CustomerErrorCode
    // 	code: TSHOPIFY_ERRORS_CODES;
    // 	field: string[];
    // 	message: string;
    // }[];
    // };
  }>(template, input);
};

const customerCreateSchema = z.object({
  acceptsMarketing: z.boolean(),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});
const customerCreateMutation = async (
  input: z.infer<typeof customerCreateSchema>,
) => {
  const template = gql`
		mutation customerCreate($input: CustomerCreateInput!) {
			customerCreate(input: $input) {
				customerUserErrors {
					code
					field
					message
				}
				customer { ${customerGQLFields} }
			}
		}
	`;

  return await graphQLClient.request<{
    customerCreate: {
      customer: ShopifyCustomer;
      customerUserErrors: ShopifyErrorShape<SHOPIFY_CUSTOMER_ERRORS_CODES>[];
    };
  }>(template, { input });
};

const customerUpdateSchema_ = z.object(customerUpdateSchema);
const customerUpdateMutation = async (
  input: z.infer<typeof customerUpdateSchema_>,
  customerAccessToken: string,
) => {
  const customerFields: string[] = [];

  Object.entries(input).forEach((item) => {
    if (typeof item[1] !== "undefined") customerFields.push(item[0]);
  });

  if (customerFields.length === 0) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }

  const template = gql`
		mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
			customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
				customer {
					${customerFields.join("\n")}
				}
				customerAccessToken {
					accessToken
					expiresAt
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}
	`;

  return await graphQLClient.request<{
    customerUpdate: {
      customer: ShopifyCustomer;
      customerAccessToken: {
        accessToken: string;
        expiresAt: string;
      };
      customerUserErrors: ShopifyErrorShape<SHOPIFY_CUSTOMER_ERRORS_CODES>[];
    };
  }>(template, {
    customerAccessToken,
    customer: input,
  });
};

const customerCreateAddressSchema_ = z.object(customerCreateAddressSchema);
// https://shopify.dev/docs/api/storefront/2023-10/mutations/customerAddressCreate
const customerCreateAddressMutation = async (
  input: z.infer<typeof customerCreateAddressSchema_>,
  customerAccessToken: string,
) => {
  const addressFieldsKeys: string[] = [];

  Object.entries(input).forEach((item) => {
    if (typeof item[1] !== "undefined") {
      addressFieldsKeys.push(item[0]);
    }
  });

  if (addressFieldsKeys.length === 0) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }

  const template = gql`
	mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
		customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
			customerAddress {
					${addressFieldsKeys.join("\n")}
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}
	`;

  return await graphQLClient.request<{
    customerAddress: {
      customerAddress: ShopifyAddress;
      customerUserErrors: ShopifyErrorShape<SHOPIFY_CUSTOMER_ERRORS_CODES>[];
    };
  }>(template, {
    customerAccessToken,
    address: input,
  });
};

const customerUpdateAddressSchema_ = z.object(customerUpdateAddressSchema);
// https://shopify.dev/docs/api/storefront/2023-10/mutations/customerAddressUpdate
const customerUpdateAddressMutation = async (
  input: z.infer<typeof customerUpdateAddressSchema_>,
  customerAccessToken: string,
) => {
  const addressFieldsKeys: string[] = [];
  const address: Record<string, unknown> = {};

  Object.entries(input).forEach((item) => {
    if (item[0] === "id") return;

    if (typeof item[1] !== "undefined") {
      addressFieldsKeys.push(item[0]);
      address[item[0]] = item[1];
    }
  });

  if (addressFieldsKeys.length === 0) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }

  const template = gql`
	mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
		customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
					${addressFieldsKeys.join("\n")}
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}
	`;

  return await graphQLClient.request<{
    customerAddress: {
      customerAddress: ShopifyAddress;
      customerUserErrors: ShopifyErrorShape<SHOPIFY_CUSTOMER_ERRORS_CODES>[];
    };
  }>(template, {
    customerAccessToken,
    address,
    id: input.id,
  });
};

export const customerDeleteAddressSchema = {
  id: z.string(),
};
const customerDeleteAddressSchema_ = z.object(customerDeleteAddressSchema);
// https://shopify.dev/docs/api/storefront/2023-10/mutations/customerAddressDelete
const customerDeleteAddressMutation = async (
  input: z.infer<typeof customerDeleteAddressSchema_>,
  customerAccessToken: string,
) => {
  const customerFields: string[] = [];

  Object.entries(input).forEach((item) => {
    if (typeof item[1] !== "undefined") customerFields.push(item[0]);
  });

  if (customerFields.length === 0) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }

  const template = gql`
    mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(
        customerAccessToken: $customerAccessToken
        id: $id
      ) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  return await graphQLClient.request<{
    customerAddress: {
      deletedCustomerAddressId: string;
      customerUserErrors: ShopifyErrorShape<SHOPIFY_CUSTOMER_ERRORS_CODES>[];
    };
  }>(template, {
    customerAccessToken,
    id: input.id,
  });
};

const customers = {
  mutations: {
    createAccessToken: customerAccessTokenCreateMutation,
    deleteAccessToken: customerAccessTokenDeleteMutation,
    create: customerCreateMutation,
    update: customerUpdateMutation,
    createAddress: customerCreateAddressMutation,
    updateAddress: customerUpdateAddressMutation,
    deleteAddress: customerDeleteAddressMutation,
    // ???
    // https://shopify.dev/docs/api/storefront/2023-10/mutations/customerDefaultAddressUpdate
  },
  queries: {
    dataByAccessToken: customerDataByAccessTokenQuery,
  },
};

export default customers;
