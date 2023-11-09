import { type CSSProperties } from "react";
import { type BxTypes } from "@prisma/client";
import { type Bx, type PgStoreApi } from "./types";
import SectBx from "./SectionBox";

export function SectionBoxContainer(props: {
  bx: Bx;
  parentBx?: BxTypes;
  bxDeepLevel: number;
  path: (string | number)[];
  pageStore: PgStoreApi;
}) {
  return (
    <div
      className="bx-container"
      style={
        {
          "--bxDeepLevel": props.bxDeepLevel,
          zIndex: props.bxDeepLevel.toString(),
        } as CSSProperties
      }
    >
      <SectBx
        bx={props.bx}
        parentBx={props.parentBx}
        bxDeepLevel={props.bxDeepLevel}
        path={props.path}
        pageStore={props.pageStore}
      />
    </div>
  );
}
