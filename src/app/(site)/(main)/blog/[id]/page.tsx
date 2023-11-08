import {
  type Metadata,
  type ResolvingMetadata,
  type GetStaticPaths,
} from "next";
import Head from "next/head";
import CustomNextImage from "~/app/components/common/CustomNextImage";
import { serverClient } from "~/app/libs/trpc/serverClient";
import shopify from "~/libs/shopify/client";
import OnClient from "./_components/OnClient";
import { Suspense, cache } from "react";

type Props = { params: { id: string } };

const gidBase = "gid://shopify/Article/";

const getPageData = cache(async (props: Props) => {
  return await serverClient.shopify.blog.articles.getOneById(
    `${gidBase}${props.params.id}`,
  );
});

export const revalidate = 360;
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (
      await shopify.blogs.articles.queries.allIdsAndHandles()
    ).articles.edges.map((item) => ({
      params: { id: item.node.id.replace(gidBase, "") },
    })),
    fallback: true,
  };
};
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const articleData = await getPageData(props);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];
  const images = [articleData.image.url, ...previousImages];

  return {
    title: articleData.title,
    description: articleData.excerpt ?? undefined,
    openGraph: { images },
  };
}

export default async function ProductPage(props: Props) {
  const articleByIdData = await getPageData(props);

  const publishedAt = articleByIdData.publishedAt
    ? Intl.DateTimeFormat("en-gd", {
        dateStyle: "long",
      }).format(new Date(articleByIdData.publishedAt))
    : null;

  if (!articleByIdData) return <>Article is not found</>;

  return (
    <>
      <Head>
        <title>{articleByIdData.title}</title>
        <meta name="description" content={articleByIdData.excerpt} />
      </Head>
      <section className="flex flex-col items-center justify-center px-main-p-4 py-main-p-1 sm:px-main-p-2 md:flex-nowrap">
        <header className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-4 p-8 text-center">
            <h1 className="text-h1">{articleByIdData.title}</h1>
            <p>Posted on{publishedAt ?? articleByIdData.publishedAt}</p>
          </div>
          <CustomNextImage
            src={articleByIdData.image.url}
            alt={articleByIdData.image.altText ?? ""}
            width={articleByIdData.image.width ?? 800}
            height={articleByIdData.image.height ?? 800}
            className="mx-auto max-h-[50rem] max-w-full object-contain"
            priority
          />
          <div className="flex flex-col p-8 text-center">
            <p>{articleByIdData.authorV2.name}</p>
            <p>
              <a
                href={`mailto:${articleByIdData.authorV2.email}`}
                rel="nofollow noreferrer"
                target="_blank"
              >
                {articleByIdData.authorV2.email}
              </a>
            </p>
            <p>{articleByIdData.authorV2.firstName}</p>
            {articleByIdData.authorV2.bio && (
              <p>{articleByIdData.authorV2.bio}</p>
            )}
          </div>
        </header>
        <Suspense>
          <OnClient />
        </Suspense>
        <section
          id="article-content"
          className="blog-article prose mx-auto flex w-full max-w-[120ch] flex-col px-4 leading-loose dark:prose-invert lg:prose-xl prose-lead:leading-loose md:px-8"
          dangerouslySetInnerHTML={{
            __html: articleByIdData.contentHtml,
          }}
        />
      </section>
    </>
  );
}
