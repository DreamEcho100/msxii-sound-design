import { cookies } from "next/headers";
import CustomerProfileScreen from "./screen";
import { ACCESS_TOKEN_COOKIE_KEY } from "~/libs/shopify";
import { unstable_noStore as noStore } from "next/cache";
import { getDecryptedShopifyUserDataFromAccessToKen } from "~/server/libs/shopify";
import { redirect } from "next/navigation";

export default function CustomerProfilePage() {
  noStore();

  try {
    const cookiesStore = cookies();
    const shopifyUserDecryptedData = getDecryptedShopifyUserDataFromAccessToKen(
      cookiesStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value,
    );

    if (!shopifyUserDecryptedData) {
      throw new Error("No user token found");
    }
  } catch (error) {
    console.error(error);
    redirect("/?open-login-dialog=true");
  }

  return <CustomerProfileScreen />;
}
