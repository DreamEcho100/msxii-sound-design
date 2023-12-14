import {
  type BasicCollection,
  type Collection,
  type GetNodeFromEdge,
  type Edges,
  type TGetCollectionWithNoEdges,
} from "./types";

export const ACCESS_TOKEN_COOKIE_KEY = "customerAccessToken_";
export const CHECKOUT_ID_COOKIE_KEY = "customerCheckoutId_";

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

export function getCollectionWithNoEdges<
  TCollection extends Edges<BasicCollection> | Edges<Collection>,
>(
  collections: TCollection,
  options: {
    filterHandles: (handle: string) => boolean;
    filterCollectionWithEdge: (
      collectionWithEdgedProducts: GetNodeFromEdge<TCollection>,
    ) => boolean;
    withHandles?: undefined;
    withMappedHandle2Collection?: undefined;
  },
): TGetCollectionWithNoEdges<TCollection>[];
export function getCollectionWithNoEdges<
  TCollection extends Edges<BasicCollection> | Edges<Collection>,
>(
  collections: TCollection,
  options: {
    filterHandles: (handle: string) => boolean;
    filterCollectionWithEdge: (
      collectionWithEdgedProducts: GetNodeFromEdge<TCollection>,
    ) => boolean;
    withHandles: true;
  },
): {
  collectionsWithNoEdges: TGetCollectionWithNoEdges<TCollection>[];
  handles: string[];
};
export function getCollectionWithNoEdges<
  TCollection extends Edges<BasicCollection> | Edges<Collection>,
>(
  collectionsWithEdges: TCollection,
  options: {
    filterHandles: (handle: string) => boolean;
    filterCollectionWithEdge: (
      collectionWithEdgedProducts: GetNodeFromEdge<TCollection>,
    ) => boolean;
    withHandles?: boolean;
  },
) {
  type TCollectionWithNoEdges = TGetCollectionWithNoEdges<TCollection>;
  const collectionsWithNoEdges: TCollectionWithNoEdges[] = [];
  const handle2True: Record<string, true> = {};

  for (const collections of collectionsWithEdges.edges) {
    const collectionWithEdgedProducts = collections.node;

    if (typeof options.filterHandles === "function") {
      if (!options.filterHandles(collectionWithEdgedProducts.handle)) continue;
    }

    if (options?.withHandles) {
      handle2True[collectionWithEdgedProducts.handle] = true;
    }

    if (typeof options.filterCollectionWithEdge === "function") {
      if (
        !options.filterCollectionWithEdge(
          collectionWithEdgedProducts as GetNodeFromEdge<TCollection>,
        )
      )
        continue;
    }

    const collectionWithNoEdges = {
      ...collectionWithEdgedProducts,
      products: getEdgeNodes(collectionWithEdgedProducts.products),
    } as unknown as TCollectionWithNoEdges;

    collectionsWithNoEdges.push(collectionWithNoEdges);
  }

  if (options?.withHandles) {
    return {
      collectionsWithNoEdges,
      handles: Object.keys(handle2True),
    };
  }

  return collectionsWithNoEdges;
}
