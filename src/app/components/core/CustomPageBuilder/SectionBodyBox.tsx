"use client";
export { default as CustomPageBuilder_ } from ".";
import { type CSSProperties } from "react";

import { cx } from "class-variance-authority";
import customPageClasses from "~/app/styles/custom-page.module.css";
import {
  type BOXES_TYPE,
  BOXES_TYPES_map,
  type Box,
  SUB_BOXES_TYPES_map,
} from "~/libs/utils/types/custom-page";
import {
  InstagramIframe,
  SoundCloudIframe,
  YouTubeIFrame,
} from "../../common/Iframes";
import { handleBoxVariants } from "~/libs/utils/appData";
import CustomNextImage from "../../common/CustomNextImage";
import ReactMarkdownFormatter from "../../common/ReactMarkdownFormatter";
import Quote from "./Quote";
import { createBoxTypeClass } from "./utils";
import TabsBoxComp from "./TabsBox";
import SliderBoxComp from "./SliderBoxComp";

export const SectionBodyBox = ({
  box,
  parentBox,
}: {
  box: Box;
  parentBox?: BOXES_TYPE;
}) => {
  const customPageClassName = cx(
    createBoxTypeClass(box.___type),
    handleBoxVariants(box.twClassNameVariants),
    ...(box.customPageClassesKeys
      ? box.customPageClassesKeys?.map((key) => customPageClasses[key])
      : []),
  );

  if (box.___type === BOXES_TYPES_map["two-columns"])
    return (
      <div className={cx(customPageClassName)}>
        {box.columns.map((column, index) => (
          <SectionBodyBox key={index} box={column} parentBox={box.___type} />
        ))}
      </div>
    );

  if (box.___type === BOXES_TYPES_map["rows-only"])
    return (
      <div className={cx(customPageClassName)}>
        {box.rows.map((row, index) => (
          <SectionBodyBox key={index} box={row} parentBox={box.___type} />
        ))}
      </div>
    );

  if (box.___type === BOXES_TYPES_map["image-only"])
    return (
      <div className={cx(customPageClassName)}>
        <CustomNextImage src={box.src} width={800} height={800} />
      </div>
    );

  if (box.___type === BOXES_TYPES_map.md)
    return (
      <div className={cx(customPageClassName)}>
        <ReactMarkdownFormatter content={box.content} />
      </div>
    );

  if (box.___type === BOXES_TYPES_map.quote)
    return (
      <Quote
        className={cx(customPageClassName)}
        style={{ "--divider": 1 / 3, "--w": "3rem" } as CSSProperties}
        box={box}
      />
    );

  if (box.___type === BOXES_TYPES_map.tabs) {
    return <TabsBoxComp box={box} className={cx(customPageClassName)} />;
  }

  if (box.___type === BOXES_TYPES_map.iframe) {
    if (box.___subType === SUB_BOXES_TYPES_map.youtube)
      return (
        <YouTubeIFrame
          containerProps={{
            className: cx(
              "w-full rounded-3xl overflow-hidden relative isolate",
              customPageClassName,
            ),
          }}
          youTubeIconVariants={{
            fontSize: parentBox === BOXES_TYPES_map.slider ? "small" : "medium",
          }}
          width={parentBox === BOXES_TYPES_map.slider ? "200" : "550"}
          height={parentBox === BOXES_TYPES_map.slider ? "200" : "550"}
          src={box.src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      );
    if (box.___subType === SUB_BOXES_TYPES_map.instagram)
      return <InstagramIframe src={box.src} className={customPageClassName} />;
    if (box.___subType === SUB_BOXES_TYPES_map.soundcloud)
      return <SoundCloudIframe src={box.src} className={customPageClassName} />;
  }

  if (box.___type === BOXES_TYPES_map.slider) {
    return (
      <div className={customPageClassName}>
        <SliderBoxComp
          box={box}
          className={cx(customPageClassName, customPageClasses.swiper)}
        />
      </div>
    );
  }

  if (box.___type === BOXES_TYPES_map.grid) {
    return (
      <div
        className={customPageClassName}
        style={{
          gridTemplateColumns: box.gridTemplateColumns,
          gridTemplateRows: box.gridTemplateRows,
        }}
      >
        {box.items.map((item, index) => (
          <SectionBodyBox key={index} box={item} parentBox={box.___type} />
        ))}
      </div>
    );
  }

  return <></>;
};
