import { type Page } from "@prisma/client";
import { type StoreApi } from "zustand";

export type PageStore = {
  page: Page;
  utils: {
    setPage: (UpdaterOrValue: Page | ((UpdaterOrValue: Page) => Page)) => void;
  };
};
export type PageStoreApi = StoreApi<PageStore>;
