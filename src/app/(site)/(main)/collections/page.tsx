import { serverClient } from "~/app/libs/trpc/serverClient";
import { getCollectionWithNoEdges } from "~/libs/shopify";
import { type RouterInputs } from "~/server/api/root";
import CollectionsScreen from "./screen";

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

  return <CollectionsScreen {...data} selectedHandles={selectedHandles} />;
};

export default CollectionsPage;
