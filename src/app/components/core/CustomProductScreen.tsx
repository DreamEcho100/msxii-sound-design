"use client"
import { cx } from "class-variance-authority";

import { type ReactNode, useEffect, useState } from "react";

import { SwiperSlide } from "swiper/react";

import CustomNextImage from "../CustomNextImage";

import ProductQuantityControllers from "./ProductQuantityControllers";

import { type NextJsLinkProps } from "../Clickable";
import ImageMagnifier from "../ImageMagnifier";
import { type Product } from "~/utils/shopify/types";
import CTAButton from "./Shopify/Cards/CTAButton";
import Slider from "./Shopify/Cards/Slider";
import ProductPrice from "./Shopify/ProductPrice";
import AddToCartButton from "./Shopify/Buttons/AddToCart";
import { Switch } from "@headlessui/react";
import { SoundCloudIframe, YouTubeIFrame } from "../Iframes";
import TextTruncateManager from "../common/TextTruncater";
import { api } from "~/utils/api";
import Clickable from "./Clickable";
import { useExtractDataFromHTMLDescription } from "~/utils/shopify/hooks";
import SectionLoaderContainer from "../LoadersContainers/Section";
import SectionPrimaryLoader from "../Loaders/SectionPrimary";

const ProductRecommendations = (props: { productId: string }) => {
  const getOneProductRecommendations =
    api.shopify.products.getOneRecommendations.useQuery({
      productId: props.productId,
    });

  if (getOneProductRecommendations.isLoading)
    return (
      <SectionLoaderContainer>
        <SectionPrimaryLoader />
      </SectionLoaderContainer>
    );

  if (getOneProductRecommendations.isError)
    return <>{getOneProductRecommendations.error.message}</>;

  const data = getOneProductRecommendations.data;

  return (
    <section className="flex flex-col gap-8">
      <header>
        <h2 className="text-h3 font-normal text-text-primary-400">
          Related products
        </h2>
      </header>
      <Slider
        swiperProps={{
          className: "max-w-full w-full flex-grow",
          slidesPerView: 3,
          breakpoints: {
            400: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
          },
        }}
        isNavButtonsOutside
      >
        {data.map((product) => (
          <SwiperSlide
            key={product.id}
            className="aspect-square items-center justify-center"
            style={{ display: "flex" }}
          >
            <Clickable
              className="block aspect-square w-48 max-w-full transition-all duration-300"
              href={`/products/${product.handle}`}
              isA="next-js"
            >
              <CustomNextImage
                src={product.featuredImage.url}
                alt={product.featuredImage.altText ?? ""}
                width={product.featuredImage.width || 250}
                height={product.featuredImage.height || 250}
                className={cx(
                  "aspect-square h-full w-full object-contain transition-all duration-300",
                  "rounded-md",
                )}
              />
            </Clickable>
          </SwiperSlide>
        ))}
      </Slider>
    </section>
  );
};

// Credit to: <https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7>
const ProductImageShowcase = ({
  productData,
  noCustomWith,
}: {
  productData: Product;
  noCustomWith?: boolean;
}) => {
  const [selectedImage, setSelectedImage] = useState(productData.featuredImage);
  const hasImagesVariations = productData.images.edges.length > 1;

  return (
    <div
      className={cx(
        "flex max-w-full flex-grow flex-col gap-x-2 lg:flex-row",
        noCustomWith
          ? undefined
          : hasImagesVariations
          ? "md:w-8/12 lg:w-6/12"
          : "md:w-5/12",
      )}
    >
      <ImageMagnifier
        src={selectedImage.src}
        // alt={selectedImage.altText ?? ''}
        width={selectedImage.width || 800}
        height={selectedImage.height || 800}
        className="h-full w-full rounded-xl object-contain"
        containerProps={{
          className: cx(
            "aspect-square w-full max-w-[20rem] mx-auto md:max-w-full md:mx-0",
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
};

const CustomProductScreen = ({
  productData,
  children,
  ctaButtonProps = {},
}: {
  children?: ReactNode;
  productData: Product;
  products: Product[];
  // cardsSliderProps?: Partial<Parameters<typeof CardsSlider>[0]>;
  ctaButtonProps?: Partial<NextJsLinkProps>;
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [newViewEnabled, setNewViewEnabled] = useState(false);
  const [isShortDetailsActive, setIsShortDetailsActive] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    productData.variants.edges[0]?.node,
  );
  const { extractDataFromHTMLDescription } = useExtractDataFromHTMLDescription(
    productData.descriptionHtml,
  );

  const htmlDescription = newViewEnabled
    ? extractDataFromHTMLDescription.detailsHTML
    : productData.descriptionHtml || productData.description;
  const description =
    isShortDetailsActive || htmlDescription === productData.description
      ? undefined
      : productData.description;
  const hasVariants = productData.variants.edges.length > 1;

  useEffect(() => {
    if (!extractDataFromHTMLDescription.detailsText) return;

    setIsShortDetailsActive(
      productData.description
        .trim()
        .replace(/\s{2,}/g, " ")
        .slice(0, 50)
        .toLowerCase()
        .startsWith(
          extractDataFromHTMLDescription.detailsText
            .trim()
            .replace(/\s{2,}/g, " ")
            .slice(0, 50)
            .toLowerCase(),
        ),
    );
  }, [extractDataFromHTMLDescription.detailsText, productData.description]);

  return (
    <div className="mx-auto flex w-[140ch] max-w-full flex-col gap-16 overflow-x-hidden px-4 py-8 text-h6 leading-primary-3 text-text-primary-300 sm:px-8 md:py-12 lg:px-12">
      <section className="flex w-full flex-col-reverse justify-between gap-12 md:flex-row-reverse">
        <div
          className={cx(
            "md:text-align-initial my-4 flex flex-grow flex-col gap-2 text-center",
            !hasVariants && !description
              ? "md:py-16"
              : !description
              ? "md:py-12"
              : "",
          )}
        >
          <div className="flex flex-col items-center gap-6 md:items-start">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <h1 className="text-h3 text-text-primary-500">
                {productData.title}
              </h1>
              <div className="mx-auto flex w-fit flex-wrap gap-8 sm:mx-0">
                {selectedVariant && (
                  <p className="whitespace-nowrap text-text-primary-500/60">
                    <ProductPrice
                      price={{
                        amount: Number(selectedVariant.price.amount),
                        currencyCode: selectedVariant.price.currencyCode,
                      }}
                      compareAtPrice={
                        selectedVariant.compareAtPrice && {
                          amount: Number(selectedVariant.compareAtPrice.amount),
                          currencyCode:
                            selectedVariant.compareAtPrice.currencyCode,
                        }
                      }
                    />
                  </p>
                )}
                <ProductQuantityControllers
                  handleIncreaseByOne={() =>
                    setSelectedQuantity((prev) => prev + 1)
                  }
                  handleDecreaseByOne={() =>
                    setSelectedQuantity((prev) => prev - 1)
                  }
                  handleSetSelectedQuantity={setSelectedQuantity}
                  quantity={selectedQuantity}
                />
              </div>
            </div>
            {hasVariants && (
              <div className="grid max-w-full grid-cols-[repeat(auto-fit,minmax(6rem,_0.25fr))] gap-4 md:max-w-[25rem] lg:max-w-full">
                {productData.variants.edges.map(({ node }) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedVariant(node)}
                    className={cx(
                      "h-full w-full",
                      selectedVariant?.title === node.title ? "px-2" : "pt-2",
                    )}
                  >
                    <div
                      className={cx(
                        "w-full",
                        selectedVariant?.title === node.title
                          ? "h-[calc(100%-0,5rem)] rounded-lg text-[90%] ring-4 ring-special-primary-500 transition-all duration-300"
                          : "h-full rounded-md",
                      )}
                    >
                      <CustomNextImage
                        src={node.image.src}
                        alt={node.image.altText}
                        width={node.image.width}
                        height={node.image.height}
                        className={cx(
                          "w-full",
                          selectedVariant?.title === node.title ? "p-0.5" : "",
                        )}
                      />
                      <p className="leading-tight">{node.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            <AddToCartButton
              productVariant={selectedVariant}
              selectedQuantity={selectedQuantity}
              className="uppercase"
              disabled={!productData.availableForSale || selectedQuantity === 0}
              variants={{ btn: "primary" }}
            />
            {!productData.availableForSale && (
              <small className="text-[80%] text-red-500">
                <em>
                  <strong>Not available for sale</strong>
                </em>
              </small>
            )}
            {description && (
              <p className="max-w-[52ch]">
                <TextTruncateManager content={description} />
              </p>
            )}
          </div>
        </div>
        <ProductImageShowcase productData={productData} />
      </section>
      {children ?? (
        <div>
          <div className="flex justify-end">
            <Switch
              checked={newViewEnabled}
              onChange={setNewViewEnabled}
              className={cx(
                newViewEnabled
                  ? "bg-special-primary-500"
                  : "bg-special-primary-900",
                extractDataFromHTMLDescription.detailsHTML.length === 0
                  ? "invisible"
                  : undefined,
                "relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
              )}
            >
              <span className="sr-only">enabled new view</span>
              <span
                aria-hidden="true"
                className={`${
                  newViewEnabled
                    ? "translate-x-6"
                    : "translate-x-0 animate-pulse"
                }
								pointer-events-none
            inline-block h-5 w-5 transform rounded-full bg-bg-primary-500 shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
          <div className="flex flex-col gap-8">
            <div
              className="custom-prose no-custom-max-w p-4"
              dangerouslySetInnerHTML={{
                __html: htmlDescription,
              }}
            />

            {newViewEnabled &&
              extractDataFromHTMLDescription.iframes.soundCloud.length !==
                0 && (
                <section className="mx-auto flex w-full max-w-[140ch] flex-col gap-10 rounded-3xl bg-initial-primary-0 px-16 py-12 text-initial-primary-500">
                  <h2 className="text-h3 font-normal text-initial-primary-500">
                    Preview Samples
                  </h2>
                  <div className="flex flex-col gap-8">
                    {extractDataFromHTMLDescription.iframes.soundCloud.map(
                      (iframeData) => (
                        <article key={productData.id} className="flex gap-8">
                          <SoundCloudIframe {...iframeData} />
                        </article>
                      ),
                    )}
                  </div>
                  <p>+ so many more high quality samples</p>
                </section>
              )}

            {newViewEnabled &&
              extractDataFromHTMLDescription.iframes.youtube.length !== 0 &&
              (extractDataFromHTMLDescription.iframes.youtube.length < 2 ? (
                <div className="grid grid-cols-1">
                  {extractDataFromHTMLDescription.iframes.youtube.map(
                    (iframeData, index) => (
                      <YouTubeIFrame
                        width={iframeData.width}
                        height={iframeData.height}
                        key={index}
                        src={iframeData.src}
                        title={iframeData.title}
                        allow={iframeData.allow}
                        className="w-full"
                      />
                    ),
                  )}
                </div>
              ) : (
                <div>
                  <Slider
                    swiperProps={{
                      className: cx("swiper-fluid"),
                      breakpoints: {
                        400: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                      },
                    }}
                  >
                    {extractDataFromHTMLDescription.iframes.youtube.map(
                      (iframeData, index) => (
                        <SwiperSlide key={index} className="flex flex-col">
                          <YouTubeIFrame
                            width={iframeData.width}
                            height={iframeData.height}
                            src={iframeData.src}
                            title={iframeData.title}
                            allow={iframeData.allow}
                          />
                        </SwiperSlide>
                      ),
                    )}
                  </Slider>
                </div>
              ))}
          </div>
        </div>
      )}
      <article>
        <CTAButton
          text="Explore more high quality packs"
          isA="next-js"
          href="/collections"
          {...ctaButtonProps}
          className="mb-16 mt-4"
        />
        <ProductRecommendations productId={productData.id} />
      </article>
    </div>
  );
};

export default CustomProductScreen;
