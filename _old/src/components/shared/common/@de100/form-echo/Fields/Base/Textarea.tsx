import type { TextareaHTMLAttributes } from "react";
import { type VariantProps, cx, cva } from "class-variance-authority";

import React from "react";

const handleClassVariants = cva(
  "bg-transparent text-lg outline-none group-[.disabled-field]:pointer-events-none",
);

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  classVariants?: VariantProps<typeof handleClassVariants>;
};

const TextareaFormField = (props: TextareaProps) => {
  const { classVariants, ..._props } = props;

  const textareaProps = {
    ..._props,
    className: cx(handleClassVariants(classVariants), props.className),
    value: props.value ?? "",
  };

  return <textarea rows={5} {...textareaProps} />;
};

export default TextareaFormField;
