"use client";
import { cx } from "class-variance-authority";
import {
  type BOXES_TYPE,
  type Slider as TSlider,
} from "~/libs/utils/types/custom-page";
import { SectionBodyBox } from "./SectionBodyBox";
import Slider from "../../common/Slider";

const SlideComp = (props: {
  item: TSlider["slides"][number];
  parentBox?: BOXES_TYPE;
}) => <SectionBodyBox box={props.item} parentBox={props.parentBox} />;

export default function SliderBoxComp({
  box,
  className,
}: {
  box: TSlider;
  className: string;
}) {
  return (
    <Slider<(typeof box)["slides"][number], Parameters<typeof SlideComp>[0]>
      className={cx(className, "swiper-fluid")}
      breakpoints={
        box.slidesPerViewType === "large-slides"
          ? {
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
            }
          : box.slidesPerViewType === "one-slide"
          ? { 0: { slidesPerView: 1 } }
          : {
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
              1280: { slidesPerView: 5, spaceBetween: 30 },
            }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data={box.slides}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      getSlideKey={(_, itemIndex) => itemIndex}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      SlideComp={SlideComp}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      compProps={{ parentBox: box.___type }}
      isNavButtonsOutside
    />
  );
}
