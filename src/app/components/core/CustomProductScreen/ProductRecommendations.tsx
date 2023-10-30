"use client";
import { cx } from "class-variance-authority";
import { type SetStateAction, useState } from "react";
import { type ShopifyImage, type Product } from "~/libs/shopify/types";
import ImageMagnifier from "../../common/ImageMagnifier";
import CustomNextImage from "../../common/CustomNextImage";
import Slider from "../../common/Slider";

const VariantsSlideComp = (props: {
  item: { node: ShopifyImage };
  selectedImage: ShopifyImage;
  setSelectedImage: (value: SetStateAction<ShopifyImage>) => void;
}) => {
  return (
    <button
      className={cx(
        "flex aspect-square w-full items-center justify-center transition-all duration-300",
        "items-center justify-center",
        props.selectedImage.id === props.item.node.id ? "p-2" : "",
      )}
      type="button"
      onClick={() => props.setSelectedImage(props.item.node)}
    >
      <CustomNextImage
        src={props.item.node}
        width={112}
        height={112}
        className={cx(
          "aspect-square h-full w-28 object-contain transition-all duration-300",
          props.selectedImage.id === props.item.node.id
            ? "rounded-lg ring-4 ring-special-primary-500 transition-all duration-300"
            : "rounded-md",
        )}
      />
    </button>
  );
};

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
      {/* <ImageMagnifier
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
      /> */}
      <div
        className={cx(
          "mx-auto w-full max-w-[20rem] md:mx-0 md:max-w-full",
          hasImagesVariations ? "lg:w-[calc(100%-6rem)]" : "",
        )}
      >
        <CustomNextImage
          src={selectedImage.src}
          width={selectedImage.width || 800}
          height={selectedImage.height || 800}
          className="w-full rounded-xl object-contain"
          priority
        />
      </div>
      {hasImagesVariations && (
        <Slider
          data={productData.images.edges}
          verticalOnLG
          breakpoints={{
            1024: {
              direction: "vertical",
            },
          }}
          className="sm:flex-grow"
          slidesPerView={
            productData.images.edges.length < 4
              ? productData.images.edges.length
              : 4
          }
          // spaceBetween={productData.images.edges.length < 4 ? 0 : 0}
          spaceBetween={0}
          isNavButtonsOutside
          containerProps={{
            className:
              "flex-grow min-w-[5rem] max-w-full max-h-[24rem] lg:max-w-[6rem] w-full flex-grow",
          }}
          getSlideKey={(item) => item.node.id}
          SlideComp={VariantsSlideComp}
          compProps={{ selectedImage, setSelectedImage }}
        />
      )}
    </div>
  );
}
