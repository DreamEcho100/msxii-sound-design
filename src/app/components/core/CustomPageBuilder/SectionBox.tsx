import { type CSSProperties } from "react";

import { cx } from "class-variance-authority";
// import { type BxVariants, handleBxVariants } from "~/utils/appData";
import customPgClasses from "~/app/styles/_custom-page.module.css";

// import { type RouterOutputs } from "~/utils/api";
import { BxTypes } from "@prisma/client";
// import BoxEditOverlay from './BoxEditOverlay';
import CustomTabs from "./CustomTabs";
import { MdBxEditable } from "./Boxes/Md";
import { QuoteBxEditable } from "./Boxes/Quote";
import { HeaderBxEditable } from "./Boxes/Header";
import { ImageBxEditable } from "./Boxes/Image";
import { IframeBxEditable } from "./Boxes/Iframe";
import { SliderEditable } from "./Boxes/Slider";
import { GridEditable } from "./Boxes/Grid";
import { handleBxVariants, type BxVariants } from "~/libs/utils/appData";
import { createBxTypeClass } from "./utils";
import { type Bx, type PgStoreApi } from "./types";

export default function SectBx(props: {
  bx: Bx;
  parentBx?: BxTypes;
  bxDeepLevel: number;
  path: (string | number)[];
  pageStore: PgStoreApi;
}) {
  const newBxDeepLevel = props.bxDeepLevel + 1;
  const customPgClassName = cx(
    createBxTypeClass(props.bx.type),
    handleBxVariants(props.bx.css.twVariants as BxVariants),
    ...(props.bx.css.customClasses
      ? props.bx.css.customClasses?.map((key) => customPgClasses[key])
      : []),
  );

  if (props.bx.type === BxTypes.HEADER && props.bx.headerBx)
    return (
      <HeaderBxEditable
        bxDeepLevel={props.bxDeepLevel}
        parentBx={props.parentBx}
        pageStore={props.pageStore}
        bx={props.bx}
        path={props.path}
      />
    );

  if (props.bx.type === BxTypes.IMAGE && props.bx.imgBx)
    return (
      <ImageBxEditable
        bxDeepLevel={props.bxDeepLevel}
        parentBx={props.parentBx}
        pageStore={props.pageStore}
        bx={props.bx}
        path={props.path}
      />
    );

  if (props.bx.type === BxTypes.MD && props.bx.mdBx)
    return (
      <MdBxEditable
        bxDeepLevel={props.bxDeepLevel}
        parentBx={props.parentBx}
        pageStore={props.pageStore}
        bx={props.bx}
        path={props.path}
      />
    );

  if (props.bx.type === BxTypes.QUOTE && props.bx.quoteBx)
    return (
      <QuoteBxEditable
        bxDeepLevel={props.bxDeepLevel}
        parentBx={props.parentBx}
        pageStore={props.pageStore}
        bx={props.bx}
        path={props.path}
        // It's already passed inside
        // path={[...props.path, 'quoteBx']}
        style={{ "--divider": 1 / 3, "--w": "3rem" } as CSSProperties}
      />
    );

  if (props.bx.type === BxTypes.IFRAME && props.bx.iframeBx)
    return (
      <IframeBxEditable
        bxDeepLevel={props.bxDeepLevel}
        parentBx={props.parentBx}
        pageStore={props.pageStore}
        bx={props.bx}
        path={props.path}
      />
    );

  if (props.bx.type === BxTypes.SLIDER && props.bx.slider)
    return (
      <SliderEditable
        bxDeepLevel={props.bxDeepLevel}
        parentBx={props.parentBx}
        pageStore={props.pageStore}
        bx={props.bx}
        path={props.path}
      />
    );

  if (props.bx.type === BxTypes.GRID && props.bx.grid)
    return (
      <GridEditable
        bxDeepLevel={props.bxDeepLevel}
        parentBx={props.parentBx}
        pageStore={props.pageStore}
        bx={props.bx}
        path={props.path}
      />
    );

  if (props.bx.type === BxTypes.TABS_HOLDER && props.bx.tabs) {
    return (
      <CustomTabs
        bx={props.bx.tabs}
        className={cx(customPgClassName)}
        bxDeepLevel={newBxDeepLevel}
        // childrenAfter={
        // 	<BoxEditOverlay
        // 		bxDeepLevel={props.bxDeepLevel}
        // 		bx={props.bx}
        // 		path={[...props.path, 'tabs']}
        // 		pageStore={props.pageStore}
        // 	/>
        // }
        path={props.path}
        pageStore={props.pageStore}
      />
    );
  }

  throw new Error("Unknown bx type");
}
