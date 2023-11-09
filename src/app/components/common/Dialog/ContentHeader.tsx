import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cx } from "class-variance-authority";

export default function CloseDialog(
  props: Parameters<typeof DialogPrimitive.Close>[0],
) {
  return (
    <DialogPrimitive.Close
      className={cx(
        "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
        "bg-purple-600 text-neutral-100 hover:bg-purple-600",
        "border border-transparent",
        "focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
      )}
      {...props}
    />
  );
}
