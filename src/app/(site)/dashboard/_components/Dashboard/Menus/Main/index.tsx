import drizzleQueryClient from "~/server/libs/drizzle/db/queryClient";
import SideMenuDialog from "./Dialog";

export const revalidate = 360;

export default async function MainSideMenu() {
  const data = await drizzleQueryClient.query.pageCategory.findMany();

  return <SideMenuDialog data={data} />;
}
