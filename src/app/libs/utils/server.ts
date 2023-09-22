import { serverClient } from "~/app/libs/trpc/serverClient";
import { type Metadata, type ResolvingMetadata } from "next";

type Props = { params: { pageCategoryName: string; slug?: string } };

export async function getCustomPageData(props: Props) {
  return await Promise.all([
    serverClient.customPages._getOne(props.params),
    serverClient.customPages.pagesCategories.getManyItems(props.params),
  ]);
}

export async function generateCustomPageMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const [customPageStructureData] = await getCustomPageData(props);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title:
      customPageStructureData.seo?.title ??
      (customPageStructureData.slug ?? customPageStructureData.pageCategoryName)
        .split("_")
        .map((item) => item.slice(0, 1).toUpperCase() + item.slice(1))
        .join(" "),
    description: customPageStructureData.seo?.description,
    openGraph: {
      images: [...previousImages],
    },
  };
}
