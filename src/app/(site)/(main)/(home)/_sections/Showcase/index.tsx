import { type BasicCollection, type BasicProduct } from "~/libs/shopify/types";
import { cx } from "class-variance-authority";
import {
  ProductCard,
  ProductBundleCard,
} from "~/app/components/core/Shopify/Cards/Card";
import { CardsSlider } from "~/app/components/core/Shopify/Cards/Slider";
import FilteredProducts from "./FilteredProducts";

type HomeShowcaseSectionProps = {
  flattenedCollectionEdges: BasicCollection[];
  bundlesCollections: BasicCollection[];
  selectedBundlesCollections: BasicProduct[];
};

export default function HomeShowcaseSection(props: HomeShowcaseSectionProps) {
  return (
    <section className="sm:p-main-p-3">
      <div className="bg-bg-primary-100 px-main-p-4 py-main-p-2 dark:bg-bg-primary-900 flex flex-col gap-16 sm:rounded-xl">
        <FilteredProducts basicCollections={props.flattenedCollectionEdges} />
        <article className="flex flex-col gap-4 px-4">
          <header>
            <h2 className="text-h1 leading-h2 px-8 font-semibold">Bundles</h2>
          </header>
          <div className="flex flex-col gap-8">
            <CardsSlider
              collections={props.bundlesCollections}
              CardElem={ProductCard}
              nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
              previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
            />
            <div
              className={cx(
                "grid gap-8 px-8",
                "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
              )}
            >
              {props.selectedBundlesCollections.map((item) => (
                <ProductBundleCard
                  key={item.id}
                  product={item}
                  containerVariants={{ flex: "grow", w: null }}
                />
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
