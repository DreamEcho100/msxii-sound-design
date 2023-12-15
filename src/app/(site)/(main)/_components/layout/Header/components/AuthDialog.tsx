"use client";
import {
  type Dispatch,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type SetStateAction,
  useId,
  useState,
} from "react";

import { cx } from "class-variance-authority";

import { useStore } from "zustand";
import { globalStore } from "~/app/libs/store";
import CustomDialog, {
  DialogContentHeader,
} from "~/app/components/common/Dialog";
import { type RouterInputs } from "~/server/api/root";
import { useLoginMutation, useRegisterMutation } from "~/libs/shopify/hooks";
import Clickable from "~/app/components/core/Clickable";

const AuthDialog = () => {
  const isAuthDialogOpen = useStore(
    globalStore,
    (store) => store.dialogs.auth.isOpen,
  );
  const toggleAuthDialogOpen = useStore(
    globalStore,
    (store) => store.dialogs.auth.toggleOpen,
  );
  const authDialogType = useStore(
    globalStore,
    (store) => store.dialogs.auth.type,
  );

  return (
    <CustomDialog setIsOpen={toggleAuthDialogOpen} isOpen={isAuthDialogOpen}>
      {authDialogType === "login" ? (
        <LoginDialogContent />
      ) : (
        <RegisterDialogContent />
      )}
    </CustomDialog>
  );
};

export default AuthDialog;

const LoginDialogContent = () => {
  const setAuthDialogState = useStore(
    globalStore,
    (store) => store.dialogs.auth.setDialogType,
  );
  const toggleAuthDialogOpen = useStore(
    globalStore,
    (store) => store.dialogs.auth.toggleOpen,
  );
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useLoginMutation({
    onError: (err) => {
      console.error("err", err);
    },
    onSuccess: () => {
      toggleAuthDialogOpen();
    },
  });

  return (
    <>
      <DialogContentHeader
        titleProps={{ children: "Login" }}
        descriptionProps={{
          children: (
            <>
              Don&apos;t have an account?{" "}
              <Clickable
                className={cx(
                  "font-semibold",
                  "text-special-primary-700 hover:text-special-primary-700/75",
                  "dark:text-special-primary-500 dark:hover:text-special-primary-500/90",
                )}
                variants={{ btn: null, px: null, py: null }}
                onClick={() => setAuthDialogState("register")}
                disabled={loginMutation.isLoading}
              >
                Create a new one
              </Clickable>
            </>
          ),
        }}
      />
      <form
        className="flex flex-col gap-4 py-4"
        onSubmit={(event) => {
          event.preventDefault();

          loginMutation.mutate(formValues);
        }}
      >
        <FormInput
          name={"email"}
          setFormValues={setFormValues}
          placeholder="* Email"
          required
          type="email"
        />
        <FormInput
          name={"password"}
          setFormValues={setFormValues}
          placeholder="* Password"
          required
          type="password"
        />
        <Clickable
          type="submit"
          variants={{ py: "sm", w: "full" }}
          className="mt-4"
          disabled={loginMutation.isLoading}
        >
          Submit
        </Clickable>
      </form>
    </>
  );
};

const RegisterDialogContent = () => {
  const setAuthDialogState = useStore(
    globalStore,
    (store) => store.dialogs.auth.setDialogType,
  );
  const toggleAuthDialogOpen = useStore(
    globalStore,
    (store) => store.dialogs.auth.toggleOpen,
  );
  const [formValues, setFormValues] = useState<
    RouterInputs["shopify"]["customers"]["register"]
  >({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    acceptsMarketing: false,
    phone: undefined,
  });

  const registerMutation = useRegisterMutation({
    onError: (err) => {
      console.error("err", err);
    },
    onSuccess: () => {
      toggleAuthDialogOpen();
    },
  });

  return (
    <>
      <DialogContentHeader
        titleProps={{ children: "Register" }}
        descriptionProps={{
          children: (
            <>
              Have an account?{" "}
              <Clickable
                className={cx(
                  "font-semibold",
                  "text-special-primary-700 hover:text-special-primary-700/75",
                  "dark:text-special-primary-500 dark:hover:text-special-primary-500/90",
                )}
                variants={{ btn: null, px: null, py: null }}
                onClick={() => setAuthDialogState("login")}
                disabled={registerMutation.isLoading}
              >
                login
              </Clickable>
            </>
          ),
        }}
      />
      <form
        className="flex flex-col gap-4 py-4"
        onSubmit={(event) => {
          event.preventDefault();
          registerMutation.mutate(formValues);
        }}
      >
        <FormInput
          name={"firstName"}
          setFormValues={setFormValues}
          placeholder="* First Name"
          required
          type="firstName"
        />
        <FormInput
          name={"lastName"}
          setFormValues={setFormValues}
          placeholder="* Last Name"
          required
          type="lastName"
        />
        <FormInput
          name={"email"}
          setFormValues={setFormValues}
          placeholder="* Email"
          required
          type="email"
        />
        <FormInput
          name={"password"}
          setFormValues={setFormValues}
          placeholder="* Password"
          required
          type="password"
        />
        <Clickable
          type="submit"
          variants={{ py: "sm", w: "full" }}
          className="mt-4"
          disabled={registerMutation.isLoading}
        >
          Submit
        </Clickable>
      </form>
    </>
  );
};

const FormInput = <FormValues extends Record<string, unknown>>({
  name,
  label,
  labelProps = {},
  setFormValues,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  name: keyof FormValues;
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  setFormValues: Dispatch<SetStateAction<FormValues>>;
}) => {
  const baseId = useId();
  return (
    <div className="flex flex-col gap-2">
      {(labelProps || label) && (
        <label htmlFor={baseId} {...labelProps}>
          {label}
        </label>
      )}
      <input
        className="rounded-t-sm border-[0.0625rem] border-transparent border-b-text-primary-500/50 px-3 py-2 hover:border-b-text-primary-500/75 focus:border-b-text-primary-500 focus:outline-none"
        id={baseId}
        onChange={(event) =>
          setFormValues((prev) => ({
            ...prev,
            [name]: event.target.value,
          }))
        }
        {...props}
        name={name}
      />
    </div>
  );
};
