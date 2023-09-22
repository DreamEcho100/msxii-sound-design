import { type ResolvingMetadata, type Metadata } from "next";
import CustomProductScreen from "~/app/components/core/CustomProductScreen";
import { serverClient } from "~/app/libs/trpc/serverClient";
import shopify from "~/libs/shopify/client";

type Props = { params: { handle: string } };

async function getPageData(props: Props) {
  return await serverClient.shopify.products.getOneByHandle(props.params);
}

export const revalidate = 360;
export async function getStaticPaths() {
  return {
    paths: (await shopify.products.queries.getManyHandles()).products.edges.map(
      (item) => ({
        params: { handle: item.node.handle },
      }),
    ),
    fallback: true,
  };
}
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const productData = await getPageData(props);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: productData.title,
    description: productData.description,
    openGraph: {
      images: [productData.featuredImage.url, ...previousImages],
    },
  };
}
export default async function ProductPage(props: Props) {
  const productData = await getPageData(props);

  const mainVariant = productData.variants.edges[0]?.node;

  if (!mainVariant) return <>Product is not found</>;

  return <CustomProductScreen productData={productData} />;
}
