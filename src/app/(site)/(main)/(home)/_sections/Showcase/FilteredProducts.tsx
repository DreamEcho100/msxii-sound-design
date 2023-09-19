"use client";
import { cx } from "class-variance-authority";
import { useEffect, useMemo } from "react";
import Clickable from "~/app/components/core/Clickable";
import { ProductCard } from "~/app/components/core/Shopify/Cards/Card";
import { CardsSlider } from "~/app/components/core/Shopify/Cards/Slider";
import { useBasicCollectionsHandleFilterManager } from "~/app/libs/utils";
import { type BasicCollection } from "~/libs/shopify/types";

export default function FilteredProducts(props: {
  basicCollections: BasicCollection[];
}) {
  const {
    pagesCategories,
    collectionsByHandle,
    selectedHandles: selectedPagesCategories,
    setSelectedHandles: setSelectedPagesCategories,
  } = useBasicCollectionsHandleFilterManager({
    collections: props.basicCollections,
  });

  const selectedPageCategory = selectedPagesCategories[0];

  const filteredCollections = useMemo(
    () =>
      collectionsByHandle.filter(
        (item) => item[0] === selectedPageCategory,
      )?.[0]?.[1],
    [collectionsByHandle, selectedPageCategory],
  );
  const firstPageCategory = pagesCategories[0];

  useEffect(() => {
    if (!firstPageCategory) return;
    setSelectedPagesCategories([firstPageCategory]);
  }, [firstPageCategory, setSelectedPagesCategories]);

  return (
    <article className="flex flex-col gap-8 px-4">
      <header className="flex flex-col gap-4 px-8">
        <h2 className="text-h1 leading-h2 font-semibold">New Releases</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-3 text-base">
          {pagesCategories.map((item) => (
            <Clickable
              key={item}
              variants={null}
              onClick={() => setSelectedPagesCategories([item])}
              className={cx(
                "relative capitalize",
                selectedPageCategory === item
                  ? "text-text-primary-400/90 font-bold"
                  : "text-text-primary-400/70 hover:text-text-primary-500 focus:text-text-primary-500 font-medium outline-none duration-100",
              )}
            >
              {item.replaceAll("-", " ")}
              <div className="absolute inset-0 flex items-end justify-start">
                <div
                  className={cx(
                    "bg-special-primary-500 h-1 translate-y-full",
                    selectedPageCategory === item ? "w-11/12" : "w-0",
                  )}
                />
              </div>
            </Clickable>
          ))}
        </div>
      </header>
      <CardsSlider
        collections={filteredCollections ?? props.basicCollections}
        CardElem={ProductCard}
        nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
        previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
      />
    </article>
  );
}
