"use client";
import { useMemo } from "react";
import { trpcApi } from "~/app/libs/trpc/client";
import InfiniteLoadCollectionProductsSection from "../../InfiniteLoadCollectionProductsSection";

const Merch = () => {
  const input = useMemo(
    () => ({
      handle: "merch",
      limit: 50,
    }),
    [],
  );
  const collectionQuery =
    trpcApi.shopify.collections.getOneByHandle.useInfiniteQuery(input);

  return (
    <div className="flex flex-col gap-8">
      <InfiniteLoadCollectionProductsSection
        infiniteQuery={collectionQuery}
        input={input}
      />
    </div>
  );
};
export default Merch;
