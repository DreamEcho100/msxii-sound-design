import { type FormStoreApi } from "@de100/form-echo";

import { type VariantProps, cx, cva } from "class-variance-authority";

import React, { type LabelHTMLAttributes, type HTMLAttributes } from "react";
import { useStore } from "zustand";

const handleClassVariants = cva("flex flex-col flex-grow");
const handleLabelAndInputContainerClassVariants = cva(
  "flex rounded-lg text-gray-600",
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
        checkbox: "w-fit items-center gap-2",
        field: "ring-1 px-4 py-1",
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
const handleLabelClassVariants = cva(
  "font-bold text-lg capitalize -mb-0.5 group-[.disabled-field]:pointer-events-none",
  {
    variants: {
      state: {
        idle: "text-gray-700/80 ring-gray-400/50",
        error: "text-red-500/75 ring-red-400/75",
        success: "text-green-600/90 ring-green-400/75",
        active: "text-blue-600/90 ring-blue-400",
      },
    },
  },
);

export type FieldContainerBaseProps<Fields, ValidatedFields> = {
  store: FormStoreApi<Fields, ValidatedFields>;
  name: keyof Fields & string;
  validationName?: keyof ValidatedFields & string;
  classVariants?: VariantProps<typeof handleClassVariants>;
  labelAndFieldContainerClassVariants?: VariantProps<
    typeof handleLabelAndInputContainerClassVariants
  >;
  labelClassVariants?: VariantProps<typeof handleLabelClassVariants>;
  labelProps: LabelHTMLAttributes<HTMLLabelElement>;
  className?: string;
  htmlFor?: string;
};
export type FieldContainerProps<Fields, ValidatedFields> =
  HTMLAttributes<HTMLDivElement> &
    FieldContainerBaseProps<Fields, ValidatedFields>;

const FieldContainer = <Fields, ValidatedFields>(
  props: FieldContainerProps<Fields, ValidatedFields>,
) => {
  // const isDirty = useStore(
  //   store,
  //   (state) => state.fields[name].isDirty,
  // );
  const {
    store,
    name,
    validationName,
    labelProps,
    labelClassVariants,
    htmlFor,
    classVariants,
    labelAndFieldContainerClassVariants,
    children,
    ..._props
  } = props;
  const errors = useStore(
    store,
    (state) => state.errors[(validationName as unknown as typeof name) || name],
  );
  const id = useStore(store, (state) => state.fields[name].metadata.id);

  const _labelProps = {
    ...(labelProps || {}),
    className: handleLabelClassVariants({
      state: errors ? "error" : "idle",
      ...(labelClassVariants || {}),
      className: labelProps.className,
    }),
    htmlFor: htmlFor || id,
  };

  return (
    <div
      {..._props}
      className={cx(handleClassVariants(classVariants), _props.className)}
    >
      <div
        className={handleLabelAndInputContainerClassVariants({
          state: errors ? "error" : "idle",
          ...(labelAndFieldContainerClassVariants || {}),
        })}
      >
        <label {..._labelProps} />
        {children}
      </div>
      <ul className="flex max-w-full flex-col" id={`describe-${id}`}>
        {errors ? (
          errors.map((error) => (
            <li key={error} className="text-red-500/75">
              <small className="text-[80%]">
                <strong>
                  <em>{error}</em>
                </strong>
              </small>
            </li>
          ))
        ) : (
          <li className="invisible">
            <small className="text-[80%]">|</small>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FieldContainer;
