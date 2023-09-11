import { useEffect, useMemo, useState } from "react";
import {
  type BasicCollection,
  type Collection,
  type Edges,
} from "./shopify/types";
import { useStore } from "zustand";
import { globalStore } from "~/store";
import { allowedAdminEmails } from ".";

export const getEdgeNodes = <Data,>(item: Edges<Data>) =>
  item.edges.map(({ node }) => node);
export const useGetEdgeNodes = <Data,>(item: Edges<Data>) => getEdgeNodes(item);

const filterBasicCollectionProductsByTitle = <
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
export const useBasicCollectionsHandleFilterManager = <
  TCollection extends Collection | BasicCollection,
>({
  collectionsEdges,
  handleToCollectionToIgnoreMap,
}: {
  collectionsEdges: Edges<TCollection>; // NonNullable<HomeScreenProps['collectionsBasic']>;
  handleToCollectionToIgnoreMap?: Record<string, true>;
}) => {
  const [selectedHandles, setSelectedHandles] = useState<string[]>([]);
  const [productTitleQuery, setProductTitleQuery] = useState<
    string | undefined
  >(undefined);

  const flattenedCollectionsEdges =
    useGetEdgeNodes<TCollection>(collectionsEdges);
  const { collectionsByHandle, pagesCategories } = useMemo(() => {
    const collectionsHandleMap: Record<string, TCollection[]> = {};

    flattenedCollectionsEdges.forEach((collection) => {
      if (handleToCollectionToIgnoreMap?.[collection.handle]) return;
      const _collection = productTitleQuery
        ? filterBasicCollectionProductsByTitle(collection, productTitleQuery)
        : collection;

      if (_collection.products.edges.length === 0) return;

      if (
        collectionsHandleMap[collection.handle] &&
        Array.isArray(collectionsHandleMap[collection.handle])
      ) {
        collectionsHandleMap[collection.handle]?.push(_collection);
      } else {
        collectionsHandleMap[collection.handle] = [_collection];
      }
    });

    const collectionsByHandle = Object.entries(collectionsHandleMap);
    const pagesCategories = collectionsByHandle
      .map((collectionByHandle) => collectionByHandle[0])
      .sort((a, b) => (a < b ? -1 : 1));
    return {
      collectionsByHandle,
      pagesCategories,
    };
  }, [
    flattenedCollectionsEdges,
    handleToCollectionToIgnoreMap,
    productTitleQuery,
  ]);

  return {
    collectionsByHandle,
    pagesCategories,
    selectedHandles,
    setSelectedHandles,
    flattenedCollectionsEdges,
    productTitleQuery,
    setProductTitleQuery,
  };
};

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return isMounted;
};

export const useCheckIsAdmin = () => {
  const customerStatus = useStore(
    globalStore,
    (state) => state.authSession.status,
  );
  const customerEmail = useStore(
    globalStore,
    (state) => state.authSession.data?.email,
  );

  const isAdmin =
    customerStatus === "authenticated" &&
    customerEmail &&
    allowedAdminEmails.includes(customerEmail);

  return {
    customerStatus,
    isAdmin,
  };
};
