"use client";
import { useMemo } from "react";
import InfiniteLoadCollectionProductsSection from "../../InfiniteLoadCollectionProductsSection";
import { trpcApi } from "~/app/libs/trpc/client";

export default function BlueLabel() {
  const input = useMemo(
    () => ({
      handle: "blue-label",
      limit: 50,
    }),
    [],
  );
  const collectionQuery =
    trpcApi.shopify.collections.getOneByHandle.useInfiniteQuery(input);

  return (
    <div className="flex flex-col">
      <InfiniteLoadCollectionProductsSection
        infiniteQuery={collectionQuery}
        input={input}
      />
    </div>
  );
}
