"use client";
import { BasicProductCard } from "~/app/components/core/Shopify/Cards/Card";
import Clickable from "~/app/components/core/Clickable";
import SectionPrimaryLoader from "~/app/components/common/Loaders/SectionPrimary";
import SectionLoaderContainer from "~/app/components/common/LoadersContainers/Section";
import { type RouterInputs, type RouterOutputs } from "~/server/api/root";
import { trpcApi } from "~/app/libs/trpc/client";
import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  baseInput: RouterInputs["shopify"]["products"]["getManyBasic"];
  baseData?: RouterOutputs["shopify"]["products"]["getManyBasic"];
};

function SearchForm(props: { q?: string | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const q = useMemo(() => {
    return props.q && props.q.length >= 3 ? props.q : "";
  }, [props.q]);

  const router = useRouter();
  const configRef = useRef<{
    timeoutId?: NodeJS.Timeout;
  }>({ timeoutId: undefined });

  const setProductTitleQuery = (query: string | undefined) => {
    if (query && query.length !== 0 && query.length < 3) return;
    configRef.current.timeoutId = setTimeout(() => {
      const searchParamsProductTitleQuery =
        new URL(window.location.href).searchParams.get("q") ?? "";

      if (searchParamsProductTitleQuery !== query)
        router.replace(`/products?q=${query}`);
    }, 500);
  };

  useEffect(() => {
    const config = configRef.current;
    return () => {
      if (config.timeoutId) {
        clearTimeout(config.timeoutId);
        config.timeoutId = undefined;
      }
    };
  }, []);

  useEffect(() => {
    // inputRef.current?.value = q;
    const productsPageProductTitleQuery = document.getElementById(
      "products-page-q",
    ) as HTMLInputElement | null;

    if (productsPageProductTitleQuery) {
      productsPageProductTitleQuery.value = q;
    }
  }, [q]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input
        ref={inputRef}
        type="search"
        name="q"
        id="products-page-q"
        placeholder="What are you looking for? (min of 3 characters)"
        defaultValue={q}
        onChange={(event) => setProductTitleQuery(event.target.value)}
        className="w-full rounded-md px-3 py-3 text-xl"
      />
    </form>
  );
}

function ProductsSearch(props: Props) {
  const input = useMemo(
    () => ({
      ...props.baseInput,
      title:
        !props.baseInput.title ||
        props.baseInput.title.length === 0 ||
        props.baseInput.title.length >= 3
          ? props.baseInput.title
          : undefined,
    }),
    [props.baseInput],
  );

  const dataQuery = trpcApi.shopify.products.getManyBasic.useInfiniteQuery(
    input,
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
      <SearchForm q={input.title} />
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
          onClick={async () =>
            dataQuery.isLoadingError || dataQuery.isRefetchError
              ? dataQuery.refetch()
              : await loadNextPage()
          }
          disabled={
            !dataQuery.hasNextPage ||
            dataQuery.isFetchingNextPage ||
            dataQuery.isRefetching
          }
          className="capitalize"
        >
          {dataQuery.isLoadingError || dataQuery.isRefetchError
            ? "refetch"
            : "load more"}
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
