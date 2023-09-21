"use client";
import { ThemeProvider } from "next-themes";
import { type PropsWithChildren } from "react";
import SoundCloudPlayerMenu from "../SoundCloudPlayerMenu";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TRPCProvider from "./TRPC";
import { ToastContainer } from "react-toastify";

export default function Providers(props: PropsWithChildren) {
  return (
    <TRPCProvider>
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
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="msxaudio-theme"
      >
        {props.children}
      </ThemeProvider>
      <SoundCloudPlayerMenu />
      <ReactQueryDevtools initialIsOpen={false} />
    </TRPCProvider>
  );
}
