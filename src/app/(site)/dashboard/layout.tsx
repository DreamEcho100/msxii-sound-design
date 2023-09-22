import { type PropsWithChildren } from "react";

import EditSideMenu from "./_components/Dashboard/Menus/Edit";
import MainSideMenu from "./_components/Dashboard/Menus/Main";
import MainHeader from "./_components/Dashboard/MainHeader";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_KEY } from "~/libs/shopify";
import { getDecryptedShopifyUserDataFromAccessToKen } from "~/server/libs/shopify";
import { allowedAdminEmails } from "~/server/libs/utils";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import MainContent from "./_components/Dashboard/MainContent";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardLayout = (props: PropsWithChildren) => {
  let shopifyUserDecryptedData: ReturnType<
    typeof getDecryptedShopifyUserDataFromAccessToKen
  >;

  try {
    const cookiesStore = cookies();
    shopifyUserDecryptedData = getDecryptedShopifyUserDataFromAccessToKen(
      cookiesStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value,
    );
  } catch (error) {
    redirect("/?open-login-dialog=true");
  }

  if (
    !allowedAdminEmails.includes(
      shopifyUserDecryptedData.payload.shopifyUserEmail,
    )
  ) {
    redirect("/?open-login-dialog=true");
  }

  return (
    <>
      <div className="flex flex-grow">
        <MainSideMenu />
        <div className="relative flex max-w-full flex-grow flex-col">
          <MainHeader />
          <MainContent>{props.children}</MainContent>
        </div>
      </div>
      <EditSideMenu />
    </>
  );
};

export default DashboardLayout;
