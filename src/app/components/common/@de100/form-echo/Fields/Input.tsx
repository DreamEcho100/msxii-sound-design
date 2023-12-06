"use client";
import { type FormStoreApi } from "@de100/form-echo";

import Input, { type InputProps } from "./Base/Input";
import Select, { type SelectProps } from "./Base/Select";
import Textarea, { type TextareaProps as TextareaProps } from "./Base/Textarea";

import React from "react";
import { useStore } from "zustand";

export type InputFieldProps<Fields, ValidatedFields> = {
  store: FormStoreApi<Fields, ValidatedFields>;
  name: keyof Fields & string;
  validateName?: keyof ValidatedFields & string;
} & (
  | (InputProps & { isA?: "input" })
  | (SelectProps & { isA: "select" })
  | (TextareaProps & { isA: "textarea" })
);

const InputField = <Fields, ValidatedFields>(
  props: InputFieldProps<Fields, ValidatedFields>,
) => {
  const { isA, store, ..._props } = props;
  const id = useStore(store, (state) => state.fields[props.name].metadata.id);
  const handleOnInputChange = useStore(
    store,
    (store) => store.utils.handleOnInputChange,
  );
  const value = useStore(store, (store) => {
    const field = store.fields[props.name];
    return field.valueFromStoreToField
      ? field.valueFromStoreToField(field.value)
      : field.value;
  });

  const fieldProps = {
    ..._props,
    autoComplete: "new-password",
    id: props.id ?? id,
    "aria-describedby": props["aria-describedby"] ?? `describe-${id}`,
  };

  if (isA === "select")
    return (
      <Select
        onChange={(event) =>
          handleOnInputChange(props.name, event.target.value)
        }
        {...(fieldProps as SelectProps)}
      />
    );

  if (isA === "textarea")
    return (
      <Textarea
        value={value as string}
        onChange={(event) =>
          handleOnInputChange(props.name, event.target.value)
        }
        {...(fieldProps as TextareaProps)}
      />
    );

  return (
    <Input
      value={value as string}
      onChange={
        "type" in props && props.type === "checkbox"
          ? (event: { target: { checked: boolean } }) =>
              handleOnInputChange(props.name, event.target.checked)
          : (event) => handleOnInputChange(props.name, event.target.value)
      }
      {...(fieldProps as InputProps)}
    />
  );
};

export default InputField;
