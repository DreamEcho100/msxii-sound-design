import { type StoreApi } from "zustand";
import { type RouterOutputs } from "~/server/api/root";

export type PageStoreApi = StoreApi<PageStore>;

export type Page = RouterOutputs["customPages"]["getOne"];
export type Css = Page["css"];
export type Section =
  RouterOutputs["customPages"]["getOne"]["sections"][number];
export type Box =
  RouterOutputs["customPages"]["getOne"]["sections"][number]["body"][number];

export type GetBoxNonNullableItem<Key extends keyof Box> = NonNullable<
  Box[Key]
>;
export type GetBoxWithNullableItem<Key extends keyof Box> = Omit<Box, Key> & {
  [key in Key]: NonNullable<Box[Key]>;
};

export type BoxTypeMd = GetBoxWithNullableItem<"mdBox">;
export type BoxTypeQuote = GetBoxWithNullableItem<"quoteBox">;
export type BoxTypeHeader = GetBoxWithNullableItem<"headerBox">;
export type BoxTypeImage = GetBoxWithNullableItem<"imageBox">;
export type BoxTypeIframe = GetBoxWithNullableItem<"iframeBox">;
export type BoxTypeTabs = GetBoxWithNullableItem<"tabs">;
export type BoxTypeSlider = GetBoxWithNullableItem<"slider">;
export type BoxTypeGrid = GetBoxWithNullableItem<"grid">;

export type MdBox = BoxTypeMd["mdBox"];
export type QuoteBox = BoxTypeQuote["quoteBox"];
export type HeaderBox = BoxTypeHeader["headerBox"];
export type ImageBox = BoxTypeImage["imageBox"];
export type IframeBox = BoxTypeIframe["iframeBox"];
export type TabsBox = BoxTypeTabs["tabs"];
export type Slider = BoxTypeSlider["slider"];
export type Grid = BoxTypeSlider["grid"];
export type PageStore = {
  page: Page;
  utils: {
    setPage: (UpdaterOrValue: Page | ((UpdaterOrValue: Page) => Page)) => void;
  };
};
