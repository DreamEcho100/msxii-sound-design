import CustomPageScreen from "~/app/components/core/CustomPageScreen";
import drizzleQueryClient from "~/server/libs/drizzle/db/queryClient";
import { generateCustomPageDataMetadata, getCustomPageData } from "./_utils";

type Props = { params: { pageCategoryName: string } };

export const revalidate = 360;
export async function getStaticPaths() {
  return {
    paths: (
      await drizzleQueryClient.query.pageCategory.findMany({
        columns: { name: true },
      })
    ).map((item) => ({ params: { pageCategoryName: item.name } })),
    fallback: true,
  };
}
export const generateDataMetadata = generateCustomPageDataMetadata;

export default async function DashboardCustomPageProfilePage(props: Props) {
  const [customPageStructureData, pageCategoryItemsData] =
    await getCustomPageData(props);

  return (
    <CustomPageScreen
      pageParams={props.params}
      customPageStructureData={customPageStructureData}
      pageCategoryItemsData={pageCategoryItemsData}
    />
  );
}
