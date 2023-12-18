"use client";
import { cx } from "class-variance-authority";
import { type SetStateAction, useState } from "react";
import { type ShopifyImage, type Product } from "~/libs/shopify/types";
import CustomNextImage from "../../common/CustomNextImage";
import { AspectRatio } from "../../common/ui/aspect-ratio";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const VariantsSlideComp = (props: {
  item: { node: ShopifyImage };
  selectedImage: ShopifyImage;
  setSelectedImage: (value: SetStateAction<ShopifyImage>) => void;
  containerClassName?: string;
}) => {
  return (
    <div
      className={cx(
        "mx-auto flex h-full w-full items-center justify-center",
        props.containerClassName,
      )}
    >
      <AspectRatio ratio={1}>
        <button
          className={cx(
            "flex h-full w-full transition-all duration-300",
            // props.selectedImage.id === props.item.node.id ? "p-1.5" : "",
          )}
          type="button"
          onClick={() => props.setSelectedImage(props.item.node)}
        >
          <CustomNextImage
            src={props.item.node.url}
            width={115}
            height={115}
            className={cx(
              "aspect-square h-full w-full object-contain transition-all duration-300",
              props.selectedImage.id === props.item.node.id
                ? "rounded-lg ring-4 ring-special-primary-500 transition-all duration-300"
                : "rounded-md",
            )}
          />
        </button>
      </AspectRatio>
    </div>
  );
};

// Credit to: <https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7>
export default function ProductImageShowcase(props: {
  productData: Product;
  noCustomWith?: boolean;
}) {
  const [selectedImage, setSelectedImage] = useState(
    props.productData.featuredImage,
  );
  const hasImagesVariations = props.productData.images.edges.length > 1;

  return (
    <div
      className={cx(
        "flex max-w-full flex-grow flex-col gap-4 sm:min-w-[20rem] lg:flex-row lg:gap-0",
        props.noCustomWith
          ? undefined
          : hasImagesVariations
            ? "md:w-8/12 lg:w-6/12"
            : "md:w-5/12",
      )}
    >
      <div
        className={cx(
          "mx-auto w-full max-w-[20rem] md:mx-0 md:max-w-full",
          hasImagesVariations ? "lg:w-[calc(100%-6rem)]" : "",
        )}
      >
        <CustomNextImage
          src={selectedImage.url}
          width={selectedImage.width || 800}
          height={selectedImage.height || 800}
          className="w-full rounded-xl object-contain"
          priority
        />
      </div>
      {hasImagesVariations && (
        <>
          <div className="hidden h-full max-h-[24rem] flex-grow lg:flex">
            <Swiper
              modules={[Navigation, A11y]}
              rewind
              direction="vertical"
              navigation
              autoplay={{ delay: 7500 }}
              slidesPerView={4}
              mousewheel
              loopAddBlankSlides
              style={{ padding: "0.75rem 0" }}
            >
              {props.productData.images.edges.map((item) => {
                return (
                  <SwiperSlide
                    key={item.node.id}
                    className="swiper-slide-flex items-center justify-center"
                  >
                    <VariantsSlideComp
                      item={item}
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                      containerClassName="max-w-[4rem] max-h-[4rem]"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="mx-auto w-full max-w-[30rem] lg:hidden">
            <Swiper
              modules={[Navigation, A11y]}
              rewind
              navigation
              autoplay={{ delay: 7500 }}
              slidesPerView={4}
              mousewheel
              loopAddBlankSlides
              spaceBetween={14}
              style={{ padding: "0 1rem" }}
            >
              {props.productData.images.edges.map((item) => {
                return (
                  <SwiperSlide key={item.node.id}>
                    <VariantsSlideComp
                      item={item}
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                      containerClassName="px-1 max-h-[6rem] max-w-[6rem]"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
}
