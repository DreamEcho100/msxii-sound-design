import { serverClient } from "~/app/libs/trpc/serverClient";
import { getCollectionWithNoEdges } from "~/libs/shopify";
import { type RouterInputs } from "~/server/api/root";
import CollectionsScreen from "./screen";
import { getBaseUrl } from "~/libs/utils";
import type { ItemList } from "schema-dts";

async function getPageData() {
  const input: RouterInputs["shopify"]["collections"]["getAllBasic"] = {
    productsFirst: 7,
    collectionsFirst: 50,
  };
  return await serverClient.shopify.collections.getAllBasic(input);
}

export const revalidate = 720;
export const metadata = {
  title: "Collections",
  description: "Our Collections",
};

const CollectionsPage = async (props: {
  params: Record<string, never>;
  searchParams: { handles?: string };
}) => {
  let selectedHandles = props.searchParams.handles?.split(",");
  if (selectedHandles?.length === 1)
    selectedHandles = selectedHandles.filter(Boolean);
  const basicCollectionsEdges = await getPageData();
  const data = getCollectionWithNoEdges(basicCollectionsEdges, {
    withHandles: true,
    filterHandles(handle) {
      return handle !== "all-products" && handle !== "merch";
    },
    filterCollectionWithEdge(collectionWithEdgedProducts) {
      return (
        !selectedHandles ||
        selectedHandles.length === 0 ||
        selectedHandles.includes(collectionWithEdgedProducts.handle)
      );
    },
  });

  const jsonSchema: ItemList & { "@context": string } = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: metadata.title,
    description: metadata.description,
    url: `${getBaseUrl()}/collections`,
    itemListElement: data.collectionsWithNoEdges.map((item) => ({
      "@type": "Collection",
      name: item.title,
      description: item.description,
      url: `${getBaseUrl()}/collections/${item.handle}`,
      itemListElement: item.products.map((product) => {
        const mainVariant = product.variants.edges[0]?.node;

        return {
          "@type": "Product",
          name: product.title,
          description: product.description,
          url: `${getBaseUrl()}/products/${product.handle}`,
          brand: {
            "@type": "Brand",
            name: product.vendor,
          },
          image: product.featuredImage.url,
          offers: mainVariant?.compareAtPrice && {
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
      }),
    })),
  };

  return (
    <>
      <CollectionsScreen {...data} selectedHandles={selectedHandles} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonSchema) }}
      />
    </>
  );
};

export default CollectionsPage;
