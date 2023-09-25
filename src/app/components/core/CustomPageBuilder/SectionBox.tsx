import { type CSSProperties } from "react";

import { cx } from "class-variance-authority";
// import { type BoxVariants, handleBoxVariants } from "~/utils/appData";
import customPageClasses from "~/app/styles/_custom-page.module.css";

// import { type RouterOutputs } from "~/utils/api";
import { BoxTypes } from "@prisma/client";
// import BoxEditOverlay from './BoxEditOverlay';
import CustomTabs from "./CustomTabs";
import { MdBoxEditable } from "./Boxes/Md";
import { QuoteBoxEditable } from "./Boxes/Quote";
import { HeaderBoxEditable } from "./Boxes/Header";
import { ImageBoxEditable } from "./Boxes/Image";
import { IframeBoxEditable } from "./Boxes/Iframe";
import { SliderEditable } from "./Boxes/Slider";
import { GridEditable } from "./Boxes/Grid";
import { handleBoxVariants, type BoxVariants } from "~/libs/utils/appData";
import { createBoxTypeClass } from "./utils";
import { type Box, type PageStoreApi } from "./types";

export default function SectionBox(props: {
  box: Box;
  parentBox?: BoxTypes;
  boxDeepLevel: number;
  path: (string | number)[];
  pageStore: PageStoreApi;
}) {
  const newBoxDeepLevel = props.boxDeepLevel + 1;
  const customPageClassName = cx(
    createBoxTypeClass(props.box.type),
    handleBoxVariants(props.box.css.twVariants as BoxVariants),
    ...(props.box.css.customClasses
      ? props.box.css.customClasses?.map((key) => customPageClasses[key])
      : []),
  );

  if (props.box.type === BoxTypes.HEADER && props.box.headerBox)
    return (
      <HeaderBoxEditable
        boxDeepLevel={props.boxDeepLevel}
        parentBox={props.parentBox}
        pageStore={props.pageStore}
        box={props.box}
        path={props.path}
      />
    );

  if (props.box.type === BoxTypes.IMAGE && props.box.imageBox)
    return (
      <ImageBoxEditable
        boxDeepLevel={props.boxDeepLevel}
        parentBox={props.parentBox}
        pageStore={props.pageStore}
        box={props.box}
        path={props.path}
      />
    );

  if (props.box.type === BoxTypes.MD && props.box.mdBox)
    return (
      <MdBoxEditable
        boxDeepLevel={props.boxDeepLevel}
        parentBox={props.parentBox}
        pageStore={props.pageStore}
        box={props.box}
        path={props.path}
      />
    );

  if (props.box.type === BoxTypes.QUOTE && props.box.quoteBox)
    return (
      <QuoteBoxEditable
        boxDeepLevel={props.boxDeepLevel}
        parentBox={props.parentBox}
        pageStore={props.pageStore}
        box={props.box}
        path={props.path}
        // It's already passed inside
        // path={[...props.path, 'quoteBox']}
        style={{ "--divider": 1 / 3, "--w": "3rem" } as CSSProperties}
      />
    );

  if (props.box.type === BoxTypes.IFRAME && props.box.iframeBox)
    return (
      <IframeBoxEditable
        boxDeepLevel={props.boxDeepLevel}
        parentBox={props.parentBox}
        pageStore={props.pageStore}
        box={props.box}
        path={props.path}
      />
    );

  if (props.box.type === BoxTypes.SLIDER && props.box.slider)
    return (
      <SliderEditable
        boxDeepLevel={props.boxDeepLevel}
        parentBox={props.parentBox}
        pageStore={props.pageStore}
        box={props.box}
        path={props.path}
      />
    );

  if (props.box.type === BoxTypes.GRID && props.box.grid)
    return (
      <GridEditable
        boxDeepLevel={props.boxDeepLevel}
        parentBox={props.parentBox}
        pageStore={props.pageStore}
        box={props.box}
        path={props.path}
      />
    );

  if (props.box.type === BoxTypes.TABS_HOLDER && props.box.tabs) {
    return (
      <CustomTabs
        box={props.box.tabs}
        className={cx(customPageClassName)}
        boxDeepLevel={newBoxDeepLevel}
        // childrenAfter={
        // 	<BoxEditOverlay
        // 		boxDeepLevel={props.boxDeepLevel}
        // 		box={props.box}
        // 		path={[...props.path, 'tabs']}
        // 		pageStore={props.pageStore}
        // 	/>
        // }
        path={props.path}
        pageStore={props.pageStore}
      />
    );
  }

  throw new Error("Unknown box type");
}
