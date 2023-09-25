"use client";
import { BasicProductCard } from "../../../../components/core/Shopify/Cards/Card";
import Clickable from "../../../../components/core/Clickable";
import Head from "next/head";
import SectionPrimaryLoader from "../../../../components/common/Loaders/SectionPrimary";
import SectionLoaderContainer from "../../../../components/common/LoadersContainers/Section";
import { type RouterInputs, type RouterOutputs } from "~/server/api/root";
import { trpcApi } from "~/app/libs/trpc/client";
type Props = {
  baseInput: RouterInputs["shopify"]["products"]["getManyBasic"];
  baseData?: RouterOutputs["shopify"]["products"]["getManyBasic"];
};

export default function InfiniteLoadBasicProducts(props: Props) {
  const dataQuery = trpcApi.shopify.products.getManyBasic.useInfiniteQuery(
    props.baseInput,
    {
      initialData: props.baseData && {
        pageParams: [undefined],
        pages: [props.baseData],
      },
      keepPreviousData: !!props.baseData,
      getNextPageParam: (data) => data.nextCursor,
    },
  );

  if (dataQuery.isLoading)
    return (
      <SectionLoaderContainer>
        <SectionPrimaryLoader />
      </SectionLoaderContainer>
    );

  if (dataQuery.isError) return <>{dataQuery.error.message}</>;

  const loadNextPage = async () => {
    if (!dataQuery.hasNextPage || dataQuery.isFetchingNextPage) return;

    await dataQuery.fetchNextPage();
  };

  const productsData = dataQuery.data.pages
    .map((page) => page.items.edges.map((item) => item.node))
    .flat();

  return (
    <section className="flex flex-col gap-8 px-8">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-8 lg:flex-nowrap lg:justify-between">
        {productsData.map((item, itemIndex) => (
          <BasicProductCard
            key={item.id}
            item={item}
            containerVariants={{ w: null }}
            imgPriority={itemIndex < 8}
          />
        ))}
      </div>
      {dataQuery.hasNextPage && (
        <Clickable
          variants={{ w: "full", rounded: null }}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => await loadNextPage()}
          disabled={!dataQuery.hasNextPage || dataQuery.isFetchingNextPage}
        >
          load more
        </Clickable>
      )}
    </section>
  );
}
