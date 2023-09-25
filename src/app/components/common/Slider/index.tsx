"use client";
// import { block } from "million/react";
import { Swiper, type SwiperProps, SwiperSlide } from "swiper/react";

import { Navigation, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "swiper/css";
import { type FC, type Key, type HTMLAttributes, useRef } from "react";
import { cx } from "class-variance-authority";
import CustomNextImage from "~/app/components/common/CustomNextImage";

export type SliderProps<
  Item,
  CompProps extends { item: Item },
> = SwiperProps & {
  data: Item[];
  getSlideKey: (item: Item, itemIndex: number) => Key;
  SlideComp: FC<CompProps>;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  isNavButtonsOutside?: boolean;
  verticalOnLG?: boolean;
  nextSlideButtonClassName?: string;
  previousSlideButtonClassName?: string;
} & (Omit<CompProps, "item"> extends Record<string, never>
    ? { compProps?: CompProps }
    : {
        compProps:
          | Omit<CompProps, "item">
          | ((item: Item, itemIndex: number) => Omit<CompProps, "item">);
      });
/*
https://swiperjs.com/demos
https://swiperjs.com/react#useswiperslide
https://swiperjs.com/blog/using-swiper-element-in-react

https://dev.to/tobysolutions/how-to-use-millionjs-in-a-next-app-1eim
https://million.dev/docs

https://dev.to/mayorstacks/sending-react-emails-using-nextjs-and-the-resend-sdk-sdk-19bd

*/
// const baseEmptyProps: Record<string, unknown> = {}

export default function Slider<Item, CompProps extends { item: Item }>(
  props: SliderProps<Item, CompProps>,
) {
  const {
    containerProps = {},
    isNavButtonsOutside,
    verticalOnLG,
    nextSlideButtonClassName,
    previousSlideButtonClassName,
    getSlideKey,
    SlideComp,
    compProps,
    ..._props
  } = props;
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      {...containerProps}
      className={cx(
        "flex w-full max-w-full gap-4",
        isNavButtonsOutside ? "relative" : "overflow-x-hidden",
        isNavButtonsOutside && verticalOnLG ? "verticalOnLG lg:flex-col" : "",
        containerProps.className,
      )}
    >
      {isNavButtonsOutside && (
        <div
          className={cx(
            "flex items-center justify-center",
            // verticalOnLG ? 'lg:rotate-90 scale-75' : '',
            !isNavButtonsOutside ? "" : "absolute",
            verticalOnLG && isNavButtonsOutside
              ? "lg:left-1/2 lg:right-auto lg:top-0 lg:-translate-x-1/2 lg:-translate-y-full lg:rtl:left-1/2 lg:rtl:right-auto"
              : "",

            isNavButtonsOutside
              ? "left-0 top-1/2 -translate-x-[150%] rtl:left-auto rtl:right-0 rtl:translate-x-[150%]"
              : "",
          )}
        >
          <button
            type="button"
            title="Previous slide."
            // onClick={() => SwiperInstanceRef.current?.slidePrev()}
            ref={navigationPrevRef}
            className={cx(
              "aspect-[1.91/1] h-8 w-4 transition-all duration-150 hover:scale-[1.25] focus:scale-[1.25] rtl:rotate-180",
              verticalOnLG
                ? "scale-75 lg:rotate-90 rtl:lg:rotate-90"
                : "rtl:rotate-180",
              previousSlideButtonClassName,
            )}
          >
            <CustomNextImage
              src="/svgs/left-arrow 2.svg"
              width={50}
              height={100}
              className="h-full w-full object-contain object-center"
            />
          </button>
        </div>
      )}

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        modules={[Navigation, A11y]}
        rewind={true}
        navigation={
          isNavButtonsOutside
            ? {
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }
            : true
        }
        autoplay={{ delay: 7500 }}
        breakpoints={{
          384: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 30 },
          1280: { slidesPerView: 6, spaceBetween: 50 },
        }}
        style={{
          padding: isNavButtonsOutside ? "0 1rem" : undefined,
        }}
        {..._props}
        className={cx("w-full", _props.className)}
      >
        {props.data.map((item, itemIndex) => (
          <SwiperSlide key={getSlideKey(item, itemIndex)}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <SlideComp
              item={item}
              {...(typeof compProps === "function"
                ? compProps(item, itemIndex)
                : compProps)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {isNavButtonsOutside && (
        <div
          className={cx(
            "flex items-center justify-center",
            // verticalOnLG ? 'lg:rotate-90 scale-75' : '',
            !isNavButtonsOutside ? "" : "absolute",
            verticalOnLG && isNavButtonsOutside
              ? "lg:left-1/2 lg:right-auto lg:top-full lg:-translate-x-1/2 lg:translate-y-0 lg:rtl:left-1/2 lg:rtl:right-auto"
              : "",

            isNavButtonsOutside
              ? "right-0 top-1/2 translate-x-[150%] rtl:left-0 rtl:right-auto rtl:-translate-x-[150%]"
              : "",
          )}
        >
          <button
            type="button"
            title="Next slide."
            // onClick={() => SwiperInstanceRef.current?.slideNext()}
            ref={navigationNextRef}
            className={cx(
              "aspect-[1.91/1] h-8 w-4 transition-all duration-150 hover:scale-[1.25] focus:scale-[1.25]",
              verticalOnLG
                ? "scale-75 lg:rotate-90 rtl:lg:rotate-90"
                : "rtl:rotate-180",
              nextSlideButtonClassName,
            )}
          >
            <CustomNextImage
              src="/svgs/right-arrow 2.svg"
              width={50}
              height={100}
              className="h-full w-full object-contain object-center"
            />
          </button>
        </div>
      )}
    </div>
  );
}
