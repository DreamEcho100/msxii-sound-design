import { type CSSProperties } from "react";
import { type BoxTypes } from "@prisma/client";
import { type Box, type PageStoreApi } from "./types";
import SectionBox from "./SectionBox";

export function SectionBoxContainer(props: {
  box: Box;
  parentBox?: BoxTypes;
  boxDeepLevel: number;
  path: (string | number)[];
  pageStore: PageStoreApi;
}) {
  return (
    <div
      className="box-container"
      style={
        {
          "--boxDeepLevel": props.boxDeepLevel,
          zIndex: props.boxDeepLevel.toString(),
        } as CSSProperties
      }
    >
      <SectionBox
        box={props.box}
        parentBox={props.parentBox}
        boxDeepLevel={props.boxDeepLevel}
        path={props.path}
        pageStore={props.pageStore}
      />
    </div>
  );
}
