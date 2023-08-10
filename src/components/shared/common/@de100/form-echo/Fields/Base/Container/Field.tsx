import { type VariantProps, cx, cva } from "class-variance-authority";

import React, { type HTMLAttributes } from "react";

const handleClassVariants = cva(
  "flex flex-col flex-grow rounded-lg text-gray-600",
  {
    variants: {
      state: {
        idle: "ring-gray-500/50",
        error: "ring-red-500/75",
        success: "ring-green-500/75",
        active: "ring-blue-500",
        disabled:
          "ring-gray-500/75 grayscale bg-black/5 cursor-not-allowed group disabled-field select-none",
      },
      type: {
        checkbox: "w-fit items-center gap-2 ring-0",
        field: "ring-1 px-4 py-2",
      },
      "flex-dir": {
        col: "flex-col",
        "col-reverse": "flex-col-reverse",
        row: "flex-row",
        "row-reverse": "flex-row-reverse",
      },
    },
    defaultVariants: {
      "flex-dir": "col",
      type: "field",
    },
  },
);

export type FieldContainerBaseProps = HTMLAttributes<HTMLDivElement> & {
  classVariants?: VariantProps<typeof handleClassVariants>;
  className?: string;
};

const FieldContainerBase = (props: FieldContainerBaseProps) => {
  const { classVariants, ..._props } = props;

  return (
    <div
      {..._props}
      className={cx(handleClassVariants(classVariants), _props.className)}
    />
  );
};

export default FieldContainerBase;
