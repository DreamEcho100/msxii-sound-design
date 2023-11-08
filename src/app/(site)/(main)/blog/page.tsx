import { type RouterInputs } from "~/server/api/root";
import { serverClient } from "~/app/libs/trpc/serverClient";
import BlogScreen from "./Screen";
import { Suspense } from "react";

const getPageData = async () => {
  const baseInput: RouterInputs["shopify"]["blog"]["articles"]["getManyBasic"] =
    { limit: 24 };

  return {
    baseInput,
    baseData: await serverClient.shopify.blog.articles.getManyBasic(baseInput),
  };
};

export const revalidate = 360;
export const metadata = {
  title: "Blog",
  description: "Our Blog Articles",
};

export default async function BlogPage() {
  const basicManyBlogArticles = await getPageData();

  return (
    <Suspense>
      <BlogScreen
        baseData={basicManyBlogArticles.baseData}
        baseInput={basicManyBlogArticles.baseInput}
      />
    </Suspense>
  );
}
