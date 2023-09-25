"use client";

import { default as CurrentSlider } from "~/app/components/core/Shopify/Cards/Slider";
import Slider from "./Slider";
import { SwiperSlide } from "swiper/react";

type Item = {
  id: string;
  name: number;
  description: string;
};

const SlideComp = (props: { item: Item; test: string }) => {
  return (
    <div className="h-15 flex w-full flex-col items-center justify-center text-center">
      <p>{props.item.name}</p>
      <pre>{props.item.description}</pre>
    </div>
  );
};

const TestCurrentSlider = (props: { data: Item[] }) => {
  return (
    <CurrentSlider isNavButtonsOutside>
      {props.data.map((item) => (
        <SwiperSlide key={item.id} className="flex flex-col">
          <SlideComp item={item} test="Test" />
        </SwiperSlide>
      ))}
    </CurrentSlider>
  );
};

const TestCurrentSlider2 = (props: { data: Item[] }) => {
  return (
    <CurrentSlider
      isNavButtonsOutside
      verticalOnLG
      swiperProps={{
        className: "max-h-[24rem] max-w-[6rem]",
        breakpoints: {
          1024: {
            direction: "vertical",
          },
        },
      }}
    >
      {props.data.map((item) => (
        <SwiperSlide key={item.id} className="flex flex-col">
          <SlideComp item={item} test="Test" />
        </SwiperSlide>
      ))}
    </CurrentSlider>
  );
};

export default function Screen(props: { data: Item[] }) {
  return (
    <div className="flex flex-col gap-8 px-8">
      <Slider
        className="nav-button-outside"
        data={props.data}
        getSlideKey={(item) => item.id}
        SlideComp={SlideComp}
        compProps={(item) => ({ test: item.name + " lol" })}
        isNavButtonsOutside
      />
      <Slider
        className="nav-button-outside"
        data={props.data}
        getSlideKey={(item) => item.id}
        SlideComp={SlideComp}
        compProps={(item) => ({ test: item.name + " lol" })}
      />
      {/* <TestCurrentSlider data={props.data} />
      <TestCurrentSlider2 data={props.data} /> */}
      <Slider
        className="nav-button-outside max-h-[24rem] max-w-[6rem]"
        data={props.data}
        getSlideKey={(item) => item.id}
        SlideComp={SlideComp}
        compProps={(item) => ({ test: item.name + " lol" })}
        isNavButtonsOutside
        verticalOnLG
        direction="horizontal"
        breakpoints={{
          1024: {
            direction: "vertical",
          },
        }}
      />
    </div>
  );
}
