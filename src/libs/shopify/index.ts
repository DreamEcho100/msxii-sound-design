import { type Edges } from "./types";

export const ACCESS_TOKEN_COOKIE_KEY = "customerAccessToken";
export const CHECKOUT_ID_COOKIE_KEY = "customerCheckoutId";

export const formatPrice = (
  price: number | bigint,
  currency: string,
  isMounted = true,
) =>
  new Intl.NumberFormat(
    !isMounted || typeof navigator === "undefined"
      ? "en-US" // 'en-GB'
      : navigator.language,
    { style: "currency", currency },
  ).format(price);

export const getEdgeNodes = <Data>(item: Edges<Data>) =>
  item.edges.map(({ node }) => node);
