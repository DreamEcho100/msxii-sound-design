"use client";
import { cx } from "class-variance-authority";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useStore } from "zustand";
import { globalStore } from "~/app/libs/store";
import { useCheckIsAdmin } from "~/app/libs/hooks";
import CustomNextImage from "~/app/components/common/CustomNextImage";
import Clickable from "~/app/components/core/Clickable";


const MainLayoutHeader = () => {

  return (
      <header
        className={cx(
          "fixed left-0 right-0 top-0 isolate z-[3] flex flex-col transition-all duration-300",
        )}
      >
        <div className="mx-auto flex w-full max-w-main flex-col">
          <div
            className={cx(
              "flex h-main-header-h w-full items-center justify-between gap-4 px-main-p-3 sm:px-main-p-2",
              "relative isolate",
              isAnyMenuOpen
                ? "bg-bg-primary-500"
                : "bg-bg-primary-500/80 backdrop-blur-sm dark:bg-bg-primary-500/90",
            )}
          >
            <Clickable
              href="/"
              isA="next-js"
              className="aspect-video h-12 w-16"
            >
              <CustomNextImage
                src="/images/logo.png"
                alt="logo"
                width="240"
                height="192"
                className="h-12 w-16 object-contain"
                priority
              />
						</Clickable>
						<button type='button' onClick={() => console.log('👋')}>👋</button>
            
          </div>
        </div>
      </header>
  );
};

export default MainLayoutHeader;