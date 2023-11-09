"use client";
import { cx } from "class-variance-authority";
import { dashboardStore, showcaseBxId, sideEditMenuId } from "../utils";
import { useStore } from "zustand";

export default function EditSideMenu() {
  const isOpen = useStore(
    dashboardStore,
    (state) => state.menu.sideEdit.isOpen,
  );
  const setMenuIsOpen = useStore(
    dashboardStore,
    (state) => state.utils.setMenuIsOpen,
  );

  return (
    <div
      className={cx(
        "fixed inset-0 z-50 flex h-full w-full bg-black/50",
        isOpen ? "block" : "hidden",
      )}
    >
      <div className="relative h-full w-full flex-grow">
        <button
          className="absolute inset-0 h-full w-full cursor-pointer bg-black/50"
          type="button"
          onClick={() => setMenuIsOpen("sideEdit", false)}
        />
        <div className="pointer-events-none relative flex h-full w-full flex-grow">
          <div className="pointer-events-auto m-8 flex h-full w-full flex-grow justify-end">
            <div className="pointer-events-auto flex-grow select-auto overflow-auto" />
            <div id={showcaseBxId} className="flex"></div>
          </div>
          <div
            className="pointer-events-auto m-8 flex select-auto"
            id={sideEditMenuId}
          />
        </div>
      </div>
    </div>
  );
}

// export function EditSideMenuPortal(props: PropsWithChildren) {
//   if (typeof window === "undefined") return <></>;

//   const sideEditMenuElem = document.getElementById(sideEditMenuId);

//   if (!sideEditMenuElem) return <></>;

//   return createPortal(props.children, sideEditMenuElem);
// }

// export function ShowcaseBxPortal(props: PropsWithChildren) {
//   if (typeof window === "undefined") return <></>;

//   const sideEditMenuElem = document.getElementById(showcaseBxId);

//   if (!sideEditMenuElem) return <></>;

//   return createPortal(props.children, sideEditMenuElem);
// }
