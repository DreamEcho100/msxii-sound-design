import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";
import { z } from "zod";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
// import { shopifyFakeProductsData } from '~/utils/appData';
import { type RouterInputs, api } from "~/utils/api";
import Head from "next/head";
import CustomProductScreen from "~/components/shared/core/CustomProductScreen";
import SectionLoaderContainer from "~/components/shared/LoadersContainers/Section";
import SectionPrimaryLoader from "~/components/shared/Loaders/SectionPrimary";

const ProductPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const productQuery = api.shopify.products.getOneByHandle.useQuery(
    props.input,
  );

  if (productQuery.isLoading)
    return (
      <SectionLoaderContainer>
        <SectionPrimaryLoader />
      </SectionLoaderContainer>
    );

  if (productQuery.isError) return <>{productQuery.error.message}</>;

  const productData = productQuery.data;
  const mainVariant = productQuery.data.variants.edges[0]?.node;

  if (!mainVariant) return <>Product is not found</>;

  return (
    <>
      <Head>
        <title>{productData.title}</title>
        <meta name="description" content={productData.description} />
      </Head>
      <CustomProductScreen productData={productData} products={[]} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: ([] as { handle: string }[]).map((item) => ({
      params: { handle: item.handle },
    })),
    fallback: true,
  };
};
export const getStaticProps = async (
  context: GetStaticPropsContext<{ handle: string }>,
) => {
  let handle: string;
  try {
    const params = z
      .object({ handle: z.string().trim().min(1) })
      .parse(context.params);

    handle = params.handle;
  } catch (err) {
    console.error(err);
    if (err instanceof Error) console.error(err.message);

    return {
      notFound: true,
    };
  }
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({}),
    transformer: superjson, // optional - adds superjson serialization
  });

  const input: RouterInputs["shopify"]["products"]["getOneByHandle"] = {
    handle,
  };
  /*
   * Prefetching the `s.shopify.products.getOneByHandle` query here.
   * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
   */
  await ssg.shopify.products.getOneByHandle.prefetch(input);
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
