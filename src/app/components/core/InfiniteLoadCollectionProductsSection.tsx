"use client";
import { type UseInfiniteQueryResult } from "@tanstack/react-query";
import { BasicProductCard } from "./Shopify/Cards/Card";
import Clickable from "./Clickable";
import Head from "next/head";
import SectionPrimaryLoader from "../common/Loaders/SectionPrimary";
import SectionLoaderContainer from "../common/LoadersContainers/Section";
import { type RouterInputs, type RouterOutputs } from "~/server/api/root";
type Props = {
  input: RouterInputs["shopify"]["collections"]["getOneByHandle"];
  infiniteQuery: UseInfiniteQueryResult<
    RouterOutputs["shopify"]["collections"]["getOneByHandle"],
    { message: string }
  >;
};

const InfiniteLoadCollectionProductsSection = (props: Props) => {
  if (props.infiniteQuery.isLoading)
    return (
      <SectionLoaderContainer>
        <SectionPrimaryLoader />
      </SectionLoaderContainer>
    );

  if (props.infiniteQuery.isError)
    return <>{props.infiniteQuery.error.message}</>;

  const loadNextPage = async () => {
    if (
      !props.infiniteQuery.hasNextPage ||
      props.infiniteQuery.isFetchingNextPage
    )
      return;

    await props.infiniteQuery.fetchNextPage();
  };

  const productsData = props.infiniteQuery.data.pages
    .map((page) => page.items.map((item) => item.node))
    .flat();

  const firstItem = productsData?.[productsData.length - 1];

  return (
    <>
      <Head>
        <title>
          {firstItem?.title ??
            props?.input?.handle
              ?.split("-")
              .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
              .join(" ")}
        </title>
        {firstItem && (
          <meta name="description" content={firstItem.description} />
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
      {props.infiniteQuery.hasNextPage && (
        <Clickable
          variants={{ w: "full", rounded: null }}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => {
            await loadNextPage();
          }}
          disabled={props.infiniteQuery.isFetchingNextPage}
        >
          load more
        </Clickable>
      )}
    </>
  );
};

export default InfiniteLoadCollectionProductsSection;
