import { cx } from "class-variance-authority";
import { type ResolvingMetadata, type Metadata } from "next";
import InfiniteLoadCollectionProductsSection from "~/app/components/core/InfiniteLoadCollectionProductsSection";
import { serverClient } from "~/app/libs/trpc/serverClient";
import shopify from "~/libs/shopify/client";
import { type RouterInputs } from "~/server/api/root";

const limit = 24;
type Props = { params: { handle: string } };
async function getPageData(props: Props) {
  const input: RouterInputs["shopify"]["collections"]["getOneByHandle"] = {
    handle: props.params.handle,
    limit,
  };
  return {
    profile: await serverClient.shopify.collections.getOneByHandle(input),
    baseInput: input,
  };
}

export const revalidate = 360;
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
    ...collectionData.profile.item.products.edges.map(
      ({ node }) => node.featuredImage.url,
    ),
    ...previousImages,
  ];

  return {
    title: collectionData.profile.item.title,
    description: collectionData.profile.item.description ?? undefined,
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
          {collectionData.profile.item.title ??
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