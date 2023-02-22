import { ReactNode } from "react";
import { fakeProductsData } from "~/utils/appData";
import Clickable from "../Clickable";
import Image from "next/image";
import { VariantProps, cva } from "class-variance-authority";
import { Product } from "~/utils/types";

const handleBasicProductCardContainerVariants = cva("flex flex-col flex-grow", {
  variants: {
    "aspect-ratio": { video: "aspect-video", card: "aspect-[1.91/1]" },
  },
});
const handleBasicProductCardImageVariants = cva("aspect-square rounded-lg", {
  variants: {
    "aspect-ratio": { video: "aspect-video", square: "aspect-square" },
    "object-fit": { contain: "object-contain", cover: "object-cover" },
  },
  defaultVariants: { "aspect-ratio": "square", "object-fit": "contain" },
});
const handleBasicProductCardTitleVariants = cva(
  "font-medium leading-4 min-h-[4ch]",
  {
    variants: {
      "text-align": { center: "text-center" },
      "text-size": {
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
      },
    },
    defaultVariants: { "text-size": "sm" },
  }
);

export const BasicProductCard = (props: {
  product: (typeof fakeProductsData)[0];
  extraDetailsElem?: ReactNode;
  containerVariants?: VariantProps<
    typeof handleBasicProductCardContainerVariants
  >;
  imageVariants?: VariantProps<typeof handleBasicProductCardImageVariants>;
  titleVariants?: VariantProps<typeof handleBasicProductCardTitleVariants>;
}) => {
  return (
    <article
      className={handleBasicProductCardContainerVariants(
        props.containerVariants
      )}
    >
      <Image
        src={props.product.image.src}
        alt={props.product.image.alt}
        width={800}
        height={800}
        className={handleBasicProductCardImageVariants(props.imageVariants)}
      />
      <div className="text-align-initial flex flex-grow flex-col justify-between gap-2 px-2 py-3 leading-primary-5">
        <h3
          className={handleBasicProductCardTitleVariants(props.titleVariants)}
        >
          {props.product.title}
        </h3>
        {props.extraDetailsElem}
      </div>
    </article>
  );
};

export const ProductExtraDetails = (props: {
  product: (typeof fakeProductsData)[0];
}) => {
  return (
    <>
      <p className="font-normal text-basic-primary-900/80">
        $ {props.product.price}
      </p>
      <Clickable
        variants={{ btn: "secondary", p: "v1-sm" }}
        className="whitespace-nowrap text-sm uppercase"
      >
        Add To Cart
      </Clickable>
    </>
  );
};

export const ProductCard = (props: { product: Product }) => {
  return (
    <BasicProductCard
      product={props.product}
      extraDetailsElem={<ProductExtraDetails product={props.product} />}
      containerVariants={{ "aspect-ratio": "card" }}
    />
  );
};

export const ProductBundleCard = (
  props: Pick<Parameters<typeof BasicProductCard>[0], "product">
) => {
  return (
    <BasicProductCard
      product={props.product}
      containerVariants={{ "aspect-ratio": "video" }}
      imageVariants={{ "aspect-ratio": "video", "object-fit": "cover" }}
      titleVariants={{ "text-align": "center", "text-size": "lg" }}
    />
  );
};
