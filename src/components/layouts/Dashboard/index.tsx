import { type PropsWithChildren } from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckIsAdmin } from "~/utils/hooks";
import EditSideMenu from "./components/Menus/Edit";
import MainSideMenu from "./components/Menus/Main";
import MainHeader from "./components/MainHeader";
import Head from "next/head";

const DashboardLayout = (props: PropsWithChildren) => {
  const router = useRouter();
  const { customerStatus, isAdmin } = useCheckIsAdmin();

  useEffect(() => {
    if (customerStatus !== "loading" && !isAdmin) router.push("/");
  }, [customerStatus, isAdmin, router]);

  if (customerStatus === "loading") return <>Loading...</>;

  if (!isAdmin) return <>Not Authorized</>;

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex flex-grow">
        <MainSideMenu />
        <div className="relative flex max-w-full flex-grow flex-col">
          <MainHeader />
          <main className="mx-auto flex w-full max-w-main flex-grow flex-col overflow-y-auto overflow-x-hidden px-4 py-8 sm:px-8">
            {props.children}
          </main>
          <EditSideMenu />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
