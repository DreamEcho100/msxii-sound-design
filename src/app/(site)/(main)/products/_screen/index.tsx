"use client";
import { BasicProductCard } from "~/app/components/core/Shopify/Cards/Card";
import Clickable from "~/app/components/core/Clickable";
import SectionPrimaryLoader from "~/app/components/common/Loaders/SectionPrimary";
import SectionLoaderContainer from "~/app/components/common/LoadersContainers/Section";
import { type RouterInputs, type RouterOutputs } from "~/server/api/root";
import { trpcApi } from "~/app/libs/trpc/client";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
type Props = {
  baseInput: RouterInputs["shopify"]["products"]["getManyBasic"];
  baseData?: RouterOutputs["shopify"]["products"]["getManyBasic"];
};

function SearchForm(props: {
  setProductTitleQueryDebounce: Dispatch<
    SetStateAction<string | null | undefined>
  >;
}) {
  const [productTitleQuery, setProductTitleQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (productTitleQuery.length !== 0 && productTitleQuery.length < 3) return;

    const timeoutId = setTimeout(() => {
      props.setProductTitleQueryDebounce(productTitleQuery);

      const searchParamsProductTitleQuery =
        new URL(window.location.href).searchParams.get("productTitleQuery") ??
        "";

      if (searchParamsProductTitleQuery !== productTitleQuery)
        router.replace(`/products?productTitleQuery=${productTitleQuery}`);
    }, 500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [productTitleQuery, props, router]);

  useEffect(() => {
    // productTitleQueryInputRef.current?.focus();
    const productTitleQuery =
      new URL(window.location.href).searchParams.get("productTitleQuery") ?? "";

    setProductTitleQuery(productTitleQuery);
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input
        type="search"
        name="productTitleQuery"
        id="productTitleQuery"
        value={productTitleQuery}
        onChange={(event) => setProductTitleQuery(event.target.value)}
        className="w-full rounded-md px-2 py-1 text-xl"
      />
    </form>
  );
}

function ProductsSearch(props: Props) {
  const [productTitleQueryDebounce, setProductTitleQueryDebounce] = useState(
    props.baseInput.title,
  );
  const queryInput = useMemo(
    () => ({
      ...props.baseInput,
      title:
        !productTitleQueryDebounce ||
        productTitleQueryDebounce.length === 0 ||
        productTitleQueryDebounce.length >= 3
          ? productTitleQueryDebounce
          : undefined,
    }),
    [productTitleQueryDebounce, props.baseInput],
  );

  const dataQuery = trpcApi.shopify.products.getManyBasic.useInfiniteQuery(
    queryInput,
    {
      initialData: props.baseData && {
        pageParams: [undefined],
        pages: [props.baseData],
      },
      keepPreviousData: !!props.baseData,
      getNextPageParam: (data) => data.nextCursor,
    },
  );

  const loadNextPage = async () => {
    if (!dataQuery.hasNextPage || dataQuery.isFetchingNextPage) return;

    await dataQuery.fetchNextPage();
  };

  const productsData = useMemo(
    () =>
      dataQuery.data?.pages
        .map((page) => page.items.edges.map((item) => item.node))
        .flat() ?? [],
    [dataQuery?.data?.pages],
  );

  if (dataQuery.isInitialLoading)
    return (
      <SectionLoaderContainer>
        <SectionPrimaryLoader />
      </SectionLoaderContainer>
    );

  return (
    <>
      <SearchForm setProductTitleQueryDebounce={setProductTitleQueryDebounce} />
      <div className="grid flex-grow grid-cols-[repeat(auto-fill,_minmax(14rem,_1fr))] gap-8 lg:flex-nowrap lg:justify-between">
        {dataQuery.isLoading ? (
          <SectionLoaderContainer>
            <SectionPrimaryLoader />
          </SectionLoaderContainer>
        ) : dataQuery.isError ? (
          <>{dataQuery.error.message}</>
        ) : (
          productsData.map((item, itemIndex) => (
            <BasicProductCard
              key={item.id}
              item={item}
              containerVariants={{ w: null }}
              imgPriority={itemIndex < 8}
            />
          ))
        )}
      </div>
      {dataQuery.hasNextPage && (
        <Clickable
          variants={{ w: "full", rounded: null }}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => await loadNextPage()}
          disabled={!dataQuery.hasNextPage || dataQuery.isFetchingNextPage}
          className="capitalize"
        >
          load more
        </Clickable>
      )}
    </>
  );
}

export default function ProductsScreen(props: Props) {
  return (
    <section className="flex flex-grow flex-col gap-8 px-16 py-8">
      <ProductsSearch {...props} />
    </section>
  );
}
