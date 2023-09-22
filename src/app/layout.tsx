import type { Metadata } from "next";
import { type PropsWithChildren } from "react";
import { ralewayFont } from "./libs/fonts";
import { cx } from "class-variance-authority";
import Providers from "./components/core/providers";

import "~/app/styles/globals.css";
import "~/app/styles/swiper.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "MSXII Sound Design",
  description: "MSXII Sound Design home page",
};

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cx(
          "bg-bg-primary-500 text-text-primary-500",
          ralewayFont.className,
        )}
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
