"use client";
import { BasicProductCard } from "./Shopify/Cards/Card";
import Clickable from "./Clickable";
import Head from "next/head";
import SectionPrimaryLoader from "../common/Loaders/SectionPrimary";
import SectionLoaderContainer from "../common/LoadersContainers/Section";
import { type RouterInputs, type RouterOutputs } from "~/server/api/root";
import { trpcApi } from "~/app/libs/trpc/client";
type Props = {
  baseInput: RouterInputs["shopify"]["collections"]["getOneByHandle"];
  profileData?: RouterOutputs["shopify"]["collections"]["getOneByHandle"];
};

const InfiniteLoadCollectionProductsSection = (props: Props) => {
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
    .map((page) => page.item.products.edges.map((item) => item.node))
    .flat();

  const profileData =
    dataQuery.data.pages[dataQuery.data.pages.length - 1].item ??
    props.profileData?.item;

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
            product={item}
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
    </>
  );
};

export default InfiniteLoadCollectionProductsSection;
