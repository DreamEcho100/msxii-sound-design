import {
  type BasicCollection,
  type Collection,
  type Edges,
} from "~/libs/shopify/types";
import { getEdgeNodes } from "~/libs/shopify";

export const useGetEdgeNodes = <Data>(item: Edges<Data>) => getEdgeNodes(item);

export const filterBasicCollectionProductsByTitle = <
  TCollection extends Collection | BasicCollection,
>(
  collection: TCollection,
  productTitleQuery: string,
) => {
  return {
    ...collection,
    products: {
      edges: (
        collection.products.edges as {
          node: { title: string };
        }[]
      ).filter(
        ({ node }) =>
          node.title.toLowerCase().search(productTitleQuery.toLowerCase()) !==
          -1,
      ),
    },
  };
};
