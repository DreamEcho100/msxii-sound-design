"use client";
import { cx } from "class-variance-authority";
import { createPortal } from "react-dom";
import { type ReactNode } from "react";
import { Dialog } from "@headlessui/react";

export default function EditBoxModal(props: {
  EditSideMenuChildren: ReactNode;
  ShowcaseBxChildren: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean | ((isOpen: boolean) => boolean)) => void;
}) {
  if (typeof window === "undefined") return <></>;

  const bodyElem = document.body;

  if (!bodyElem) return <></>;

  return createPortal(
    <Dialog
      as="div"
      onClose={() => props.setIsOpen(false)}
      className={cx(
        "fixed inset-0 z-10 flex h-full w-full bg-black/50",
        "block", // props.isOpen ? 'block' : 'hidden',
      )}
      open={props.isOpen}
    >
      <div className="relative h-full w-full flex-grow">
        <Dialog.Overlay
          onClick={() => props.setIsOpen(false)}
          className="absolute inset-0 h-full w-full cursor-pointer bg-black/50"
        />
        <Dialog.Panel className="pointer-events-none relative flex h-full w-full flex-grow justify-between gap-16 p-8">
          <div className="pointer-events-auto flex h-full w-full flex-grow flex-col overflow-y-auto bg-bg-primary-500 px-8 py-12">
            {props.ShowcaseBxChildren}
          </div>
          <div className="pointer-events-auto flex w-[40rem] select-auto flex-col gap-8 overflow-y-auto bg-bg-primary-500 px-8 py-12">
            {props.EditSideMenuChildren}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>,
    bodyElem,
  );
}
