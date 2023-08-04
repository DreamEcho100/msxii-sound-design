import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";
import { z } from "zod";
import { appRouter } from "~/server/api/root";
import { cx } from "class-variance-authority";
import { createInnerTRPCContext } from "~/server/api/trpc";
// import { shopifyFakeProductsData } from '~/utils/appData';
import { type RouterInputs, api } from "~/utils/api";
import { BasicProductCard } from "~/components/shared/core/Shopify/Cards/Card";
import Head from "next/head";
import shopify from "~/utils/shopify/client";
import Clickable from "~/components/shared/core/Clickable";

const ProductPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const productsQuery = api.shopify.collections.getOneByHandle.useInfiniteQuery(
    props.input,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      keepPreviousData: true,
    }
  );
  const loadNextPage = async () => {
    if (!productsQuery.hasNextPage || productsQuery.isFetchingNextPage) return;

    await productsQuery.fetchNextPage();
  };

  if (productsQuery.isLoading) return <>Loading...</>;

  if (productsQuery.isError) return <>{productsQuery.error.message}</>;

  const productsData = productsQuery.data.pages
    .map((page) => page.items.map((item) => item.node))
    .flat();

  console.log("___ productsData", productsData);

  return (
    <>
      <Head>
        <title>{props.input.handle.replace("-", " ")}</title>
        {/* <meta name="description" content={productData.description} /> */}
      </Head>
      <section
        className={cx(
          "px-main-p-4 py-main-p-1 sm:px-main-p-2",
          "flex flex-col gap-10"
        )}
      >
        <header className="lg:text-align-initial flex flex-col gap-6 text-center">
          <h1 className="text-h3 font-semibold capitalize">
            {props.input.handle.replace("-", " ")}
          </h1>
        </header>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(12rem,_1fr))] gap-8 lg:flex-nowrap lg:justify-between">
          {productsData.map((node) => (
            <BasicProductCard
              key={node.handle}
              product={node}
              containerVariants={{ w: null }}
            />
          ))}
        </div>
        <Clickable
          variants={{ w: "full", rounded: null }}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => {
            await loadNextPage();
          }}
          disabled={productsQuery.isFetchingNextPage}
        >
          load more
        </Clickable>
      </section>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await shopify.collections.queries.allHandles()).map(
    (handle) => ({
      params: { handle },
    })
  );
  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps = async (
  context: GetStaticPropsContext<{ handle: string }>
) => {
  const { handle } = z
    .object({ handle: z.string().trim().min(1) })
    .parse(context.params);

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({}),
    transformer: superjson, // optional - adds superjson serialization
  });

  const input: RouterInputs["shopify"]["collections"]["getOneByHandle"] = {
    handle,
    limit: 24,
  };

  /*
	 * Prefetching the `shopify.collections.getOneByHandle
shopify.collections.getOneByHandle` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
  await ssg.shopify.collections.getOneByHandle.prefetchInfinite(input);
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      input,
    },
    revalidate: 60,
  };
};

export default ProductPage;
