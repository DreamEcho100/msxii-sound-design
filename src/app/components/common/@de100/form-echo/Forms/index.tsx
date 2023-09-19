"use client";
import type { FormStoreApi, HandlePreSubmitCB } from "@de100/form-echo";
import { cx } from "class-variance-authority";
import { type FormHTMLAttributes } from "react";
import { useStore } from "zustand";

export type FormProps<Fields, ValidatedFields> = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> & {
  store: FormStoreApi<Fields, ValidatedFields>;
  onSubmit: HandlePreSubmitCB<Fields, ValidatedFields>;
};

const Form = <Fields, ValidatedFields>({
  store,
  onSubmit,
  ...props
}: FormProps<Fields, ValidatedFields>) => {
  const handlePreSubmit = useStore(
    store,
    (state) => state.utils.handlePreSubmit,
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        handlePreSubmit(onSubmit)(event);
      }}
      {...props}
      className={cx("flex flex-col gap-6", props.className)}
    />
  );
};

export default Form;
