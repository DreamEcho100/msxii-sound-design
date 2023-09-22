"use client";
import Link from "next/link";
import { dashboardStore } from "../../utils";
import { useStore } from "zustand";
import { Dialog as HUDialog } from "@headlessui/react";
import { cx } from "class-variance-authority";
import { type RouterOutputs } from "~/server/api/root";

type Props = {
  data: RouterOutputs["dashboard"]["pagesCategories"]["getAll"];
};

export default function SideMenuDialog(props: Props) {
  const isSideMainOpen = useStore(
    dashboardStore,
    (store) => store.menu.sideMain.isOpen,
  );
  const setMenuIsOpen = useStore(
    dashboardStore,
    (store) => store.utils.setMenuIsOpen,
  );

  return (
    <HUDialog
      as="div"
      onClose={() => setMenuIsOpen("sideMain", false)}
      className={cx(
        "absolute inset-0 z-10 flex h-full w-full items-center justify-center",
        "block", // props.isOpen ? 'block' : 'hidden',
      )}
      open={isSideMainOpen}
    >
      <HUDialog.Overlay
        onClick={() => setMenuIsOpen("sideMain", false)}
        className="absolute inset-0 h-full w-full cursor-pointer bg-black/50"
      />
      <div className="pointer-events-none relative flex h-full w-full flex-grow justify-start">
        <HUDialog.Panel className="pointer-events-auto h-full bg-initial-primary-500 py-8 text-initial-secondary-0">
          <nav className="flex flex-col items-center gap-2">
            <ul>
              <li className="flex flex-col capitalize">
                <p className="px-12">custom pages</p>
                <ul className="flex flex-col">
                  {props.data.map((pageCategory) => (
                    <li key={pageCategory.id}>
                      <Link
                        className="flex px-12 py-1 capitalize hover:bg-initial-primary-400/70"
                        href={`/dashboard/custom-pages/${pageCategory.name}?isPage=${pageCategory.isPage}`}
                        onClick={() => setMenuIsOpen("sideMain", false)}
                      >
                        <span className="px-2" />
                        <span>
                          {pageCategory.name.replaceAll("-", " ")}&nbsp;(
                          {pageCategory.counter})
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </HUDialog.Panel>
      </div>
    </HUDialog>
  );
}
