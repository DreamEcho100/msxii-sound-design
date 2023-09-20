import { serverClient } from "~/app/libs/trpc/serverClient";
import { getEdgeNodes } from "~/libs/shopify";
import { type RouterInputs } from "~/server/api/root";
import CollectionsScreen from "./screen";

async function getPageData() {
  const input: RouterInputs["shopify"]["collections"]["getAllBasic"] = {
    productsFirst: 7,
    collectionsFirst: 50,
  };
  return await serverClient.shopify.collections.getAllBasic(input);
}

export const revalidate = 360;
export const metadata = {
  title: "Collections",
  description: "Our Collections",
};

const CollectionsPage = async () => {
  const basicCollectionsEdges = await getPageData();
  const basicCollections = getEdgeNodes(basicCollectionsEdges, (item) => {
    return item.handle === "all-products" || item.handle === "merch";
  });

  return <CollectionsScreen basicCollections={basicCollections} />;
};

export default CollectionsPage;
