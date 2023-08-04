import { api } from "~/utils/api";
import InfiniteLoadCollectionProductsSection from "~/components/shared/core/InfiniteLoadCollectionProductsSection";
import Head from "next/head";
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

  const firstItem =
    collectionQuery.data?.pages[collectionQuery.data.pages.length - 1]?.items[0]
      ?.node;

  return (
    <>
      <Head>
        <title>{firstItem?.title ?? "Blue Label"}</title>
        {firstItem && (
          <meta name="description" content={firstItem.description} />
        )}
      </Head>
      <div
        className="grid justify-items-center gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
        }}
      >
        <InfiniteLoadCollectionProductsSection
          infiniteQuery={collectionQuery}
          input={input}
        />
      </div>
    </>
  );
};
export default BlueLabel;
