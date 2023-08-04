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
import { type RouterOutputs, api } from "~/utils/api";
import SectionPrimaryLoader from "~/components/shared/Loaders/SectionPrimary";
import SectionLoaderContainer from "~/components/shared/LoadersContainers/Section";

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
        (item) => item[0] === selectedPageCategory
      )?.[0]?.[1],
    [collectionsByHandle, selectedPageCategory]
  );
  const firstPageCategory = pagesCategories[0];

  useEffect(() => {
    if (!firstPageCategory) return;
    setSelectedPagesCategories([firstPageCategory]);
  }, [firstPageCategory, setSelectedPagesCategories]);

  return (
    <article className="flex flex-col gap-8 px-4">
      <header className="flex flex-col gap-4 px-8">
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
                  : "font-medium text-text-primary-400/70 outline-none duration-100 hover:text-text-primary-500 focus:text-text-primary-500"
              )}
            >
              {item.replaceAll("-", " ")}
              <div className="absolute inset-0 flex items-end justify-start">
                <div
                  className={cx(
                    "h-1 translate-y-full bg-special-primary-500",
                    selectedPageCategory === item ? "w-11/12" : "w-0"
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
    [flattenedCollectionEdges]
  );
  const selectedBundlesCollections = useMemo(() => {
    const handlesMap: Record<string, boolean> = {};
    const products: BasicProduct[] = [];

    flattenedCollectionEdges.forEach((collection) =>
      collection.products.edges.forEach(({ node }) => {
        if (
          [
            "schlump-loops-bundle",
            "drums-out-the-sp404-bundle",
            "schlump-shots-bundle",
            "the-classic-era-bundle",
          ].includes(node.handle) &&
          !handlesMap[node.handle]
        ) {
          products.push(node);
          handlesMap[node.handle] = true;
        }
      })
    );
    return products;
  }, [flattenedCollectionEdges]);

  return (
    <section className="sm:p-main-p-3">
      <div className="flex flex-col gap-16 bg-bg-primary-100 px-main-p-4 py-main-p-2 dark:bg-bg-primary-900 sm:rounded-xl">
        <FilteredProducts collectionsBasic={collectionsBasic} />
        <article className="flex flex-col gap-4 px-4">
          <header>
            <h2 className="px-8 text-h1 font-semibold leading-h2">Bundles</h2>
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
                "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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

const HomeShowcaseSectionHolder = () => {
  const getAllBasicCollectionsShopify =
    api.shopify.collections.getAllBasic.useQuery({
      productsFirst: 7,
      collectionsFirst: 50,
    });

  if (getAllBasicCollectionsShopify.isSuccess)
    return (
      <HomeShowcaseSection
        collectionsBasic={getAllBasicCollectionsShopify.data}
      />
    );

  if (getAllBasicCollectionsShopify.isError)
    return <>{getAllBasicCollectionsShopify.error.message}</>;

  return (
    <SectionLoaderContainer>
      <SectionPrimaryLoader />
    </SectionLoaderContainer>
  );
};

export default HomeShowcaseSectionHolder;
