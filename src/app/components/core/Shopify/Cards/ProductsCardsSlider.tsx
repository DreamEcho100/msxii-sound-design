"use client";

import Slider, {
  type SliderPropsBase,
  type SliderPropsWithComp,
} from "~/app/components/common/Slider";
import { ProductCard, type ProductCardProps } from "./Card";

type BaseT = SliderPropsBase &
  SliderPropsWithComp<ProductCardProps["item"], ProductCardProps>;

type CardsSliderProps = Omit<
  BaseT,
  "children" | "getSlideKey" | "SlideComp" | "item" | "compProps" | "data"
> & {
  compProps?: BaseT["compProps"];
  data: Required<BaseT["data"]>;
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
