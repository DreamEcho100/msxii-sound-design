import HeroHomeSection from "./_sections/Hero";
// import HomeShowcaseSection from "./_sections/Showcase";
import HomeLatestBlogsSection from "./_sections/LatestBlogs";
import AboutMSXIISoundDesign from "./_sections/AboutMSXIISoundDesign";
import HomeIOSAppsSection from "./_sections/IOSApps";
import { getServerClient } from "~/app/libs/trpc/serverClient";
import { getEdgeNodes } from "~/libs/shopify";
import { type BasicProduct } from "~/libs/shopify/types";
import HomeShowcaseSection from "./_sections/Showcase";

export const metadata = {
  title: "Site Page",
  description: "This is the site page",
};

export default async function HomeScreen() {
  const input = {
    productsFirst: 7,
    collectionsFirst: 50,
  };
  const serverClient = await getServerClient();
  const basicCollections =
    await serverClient.shopify.collections.getAllBasic(input);

  const flattenedCollectionEdges = getEdgeNodes(basicCollections);
  const bundlesCollections = flattenedCollectionEdges.filter(
    (item) => item.handle === "bundles",
  );

  const selectedBundlesCollections = (() => {
    const handlesMap: Record<string, boolean> = {};
    const selectedProducts: BasicProduct[] = [];
    const otherProducts: BasicProduct[] = [];
    flattenedCollectionEdges.forEach((collection) =>
      collection.products.edges.forEach(({ node }) => {
        if (handlesMap[node.handle]) return;
        if (
          [
            "schlump-loops-bundle",
            "drums-out-the-sp404-bundle",
            "schlump-shots-bundle",
            "the-classic-era-bundle",
          ].includes(node.handle)
        ) {
          selectedProducts.push(node);
          handlesMap[node.handle] = true;
          return;
        }
        otherProducts.push(node);
      }),
    );
    return [
      ...selectedProducts,
      ...otherProducts.slice(0, 4 - selectedProducts.length),
    ];
  })();

  return (
    <>
      <HeroHomeSection />
      <HomeShowcaseSection
        flattenedCollectionEdges={flattenedCollectionEdges}
        bundlesCollections={bundlesCollections}
        selectedBundlesCollections={selectedBundlesCollections}
      />
      <HomeIOSAppsSection />
      <HomeLatestBlogsSection />
      <AboutMSXIISoundDesign />
    </>
  );
}
