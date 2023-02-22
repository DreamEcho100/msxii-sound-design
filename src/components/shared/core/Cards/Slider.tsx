import type { FunctionComponent } from "react";

import { Navigation, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { fakeProductsData } from "~/utils/appData";
import { Product } from "~/utils/types";

type Props<CardElemProps extends Record<string, unknown>> = {
  CardElem: FunctionComponent<CardElemProps & { product: Product }>;
  cardsSharedProps?: CardElemProps;
  swiperProps?: Parameters<typeof Swiper>[0];
};

const ProductsSlider = <CardElemProps extends Record<string, unknown>>({
  CardElem,
  swiperProps = {},
  cardsSharedProps = {} as any, //  Record<string, unknown>,
}: Props<CardElemProps>) => {
  cardsSharedProps;
  return (
    <div>
      <Swiper
        modules={[Navigation, A11y, Autoplay]}
        navigation
        autoplay={{ delay: 7500 }}
        slidesPerView={1}
        breakpoints={{
          500: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1150: { slidesPerView: 5 },
          1400: { slidesPerView: 6 },
        }}
        loop
        {...swiperProps}
      >
        {fakeProductsData.map((item) => (
          <SwiperSlide key={item.key} className="flex flex-col px-4">
            {<CardElem product={item} {...cardsSharedProps} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
