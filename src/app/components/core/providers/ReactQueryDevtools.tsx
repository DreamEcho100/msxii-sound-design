"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ReactQueryDevtoolsProvider() {
  return <ReactQueryDevtools initialIsOpen={false} />;
}
