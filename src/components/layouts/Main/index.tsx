import { useState, type ReactNode, useEffect } from "react";

import MainLayoutHeader from "./Header";
import MainLayoutFooter from "./Footer";
import { api } from "~/utils/api";
import { getCookie } from "cookies-next";
import { CHECKOUT_ID_COOKIE_KEY } from "~/utils/shopify";
import { globalStore } from "~/store";
import { useStore } from "zustand";

type Props = {
  children: ReactNode;
};

const GettingCheckout = () => {
  const [checkoutIdFromCookies, setCheckoutIdFromCookies] = useState("");
  const checkoutId = useStore(globalStore, (state) => state.cart.data?.id);
  const checkoutStatus = useStore(globalStore, (state) => state.cart.status);

  const [isDone, setIsDone] = useState(false);

  const createOneCheckouts = api.shopify.checkouts.createOne.useMutation({
    onError: () =>
      globalStore.getState().cart.setId({ type: "failed-creating-checkout" }),
    onMutate: () =>
      globalStore.getState().cart.setId({ type: "creating-checkout" }),
    onSuccess: (result) => {
      // !!!
      // Can be merged into a one call that updates the store
      globalStore
        .getState()
        .cart.setId({ type: "checkout-created", payload: { data: result } });
    },
  });

  api.shopify.checkouts.getOne.useQuery(checkoutIdFromCookies, {
    enabled:
      !isDone &&
      !!checkoutIdFromCookies &&
      checkoutStatus === "checkout-found-in-cookies",
    onSuccess: (result) => {
      globalStore
        .getState()
        .cart.setId({ type: "line-items-fetched", payload: { data: result } });
    },
  });

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !!checkoutId ||
      checkoutStatus !== "checking-stored"
    )
      return;

    const checkoutIdFromCookies = getCookie(CHECKOUT_ID_COOKIE_KEY);

    if (
      typeof checkoutIdFromCookies === "string" &&
      checkoutIdFromCookies.length > 0
    ) {
      globalStore.getState().cart.setId({
        type: "checkout-found-in-cookies",
      });
      return setCheckoutIdFromCookies(checkoutIdFromCookies);
    }

    globalStore.getState().cart.setId({ type: "not-found-in-cookies" });

    if (!createOneCheckouts.isLoading && !createOneCheckouts.isSuccess)
      createOneCheckouts.mutate();
  }, [checkoutId, checkoutStatus, createOneCheckouts]);

  useEffect(() => {
    if (
      checkoutStatus === "checkout-created" ||
      checkoutStatus === "line-items-fetched"
    ) {
      setIsDone(true);
    }
  }, [checkoutStatus]);

  return <></>;
};

const MainLayout = (props: Props) => {
  return (
    <>
      <MainLayoutHeader />
      {/* min-h-main-content */}
      <main className="mx-auto mt-main-header-h w-full max-w-main flex-grow">
        {props.children}
      </main>
      <MainLayoutFooter />
      <GettingCheckout />
    </>
  );
};

export default MainLayout;
