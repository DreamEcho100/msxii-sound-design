import { useCallback, useEffect, useMemo, useState } from "react";
import { useStore } from "zustand";
import {
  type BasicProduct,
  type Product,
  type BasicCollection,
  type Collection,
} from "~/libs/shopify/types";
import { allowedAdminEmails } from "~/server/libs/utils";
import { globalStore } from "./store";
import { filterBasicCollectionProductsByTitle } from "./utils";

export function useBasicCollectionsHandleFilterManager<
  TCollection extends Collection | BasicCollection,
>({
  collections,
  allProductsHandle,
}: {
  collections: TCollection[]; // NonNullable<HomeScreenProps['collectionsBasic']>;
  allProductsHandle?: boolean;
}) {
  const [selectedHandles, setSelectedHandles] = useState<string[]>(
    allProductsHandle ? ["all-products"] : [],
  );
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

  const getSelectedCollectionProduct = (
    collectionsByHandle: [string, TCollection[]][],
    selectedHandles?: string,
  ) => {
    if (!selectedHandles) return undefined;

    const filteredCollections: (Product | BasicProduct)[] = [];

    collectionsByHandle.forEach((collectionByHandle) => {
      if (collectionByHandle[0] !== selectedHandles) return;

      collectionByHandle[1].forEach((item) =>
        item.products.edges.map((edge) => filteredCollections.push(edge.node)),
      );
    });

    return filteredCollections.length === 0 ? undefined : filteredCollections;
  };

  return {
    collectionsByHandle,
    pagesCategories,
    selectedHandles,
    setSelectedHandles,
    collections,
    productTitleQuery,
    setProductTitleQuery,
    getSelectedCollectionProduct,
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
