import type { Metadata } from "next";
import { type PropsWithChildren } from "react";
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
      <main className="mx-auto mt-main-header-h flex w-full max-w-main flex-grow flex-col">
        {props.children}
      </main>
      <MainLayoutFooter />
      <CheckoutManager />
    </>
  );
}
