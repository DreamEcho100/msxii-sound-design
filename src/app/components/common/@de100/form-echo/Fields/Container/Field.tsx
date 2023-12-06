"use client";
import { type FormStoreApi } from "@de100/form-echo";

import React from "react";
import { useStore } from "zustand";
import FieldContainerBase, {
  type FieldContainerBaseProps,
} from "../Base/Container/Field";
import LabelAndFieldItemContainerBase, {
  type LabelAndFieldItemContainerBaseProps,
} from "../Base/Container/LabelAndFieldItem";

// const handleLabelAndInputContainerClassVariants = cva(
// 	'flex rounded-lg text-gray-600',
// 	{
// 		variants: {
// 			state: {
// 				idle: 'ring-gray-500/50',
// 				error: 'ring-red-500/75',
// 				success: 'ring-green-500/75',
// 				active: 'ring-blue-500',
// 				disabled:
// 					'ring-gray-500/75 grayscale bg-black/5 cursor-not-allowed group disabled-field select-none',
// 			},
// 			type: {
// 				checkbox: 'w-fit items-center gap-2',
// 				field: 'ring-1 px-4 py-1',
// 			},
// 			'flex-dir': {
// 				col: 'flex-col',
// 				'col-reverse': 'flex-col-reverse',
// 				row: 'flex-row',
// 				'row-reverse': 'flex-row-reverse',
// 			},
// 		},
// 		defaultVariants: {
// 			'flex-dir': 'col',
// 			type: 'field',
// 		},
// 	},
// );
// const handleLabelClassVariants = cva(
// 	'font-bold text-lg capitalize -mb-0.5 group-[.disabled-field]:pointer-events-none',
// 	{
// 		variants: {
// 			state: {
// 				idle: 'text-gray-700/80 ring-gray-400/50',
// 				error: 'text-red-500/75 ring-red-400/75',
// 				success: 'text-green-600/90 ring-green-400/75',
// 				active: 'text-blue-600/90 ring-blue-400',
// 			},
// 		},
// 	},
// );

export type FieldContainerSpecialProps<Fields, ValidatedFields> = {
  store: FormStoreApi<Fields, ValidatedFields>;
  name: keyof Fields & string;
  validationName?: keyof ValidatedFields & string;

  htmlFor?: string;
  className?: string;
} & FieldContainerBaseProps & {
    labelAndFieldContainerClassVariants?: LabelAndFieldItemContainerBaseProps["classVariants"];
    labelClassVariants?: LabelAndFieldItemContainerBaseProps["labelClassVariants"];
    labelProps: LabelAndFieldItemContainerBaseProps["labelProps"];
    labelAndFieldItemContainerProps?: Partial<LabelAndFieldItemContainerBaseProps>;
  };

export type FieldContainerProps<Fields, ValidatedFields> =
  FieldContainerSpecialProps<Fields, ValidatedFields>;

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
    labelAndFieldItemContainerProps = {},
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

  const isError = Array.isArray(errors) && errors.length > 0;

  return (
    <FieldContainerBase
      {..._props}
      classVariants={{
        state: isError ? "error" : "idle",
        ...(classVariants ?? {}),
      }}
    >
      <LabelAndFieldItemContainerBase
        {...labelAndFieldItemContainerProps}
        labelProps={{ ...labelProps, htmlFor }}
        classVariants={labelAndFieldContainerClassVariants}
        labelClassVariants={{
          state: isError ? "error" : "idle",
          ...(labelClassVariants ?? {}),
        }}
      >
        {children}
      </LabelAndFieldItemContainerBase>
      <ul
        className="-my-1 flex w-fit max-w-full flex-col text-[75%]"
        id={`describe-${id}`}
      >
        {Array.isArray(errors) && errors.length > 0 ? (
          errors.map((error) => (
            <li key={error} className="flex flex-wrap text-red-500/75">
              <small>
                <strong>
                  <em>{error}</em>
                </strong>
              </small>
            </li>
          ))
        ) : (
          <li className="invisible flex flex-wrap">
            <small>|</small>
          </li>
        )}
      </ul>
    </FieldContainerBase>
  );
};

export default FieldContainer;
