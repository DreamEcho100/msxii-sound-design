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

  return (
    <>
      <Head>
        <title>Blue Label</title>
        {/* <meta name="description" content={collectionData.description} /> */}
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
