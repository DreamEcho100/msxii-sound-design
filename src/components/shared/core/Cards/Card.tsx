import { ReactNode } from "react";
import { fakeProductsData } from "~/utils/appData";
import Clickable from "../Clickable";
import Image from "next/image";
import { VariantProps, cva } from "class-variance-authority";

const handleBasicProductCardContainerVariants = cva("flex flex-col", {
  variants: {
    "aspect-ratio": { video: "aspect-video", card: "aspect-[9/16]" },
  },
  defaultVariants: { "aspect-ratio": "card" },
});
const handleBasicProductCardImageVariants = cva("aspect-square rounded-lg", {
  variants: {
    "aspect-ratio": { video: "aspect-video", square: "aspect-square" },
    "object-fit": { contain: "object-contain", cover: "object-cover" },
  },
  defaultVariants: { "aspect-ratio": "square", "object-fit": "contain" },
});
const handleBasicProductCardTitleVariants = cva(
  "text-[1rem] font-normal leading-4",
  {
    variants: {
      "text-align": { center: "text-center" },
    },
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
      <p className="font-normal">$ {props.product.price}</p>
      <Clickable
        variants={{ btn: "secondary", p: "v1-sm" }}
        className="whitespace-nowrap uppercase"
      >
        Add To Cart
      </Clickable>
    </>
  );
};
