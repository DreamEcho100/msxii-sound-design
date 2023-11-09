import {
  type Metadata,
  type ResolvingMetadata,
  type GetStaticPaths,
} from "next";
import CustomNextImage from "~/app/components/common/CustomNextImage";
import { serverClient } from "~/app/libs/trpc/serverClient";
import shopify from "~/libs/shopify/client";
import OnClient from "./_components/OnClient";
import { Suspense, cache } from "react";
import { getBaseUrl } from "~/libs/utils";
import { cx } from "class-variance-authority";
import type { Article } from "schema-dts";

type Props = { params: { id: string } };

const gidBase = "gid://shopify/Article/";

const getPageData = cache(async (props: Props) => {
  return await serverClient.shopify.blog.articles.getOneById(
    `${gidBase}${props.params.id}`,
  );
});

export const revalidate = 720;
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
    title: articleData.seo?.title ?? articleData.title,
    description:
      articleData.seo?.description ?? articleData.excerpt ?? undefined,
    metadataBase: new URL(getBaseUrl()),
    openGraph: { images },
  };
}

export default async function ProductPage(props: Props) {
  const data = await getPageData(props);

  const publishedAt = data.publishedAt
    ? Intl.DateTimeFormat("en-gd", {
        dateStyle: "long",
      }).format(new Date(data.publishedAt))
    : undefined;

  if (!data) return <>Article is not found</>;

  const jsonSchema: Article & { "@context": string } = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: data.seo?.title ?? data.title,
    description: data.seo?.description ?? data.excerpt ?? undefined,
    headline: data.excerpt,
    author: {
      "@type": "Person",
      name: data.authorV2.name,
      email: data.authorV2.email,
    },
    datePublished: publishedAt,
    image: data.image.url,
    // "keywords": "keyword1, keyword2, keyword3",
    url: `${getBaseUrl()}/blog/${data.id.replace(gidBase, "")}`,
    publisher: {
      "@type": "Organization",
      name: "msxaudio",
      logo: {
        "@type": "ImageObject",
        url: `${getBaseUrl()}/images/logo.png`,
      },
    },
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-16 px-main-p-4 py-main-p-1 sm:px-main-p-2 md:flex-nowrap">
        <header className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-4 p-8 text-center">
            <h1 className="text-h1">{data.title}</h1>
            <p>Posted on {publishedAt ?? data.publishedAt}</p>
          </div>
          <CustomNextImage
            src={data.image.url}
            alt={data.image.altText ?? ""}
            width={data.image.width ?? 800}
            height={data.image.height ?? 800}
            className="mx-auto max-h-[50rem] max-w-full object-contain"
            priority
          />
          {/* <div className="flex flex-col p-8 text-center">
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
          </div> */}
        </header>
        <Suspense>
          <OnClient />
        </Suspense>
        <section
          id="article-content"
          className={cx(
            // "blog-article prose mx-auto flex w-full max-w-[120ch] flex-col px-4 leading-loose dark:prose-invert lg:prose-lg prose-lead:leading-loose md:px-8"
            "mx-auto w-full max-w-[120ch]",
          )}
          dangerouslySetInnerHTML={{
            __html: data.contentHtml,
          }}
        />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonSchema) }}
      />
    </>
  );
}
