import { type AppType } from "next/app";

import { useEffect } from "react";
import { getCurrentThemeFromLocalStorage } from "~/store/utils";
import { useCheckAccessToken } from "~/utils/shopify/hooks";
import { useStore } from "zustand";
import { globalStore } from "~/store";

import SoundCloudPlayerMenu from "~/components/shared/core/SoundCloudPlayerMenu";

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
      <Component {...pageProps} />
      <SoundCloudPlayerMenu />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default MyApp;
