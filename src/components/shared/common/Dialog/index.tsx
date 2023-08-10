import { cx } from "class-variance-authority";
import { type PropsWithChildren } from "react";
import { Dialog as HUDialog } from "@headlessui/react";

type DialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean | ((isOpen: boolean) => boolean)) => void;
};

const Dialog = (props: PropsWithChildren<DialogProps>) => {
  return (
    <HUDialog
      as="div"
      onClose={() => props.setIsOpen(false)}
      className={cx(
        "fixed inset-0 z-10 flex h-full w-full items-center justify-center",
        "block" // props.isOpen ? 'block' : 'hidden',
      )}
      open={props.isOpen}
    >
      <HUDialog.Overlay
        onClick={() => props.setIsOpen(false)}
        className="absolute inset-0 h-full w-full cursor-pointer bg-black/50"
      />
      <div className="pointer-events-none relative flex h-full w-full flex-grow items-center justify-center">
        <HUDialog.Panel className="pointer-events-auto relative max-h-[75vh] w-full max-w-screen-sm overflow-y-auto rounded-md bg-white p-8">
          {props.children}
        </HUDialog.Panel>
      </div>
    </HUDialog>
  );
};

export default Dialog;
