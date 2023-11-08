"use client";
import { cx } from "class-variance-authority";
import { useStore } from "zustand";
import { globalStore } from "~/app/libs/store";

const Overlay = () => {
  const closeAllMenus = useStore(
    globalStore,
    (store) => store.menus.closeAllMenus,
  );

  const isDropdownMenuOnLessThanLgOpen = useStore(
    globalStore,
    (store) => store.menus.isDropdownMenuOnLessThanLgOpen,
  );
  const isSearchMenuDropdownOpen = useStore(
    globalStore,
    (store) => store.menus.isSearchMenuDropdownOpen,
  );
  const isCartDropdownOpen = useStore(
    globalStore,
    (store) => store.cart.isCartDropdownOpen,
  );

  const isAnyMenuOpen =
    isDropdownMenuOnLessThanLgOpen ||
    isSearchMenuDropdownOpen ||
    isCartDropdownOpen;

  if (!isAnyMenuOpen) return <></>;

  return (
    <button
      className={cx(
        "fixed inset-0 z-[2] block h-full w-full",
        isDropdownMenuOnLessThanLgOpen && !isSearchMenuDropdownOpen
          ? "lg:hidden"
          : "",
        isCartDropdownOpen
          ? "bg-initial-primary-900/10 dark:bg-initial-primary-900/25"
          : "bg-initial-primary-900/60 backdrop-blur-[0.0625rem]",
      )}
      onClick={closeAllMenus}
      title="Close all opened menus."
      type="button"
    />
  );
};

export default Overlay;
