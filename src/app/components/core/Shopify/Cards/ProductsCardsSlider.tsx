"use client";

import Slider, { type SliderProps } from "~/app/components/common/Slider";
import { ProductCard, type ProductCardProps } from "./Card";

type BaseT = SliderProps<ProductCardProps["item"], ProductCardProps>;

type CardsSliderProps = Omit<
  BaseT,
  "children" | "getSlideKey" | "SlideComp" | "item" | "compProps"
> & {
  compProps?: BaseT["compProps"];
};

export default function ProductsCardsSlider(props: CardsSliderProps) {
  return (
    <Slider<ProductCardProps["item"], ProductCardProps>
      SlideComp={ProductCard}
      getSlideKey={(item) => `${item.title} ${item.id}`}
      isNavButtonsOutside
      compProps={{}}
      {...props}
      // nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
      // previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
    />
  );
}
