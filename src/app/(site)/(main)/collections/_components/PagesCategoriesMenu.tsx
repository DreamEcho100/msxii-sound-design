"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { InputHTMLAttributes } from "react";

const CheckboxField = ({
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className="flex cursor-pointer items-center gap-1 capitalize md:whitespace-nowrap">
      <input
        type="checkbox"
        className="aspect-square h-5 w-5 accent-special-primary-500"
        {...props}
      />
      {children}
    </label>
  );
};

export default function PagesCategoriesMenu({
  handles,
  selectedHandles: selectedPagesCategories,
}: {
  handles: string[];
  // setSelectedPagesCategories: Dispatch<SetStateAction<string[]>>;
  selectedHandles?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col gap-1">
      {handles.map((pageCategoryName) => (
        <CheckboxField
          key={pageCategoryName}
          checked={selectedPagesCategories?.includes(pageCategoryName)}
          value={pageCategoryName}
          onChange={(event) => {
            const params = new URLSearchParams(
              Array.from(searchParams.entries()),
            );
            if (!searchParams.has("handles")) {
              if (event.target.checked) params.set("handles", pageCategoryName);
              return;
            }

            let handles = searchParams.get("handles")!.split(",");

            if (event.target.checked) handles.push(pageCategoryName);
            else
              handles = handles.filter((handle) => handle !== pageCategoryName);

            params.set("handles", handles.join(","));

            // cast to string
            const search = params.toString();
            // or const query = `${'?'.repeat(search.length && 1)}${search}`;
            const query = search ? `?${search}` : "";

            router.replace(`${pathname}${query}`);
          }}
        >
          {pageCategoryName.replaceAll("-", " ")}
        </CheckboxField>
      ))}
    </div>
  );
}
