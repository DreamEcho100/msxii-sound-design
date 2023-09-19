import { api } from "~/utils/api";
import InfiniteLoadCollectionProductsSection from "~/components/shared/core/InfiniteLoadCollectionProductsSection";
import { useMemo } from "react";

const Merch = () => {
  const input = useMemo(
    () => ({
      handle: "merch",
      limit: 50,
    }),
    []
  );
  const collectionQuery =
    api.shopify.collections.getOneByHandle.useInfiniteQuery(input);

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
