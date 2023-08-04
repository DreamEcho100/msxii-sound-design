import { api } from "~/utils/api";
import InfiniteLoadCollectionProductsSection from "~/components/shared/core/InfiniteLoadCollectionProductsSection";
import { useMemo } from "react";

const BlueLabel = () => {
  const input = useMemo(
    () => ({
      handle: "blue-label",
      limit: 50,
    }),
    []
  );
  const collectionQuery =
    api.shopify.collections.getOneByHandle.useInfiniteQuery(input);

  return (
    <div className="flex flex-col">
      <InfiniteLoadCollectionProductsSection
        infiniteQuery={collectionQuery}
        input={input}
      />
    </div>
  );
};
export default BlueLabel;
