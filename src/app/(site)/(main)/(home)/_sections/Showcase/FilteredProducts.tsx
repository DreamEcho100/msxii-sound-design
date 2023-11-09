"use client";
import { cx } from "class-variance-authority";
import { useEffect, useMemo } from "react";
import Clickable from "~/app/components/core/Clickable";
import SeeMoreSlideChildren from "~/app/components/core/SeeMoreSlideChildren";
import ProductsCardsSlider from "~/app/components/core/Shopify/Cards/ProductsCardsSlider";
import { useBasicCollectionsHandleFilterManager } from "~/app/libs/hooks";
import {
  type BasicProduct,
  type Product,
  type BasicCollection,
} from "~/libs/shopify/types";

export default function FilteredProducts(props: {
  basicCollections: BasicCollection[];
}) {
  const {
    pagesCategories,
    collectionsByHandle,
    selectedHandles,
    setSelectedHandles: setSelectedPgsCategories,
  } = useBasicCollectionsHandleFilterManager({
    collections: props.basicCollections,
    allProductsHandle: true,
  });

  const base = useMemo(
    () =>
      props.basicCollections
        .map((item) => item.products.edges.map((edge) => edge.node))
        .flat(),
    [props.basicCollections],
  );

  const selectedPgCategory = selectedHandles[0];

  const filteredCollections = useMemo(() => {
    if (!selectedHandles) return undefined;

    const filteredCollections: (Product | BasicProduct)[] = [];

    collectionsByHandle.forEach((collectionByHandle) => {
      if (collectionByHandle[0] !== selectedHandles[0]) return;

      collectionByHandle[1].forEach((item) =>
        item.products.edges.map((edge) => filteredCollections.push(edge.node)),
      );
    });

    return filteredCollections.length === 0 ? base : filteredCollections;
  }, [base, collectionsByHandle, selectedHandles]);
  const firstPgCategory = pagesCategories[0];

  useEffect(() => {
    if (!firstPgCategory) return;
    setSelectedPgsCategories([firstPgCategory]);
  }, [firstPgCategory, setSelectedPgsCategories]);

  return (
    <article className="flex flex-col gap-8 px-8">
      <header className="flex flex-col gap-4 px-4">
        <h2 className="text-h1 font-semibold leading-h2">New Releases</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-3 text-base">
          {pagesCategories.map((item) => (
            <Clickable
              key={item}
              variants={null}
              onClick={() => setSelectedPgsCategories([item])}
              className={cx(
                "relative capitalize",
                selectedPgCategory === item
                  ? "font-bold text-text-primary-400/90"
                  : "font-medium text-text-primary-400/70 outline-none duration-100 hover:text-text-primary-500 focus:text-text-primary-500",
              )}
            >
              {item.replaceAll("-", " ")}
              <div className="absolute inset-0 flex items-end justify-start">
                <div
                  className={cx(
                    "h-1 translate-y-full bg-special-primary-500",
                    selectedPgCategory === item ? "w-11/12" : "w-0",
                  )}
                />
              </div>
            </Clickable>
          ))}
        </div>
      </header>
      {/* <div className="hidden">
        {(filteredCollections ?? base).map((item) => {
          return (
            <Fragment key={`${selectedPgCategory}-${item.title}-${item.id}`}>
              {item.handle}
            </Fragment>
          );
        })}
      </div> */}
      <ProductsCardsSlider
        data={filteredCollections ?? base}
        nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
        previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
        containerProps={{ className: "px-4" }}
        extraLastSlideChildren={
          selectedPgCategory === "all-products" ? undefined : (
            <SeeMoreSlideChildren
              href={
                selectedPgCategory === "merch"
                  ? "/merch"
                  : `/collections/${selectedPgCategory}`
              }
              linkClassName="-translate-y-[40%]"
            />
          )
        }
      />
    </article>
  );
}
