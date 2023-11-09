"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { InputHTMLAttributes } from "react";

const CheckbxField = ({
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className="flex cursor-pointer items-center gap-1 capitalize md:whitespace-nowrap">
      <input
        type="checkbx"
        className="aspect-square h-5 w-5 accent-special-primary-500"
        {...props}
      />
      {children}
    </label>
  );
};

// ???
// Change to a nested layout?
export default function PagesCategoriesMenu({
  handles,
  selectedHandles: selectedPgsCategories,
}: {
  handles: string[];
  // setSelectedPgsCategories: Dispatch<SetStateAction<string[]>>;
  selectedHandles?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col gap-1">
      {handles.map((pgCategoryName) => (
        <CheckbxField
          key={pgCategoryName}
          checked={selectedPgsCategories?.includes(pgCategoryName)}
          value={pgCategoryName}
          onChange={(event) => {
            const params = new URLSearchParams(
              Array.from(searchParams.entries()),
            );

            const handlesSearchParams = searchParams.get("handles");
            let handles = handlesSearchParams
              ? handlesSearchParams.split(",").filter(Boolean)
              : [];

            if (event.target.checked) handles.push(pgCategoryName);
            else
              handles = handles.filter((handle) => handle !== pgCategoryName);

            params.set("handles", handles.join(","));

            // cast to string
            const search = params.toString();
            // or const query = `${'?'.repeat(search.length && 1)}${search}`;
            const query = search ? `?${search}` : "";

            router.replace(`${pathname}${query}`, {});
          }}
        >
          {pgCategoryName.replaceAll("-", " ")}
        </CheckbxField>
      ))}
    </div>
  );
}
