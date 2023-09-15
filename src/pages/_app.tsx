import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "~/styles/swiper.css";
import MainLayout from "~/components/layouts/Main";
import { type ReactNode, useEffect } from "react";
import { getCurrentThemeFromLocalStorage } from "~/store/utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useCheckAccessToken } from "~/utils/shopify/hooks";
import { useStore } from "zustand";
import { globalStore } from "~/store";
import DashboardLayout from "../components/layouts/Dashboard";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SoundCloudPlayerMenu from "~/components/shared/core/SoundCloudPlayerMenu";

const LayoutsManager = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard"))
    return <DashboardLayout>{children}</DashboardLayout>;

  return <MainLayout>{children}</MainLayout>;
};

const MyApp: AppType = ({ Component, pageProps }) => {
  const changeCurrentTheme = useStore(
    globalStore,
    (store) => store.themeConfig.changeCurrentTheme,
  );

  useCheckAccessToken();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const oldHost = "msxii-sound-design.vercel.app";
    const newHost = "msxaudio.vercel.app";

    if (window.location.host === oldHost) {
      window.location.host = newHost;
    }
  }, []);

  useEffect(
    () => changeCurrentTheme(getCurrentThemeFromLocalStorage()),
    [changeCurrentTheme],
  );

  useEffect(() => {
    setTimeout(
      () =>
        typeof document !== "undefined" &&
        (
          document.querySelectorAll("button a")[0] as HTMLElement | null
        )?.focus(),
      100,
    );
  }, []);

  return (
    <>
      <LayoutsManager>
        <ToastContainer
          position="top-left"
          autoClose={7500}
          newestOnTop={true}
          closeButton
          closeOnClick={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Component {...pageProps} />
        <SoundCloudPlayerMenu />
      </LayoutsManager>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default api.withTRPC(MyApp);
