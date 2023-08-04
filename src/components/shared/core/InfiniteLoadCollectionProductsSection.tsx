import { type UseInfiniteQueryResult } from "@tanstack/react-query";
import { type RouterOutputs, type RouterInputs } from "~/utils/api";
import { BasicProductCard } from "./Shopify/Cards/Card";
import Clickable from "./Clickable";

type Props = {
  input: RouterInputs["shopify"]["collections"]["getOneByHandle"];
  infiniteQuery: UseInfiniteQueryResult<
    RouterOutputs["shopify"]["collections"]["getOneByHandle"],
    { message: string }
  >;
};

const InfiniteLoadCollectionProductsSection = (props: Props) => {
  if (props.infiniteQuery.isLoading) return <>Loading...</>;

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

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-8 lg:flex-nowrap lg:justify-between">
        {productsData.map((node) => (
          <BasicProductCard
            key={node.handle}
            product={node}
            containerVariants={{ w: null }}
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
