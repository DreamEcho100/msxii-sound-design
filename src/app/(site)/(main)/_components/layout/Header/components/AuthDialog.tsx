"use client";
import { useState } from "react";

import { cx } from "class-variance-authority";

import { useStore } from "zustand";
import { globalStore } from "~/app/libs/store";
import CustomDialog, {
  DialogContentHeader,
} from "~/app/components/common/Dialog";
import { type RouterInputs } from "~/server/api/root";
import { useLoginMutation, useRegisterMutation } from "~/libs/shopify/hooks";
import Clickable from "~/app/components/core/Clickable";
import FormInput from "~/app/components/core/FormInput";

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

function LoginDialogContent() {
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
          value={formValues.email}
          placeholder="* Email"
          required
          type="email"
        />
        <FormInput
          name={"password"}
          setFormValues={setFormValues}
          value={formValues.password}
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
}

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
          value={formValues.firstName}
          placeholder="* First Name"
          required
          type="firstName"
        />
        <FormInput
          name={"lastName"}
          setFormValues={setFormValues}
          value={formValues.lastName}
          placeholder="* Last Name"
          required
          type="lastName"
        />
        <FormInput
          name={"email"}
          setFormValues={setFormValues}
          value={formValues.email}
          placeholder="* Email"
          required
          type="email"
        />
        <FormInput
          name={"password"}
          setFormValues={setFormValues}
          value={formValues.password}
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
