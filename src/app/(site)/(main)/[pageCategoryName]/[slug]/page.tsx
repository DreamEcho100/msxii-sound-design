import { isNull, not } from "drizzle-orm";
import drizzleQueryClient from "~/server/libs/drizzle/db/queryClient";
import CustomPageScreen from "~/app/components/core/CustomPageScreen";
import {
  generateCustomPageMetadata,
  getCustomPageData,
} from "~/app/libs/utils/server";

type Props = { params: { pageCategoryName: string; slug: string } };
export const revalidate = 360;
export async function getStaticPaths() {
  const paths = await drizzleQueryClient.query.pageCategory
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

  return { paths, fallback: true };
}
export const generateMetadata = generateCustomPageMetadata;

export default async function CustomSectionPage(props: Props) {
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
