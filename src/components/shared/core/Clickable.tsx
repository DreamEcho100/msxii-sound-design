import { VariantProps, cva } from "class-variance-authority";
import { default as ClickableBase, ClickableTypes } from "../Clickable";
import type { ClickablesProps } from "../Clickable";
import { useCallback } from "react";

const handleClickableVariants = cva("", {
  variants: {
    btn: {
      primary:
        "font-medium rounded-3xl bg-basic-primary-900 text-basic-primary-100 hover:bg-basic-primary-200 hover:text-basic-secondary-200 duration-150 transition-all",
      secondary:
        "font-medium rounded-3xl bg-basic-primary-200 text-basic-secondary-200 hover:bg-basic-primary-900 hover:text-basic-primary-100 duration-150 transition-all",
    },
    w: { fit: "w-fit", full: "w-full" },
    p: {
      "v1-sm": "px-4 py-2",
      "v1-md": "px-6 py-2",
      "v1-lg": "px-8 py-2",
      "v1-xl": "px-10 py-2",
    },
  },
  defaultVariants: { btn: "primary", w: "fit" },
});

type Props = {
  variants?: VariantProps<typeof handleClickableVariants>;
  className?: string;
} & ClickablesProps;

const Clickable = ({ variants = {}, className, ...props }: Props) => {
  const handleClassName = useCallback(
    (clickableType: ClickableTypes) => {
      console.log("className", className);
      return handleClickableVariants({
        btn:
          typeof variants.btn !== "undefined"
            ? variants.btn
            : clickableType === "button"
            ? "primary"
            : null,
        p:
          typeof variants.p !== "undefined"
            ? variants.p
            : clickableType === "button"
            ? "v1-lg"
            : null,
        ...variants,
        className,
      });
    },
    [className, variants]
  );

  return (
    <ClickableBase
      {...props}
      // className={(clickableType) => {
      // 	return handleClickableVariants({
      // 		...variants, className
      // 	})
      // }}
      className={handleClassName}
    />
  );
};

export default Clickable;
