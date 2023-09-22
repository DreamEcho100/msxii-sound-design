"use client";
import { type ShopifyProductVariant } from "~/libs/shopify/types";
import { type ButtonProps } from "../../../common/Clickable";

import Clickable from "../../Clickable";
import { useMutateCart } from "~/libs/shopify/hooks";

type Props = {
  productVariant?: ShopifyProductVariant;
  selectedQuantity?: number;
  className?: string;
  variants?: Parameters<typeof Clickable>[0]["variants"];
} & Partial<Omit<ButtonProps, "className">>;

const AddToCartButton = ({
  productVariant,
  selectedQuantity,
  ...props
}: Props) => {
  const { addToCart } = useMutateCart();

  return (
    <Clickable
      className="text-sm uppercase lg:whitespace-nowrap"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={async () => {
        productVariant &&
          (await addToCart.mutateAsync(
            {
              lineItems: [
                {
                  quantity: selectedQuantity ?? 1,
                  variantId: productVariant.id,
                },
              ],
            },
            true,
          ));
      }}
      {...props}
      disabled={!productVariant || addToCart.isLoading || props.disabled}
      variants={{
        btn: "secondary",
        py: "sm",
        px: "lg",
        ...(props.variants ?? {}),
      }}
    >
      add to cart
    </Clickable>
  );
};

export default AddToCartButton;
