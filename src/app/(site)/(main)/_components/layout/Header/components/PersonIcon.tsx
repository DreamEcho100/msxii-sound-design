"use client";
import { cx } from "class-variance-authority";
import { BsPersonFill } from "react-icons/bs";
import { useStore } from "zustand";
import Clickable, {
  type ClickableProps,
} from "~/app/components/common/Clickable";
import { globalStore } from "~/app/libs/store";

const PersonIcon = () => {
  const toggleAuthDialogOpen = useStore(
    globalStore,
    (store) => store.dialogs.auth.toggleOpen,
  );
  const authSession = useStore(globalStore, (store) => store.authSession);

  const clickableProps: ClickableProps =
    authSession.status === "authenticated"
      ? {
          href: `/customer-profile`,
          isA: "next-js",
          title: "profile",
          className: cx(
            "text-xl text-special-primary-500",
            "hover:text-special-primary-900 focus:text-special-primary-900",
            "hover:text-special-primary-600 focus:text-special-primary-600",
          ),
        }
      : {
          title: "profile",
          className: cx(
            "text-xl text-special-primary-500",
            "hover:text-special-primary-900 focus:text-special-primary-900",
            "hover:text-special-primary-600 focus:text-special-primary-600",
          ),
          onClick: toggleAuthDialogOpen,
        };

  return (
    <Clickable {...clickableProps}>
      <BsPersonFill />
    </Clickable>
  );
};

export default PersonIcon;
