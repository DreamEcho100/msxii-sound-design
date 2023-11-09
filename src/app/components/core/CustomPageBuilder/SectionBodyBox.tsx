"use client";
export { default as CustomPageBuilder_ } from ".";
import { type CSSProperties } from "react";

import { cx } from "class-variance-authority";
import customPgClasses from "~/app/styles/custom-page.module.css";
import {
  type BOXES_TYPE,
  BOXES_TYPES_map,
  type Bx,
  SUB_BOXES_TYPES_map,
} from "~/libs/utils/types/custom-page";
import {
  InstagramIframe,
  SoundCloudIframe,
  YouTubeIFrame,
} from "../../common/Iframes";
import { handleBxVariants } from "~/libs/utils/appData";
import CustomNextImage from "../../common/CustomNextImage";
import ReactMarkdownFormatter from "../../common/ReactMarkdownFormatter";
import Quote from "./Quote";
import { createBxTypeClass } from "./utils";
import TabsBoxComp from "./TabsBox";
import SliderBoxComp from "./SliderBoxComp";

export const SectBodyBx = ({
  bx,
  parentBx,
}: {
  bx: Bx;
  parentBx?: BOXES_TYPE;
}) => {
  const customPgClassName = cx(
    createBxTypeClass(bx.___type),
    handleBxVariants(bx.twClassNameVariants),
    ...(bx.customPgClassesKeys
      ? bx.customPgClassesKeys?.map((key) => customPgClasses[key])
      : []),
  );

  if (bx.___type === BOXES_TYPES_map["two-columns"])
    return (
      <div className={cx(customPgClassName)}>
        {bx.columns.map((column, index) => (
          <SectBodyBx key={index} bx={column} parentBx={bx.___type} />
        ))}
      </div>
    );

  if (bx.___type === BOXES_TYPES_map["rows-only"])
    return (
      <div className={cx(customPgClassName)}>
        {bx.rows.map((row, index) => (
          <SectBodyBx key={index} bx={row} parentBx={bx.___type} />
        ))}
      </div>
    );

  if (bx.___type === BOXES_TYPES_map["img-only"])
    return (
      <div className={cx(customPgClassName)}>
        <CustomNextImage src={bx.src} width={800} height={800} />
      </div>
    );

  if (bx.___type === BOXES_TYPES_map.md)
    return (
      <div className={cx(customPgClassName)}>
        <ReactMarkdownFormatter content={bx.content} />
      </div>
    );

  if (bx.___type === BOXES_TYPES_map.quote)
    return (
      <Quote
        className={cx(customPgClassName)}
        style={{ "--divider": 1 / 3, "--w": "3rem" } as CSSProperties}
        bx={bx}
      />
    );

  if (bx.___type === BOXES_TYPES_map.tabs) {
    return <TabsBoxComp bx={bx} className={cx(customPgClassName)} />;
  }

  if (bx.___type === BOXES_TYPES_map.iframe) {
    if (bx.___subType === SUB_BOXES_TYPES_map.youtube)
      return (
        <YouTubeIFrame
          containerProps={{
            className: cx(
              "w-full rounded-3xl overflow-hidden relative isolate",
              customPgClassName,
            ),
          }}
          youTubeIconVariants={{
            fontSize: parentBx === BOXES_TYPES_map.slider ? "small" : "medium",
          }}
          width={parentBx === BOXES_TYPES_map.slider ? "200" : "550"}
          height={parentBx === BOXES_TYPES_map.slider ? "200" : "550"}
          src={bx.src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      );
    if (bx.___subType === SUB_BOXES_TYPES_map.instagram)
      return <InstagramIframe src={bx.src} className={customPgClassName} />;
    if (bx.___subType === SUB_BOXES_TYPES_map.soundcloud)
      return <SoundCloudIframe src={bx.src} className={customPgClassName} />;
  }

  if (bx.___type === BOXES_TYPES_map.slider) {
    return (
      <div className={customPgClassName}>
        <SliderBoxComp
          bx={bx}
          className={cx(customPgClassName, customPgClasses.swiper)}
        />
      </div>
    );
  }

  if (bx.___type === BOXES_TYPES_map.grid) {
    return (
      <div
        className={customPgClassName}
        style={{
          gridTemplateColumns: bx.gridTemplateColumns,
          gridTemplateRows: bx.gridTemplateRows,
        }}
      >
        {bx.items.map((item, index) => (
          <SectBodyBx key={index} bx={item} parentBx={bx.___type} />
        ))}
      </div>
    );
  }

  return <></>;
};
