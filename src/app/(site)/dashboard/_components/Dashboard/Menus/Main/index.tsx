import drizzleQueryClient from "~/server/libs/drizzle/db/queryClient";
import SideMenuDialog from "./Dialog";

export const revalidate = 720;

export default async function MainSideMenu() {
  const data = await drizzleQueryClient.query.pgCategory.findMany();

  return <SideMenuDialog data={data} />;
}
