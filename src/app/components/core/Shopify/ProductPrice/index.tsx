"use client";
import { useMemo } from "react";
import { type MoneyV2 } from "shopify-buy";
import { useIsMounted } from "~/app/libs/hooks";
import { formatPrice } from "~/libs/shopify";

type Props = {
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
};

const ProductPrice = (props: Props) => {
  const isMounted = useIsMounted();
  const { price, compareAtPrice } = useMemo(() => {
    const price = formatPrice(
      Number(props.price.amount),
      props.price.currencyCode,
      isMounted,
    );
    const compareAtPrice = props.compareAtPrice?.amount
      ? formatPrice(
          Number(props.compareAtPrice.amount),
          props.compareAtPrice.currencyCode,
          isMounted,
        )
      : null;

    return {
      price,
      compareAtPrice: compareAtPrice
        ? compareAtPrice === price || parseFloat(compareAtPrice) < Number(price)
          ? undefined
          : compareAtPrice
        : undefined,
    };
  }, [props.price, props.compareAtPrice, isMounted]);

  return (
    <>
      {price}{" "}
      {compareAtPrice && <del className="text-red-500">{compareAtPrice}</del>}
    </>
  );
};

export default ProductPrice;
