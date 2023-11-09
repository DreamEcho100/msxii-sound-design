import { type StoreApi } from "zustand";
import { type RouterOutputs } from "~/server/api/root";

export type PgStoreApi = StoreApi<PgStore>;

export type Pg = RouterOutputs["customPgs"]["getOne"];
export type Css = Pg["css"];
export type Sect = RouterOutputs["customPgs"]["getOne"]["sects"][number];
export type Bx =
  RouterOutputs["customPgs"]["getOne"]["sects"][number]["body"][number];

export type GetBxNonNullableItem<Key extends keyof Bx> = NonNullable<Bx[Key]>;
export type GetBxWithNullableItem<Key extends keyof Bx> = Omit<Bx, Key> & {
  [key in Key]: NonNullable<Bx[Key]>;
};

export type BxTypeMd = GetBxWithNullableItem<"mdBx">;
export type BxTypeQuote = GetBxWithNullableItem<"quoteBx">;
export type BxTypeHeader = GetBxWithNullableItem<"headerBx">;
export type BxTypeImage = GetBxWithNullableItem<"imgBx">;
export type BxTypeIframe = GetBxWithNullableItem<"iframeBx">;
export type BxTypeTabs = GetBxWithNullableItem<"tabs">;
export type BxTypeSlider = GetBxWithNullableItem<"slider">;
export type BxTypeGrid = GetBxWithNullableItem<"grid">;

export type MdBx = BxTypeMd["mdBx"];
export type QuoteBx = BxTypeQuote["quoteBx"];
export type HeaderBx = BxTypeHeader["headerBx"];
export type ImageBx = BxTypeImage["imgBx"];
export type IframeBx = BxTypeIframe["iframeBx"];
export type TabsBx = BxTypeTabs["tabs"];
export type Slider = BxTypeSlider["slider"];
export type Grid = BxTypeSlider["grid"];
export type PgStore = {
  page: Pg;
  utils: {
    setPg: (UpdaterOrValue: Pg | ((UpdaterOrValue: Pg) => Pg)) => void;
  };
};
