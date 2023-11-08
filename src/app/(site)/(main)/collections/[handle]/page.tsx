import { cx } from "class-variance-authority";
import { type ResolvingMetadata, type Metadata } from "next";
import InfiniteLoadCollectionProductsSection from "~/app/components/core/InfiniteLoadCollectionProductsSection";
import { serverClient } from "~/app/libs/trpc/serverClient";
import shopify from "~/libs/shopify/client";
import { type RouterInputs } from "~/server/api/root";
import { cache } from "react";
import { getBaseUrl } from "~/libs/utils";

const limit = 24;
type Props = { params: { handle: string } };
const getPageData = cache(async (props: Props) => {
  const input: RouterInputs["shopify"]["collections"]["getOneByHandle"] = {
    handle: props.params.handle,
    limit,
  };
  return {
    profile: await serverClient.shopify.collections.getOneByHandle(input),
    baseInput: input,
  };
});

export const revalidate = 720;
export async function getStaticPaths() {
  const paths: { params: { handle: string } }[] = [];

  (await shopify.collections.queries.allHandles()).forEach((handle) => {
    if (handle)
      paths.push({
        params: { handle },
      });
  });

  return {
    paths,
    fallback: true,
  };
}
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const collectionData = await getPageData(props);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];
  const images = [
    ...collectionData.profile.items.products.edges.map(
      ({ node }) => node.featuredImage.url,
    ),
    ...previousImages,
  ];

  return {
    title: collectionData.profile.items.title,
    description: collectionData.profile.items.description ?? undefined,
    metadataBase: new URL(getBaseUrl()),
    openGraph: { images },
  };
}

const CollectionPage = async (props: Props) => {
  const collectionData = await getPageData(props);

  return (
    <section
      className={cx(
        "px-main-p-4 py-main-p-1 sm:px-main-p-2",
        "flex flex-col gap-10",
      )}
    >
      <header className="lg:text-align-initial flex flex-col gap-6 text-center">
        <h1 className="text-h3 font-semibold capitalize">
          {collectionData.profile.items.title ??
            collectionData.baseInput.handle
              .split("-")
              .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
              .join(" ")}
        </h1>
      </header>
      <InfiniteLoadCollectionProductsSection
        profileData={collectionData.profile}
        baseInput={collectionData.baseInput}
      />
    </section>
  );
};

export default CollectionPage;
