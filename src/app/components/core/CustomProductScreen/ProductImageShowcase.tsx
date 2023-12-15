"use client";
import { cx } from "class-variance-authority";
import { type SetStateAction, useState } from "react";
import { type ShopifyImage, type Product } from "~/libs/shopify/types";
import CustomNextImage from "../../common/CustomNextImage";
import { AspectRatio } from "../../common/ui/aspect-ratio";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const VariantsSlideComp = (props: {
  item: { node: ShopifyImage };
  selectedImage: ShopifyImage;
  setSelectedImage: (value: SetStateAction<ShopifyImage>) => void;
  containerClassName?: string
}) => {
  return (
    <div className={cx("flex h-full w-full items-center justify-center", props.containerClassName)}>
      <AspectRatio ratio={1} className="flex items-center justify-center">
        <button
          className={cx(
            "flex h-full w-full items-center justify-center transition-all duration-300",
            "items-center justify-center",
            props.selectedImage.id === props.item.node.id ? "p-1.5" : "",
          )}
          type="button"
          onClick={() => props.setSelectedImage(props.item.node)}
        >
          <CustomNextImage
            src={props.item.node.url}
            width={112}
            height={112}
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
        "flex max-w-full flex-grow flex-col gap-4 sm:min-w-[20rem] lg:flex-row",
        props.noCustomWith
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
          src={selectedImage.url}
          width={selectedImage.width || 800}
          height={selectedImage.height || 800}
          className="w-full rounded-xl object-contain"
          priority
        />
      </div>
      {hasImagesVariations && (
        <>
          <div className="hidden flex-grow lg:flex no-custom-swiper h-[28rem] max-h-full">
            <Swiper
              modules={[Navigation, A11y]}
              rewind={true}
              direction="vertical"
              navigation={true}
              autoplay={{ delay: 7500 }}
              slidesPerView={4}
              loopAddBlankSlides
              spaceBetween={8}
              style={{ padding: '1rem 0' }}
            >
              {props.productData.images.edges.map((item) => {
                return (
                  <SwiperSlide key={item.node.id}>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <VariantsSlideComp
                      item={item}
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                      containerClassName='mb-1.5'
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="lg:hidden no-custom-swiper">
            <AspectRatio ratio={16 / 9} className="mx-auto max-h-[14rem]">
              <Swiper
                modules={[Navigation, A11y]}
                rewind={true}
                navigation={true}
                autoplay={{ delay: 7500 }}
                slidesPerView={4}
                loopAddBlankSlides
                spaceBetween={14}
                style={{ padding: '0 1rem' }}
              >
                {props.productData.images.edges.map((item) => {
                  return (
                    <SwiperSlide key={item.node.id}>
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                      <VariantsSlideComp
                        item={item}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        containerClassName='px-1'
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </AspectRatio>
          </div>
        </>
      )}
    </div>
  );
}
