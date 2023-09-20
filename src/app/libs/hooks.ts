import { useEffect, useMemo, useState } from "react";
import { useStore } from "zustand";
import { type BasicCollection, type Collection } from "~/libs/shopify/types";
import { allowedAdminEmails } from "~/server/libs/utils";
import { globalStore } from "./store";
import { filterBasicCollectionProductsByTitle } from "./utils";

export function useBasicCollectionsHandleFilterManager<
  TCollection extends Collection | BasicCollection,
>({
  collections,
}: {
  collections: TCollection[]; // NonNullable<HomeScreenProps['collectionsBasic']>;
}) {
  const [selectedHandles, setSelectedHandles] = useState<string[]>([]);
  const [productTitleQuery, setProductTitleQuery] = useState<
    string | undefined
  >(undefined);

  const { collectionsByHandle, pagesCategories } = useMemo(() => {
    const collectionsHandleMap: Record<string, TCollection[]> = {};

    collections.forEach((collection) => {
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
  }, [collections, productTitleQuery]);

  return {
    collectionsByHandle,
    pagesCategories,
    selectedHandles,
    setSelectedHandles,
    collections,
    productTitleQuery,
    setProductTitleQuery,
  };
}

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return isMounted;
}

export function useCheckIsAdmin() {
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
}
