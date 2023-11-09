import HeroHomeSect from "./_sections/Hero";
import HomeLatestBlogsSect from "./_sections/LatestBlogs";
import AboutMSXIISoundDesign from "./_sections/AboutMSXIISoundDesign";
import HomeIOSAppsSect from "./_sections/IOSApps";
import HomeShowcaseSect from "./_sections/Showcase";
import { serverClient } from "~/app/libs/trpc/serverClient";
import { getEdgeNodes } from "~/libs/shopify";
import { type BasicProduct } from "~/libs/shopify/types";

export const revalidate = 720;
export const metadata = {
  title: "MSXII Sound Design",
  description: "MSXII Sound Design home page",
};

const blogGetManyInput = {
  reverse: true,
  limit: 2,
};
const input = {
  productsFirst: 7,
  collectionsFirst: 50,
};

export default async function HomeScreen() {
  const [basicArticles, showcaseData] = await Promise.all([
    serverClient.shopify.blog.articles.getManyBasic(blogGetManyInput),
    serverClient.shopify.collections.getAllBasic(input).then((result) => {
      const flattenedCollectionEdges = getEdgeNodes(result);
      const bundlesCollections = flattenedCollectionEdges
        .filter((item) => item.handle === "bundles")
        .map((collection) => collection.products.edges.map(({ node }) => node))
        .flat();
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

      return {
        flattenedCollectionEdges,
        bundlesCollections,
        selectedBundlesCollections,
      };
    }),
  ]);

  return (
    <>
      <HeroHomeSect />
      <HomeShowcaseSect {...showcaseData} />
      <HomeIOSAppsSect />
      <HomeLatestBlogsSect basicArticles={basicArticles.items} />
      <AboutMSXIISoundDesign />
    </>
  );
}
