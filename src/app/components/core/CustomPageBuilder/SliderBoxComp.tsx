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
    <Slider
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
      data={box.slides}
      getSlideKey={(_, itemIndex) => itemIndex}
      SlideComp={SlideComp}
      compProps={{ parentBox: box.___type }}
      isNavButtonsOutside
    />
  );
}
