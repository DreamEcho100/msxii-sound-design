"use client";
import type { InputHTMLAttributes } from "react";
import { type VariantProps, cx, cva } from "class-variance-authority";

const handleClassVariants = cva(
  "bg-transparent text-lg outline-none group-[.disabled-field]:pointer-events-none",
  {
    variants: {
      type: {
        checkbx: "accent-special-primary-500 w-5 h-5",
      },
    },
  },
);

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  classVariants?: VariantProps<typeof handleClassVariants>;
};

const InputFormField = (props: InputProps) => {
  const { classVariants, ..._props } = props;

  const inputProps = {
    ..._props,
    className: cx(handleClassVariants(classVariants), props.className),
    checked:
      props.type === "checkbx" ? props.checked ?? !!props.value : undefined,
    value: props.type !== "checkbx" ? props.value ?? "" : undefined,
  };

  return <input {...inputProps} />;
};

export default InputFormField;
