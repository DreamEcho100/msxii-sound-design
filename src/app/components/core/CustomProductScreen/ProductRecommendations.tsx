"use client";
import { cx } from "class-variance-authority";
import { useState } from "react";
import { type Product } from "~/libs/shopify/types";
import ImageMagnifier from "../../common/ImageMagnifier";
import Slider from "../Shopify/Cards/Slider";
import { SwiperSlide } from "swiper/react";
import CustomNextImage from "../../common/CustomNextImage";

// Credit to: <https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7>
export default function ProductImageShowcase({
  productData,
  noCustomWith,
}: {
  productData: Product;
  noCustomWith?: boolean;
}) {
  const [selectedImage, setSelectedImage] = useState(productData.featuredImage);
  const hasImagesVariations = productData.images.edges.length > 1;

  return (
    <div
      className={cx(
        "flex max-w-full flex-grow flex-col gap-x-2 sm:min-w-[20rem] lg:flex-row",
        noCustomWith
          ? undefined
          : hasImagesVariations
          ? "md:w-8/12 lg:w-6/12"
          : "md:w-5/12",
      )}
    >
      <ImageMagnifier
        src={selectedImage.src}
        width={selectedImage.width || 800}
        height={selectedImage.height || 800}
        className="w-full rounded-xl object-contain"
        containerProps={{
          className: cx(
            "w-full max-w-[20rem] mx-auto md:max-w-full md:mx-0",
            hasImagesVariations ? "lg:w-[calc(100%-6rem)]" : "",
          ),
        }}
        priority
      />
      {hasImagesVariations && (
        <Slider
          verticalOnLG
          swiperProps={{
            className:
              "max-w-full max-h-[24rem] lg:max-w-[6rem] w-full flex-grow",
            breakpoints: {
              1024: {
                direction: "vertical",
              },
            },
            slidesPerView: 4,
            spaceBetween: 8,
          }}
          isNavButtonsOutside
          containerProps={{
            className: "flex-grow min-w-[5rem]",
          }}
        >
          {productData.images.edges.map(({ node }) => (
            <SwiperSlide
              key={node.id}
              className="aspect-square items-center justify-center"
              style={{ display: "flex" }}
            >
              <button
                className={cx(
                  "block aspect-square w-28 max-w-full transition-all duration-300",
                  selectedImage === node ? "p-2" : "",
                )}
                type="button"
                onClick={() => setSelectedImage(node)}
              >
                <CustomNextImage
                  src={node}
                  width={112}
                  height={112}
                  className={cx(
                    "aspect-square h-full w-full object-contain transition-all duration-300",
                    selectedImage === node
                      ? "rounded-lg ring-4 ring-special-primary-500 transition-all duration-300"
                      : "rounded-md",
                  )}
                />
              </button>
            </SwiperSlide>
          ))}
        </Slider>
      )}
    </div>
  );
}
