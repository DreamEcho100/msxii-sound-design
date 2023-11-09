import { type RouterInputs } from "~/server/api/root";
import { serverClient } from "~/app/libs/trpc/serverClient";
import ProductsScreen from "./_screen";

type Props = {
  searchParams: { q?: string };
};

async function getPgData(props: Props) {
  const baseInput: RouterInputs["shopify"]["products"]["getManyBasic"] = {
    limit: 24,
    title:
      props.searchParams?.q && props.searchParams.q.length >= 3
        ? props.searchParams.q
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

export default async function ProductsPg(props: Props) {
  const basicManyBlogArticles = await getPgData(props);

  return (
    <ProductsScreen
      baseData={basicManyBlogArticles.baseData}
      baseInput={basicManyBlogArticles.baseInput}
    />
  );
}
