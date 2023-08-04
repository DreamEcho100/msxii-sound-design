import { cx } from "class-variance-authority";

import { type ReactNode, useEffect, useState } from "react";

import { SwiperSlide } from "swiper/react";

import CustomNextImage from "../CustomNextImage";

import ProductQuantityControllers from "./ProductQuantityControllers";

import { type NextJsLinkProps } from "../Clickable";
import ImageMagnifier from "../ImageMagnifier";
import { type Product } from "~/utils/shopify/types";
import CTAButton from "./Shopify/Cards/CTAButton";
import Slider, { type CardsSlider } from "./Shopify/Cards/Slider";
import ProductPrice from "./Shopify/ProductPrice";
import AddToCartButton from "./Shopify/Buttons/AddToCart";
import { Switch } from "@headlessui/react";
import { SoundCloudIframe } from "../Iframes";
import TextTruncateManager from "../common/TextTruncater";

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
        "flex max-w-full flex-col gap-2 lg:flex-row",
        noCustomWith
          ? undefined
          : hasImagesVariations
          ? "md:w-5/12 lg:w-6/12"
          : "md:w-5/12"
      )}
    >
      <ImageMagnifier
        src={selectedImage.src}
        // alt={selectedImage.altText ?? ''}
        width={selectedImage.width || 800}
        height={selectedImage.height || 800}
        className="h-full w-full rounded-xl object-cover"
        containerProps={{ className: "aspect-square w-full" }}
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
            autoplay: false,
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
                  selectedImage === node ? "p-2" : ""
                )}
                type="button"
                onClick={() => setSelectedImage(node)}
              >
                <CustomNextImage
                  src={node}
                  width={112}
                  height={112}
                  className={cx(
                    "aspect-square h-full w-full object-cover transition-all duration-300",
                    selectedImage === node
                      ? "rounded-lg ring-4 ring-special-primary-500"
                      : "rounded-md"
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
  cardsSliderProps?: Partial<Parameters<typeof CardsSlider>[0]>;
  ctaButtonProps?: Partial<NextJsLinkProps>;
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const mainVariant = productData.variants.edges[0]?.node;
  const [newViewEnabled, setNewViewEnabled] = useState(false);
  const [newViewData, setNewViewData] = useState<{
    detailsHTML: string;
    iframes: {
      youtube: { src: string; allow: string; title: string }[];
      soundCloud: { src: string; allow: string; title: string }[];
    };
  }>({
    detailsHTML: "",
    iframes: { youtube: [], soundCloud: [] },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = document.createElement("div");
    container.innerHTML = productData.descriptionHtml;

    let hasIframes = false;
    const iframes: {
      youtube: { src: string; allow: string; title: string }[];
      soundCloud: { src: string; allow: string; title: string }[];
    } = {
      youtube: [],
      soundCloud: [],
    };

    container.querySelectorAll("iframe").forEach((iframe) => {
      const url = new URL(iframe.src);

      if (url.origin.startsWith("https://w.soundcloud.com")) {
        iframes.soundCloud.push({
          src: iframe.src,
          allow: iframe.allow,
          title: iframe.title,
        });
        iframe.parentElement?.removeChild(iframe);
        iframe.nextElementSibling?.parentElement?.removeChild(iframe);
        hasIframes = true;
      }

      if (url.origin.startsWith("https://www.youtube.com")) {
        iframes.youtube.push({
          src: iframe.src,
          allow: iframe.allow,
          title: iframe.title,
        });
        iframe.parentElement?.removeChild(iframe);
        hasIframes = true;
      }
    });

    container.querySelectorAll("div").forEach((div) => {
      if (div.innerText.trimStart().startsWith("MSXIISound · "))
        div.parentElement?.removeChild(div);
    });

    let i;
    for (i = container.children.length - 1; i > -1; i--) {
      const child = container.children[i];
      if (
        !child ||
        (child as unknown as { innerText: string }).innerText.trim()
      )
        break;

      child.parentElement?.removeChild(child);
    }

    if (!hasIframes) return;

    setNewViewData({
      detailsHTML: container.innerHTML,
      iframes,
    });
  }, [productData.descriptionHtml]);

  return (
    <div className="mx-auto flex max-w-[140ch] flex-col gap-16 p-16 text-h6 leading-primary-3 text-text-primary-300">
      <section className="flex w-full flex-col-reverse items-center justify-between gap-12 md:flex-row-reverse">
        <div className="md:text-align-initial my-4 flex flex-grow flex-col gap-2 text-center">
          <div className="flex flex-col items-center gap-6 md:items-start">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <h1 className="text-h3 text-text-primary-500">
                {productData.title}
              </h1>
              <div className="mx-auto flex w-fit flex-wrap gap-8 sm:mx-0">
                {mainVariant && (
                  <p className="whitespace-nowrap text-text-primary-500/60">
                    <ProductPrice
                      price={{
                        amount: Number(mainVariant.price.amount),
                        currencyCode: mainVariant.price.currencyCode,
                      }}
                      compareAtPrice={
                        mainVariant.compareAtPrice && {
                          amount: Number(mainVariant.compareAtPrice.amount),
                          currencyCode: mainVariant.compareAtPrice.currencyCode,
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
            {/* className="uppercase mt-4 text-[85%]" */}
            <AddToCartButton
              productVariant={mainVariant}
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
            <p className="max-w-[52ch]">
              <TextTruncateManager content={productData.description} />
            </p>
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
                !newViewData.detailsHTML ? "invisible" : undefined,
                "relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${
                  newViewEnabled ? "translate-x-9" : "translate-x-0"
                }
            pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
          <div className="flex flex-col gap-8">
            <div
              className="custom-prose no-custom-max-w p-4"
              dangerouslySetInnerHTML={{
                __html: newViewEnabled
                  ? newViewData.detailsHTML
                  : productData.descriptionHtml || productData.description,
              }}
            />

            {newViewEnabled && newViewData.iframes.soundCloud.length !== 0 && (
              <section className="mx-auto flex w-full max-w-[140ch] flex-col gap-10 rounded-3xl bg-initial-primary-0 px-16 py-12 text-initial-primary-500">
                <h2 className="text-h3 font-normal text-initial-primary-500">
                  Preview Samples
                </h2>
                <div className="flex flex-col gap-8">
                  {newViewData.iframes.soundCloud.map((iframeData) => (
                    <article key={productData.id} className="flex gap-8">
                      <SoundCloudIframe {...iframeData} />
                    </article>
                  ))}
                </div>
                <p>+ so many more high quality samples</p>
              </section>
            )}
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
        <header>
          <h2 className="text-h3 font-normal text-text-primary-400">
            Related products
          </h2>
        </header>
        {/* <CardsSlider
					products={products}
					CardElem={ProductCard}
					nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[225%]"
					previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[225%]"
					{...cardsSliderProps}
				/> */}
      </article>
    </div>
  );
};

export default CustomProductScreen;
