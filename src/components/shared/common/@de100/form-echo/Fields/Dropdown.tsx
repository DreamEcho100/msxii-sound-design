import { type FormStoreApi } from "@de100/form-echo";
import Select, { type SelectProps } from "./Base/Select";

import React from "react";
import { useStore } from "zustand";
import Combobox, { type ComboboxProps } from "./Base/Combobox";

export type TSelectType = "multiple" | "single" | undefined;

type TComboboxProps<TData, FormattedData> = Exclude<
  ComboboxProps<TData, FormattedData>,
  "onChange" | "value"
> & {
  isA: "combobox";
};

export type DropdownFieldProps<
  Fields,
  ValidatedFields,
  Name extends keyof Fields,
  SelectType extends TSelectType = undefined,
  TData = unknown,
  FormattedData = undefined,
> = {
  store: FormStoreApi<Fields, ValidatedFields>;
  name: Name & string;
  "aria-describedby"?: string;
  selectType?: SelectType;
} & (
  | ({
      isA?: "select";
      valueOrUpdater: (value: SelectProps["value"]) => SelectProps["value"];
    } & SelectProps)
  | ({
      isA: "combobox";
    } & (SelectType extends "multiple"
      ? TData extends Array<unknown>
        ? TComboboxProps<TData, FormattedData>
        : never
      : TComboboxProps<TData, FormattedData>))
);
// | (Exclude<
//     ComboboxProps<TData, FormattedData>,
//     "onChange" | "value"
//   > & {
//     isA: "combobox";
//   })

const DropdownField = <
  Fields,
  ValidatedFields,
  Name extends keyof Fields,
  SelectType extends TSelectType = undefined,
  TData = unknown,
  FormattedData = undefined,
>(
  props: DropdownFieldProps<
    Fields,
    ValidatedFields,
    Name,
    SelectType,
    TData,
    FormattedData
  >,
) => {
  const { isA, store, selectType, ..._props } = props;
  const idFromStore = useStore(
    store,
    (state) => state.fields[props.name].metadata.id,
  );
  const value = useStore(store, (store) => {
    const field = store.fields[props.name];
    return field.valueFromStoreToField
      ? field.valueFromStoreToField(field.value)
      : field.value;
  });

  const id = (props.id as string | undefined) || idFromStore;

  const fieldProps = {
    ..._props,
    value,
    id,
    "aria-describedby":
      (props["aria-describedby"] as string | undefined) || `describe-${id}`,
  }; // as DropdownFieldProps<Fields, ValidatedFields, Name>;

  if (isA === "combobox")
    return (
      <Combobox
        {...(fieldProps as unknown as ComboboxProps<TData, FormattedData>)}
        value={value}
        onChange={(value) =>
          store.getState().utils.handleOnInputChange(
            props.name,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            (selectType === "multiple"
              ? (prevValue: (typeof value)[]) => [value, ...prevValue]
              : // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
                value) as any,
          )
        }
      />
    );

  return (
    <Select
      {...(fieldProps as SelectProps)}
      onChange={(event) =>
        store.getState().utils.handleOnInputChange(
          props.name,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          event.target.value,
        )
      }
    />
  );
};

export default DropdownField;
