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
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const handleBasicProductCardHolderVariants = cva(
  "card flex flex-col px-1 group duration-300 delay-75 transition-all",
  {
    variants: {
      "aspect-ratio": { video: "aspect-video" },
      flex: { grow: "flex-grow" },
      w: { "64": "w-64", "72": "w-72" },
      "max-w": {
        full: "max-w-full",
        "22rem": "max-w-[22rem]",
      },
      mx: { auto: "mx-auto" },
    },
    defaultVariants: { w: "64", "max-w": "full", mx: "auto" },
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
  item: Product | BasicProduct;
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
  const isGif = props.item.featuredImage.url.includes(".gif");

  return (
    <AspectRatio
      ratio={
        props.containerVariants?.["aspect-ratio"] === "video"
          ? 16 / 9
          : undefined
      }
      asChild
    >
      <article
        className={handleBasicProductCardHolderVariants({
          ...(props.containerVariants ?? {}),
          className: props.containerClassName,
        })}
      >
        <AspectRatio
          className={handleBasicProductCardImageHolderVariants(
            props.imageHolderVariants,
          )}
          ratio={
            props.containerVariants?.["aspect-ratio"] === "video"
              ? 16 / 9
              : 1 / 1
          }
        >
          <Link href={`${routeBase}/${props.item.handle}`}>
            {isGif ? (
              <video
                poster={props.item.featuredImage.url}
                title={props.item.title}
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
                src={props.item.featuredImage.url}
                alt={props.item.title}
                width={280}
                height={280}
                className={handleBasicProductCardImageVariants(
                  props.imageVariants,
                )}
                priority={props.imgPriority}
              />
            )}
          </Link>
          {props.isPlayButtonActive && <PlayButton product={props.item} />}
        </AspectRatio>
        <div className="text-align-initial flex flex-grow flex-col justify-between gap-2 px-2 py-3 leading-primary-5">
          <h3
            className={handleBasicProductCardTitleVariants(props.titleVariants)}
            title={props.item.title}
          >
            <Link href={`${routeBase}/${props.item.handle}`}>
              {props.item.title}
            </Link>
          </h3>
          {props.extraDetailsElem}
        </div>
      </article>
    </AspectRatio>
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
      <p className="-translate-y-[20%] whitespace-nowrap text-[90%] font-normal text-text-primary-500/60">
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

export type ProductCardProps = {
  item: Product | BasicProduct;
  extraDetailsElemProps?: Partial<Parameters<typeof ProductExtraDetails>[0]>;
} & Partial<Omit<Parameters<typeof BasicProductCard>[0], "item">>;

export const ProductCard = ({
  item,
  extraDetailsElemProps,
  ...props
}: ProductCardProps) => {
  return (
    <BasicProductCard
      item={item}
      extraDetailsElem={
        <ProductExtraDetails {...extraDetailsElemProps} product={item} />
      }
      {...props}
    />
  );
};

export const ProductBundleCard = ({
  item: product,
  ...props
}: Pick<Parameters<typeof BasicProductCard>[0], "item"> &
  Omit<Partial<Parameters<typeof BasicProductCard>[0]>, "item">) => {
  return (
    <BasicProductCard
      item={product}
      containerVariants={{ "aspect-ratio": "video" }}
      imageHolderVariants={{ "object-fit": "cover" }}
      titleVariants={{ "text-align": "center", "text-size": "md" }}
      {...props}
    />
  );
};
