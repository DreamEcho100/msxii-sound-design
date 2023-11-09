"use client";

import { type ReactNode } from "react";
import { handleBxVariants } from "~/libs/utils/appData";
import { cx } from "class-variance-authority";
import { createStore } from "zustand";
import { type BxVariants } from "~/libs/utils/appData";
import { type PgStoreApi, type PgStore, type Pg, type Sect } from "./types";
import { SectionBoxContainer } from "./SectionBoxContainer";
import customPgClasses from "~/app/styles/custom-page.module.css";

type Props = {
  pg: Pg;
  children?: ReactNode;
  path?: (string | number)[];
};

function SectBody(props: {
  sect: Sect;
  bxDeepLevel?: number;
  path: (string | number)[];
  pageStore: PgStoreApi;
}) {
  const bxDeepLevel = props.bxDeepLevel ?? 1;
  return (
    <section
      className={cx(
        "flex flex-col",
        handleBxVariants(props.sect.css.twVariants as BxVariants),
        ...(props.sect.css.customClasses
          ? props.sect.css.customClasses.map((key) => customPgClasses[key])
          : []),
      )}
    >
      {props.sect.body.map((bx, bxIndex) => {
        return (
          <SectionBoxContainer
            key={bx.id}
            bx={bx}
            bxDeepLevel={bxDeepLevel}
            path={[...props.path, "body", bxIndex]}
            pageStore={props.pageStore}
          />
        );
      })}
    </section>
  );
}

export default function CustomPgBuilder(props: Props): React.JSX.Element {
  const pageStore = createStore<PgStore>((set) => ({
    page: props.pg,
    utils: {
      setPg: (UpdaterOrValue) =>
        set((prevState: PgStore) => ({
          page:
            typeof UpdaterOrValue === "function"
              ? UpdaterOrValue(prevState.page)
              : UpdaterOrValue,
        })),
    },
  }));

  return (
    <div
      className={handleBxVariants({
        ...(props.pg.css.twVariants as BxVariants),
        className: "flex flex-col text-h6 text-text-primary-400",
      })}
    >
      {props.pg.sects.map((section, index) => (
        <SectBody
          key={section.id}
          sect={section}
          path={[...(props.path ?? []), "sects", index]}
          pageStore={pageStore}
        />
      ))}
      {props.children}
    </div>
  );
}
