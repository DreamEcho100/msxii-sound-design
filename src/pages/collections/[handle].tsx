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
import Head from "next/head";
import shopify from "~/utils/shopify/client";
import InfiniteLoadCollectionProductsSection from "~/components/shared/core/InfiniteLoadCollectionProductsSection";

const ProductPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const productsQuery = api.shopify.collections.getOneByHandle.useInfiniteQuery(
    props.input,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      keepPreviousData: true,
    }
  );
  console.log("___ props", props);

  return (
    <>
      <Head>
        <title>
          {props.input.handle
            .split("-")
            .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
            .join(" ")}
        </title>
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
        <InfiniteLoadCollectionProductsSection
          infiniteQuery={productsQuery}
          input={props.input}
        />
      </section>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { handle: string } }[] = [];

  (await shopify.collections.queries.allHandles()).forEach((handle) => {
    if (handle)
      paths.push({
        params: { handle },
      });
  });
  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps = async (
  context: GetStaticPropsContext<{ handle: string }>
) => {
  console.log("___ context.params", context.params);

  let handle: string;
  try {
    const params = z
      .object({ handle: z.string().trim().min(1) })
      .parse(context.params);

    handle = params.handle;
  } catch (err) {
    console.log(err);
    if (err instanceof Error) console.log(err.message);

    return {
      notFound: true,
    };
  }

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
