"use client";
import { cx } from "class-variance-authority";
import { useEffect, useMemo } from "react";
import Clickable from "~/app/components/core/Clickable";
import ProductsCardsSlider from "~/app/components/core/Shopify/Cards/ProductsCardsSlider";
// import { CardsSlider } from "~/app/components/core/Shopify/Cards/Slider";
import { useBasicCollectionsHandleFilterManager } from "~/app/libs/hooks";
import { type BasicCollection } from "~/libs/shopify/types";

export default function FilteredProducts(props: {
  basicCollections: BasicCollection[];
}) {
  const {
    pagesCategories,
    collectionsByHandle,
    selectedHandles: selectedPagesCategories,
    setSelectedHandles: setSelectedPagesCategories,
    getSelectedCollectionProduct,
  } = useBasicCollectionsHandleFilterManager({
    collections: props.basicCollections,
  });

  const base = useMemo(
    () =>
      props.basicCollections
        .map((item) => item.products.edges.map((edge) => edge.node))
        .flat(),
    [props.basicCollections],
  );

  const selectedPageCategory = selectedPagesCategories[0];

  const filteredCollections = useMemo(
    () =>
      getSelectedCollectionProduct(collectionsByHandle, selectedPageCategory),
    [collectionsByHandle, getSelectedCollectionProduct, selectedPageCategory],
  );
  const firstPageCategory = pagesCategories[0];

  useEffect(() => {
    if (!firstPageCategory) return;
    setSelectedPagesCategories([firstPageCategory]);
  }, [firstPageCategory, setSelectedPagesCategories]);

  return (
    <article className="flex flex-col gap-8 px-8">
      <header className="flex flex-col gap-4 px-4">
        <h2 className="text-h1 font-semibold leading-h2">New Releases</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-3 text-base">
          {pagesCategories.map((item) => (
            <Clickable
              key={item}
              variants={null}
              onClick={() => setSelectedPagesCategories([item])}
              className={cx(
                "relative capitalize",
                selectedPageCategory === item
                  ? "font-bold text-text-primary-400/90"
                  : "font-medium text-text-primary-400/70 outline-none duration-100 hover:text-text-primary-500 focus:text-text-primary-500",
              )}
            >
              {item.replaceAll("-", " ")}
              <div className="absolute inset-0 flex items-end justify-start">
                <div
                  className={cx(
                    "h-1 translate-y-full bg-special-primary-500",
                    selectedPageCategory === item ? "w-11/12" : "w-0",
                  )}
                />
              </div>
            </Clickable>
          ))}
        </div>
      </header>
      <ProductsCardsSlider
        data={filteredCollections ?? base}
        nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
        previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
        containerProps={{ className: "px-4" }}
        compProps={{}}
      />
    </article>
  );
}
