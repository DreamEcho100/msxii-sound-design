import { type RouterInputs } from "~/server/api/root";
import { serverClient } from "~/app/libs/trpc/serverClient";
import BlogScreen from "./Screen";
import type { Blog } from "schema-dts";
import { getBaseUrl } from "~/libs/utils";

const getPageData = async () => {
  const baseInput: RouterInputs["shopify"]["blog"]["articles"]["getManyBasic"] =
    { limit: 24 };

  return {
    baseInput,
    baseData: await serverClient.shopify.blog.articles.getManyBasic(baseInput),
  };
};

export const revalidate = 720;
export const metadata = {
  title: "Blog",
  description: "Our Blog Articles",
};

const gidBase = "gid://shopify/Article/";

export default async function BlogPage() {
  const data = await getPageData();

  const jsonSchema: Blog & { "@context": string } = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: metadata.title,
    description: metadata.description,
    url: `${getBaseUrl()}/blog`,
    // "author": {
    // 	"@type": "Person",
    // 	"name": articleByIdData.authorV2.name,
    // 	email: articleByIdData.authorV2.email,
    // 	// bio: articleByIdData.authorV2.bio,
    // },
    // "datePublished": publishedAt,
    // "image": articleByIdData.image.url,
    // "keywords": "keyword1, keyword2, keyword3",
    publisher: {
      "@type": "Organization",
      name: "msxaudio",
      logo: {
        "@type": "ImageObject",
        url: `${getBaseUrl()}/images/logo.png`,
      },
    },
    blogPost: data.baseData.items.map((item) => ({
      "@type": "BlogPosting",
      headline: item.node.title,
      description: item.node.excerpt,
      author: {
        "@type": "Person",
        name: item.node.authorV2.name,
        email: item.node.authorV2.email,
      },
      datePublished: item.node.publishedAt
        ? Intl.DateTimeFormat("en-gd", {
            dateStyle: "long",
          }).format(new Date(item.node.publishedAt))
        : undefined,
      image: item.node.image.url,
      url: `${getBaseUrl()}/blog/${item.node.id.replace(gidBase, "")}`,
    })),
  };

  return (
    <>
      <BlogScreen baseData={data.baseData} baseInput={data.baseInput} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonSchema) }}
      />
    </>
  );
}
