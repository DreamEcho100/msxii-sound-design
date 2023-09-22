import React from "react";
import { dashboardStore } from "../utils";
import { useStore } from "zustand";
import { FaBars } from "react-icons/fa";
import Clickable from "~/components/shared/core/Clickable";
import CustomNextImage from "~/components/shared/CustomNextImage";

const MainHeader = () => {
  const setMenuIsOpen = useStore(
    dashboardStore,
    (store) => store.utils.setMenuIsOpen,
  );

  return (
    <>
      <header className="fixed inset-x-0 z-[2] w-full bg-black/5 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-main items-center justify-end gap-4 border-b px-4 sm:px-8">
          <Clickable href="/" isA="next-js" noDashboardCustomPages>
            <CustomNextImage
              src="/images/logo.png"
              alt="logo"
              width="240"
              height="192"
              className="h-12 w-16"
              priority
            />
          </Clickable>
          <button type="button" onClick={() => setMenuIsOpen("sideMain", true)}>
            <FaBars className="text-2xl" />
          </button>
        </div>
      </header>
      <div className="h-16 w-full" />
    </>
  );
};

export default MainHeader;
