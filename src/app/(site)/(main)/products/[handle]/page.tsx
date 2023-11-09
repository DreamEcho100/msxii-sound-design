import { type ResolvingMetadata, type Metadata } from "next";
import CustomProductScreen from "~/app/components/core/CustomProductScreen";
import { serverClient } from "~/app/libs/trpc/serverClient";
import shopify from "~/libs/shopify/client";
import { cache } from "react";
import { getBaseUrl } from "~/libs/utils";
import type { Product } from "schema-dts";

type Props = { params: { handle: string } };

const getPageData = cache(async (props: Props) => {
  return await serverClient.shopify.products.getOneByHandle(props.params);
});

export const revalidate = 720;
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
    metadataBase: new URL(getBaseUrl()),
    openGraph: {
      images: [productData.featuredImage.url, ...previousImages],
    },
  };
}
export default async function ProductPage(props: Props) {
  const productData = await getPageData(props);

  const mainVariant = productData.variants.edges[0]?.node;

  if (!mainVariant) return <>Product is not found</>;

  const jsonSchema: Product & { "@context": string } = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productData.title,
    description: productData.description,
    url: `${getBaseUrl()}/products/${productData.handle}`,
    sku: "Product SKU",
    brand: {
      "@type": "Brand",
      name: productData.vendor,
    },
    image: productData.images.edges.map((image) => image.node.src),
    offers: mainVariant.compareAtPrice && {
      "@type": "Offer",
      price: mainVariant.compareAtPrice.amount,
      priceCurrency: mainVariant.compareAtPrice.currencyCode,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "msxaudio",
      },
    },
  };

  return (
    <>
      <CustomProductScreen productData={productData} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonSchema) }}
      />
    </>
  );
}
