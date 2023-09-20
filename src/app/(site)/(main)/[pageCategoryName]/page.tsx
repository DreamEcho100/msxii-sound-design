import CustomPageScreen from "~/app/components/core/CustomPageScreen";
import drizzleQueryClient from "~/server/libs/drizzle/db/queryClient";
import { serverClient } from "~/app/libs/trpc/serverClient";

export default async function DashboardCustomPageProfilePage(props: {
  params: { pageCategoryName: string };
}) {
  const [customPageStructureData, pageCategoryItemsData] = await Promise.all([
    serverClient.customPages._getOne(props.params),
    serverClient.customPages.pagesCategories.getManyItems(props.params),
  ]);

  return (
    <CustomPageScreen
      pageParams={props.params}
      customPageStructureData={customPageStructureData}
      pageCategoryItemsData={pageCategoryItemsData}
    />
  );
}

export async function getStaticPaths() {
  return (
    await drizzleQueryClient.query.pageCategory.findMany({
      columns: { name: true },
    })
  ).map((item) => ({ params: { pageCategoryName: item.name } }));
}
