import { type RouterInputs } from "~/server/api/root";
import { serverClient } from "~/app/libs/trpc/serverClient";
import ProductsScreen from "./_screen";

type Props = {
  searchParams: { productTitleQuery?: string };
};

async function getPageData(props: Props) {
  const baseInput: RouterInputs["shopify"]["products"]["getManyBasic"] = {
    limit: 24,
    title:
      props.searchParams?.productTitleQuery &&
      props.searchParams.productTitleQuery.length >= 3
        ? props.searchParams.productTitleQuery
        : undefined,
  };

  return {
    baseInput,
    baseData: await serverClient.shopify.products.getManyBasic(baseInput),
  };
}

export const revalidate = 720;
export const metadata = {
  title: "Products",
  description: "Search for your desired products",
};

export default async function ProductsPage(props: Props) {
  const basicManyBlogArticles = await getPageData(props);

  return (
    <ProductsScreen
      baseData={basicManyBlogArticles.baseData}
      baseInput={basicManyBlogArticles.baseInput}
    />
  );
}
