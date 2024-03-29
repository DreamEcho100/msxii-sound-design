import { type VariantProps, cva } from "class-variance-authority";

import { type LabelHTMLAttributes, type HTMLAttributes } from "react";

const handleLabelAndInputContainerClassVariants = cva("flex", {
  variants: {
    "flex-dir": {
      "row-reverse": "flex-row-reverse",
      col: "flex-col",
    },
    type: {
      checkbox: "w-full items-center justify-end gap-1",
    },
  },
  defaultVariants: {
    "flex-dir": "col",
  },
});
const handleLabelClassVariants = cva(
  "font-bold capitalize text-lg -mb-0.5 group-[.disabled-field]:pointer-events-none",
  {
    variants: {
      state: {
        idle: "text-text-primary-400/80 ring-gray-400/50",
        error: "text-red-500/75 ring-red-400/75",
        success: "text-green-600/90 ring-green-400/75",
        active: "text-blue-600/90 ring-blue-400",
      },
    },
  },
);

export type LabelAndFieldItemContainerBaseProps =
  HTMLAttributes<HTMLDivElement> & {
    classVariants?: VariantProps<
      typeof handleLabelAndInputContainerClassVariants
    >;
    className?: string;
    labelClassVariants?: VariantProps<typeof handleLabelClassVariants>;
    labelProps: LabelHTMLAttributes<HTMLLabelElement>;
  };

const LabelAndFieldItemContainerBase = (
  props: LabelAndFieldItemContainerBaseProps,
) => {
  const { classVariants, labelProps, labelClassVariants, ..._props } = props;

  return (
    <div
      {..._props}
      className={handleLabelAndInputContainerClassVariants({
        ...(classVariants ?? {}),
        className: _props.className,
      })}
    >
      <label
        {...labelProps}
        className={handleLabelClassVariants({
          ...(labelClassVariants ?? {}),
          className: labelProps.className,
        })}
      />
      {_props.children}
    </div>
  );
};

export default LabelAndFieldItemContainerBase;
