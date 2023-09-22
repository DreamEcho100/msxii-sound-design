import { type RouterInputs } from "~/server/api/root";
import { serverClient } from "~/app/libs/trpc/serverClient";
import BlogScreen from "./Screen";

async function getPageData() {
  const baseInput: RouterInputs["shopify"]["blog"]["articles"]["getManyBasic"] =
    { limit: 24 };

  return {
    baseInput,
    baseData: await serverClient.shopify.blog.articles.getManyBasic(baseInput),
  };
}

export const revalidate = 360;
export const metadata = {
  title: "Blog",
  description: "Our Blog Articles",
};

export default async function BlogPage() {
  const basicManyBlogArticles = await getPageData();

  return (
    <BlogScreen
      baseData={basicManyBlogArticles.baseData}
      baseInput={basicManyBlogArticles.baseInput}
    />
  );
}
