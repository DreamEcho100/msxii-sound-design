"use client";

import { type ReactNode } from "react";
import { handleBoxVariants } from "~/libs/utils/appData";
import { cx } from "class-variance-authority";
import { createStore } from "zustand";
import { type BoxVariants } from "~/libs/utils/appData";
import {
  type PageStoreApi,
  type PageStore,
  type Page,
  type Section,
} from "./types";
import { SectionBoxContainer } from "./SectionBoxContainer";
import customPageClasses from "~/app/styles/custom-page.module.css";

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
