import { serverClient } from "~/app/libs/trpc/serverClient";
import { type Metadata, type ResolvingMetadata } from "next";
import { getBaseUrl } from "~/libs/utils";

type Props = { params: { pgCategoryName: string; slug?: string } };

export async function getCustomPgData(props: Props) {
  return await Promise.all([
    serverClient.customPgs.getOne(props.params),
    serverClient.customPgs.pagesCategories.getManyItems(props.params),
  ]);
}

export async function generateCustomPgMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const [customPgStructureData] = await getCustomPgData(props);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title:
      customPgStructureData.seo?.title ??
      (customPgStructureData.slug ?? customPgStructureData.pgCategoryName)
        .split("_")
        .map((item) => item.slice(0, 1).toUpperCase() + item.slice(1))
        .join(" "),
    description: customPgStructureData.seo?.description,
    metadataBase: new URL(getBaseUrl()),
    openGraph: {
      images: [...previousImages],
    },
  };
}
