import { type BxVariants } from "../appData";

export const SECTIONS_TYPES = ["standard-section"] as const;
export type SECTIONS_TYPE = (typeof SECTIONS_TYPES)[number];
export const SECTIONS_TYPES_map = Object.fromEntries(
  SECTIONS_TYPES.map((item) => [item, item]),
) as {
  [Key in SECTIONS_TYPE]: Key;
};

export const BOXES_TYPES = [
  "two-columns",
  "rows-only",
  "img-only",
  "md",
  "iframe",
  "tabs",
  "slider",
  "quote",
  "grid",
  "header",
] as const;
export type BOXES_TYPE = (typeof BOXES_TYPES)[number];
export const BOXES_TYPES_map = Object.fromEntries(
  BOXES_TYPES.map((item) => [item, item]),
) as {
  [Key in BOXES_TYPE]: Key;
};

export const SUB_BOXES_TYPES = ["youtube", "instagram", "soundcloud"] as const;
export type SUB_BOXES_TYPE = (typeof SUB_BOXES_TYPES)[number];
export const SUB_BOXES_TYPES_map = Object.fromEntries(
  SUB_BOXES_TYPES.map((item) => [item, item]),
) as {
  [Key in SUB_BOXES_TYPE]: Key;
};

// Prisma model done
export type ImageOnly = {
  twClassNameVariants?: BxVariants;
  customPgClassesKeys?: string[];
  ___type: (typeof BOXES_TYPES_map)["img-only"];
  src: string;
  altText?: string;
  width?: number;
  height?: number;
};
// Prisma model done
export type MdBx = {
  twClassNameVariants?: BxVariants;
  customPgClassesKeys?: string[];
  ___type: (typeof BOXES_TYPES_map)["md"];
  content: string;
};
// Prisma model done
export type IframeBx = {
  twClassNameVariants?: BxVariants;
  customPgClassesKeys?: string[];
  ___type: (typeof BOXES_TYPES_map)["iframe"];
  ___subType: SUB_BOXES_TYPE;
  src: string;
  title?: string;
};
// Prisma model done
export type QuoteBx = {
  twClassNameVariants?: BxVariants;
  customPgClassesKeys?: string[];
  ___type: (typeof BOXES_TYPES_map)["quote"];
  cite: string;
  content: string;
};

/**  **/
// Prisma model done
export type TabsBx = {
  twClassNameVariants?: BxVariants;
  customPgClassesKeys?: string[];
  ___type: (typeof BOXES_TYPES_map)["tabs"];
  tabs: {
    title: string;
    data: Exclude<Bx, RowsOnlyBx | TwoColumnsBx>;
  }[];
};
// Prisma model done
export type Slider = {
  twClassNameVariants?: BxVariants;
  customPgClassesKeys?: string[];
  ___type: (typeof BOXES_TYPES_map)["slider"];
  slides: Exclude<Bx, RowsOnlyBx | TwoColumnsBx>[];
  slidesPerViewType?: "default" | "one-slide" | "large-slides"; // ! move to there own enums
};
// Prisma model done
export type Grid = {
  ___type: (typeof BOXES_TYPES_map)["grid"];

  twClassNameVariants?: BxVariants;
  customPgClassesKeys?: string[];
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  items: Exclude<Bx, RowsOnlyBx | TwoColumnsBx>[]; //(ImageOnly | MdBx | IframeBx | QuoteBx)[];
};
// x
export type TwoColumnsBx = {
  twClassNameVariants?: BxVariants;
  customPgClassesKeys?: string[];
  ___type: (typeof BOXES_TYPES_map)["two-columns"];
  columns: (ImageOnly | MdBx)[];
};
// x
export type RowsOnlyBx = {
  ___type: (typeof BOXES_TYPES_map)["rows-only"];

  twClassNameVariants?: BxVariants;
  customPgClassesKeys?: string[];
  rows: Exclude<Bx, RowsOnlyBx>[];
};

// { order: number } &
export type Bx =
  | {
      twClassNameVariants?: BxVariants;
      customPgClassesKeys?: string[];
      ___type: (typeof BOXES_TYPES_map)["header"];
      title: string;
      description?: string | null;
    }
  | ImageOnly
  | MdBx
  | IframeBx
  | QuoteBx
  //
  | TabsBx
  | Slider
  | Grid
  // x
  | RowsOnlyBx
  | TwoColumnsBx;

export type StandardSect = {
  twClassNameVariants?: BxVariants;
  customPgClassesKeys?: string[];
  ___type: (typeof SECTIONS_TYPES_map)["standard-section"];
  title?: string;
  description?: string;
  body: Bx[];
  order: number;
};

export type CustomPg = {
  twClassNameVariants?: BxVariants;
  customPgClassesKeys?: string[];
  slug?: string;
  pgCategoryName: string;
  pageStructure: StandardSect[];
  title?: string | null;
  description?: string | null;
  isActive?: boolean;
  img?: {
    src: string;
    altText?: string;
    width?: number;
    height?: number;
  };
};
