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

export const getEdgeNodes = <Data>(
  item: Edges<Data>,
  skipCB?: (item: Data, index: number, arr: { node: Data }[]) => boolean,
) => {
  const data: Data[] = [];
  item.edges.forEach(({ node }, index, arr) => {
    if (typeof skipCB === "function") {
      if (skipCB(node, index, arr)) return;
    }

    data.push(node);
  });

  return data;
};
