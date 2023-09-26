import type { Metadata } from "next";
import { type PropsWithChildren } from "react";
import MainContent from "./_components/layout/Content";
import MainLayoutHeader from "./_components/layout/Header";
import MainLayoutFooter from "./_components/layout/Footer";
import CheckoutManager from "./_components/layout/CheckoutManager";

export const metadata: Metadata = {
  title: "MSXII Sound Design",
  description: "MSXII Sound Design",
};

export default function RootLayout(props: PropsWithChildren) {
  return (
    <>
      <MainLayoutHeader />
      <MainContent>
        {props.children}
      </MainContent>
      <MainLayoutFooter />
      <CheckoutManager />
    </>
  );
}
