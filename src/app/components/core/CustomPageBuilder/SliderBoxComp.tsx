"use client";
import { cx } from "class-variance-authority";
import { type Slider as TSlider } from "~/libs/utils/types/custom-page";
import Slider from "../Shopify/Cards/Slider";
import { SwiperSlide } from "swiper/react";
import { SectionBodyBox } from "./SectionBodyBox";

export default function SliderBoxComp({
  box,
  className,
}: {
  box: TSlider;
  className: string;
}) {
  return (
    <Slider
      swiperProps={{
        className: cx(className, "swiper-fluid"),
        breakpoints:
          box.slidesPerViewType === "large-slides"
            ? {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }
            : box.slidesPerViewType === "one-slide"
            ? { 0: { slidesPerView: 1 } }
            : {
                400: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              },
      }}
    >
      {box.slides.map((slide, index) => (
        <SwiperSlide key={index} className="flex flex-col">
          <SectionBodyBox box={slide} parentBox={box.___type} />
        </SwiperSlide>
      ))}
    </Slider>
  );
}
