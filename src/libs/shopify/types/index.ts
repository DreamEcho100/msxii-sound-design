import {
  type SHOPIFY_CHECKOUT_ERRORS_CODES_MAP,
  type SHOPIFY_CUSTOMER_ERRORS_CODES_MAP,
} from "../errors";

export type SHOPIFY_CUSTOMER_ERRORS_CODES =
  keyof typeof SHOPIFY_CUSTOMER_ERRORS_CODES_MAP;

export type SHOPIFY_CHECKOUT_ERRORS_CODES =
  keyof typeof SHOPIFY_CHECKOUT_ERRORS_CODES_MAP;

export type Edges<Node> = { edges: { node: Node }[] };
export type EdgesWithPagination<Node> = {
  edges: { cursor: string; node: Node }[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type GetNodeFromEdge<TEdges> = TEdges extends Edges<infer Node>
  ? Node
  : never;

export type ShopifyErrorShape<ErrorCodes> = {
  // https://shopify.dev/docs/api/storefront/2023-10/enums/CustomerErrorCode
  code: ErrorCodes;
  field: string[];
  message: string;
};

export interface ShopifyLineItemVariant {
  id: string;
  image: ShopifyImage;
  price: ShopifyMoneyV2;
  product: {
    id: string;
    handle: string;
    title: string;
    totalInventory: number;
    availableForSale: boolean;
    description: string;
    images: Edges<ShopifyImage>;
    updatedAt: string;
    createdAt: string;
  };
  quantityAvailable: number;
  title: string;
}

export interface ShopifyLineItem {
  currentQuantity: number;
  quantity: number;
  title: string;
  originalTotalPrice: ShopifyMoneyV2;
  variant: ShopifyLineItemVariant;
}

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  email: string;
  name: string;
  phone?: string;
  cancelReason?: string;
  canceledAt?: string;
  edited: boolean;
  financialStatus: string;
  fulfillmentStatus: string;
  statusUrl: string;
  totalPrice: ShopifyMoneyV2;
  totalShippingPrice: ShopifyMoneyV2;
  totalTax: ShopifyMoneyV2;
  totalRefunded: ShopifyMoneyV2;
  lineItems: Edges<ShopifyLineItem>;
  processedAt: string;
}

type CountryCode = string;
export interface ShopifyAddress {
  id: string;
  formatted: string;
  address1?: string;
  address2?: string;
  city?: string;
  company?: string;
  country?: string;
  countryCodeV2?: CountryCode;
  firstName?: string;
  formattedArea?: string[];
  lastName?: string;
  latitude?: number;
  longitude?: number;
  name?: string;
  phone?: string;
  province?: string;
  provinceCode?: string;
  zip?: string;
}
export interface ShopifyCustomer {
  id: string;
  firstName: string;
  lastName: string;
  acceptsMarketing: boolean;
  email: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  defaultAddress: ShopifyAddress;
  addresses: Edges<ShopifyAddress>;
  orders: Edges<ShopifyOrder>;
}

export type ShopifyImage = {
  id: string;
  // src: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
};
export type ShopifySEO = {
  title: string | null;
  description: string | null;
};
// https://shopify.dev/docs/api/storefront/2023-10/objects/MoneyV2
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
  //
  availableForSale: boolean;
  quantityAvailable?: number;
  requiresShipping: boolean;
  sku?: string;
  barcode?: string;
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
      amount: string;
      currencyCode: string;
    };
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    minVariantPrice: {
      amount: string;
      currencyCode: string;
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

export type CollectionWithPgProducts = {
  description: string;
  descriptionHtml: string;
  handle: string;
  id: string;
  onlineStoreUrl: string;
  title: string;
  updatedAt: string;
  products: EdgesWithPagination<Product>;
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

export type BasicCollectionWithNoEdges = Omit<BasicCollection, "products"> & {
  products: BasicProduct[];
};

export type TGetCollectionWithNoEdges<
  TCollection extends Edges<BasicCollection> | Edges<Collection>,
> = Omit<GetNodeFromEdge<TCollection>, "products"> & {
  products: GetNodeFromEdge<GetNodeFromEdge<TCollection>["products"]>[];
};

export type BasicArticle = {
  handle: string;
  id: string;
  onlineStoreUrl: string;
  excerpt: string;
  title: string;
  publishedAt: string;
  tags: string[];
  image: ShopifyImage;
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
  image: ShopifyImage;
  seo: ShopifySEO;
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

export type Checkout = {
  //
  id: string;
};
