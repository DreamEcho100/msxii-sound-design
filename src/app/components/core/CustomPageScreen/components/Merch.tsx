"use client";
import { useMemo } from "react";
import InfiniteLoadCollectionProductsSection from "../../InfiniteLoadCollectionProductsSection";

export default function Merch() {
  const baseInput = useMemo(
    () => ({
      handle: "merch",
      limit: 50,
    }),
    [],
  );

  return (
    <div className="flex flex-col gap-8">
      <InfiniteLoadCollectionProductsSection baseInput={baseInput} />
    </div>
  );
}
