import Clickable from "~/components/shared/core/Clickable";
import { cx } from "class-variance-authority";
import {
  useBasicCollectionsHandleFilterManager,
  useGetEdgeNodes,
} from "~/utils/hooks";
import { useEffect, useMemo } from "react";
import { CardsSlider } from "~/components/shared/core/Shopify/Cards/Slider";
import {
  ProductBundleCard,
  ProductCard,
} from "~/components/shared/core/Shopify/Cards/Card";
import { type BasicProduct } from "~/utils/shopify/types";
import { type RouterOutputs } from "~/utils/api";
import { type HomePageProps } from "~/pages";

type CollectionsBasic = RouterOutputs["shopify"]["collections"]["getAllBasic"];

const FilteredProducts = ({
  collectionsBasic,
}: {
  collectionsBasic: CollectionsBasic;
}) => {
  const {
    pagesCategories,
    collectionsByHandle,
    selectedHandles: selectedPagesCategories,
    setSelectedHandles: setSelectedPagesCategories,
    flattenedCollectionsEdges,
  } = useBasicCollectionsHandleFilterManager({
    collectionsEdges: collectionsBasic,
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
        collections={filteredCollections ?? flattenedCollectionsEdges}
        CardElem={ProductCard}
        nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
        previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
      />
    </article>
  );
};

const HomeShowcaseSection = ({
  collectionsBasic,
}: {
  collectionsBasic: CollectionsBasic;
}) => {
  const flattenedCollectionEdges = useGetEdgeNodes(collectionsBasic);
  const bundlesCollections = useMemo(
    () => flattenedCollectionEdges.filter((item) => item.handle === "bundles"),
    [flattenedCollectionEdges],
  );
  const selectedBundlesCollections = useMemo(() => {
    const handlesMap: Record<string, boolean> = {};
    const selectedProducts: BasicProduct[] = [];
    const otherProducts: BasicProduct[] = [];

    flattenedCollectionEdges.forEach((collection) =>
      collection.products.edges.forEach(({ node }) => {
        if (handlesMap[node.handle]) return;

        if (
          [
            "schlump-loops-bundle",
            "drums-out-the-sp404-bundle",
            "schlump-shots-bundle",
            "the-classic-era-bundle",
          ].includes(node.handle)
        ) {
          selectedProducts.push(node);
          handlesMap[node.handle] = true;
          return;
        }

        otherProducts.push(node);
      }),
    );
    return [
      ...selectedProducts,
      ...otherProducts.slice(0, 4 - selectedProducts.length),
    ];
  }, [flattenedCollectionEdges]);

  return (
    <section className="sm:p-main-p-3">
      <div className="bg-bg-primary-100 px-main-p-4 py-main-p-2 dark:bg-bg-primary-900 flex flex-col gap-16 sm:rounded-xl">
        <FilteredProducts collectionsBasic={collectionsBasic} />
        <article className="flex flex-col gap-4 px-4">
          <header>
            <h2 className="text-h1 leading-h2 px-8 font-semibold">Bundles</h2>
          </header>
          <div className="flex flex-col gap-8">
            <CardsSlider
              collections={bundlesCollections}
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
              {selectedBundlesCollections.map((item) => (
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
};

export default HomeShowcaseSection;
