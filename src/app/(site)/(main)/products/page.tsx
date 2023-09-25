import { type RouterInputs } from "~/server/api/root";
import { serverClient } from "~/app/libs/trpc/serverClient";
import InfiniteLoadBasicProducts from "./_components/InfiniteLoadCollectionProductsSection copy";

async function getPageData(params: { productTitleQuery?: string }) {
  const baseInput: RouterInputs["shopify"]["products"]["getManyBasic"] = {
    limit: 24,
    title:
      params.productTitleQuery && params.productTitleQuery.length >= 3
        ? params.productTitleQuery
        : undefined,
  };

  return {
    baseInput,
    baseData: await serverClient.shopify.products.getManyBasic(baseInput),
  };
}

export const revalidate = 360;
export const metadata = {
  title: "Products search",
  description: "Search for your desired products",
};

export default async function ProductsPage(props: {
  searchParams: { productTitleQuery?: string };
}) {
  const basicManyBlogArticles = await getPageData(props.searchParams);

  return (
    <InfiniteLoadBasicProducts
      baseData={basicManyBlogArticles.baseData}
      baseInput={basicManyBlogArticles.baseInput}
    />
  );
}
