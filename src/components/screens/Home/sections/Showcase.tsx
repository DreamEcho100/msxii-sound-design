import React from "react";
import {
  BasicProductCard,
  ProductExtraDetails,
} from "~/components/shared/core/Cards/Card";
import { Product } from "~/utils/types";
import ProductsSlider from "~/components/shared/core/Cards/Slider";
import Clickable from "~/components/shared/core/Clickable";
import { cx } from "class-variance-authority";

type Props = {};

const ProductCard = (props: { product: Product }) => {
  return (
    <BasicProductCard
      product={props.product}
      extraDetailsElem={<ProductExtraDetails product={props.product} />}
      containerVariants={{ "aspect-ratio": "card" }}
    />
  );
};

const ProductBundleCard = (
  props: Pick<Parameters<typeof BasicProductCard>[0], "product">
) => {
  return (
    <BasicProductCard
      product={props.product}
      containerVariants={{ "aspect-ratio": "video" }}
      // imageVariants={{ "aspect-ratio": "video", "object-fit": "cover" }}
      titleVariants={{ "text-align": "center", "text-size": "lg" }}
    />
  );
};

const HomeShowcaseSection = (props: Props) => {
  return (
    <section className="bg-basic-secondary-500 sm:p-main-p-3">
      <div className="flex flex-col gap-16 bg-basic-secondary-900 p-main-p-3 text-basic-primary-600 sm:rounded-xl">
        <section>
          <header className="flex flex-col gap-8 pl-8 rtl:pr-8 rtl:pl-0">
            <h2 className="text-h1 font-black">New Releases</h2>
            <div className="flex flex-wrap gap-4">
              {[
                { title: "NEW RELEASES", isActive: true },
                { title: "Bundles", isActive: false },
                { title: "Loops", isActive: false },
                { title: "One Shot Drums", isActive: false },
                { title: "Sample Packs", isActive: false },
                { title: "Drum Kits", isActive: false },
                { title: "Instrument Kits", isActive: false },
                { title: "Presets", isActive: false },
              ].map((item) => (
                <Clickable
                  key={item.title}
                  variants={{ btn: null, p: null }}
                  className="relative"
                >
                  {item.title}
                  <div className="absolute inset-0 flex items-end justify-start">
                    <div
                      className={cx(
                        "h-1 translate-y-full bg-special-primary-500",
                        item.isActive ? "w-11/12" : "w-0"
                      )}
                    />
                  </div>
                </Clickable>
              ))}
            </div>
          </header>
          <ProductsSlider CardElem={ProductCard} />
        </section>
        <section>
          <header className="pl-8 rtl:pr-8 rtl:pl-0">
            <h2 className="text-h1 font-black">Bundles</h2>
          </header>
          <ProductsSlider CardElem={ProductCard} />
          <ProductsSlider
            swiperProps={{
              slidesPerView: 1,
              breakpoints: {
                500: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1250: { slidesPerView: 4 },
              },
            }}
            CardElem={ProductBundleCard}
          />
        </section>
      </div>
    </section>
  );
};

export default HomeShowcaseSection;
