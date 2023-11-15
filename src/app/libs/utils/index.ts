import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  type BasicCollection,
  type Collection,
  type Edges,
} from "~/libs/shopify/types";
import { getEdgeNodes } from "~/libs/shopify";
import type { ClassValue } from "class-variance-authority/types";

export const useGetEdgeNodes = <Data>(item: Edges<Data>) => getEdgeNodes(item);

export const filterBasicCollectionProductsByTitle = <
  TCollection extends Collection | BasicCollection,
>(
  collection: TCollection,
  q: string,
) => {
  return {
    ...collection,
    products: {
      edges: (
        collection.products.edges as {
          node: { title: string };
        }[]
      ).filter(
        ({ node }) => node.title.toLowerCase().search(q.toLowerCase()) !== -1,
      ),
    },
  };
};

/**
 * Combines multiple class names into a single string.
 *
 * @param {...import("clsx").ClassValue} inputs - The class names to combine.
 * @returns {string} - The combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
