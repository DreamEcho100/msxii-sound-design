import CustomPageScreen from "~/app/components/core/CustomPageScreen";
import drizzleQueryClient from "~/server/libs/drizzle/db/queryClient";
import {
  generateCustomPageMetadata,
  getCustomPageData,
} from "~/app/libs/utils/server";

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
export const generateMetadata = generateCustomPageMetadata;

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
