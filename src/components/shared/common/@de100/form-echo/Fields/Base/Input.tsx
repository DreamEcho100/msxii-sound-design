import type { InputHTMLAttributes } from "react";
import { type VariantProps, cx, cva } from "class-variance-authority";

import React from "react";

const handleClassVariants = cva(
  "bg-transparent text-lg outline-none group-[.disabled-field]:pointer-events-none",
  {
    variants: {
      type: {
        checkbox: "accent-special-primary-500 w-5 h-5",
      },
    },
  },
);

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  classVariants?: VariantProps<typeof handleClassVariants>;
};

const InputFormField = (props: InputProps) => {
  const { classVariants, ..._props } = props;

  console.log("classVariants", classVariants);

  const inputProps = {
    ..._props,
    className: cx(handleClassVariants(classVariants), props.className),
    checked:
      props.type === "checkbox" ? props.checked || !!props.value : undefined,
    value: props.type !== "checkbox" ? props.value ?? "" : undefined,
  };

  return <input {...inputProps} />;
};

export default InputFormField;
