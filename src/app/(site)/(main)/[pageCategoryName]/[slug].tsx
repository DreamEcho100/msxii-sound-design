import { isNull, not } from "drizzle-orm";
import drizzleQueryClient from "~/server/libs/drizzle/db/queryClient";
import CustomPageScreen from "~/app/components/core/CustomPageScreen";
import { serverClient } from "~/app/libs/trpc/serverClient";

export default async function CustomSectionPage(props: {
  params: { pageCategoryName: string; slug: string };
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
  return await drizzleQueryClient.query.pageCategory
    .findMany({
      columns: { name: true },
      with: {
        pages: {
          columns: {
            slug: true,
          },
          where(fields) {
            return not(isNull(fields.slug));
          },
        },
      },
    })
    .then((result) => {
      const paths = result
        .map((category) =>
          category.pages.map((page) => ({
            params: { pageCategoryName: category.name, slug: page.slug },
          })),
        )
        .flat();

      return paths;
    });
}
