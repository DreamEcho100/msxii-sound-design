import { type BasicCollection, type BasicProduct } from "~/libs/shopify/types";
import { cx } from "class-variance-authority";
import { ProductBundleCard } from "~/app/components/core/Shopify/Cards/Card";
import FilteredProducts from "./FilteredProducts";
import ProductsCardsSlider from "~/app/components/core/Shopify/Cards/ProductsCardsSlider";
import SeeMoreSlideChildren from "~/app/components/core/SeeMoreSlideChildren";
import { Suspense } from "react";

type HomeShowcaseSectProps = {
  flattenedCollectionEdges: BasicCollection[];
  bundlesCollections: BasicProduct[];
  selectedBundlesCollections: BasicProduct[];
};

export default function HomeShowcaseSect(props: HomeShowcaseSectProps) {
  return (
    <section className="sm:p-main-p-3">
      <div className="flex flex-col gap-16 bg-bg-primary-100 px-main-p-4 py-main-p-2 dark:bg-bg-primary-900 sm:rounded-xl">
        <Suspense>
          <FilteredProducts basicCollections={props.flattenedCollectionEdges} />
        </Suspense>
        <article className="flex flex-col gap-4 px-8 xl-2-sm:px-16 sm:px-8">
          <header>
            <h2 className="px-8 text-h1 font-semibold leading-h2">Bundles</h2>
          </header>
          <div className="flex flex-col gap-8">
            <Suspense>
              <ProductsCardsSlider
                data={props.bundlesCollections}
                nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
                previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
                extraLastSlideChildren={
                  <SeeMoreSlideChildren
                    href="/collections/bundles"
                    linkClassName="-translate-y-[40%]"
                  />
                }
              />
            </Suspense>
            <div
              className={cx(
                "md flex flex-wrap justify-center gap-8 px-8",
                // "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
              )}
            >
              {props.selectedBundlesCollections.map((item) => (
                <ProductBundleCard
                  key={item.id}
                  item={item}
                  containerVariants={{ flex: "grow", w: null, "max-w": null }}
                  containerClassName={cx(
                    "md:w-[calc(25%-2rem)]",
                    "max-w-[22rem]",
                  )}
                />
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
