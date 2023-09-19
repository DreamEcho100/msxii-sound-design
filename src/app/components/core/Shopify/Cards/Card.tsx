"use client";
import { type ReactNode, useMemo } from "react";
import type Clickable from "../../Clickable";
import { type VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import ProductPrice from "../ProductPrice";
import AddToCartButton from "../Buttons/AddToCart";
import PlayButton from "./PlayButton";
import CustomNextImage from "~/app/components/common/CustomNextImage";
import { type BasicProduct, type Product } from "~/libs/shopify/types";

const handleBasicProductCardHolderVariants = cva(
  "max-w-full card flex flex-col px-1 group duration-300 delay-75 transition-all",
  {
    variants: {
      "aspect-ratio": { video: "aspect-video" },
      flex: { grow: "flex-grow" },
      w: { "64": "w-64", "72": "w-72" },
    },
    defaultVariants: { w: "64" },
  },
);
const handleBasicProductCardImageHolderVariants = cva(
  "aspect-square rounded-lg relative overflow-hidden max-w-full",
  {
    variants: {
      "aspect-ratio": { video: "aspect-video", square: "aspect-square" },
      "object-fit": { contain: "object-contain", cover: "object-cover" },
    },
    defaultVariants: { "aspect-ratio": "square", "object-fit": "contain" },
  },
);
const handleBasicProductCardImageVariants = cva(
  "w-full h-full duration-150 transition-all",
  {
    variants: {
      animation: {
        "zoom-1": "card-img-zoom-animation-1",
        "zoom-1-1": "card-img-zoom-animation-1-1",
      },
      "animation-duration": { "300ms": "duration-300 ease-in" },
      "object-fit": {
        cover: "object-cover",
        contain: "object-contain",
      },
    },
    defaultVariants: {
      animation: "zoom-1-1",
      "animation-duration": "300ms",
      "object-fit": "cover",
    },
  },
);
const handleBasicProductCardTitleVariants = cva(
  "font-medium leading-4 ellipse-text",
  {
    variants: {
      "text-align": { center: "text-center" },
      "text-size": {
        sm: "text-[0.0.875rem]",
        md: "text-[1rem] leading-primary-5",
        lg: "text-[1.125rem]",
      },
    },
    defaultVariants: { "text-size": "md" },
  },
);

export const BasicProductCard = (props: {
  product: Product | BasicProduct;
  extraDetailsElem?: ReactNode;
  containerVariants?: VariantProps<typeof handleBasicProductCardHolderVariants>;
  containerClassName?: string;
  imageHolderVariants?: VariantProps<
    typeof handleBasicProductCardImageHolderVariants
  >;
  imageVariants?: VariantProps<typeof handleBasicProductCardImageVariants>;
  titleVariants?: VariantProps<typeof handleBasicProductCardTitleVariants>;
  isPlayButtonActive?: boolean;
  routeBase?: string;
  imgPriority?: boolean;
}) => {
  const routeBase = props.routeBase ?? "/products"; // collections

  const isGif = props.product.featuredImage.url.includes(".gif");

  return (
    <article
      className={handleBasicProductCardHolderVariants({
        ...(props.containerVariants ?? {}),
        className: props.containerClassName,
      })}
    >
      <div
        className={handleBasicProductCardImageHolderVariants(
          props.imageHolderVariants,
        )}
      >
        <Link href={`${routeBase}/${props.product.handle}`}>
          {isGif ? (
            <video
              poster={props.product.featuredImage.url}
              title={props.product.title}
              width={325}
              height={325}
              className={handleBasicProductCardImageVariants(
                props.imageVariants,
              )}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <CustomNextImage
              src={props.product.featuredImage.url}
              alt={props.product.title}
              width={325}
              height={325}
              className={handleBasicProductCardImageVariants(
                props.imageVariants,
              )}
              priority={props.imgPriority}
            />
          )}
        </Link>
        {props.isPlayButtonActive && <PlayButton product={props.product} />}
      </div>
      <div className="text-align-initial leading-primary-5 flex flex-grow flex-col justify-between gap-2 px-2 py-3">
        <h3
          className={handleBasicProductCardTitleVariants(props.titleVariants)}
          title={props.product.title}
        >
          <Link href={`${routeBase}/${props.product.handle}`}>
            {props.product.title}
          </Link>
        </h3>
        {props.extraDetailsElem}
      </div>
    </article>
  );
};

export const ProductExtraDetails = ({
  product,
  buttonProps = {},
}: {
  product: Product | BasicProduct;
  buttonProps?: Partial<Parameters<typeof Clickable>[0]>;
}) => {
  const productVariant = useMemo(
    () => product.variants.edges[0]!.node,
    [product.variants.edges],
  );

  return (
    <>
      <p className="text-text-primary-500/60 -translate-y-[20%] whitespace-nowrap text-[90%] font-normal">
        <ProductPrice
          price={{
            amount: Number(productVariant.price.amount),
            currencyCode: productVariant.price.currencyCode,
          }}
          compareAtPrice={
            productVariant.compareAtPrice && {
              amount: Number(productVariant.compareAtPrice.amount),
              currencyCode: productVariant.compareAtPrice.currencyCode,
            }
          }
        />
      </p>
      <AddToCartButton
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(buttonProps as any)}
        productVariant={productVariant}
        disabled={!product.availableForSale}
        title={!product.availableForSale ? "Not available for sale" : undefined}
      />
      {!product.availableForSale && (
        <small className="text-[80%] text-red-500">
          <em>
            <strong>Not available for sale</strong>
          </em>
        </small>
      )}
    </>
  );
};

export const ProductCard = ({
  product,
  extraDetailsElemProps,
  ...props
}: {
  product: Product | BasicProduct;
  extraDetailsElemProps?: Partial<Parameters<typeof ProductExtraDetails>[0]>;
} & Partial<Parameters<typeof BasicProductCard>[0]>) => {
  return (
    <BasicProductCard
      product={product}
      extraDetailsElem={
        <ProductExtraDetails {...extraDetailsElemProps} product={product} />
      }
      {...props}
    />
  );
};

export const ProductBundleCard = ({
  product,
  ...props
}: Pick<Parameters<typeof BasicProductCard>[0], "product"> &
  Omit<Partial<Parameters<typeof BasicProductCard>[0]>, "product">) => {
  return (
    <BasicProductCard
      product={product}
      containerVariants={{ "aspect-ratio": "video" }}
      imageHolderVariants={{ "object-fit": "cover" }}
      titleVariants={{ "text-align": "center", "text-size": "md" }}
      {...props}
    />
  );
};
