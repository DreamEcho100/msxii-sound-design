"use client";

import { type ReactNode } from "react";
import { handleBoxVariants } from "~/libs/utils/appData";
import { type RouterOutputs } from "~/server/api/root";
import { cx } from "class-variance-authority";
import { createStore } from "zustand";
import { type BoxVariants } from "~/libs/utils/appData";
import { type PageStoreApi, type PageStore } from "./types";
import { SectionBoxContainer } from "./SectionBoxContainer";
import customPageClasses from "~/app/styles/custom-page.module.css";

type Page = RouterOutputs["customPages"]["_getOne"];
export type Css = Page["css"];
export type Section =
  RouterOutputs["customPages"]["_getOne"]["sections"][number];
export type Box =
  RouterOutputs["customPages"]["_getOne"]["sections"][number]["body"][number];

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

type Props = {
  page: Page;
  children?: ReactNode;
  path?: (string | number)[];
};

function SectionBody(props: {
  section: Section;
  boxDeepLevel?: number;
  path: (string | number)[];
  pageStore: PageStoreApi;
}) {
  const boxDeepLevel = props.boxDeepLevel ?? 1;
  return (
    <section
      className={cx(
        "flex flex-col",
        handleBoxVariants(props.section.css.twVariants as BoxVariants),
        ...(props.section.css.customClasses
          ? props.section.css.customClasses.map((key) => customPageClasses[key])
          : []),
      )}
    >
      {props.section.body.map((box, boxIndex) => {
        return (
          <SectionBoxContainer
            key={box.id}
            box={box}
            boxDeepLevel={boxDeepLevel}
            path={[...props.path, "body", boxIndex]}
            pageStore={props.pageStore}
          />
        );
      })}
    </section>
  );
}

export default function CustomPageBuilder(props: Props): React.JSX.Element {
  const pageStore = createStore<PageStore>((set) => ({
    page: props.page,
    utils: {
      setPage: (UpdaterOrValue) =>
        set((prevState: PageStore) => ({
          page:
            typeof UpdaterOrValue === "function"
              ? UpdaterOrValue(prevState.page)
              : UpdaterOrValue,
        })),
    },
  }));

  return (
    <div
      className={handleBoxVariants({
        ...(props.page.css.twVariants as BoxVariants),
        className: "flex flex-col text-h6 text-text-primary-400",
      })}
    >
      {props.page.sections.map((section, index) => (
        <SectionBody
          key={section.id}
          section={section}
          path={[...(props.path ?? []), "sections", index]}
          pageStore={pageStore}
        />
      ))}
      {props.children}
    </div>
  );
}
