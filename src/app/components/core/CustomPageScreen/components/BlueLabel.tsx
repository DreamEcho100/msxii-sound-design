"use client";
import { useMemo } from "react";
import InfiniteLoadCollectionProductsSection from "../../InfiniteLoadCollectionProductsSection";

export default function BlueLabel() {
  const baseInput = useMemo(
    () => ({
      handle: "blue-label",
      limit: 50,
    }),
    [],
  );

  return (
    <div className="flex flex-col">
      <InfiniteLoadCollectionProductsSection baseInput={baseInput} />
    </div>
  );
}
