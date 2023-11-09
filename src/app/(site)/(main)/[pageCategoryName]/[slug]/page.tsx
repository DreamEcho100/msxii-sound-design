import { isNull, not } from "drizzle-orm";
import drizzleQueryClient from "~/server/libs/drizzle/db/queryClient";
import CustomPageScreen from "~/app/components/core/CustomPageScreen";
import {
  generateCustomPgMetadata,
  getCustomPgData,
} from "~/app/libs/utils/server";

type Props = { params: { pgCategoryName: string; slug: string } };
export const revalidate = 720;
export async function getStaticPaths() {
  const paths = await drizzleQueryClient.query.pgCategory
    .findMany({
      columns: { name: true },
      with: {
        pgs: {
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
          category.pgs.map((page) => ({
            params: { pgCategoryName: category.name, slug: page.slug },
          })),
        )
        .flat();

      return paths;
    });

  return { paths, fallback: true };
}
export const generateMetadata = generateCustomPgMetadata;

export default async function CustomSectPg(props: Props) {
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
