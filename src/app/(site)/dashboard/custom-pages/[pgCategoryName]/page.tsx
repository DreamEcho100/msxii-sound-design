import CustomPageScreen from "~/app/components/core/CustomPageScreen";
import drizzleQueryClient from "~/server/libs/drizzle/db/queryClient";
import {
  generateCustomPgMetadata,
  getCustomPgData,
} from "~/app/libs/utils/server";

type Props = { params: { pgCategoryName: string } };

export const revalidate = 15;
export async function getStaticPaths() {
  return {
    paths: (
      await drizzleQueryClient.query.pgCategory.findMany({
        columns: { name: true },
      })
    ).map((item) => ({ params: { pgCategoryName: item.name } })),
    fallback: true,
  };
}
export const generateMetadata = generateCustomPgMetadata;

export default async function DashboardCustomPgProfilePg(props: Props) {
  const [customPgStructureData, pageCategoryItemsData] =
    await getCustomPgData(props);

  return (
    <CustomPageScreen
      pageParams={props.params}
      customPgStructureData={customPgStructureData}
      pageCategoryItemsData={pageCategoryItemsData}
    />
  );
}
