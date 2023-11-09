"use client";
import { BasicProductCard } from "./Shopify/Cards/Card";
import Clickable from "./Clickable";
import Head from "next/head";
import { type RouterInputs, type RouterOutputs } from "~/server/api/root";
import { trpcApi } from "~/app/libs/trpc/client";
import LoadingSection from "~/app/(site)/dashboard/LoadingSection";

type Props = {
  baseInput: RouterInputs["shopify"]["collections"]["getOneByHandle"];
  profileData?: RouterOutputs["shopify"]["collections"]["getOneByHandle"];
};

export default function InfiniteLoadCollectionProductsSection(props: Props) {
  const dataQuery = trpcApi.shopify.collections.getOneByHandle.useInfiniteQuery(
    props.baseInput,
    {
      initialData: props.profileData && {
        pageParams: [undefined],
        pages: [props.profileData],
      },
      keepPreviousData: !!props.profileData,
      getNextPageParam: (data) => data.nextCursor,
    },
  );

  const loadNextPg = async () => {
    if (!dataQuery.hasNextPage || dataQuery.isFetchingNextPage) return;

    await dataQuery.fetchNextPage();
  };

  if (dataQuery.isLoading) return <LoadingSection />;
  if (dataQuery.isError) return <>{dataQuery.error.message}</>;

  const productsData = dataQuery.data.pages
    .map((page) => page.items.products.edges.map((item) => item.node))
    .flat();

  const profileData =
    dataQuery.data.pages[dataQuery.data.pages.length - 1].items ??
    props.profileData?.items;

  return (
    <>
      <Head>
        <title>
          {profileData?.title ??
            props.baseInput.handle
              .split("-")
              .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
              .join(" ")}
        </title>
        {profileData?.description && (
          <meta name="description" content={profileData.description} />
        )}
      </Head>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-8 lg:flex-nowrap lg:justify-between">
        {productsData.map((item, itemIndex) => (
          <BasicProductCard
            key={item.handle}
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
          onClick={async () => await loadNextPg()}
          disabled={!dataQuery.hasNextPage || dataQuery.isFetchingNextPage}
        >
          load more
        </Clickable>
      )}
    </>
  );
}
