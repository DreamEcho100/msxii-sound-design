import {
  type Dispatch,
  type InputHTMLAttributes,
  type SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CardsSlider } from "~/components/shared/core/Shopify/Cards/Slider";
import Clickable from "~/components/shared/core/Clickable";
import { GiSettingsKnobs } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";

import { useSearchParams } from "next/navigation";
import { useBasicCollectionsHandleFilterManager } from "~/utils/hooks";
import { type RouterOutputs } from "~/utils/api";
import { ProductCard } from "~/components/shared/core/Shopify/Cards/Card";

const CheckboxField = ({
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className="flex cursor-pointer items-center gap-1 capitalize sm:whitespace-nowrap">
      <input
        type="checkbox"
        className="aspect-square h-5 w-5 accent-special-primary-500"
        {...props}
      />
      {children}
    </label>
  );
};

const PagesCategoriesMenu = ({
  pagesCategories,
  setSelectedPagesCategories,
  selectedPagesCategories,
}: {
  pagesCategories: string[];
  setSelectedPagesCategories: Dispatch<SetStateAction<string[]>>;
  selectedPagesCategories: string[];
}) => {
  return (
    <div className="flex flex-col gap-1">
      {pagesCategories.map((pageCategoryName) => (
        <CheckboxField
          key={pageCategoryName}
          checked={selectedPagesCategories.includes(pageCategoryName)}
          value={pageCategoryName}
          onChange={(event) =>
            setSelectedPagesCategories((prev) =>
              event.target.checked
                ? [...prev, event.target.value]
                : prev.filter(
                    (pageCategoryName) =>
                      pageCategoryName !== event.target.value
                  )
            )
          }
        >
          {pageCategoryName.replaceAll("-", " ")}
        </CheckboxField>
      ))}
    </div>
  );
};

const ProductsScreen = ({
  collectionsBasic,
}: {
  collectionsBasic: RouterOutputs["shopify"]["collections"]["getAllBasic"];
}) => {
  const filterMenuOnSMScreensCloseButtonRef = useRef<HTMLButtonElement>(null);
  const [isFiltersMenuActive, setIsFiltersMenuActive] = useState(true);
  const searchParams = useSearchParams();
  const [isReady, setIsReady] = useState(false);

  const {
    pagesCategories,
    collectionsByHandle,
    selectedHandles,
    setSelectedHandles,
    setProductTitleQuery,
  } = useBasicCollectionsHandleFilterManager({
    collectionsEdges: collectionsBasic,
    handleToCollectionToIgnoreMap: {
      "all-products": true,
      merch: true,
    },
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!isReady) {
      timeoutId = setTimeout(() => setIsReady(true), 2000);
    }

    const handles = searchParams.get("handles");
    const productTitleQuery = searchParams.get("productTitleQuery");

    if (handles) setSelectedHandles(handles.split(","));
    if (productTitleQuery) setProductTitleQuery(productTitleQuery);

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [isReady, searchParams, setProductTitleQuery, setSelectedHandles]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!filterMenuOnSMScreensCloseButtonRef.current) return;
      filterMenuOnSMScreensCloseButtonRef.current.click();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const filteredCollectionsByHandle = useMemo(() => {
    if (selectedHandles.length === 0) return collectionsByHandle;

    const filteredCollectionsByHandle: typeof collectionsByHandle = [];

    collectionsByHandle.forEach((collection) => {
      if (selectedHandles.includes(collection[0])) {
        filteredCollectionsByHandle.push(collection);
      }
    });

    return filteredCollectionsByHandle;
  }, [collectionsByHandle, selectedHandles]);

  return (
    <section>
      <div className="relative flex py-main-p-1 sm:gap-main-p-3 sm:p-main-p-3">
        {isFiltersMenuActive && (
          <AnimatePresence>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-bg-primary absolute left-0 top-0 z-[2] h-full max-w-[90%] origin-left bg-bg-primary-500 p-8 rtl:origin-right sm:pointer-events-none sm:hidden sm:opacity-0"
            >
              <div className="flex flex-col gap-1">
                <header className="flex justify-between gap-2">
                  <h3 className="text-h4 text-text-primary-300 sm:whitespace-nowrap">
                    Shop all
                  </h3>
                  <button
                    onClick={() => setIsFiltersMenuActive((prev) => !prev)}
                    ref={filterMenuOnSMScreensCloseButtonRef}
                    type="button"
                    title={`${isFiltersMenuActive ? "Hide" : "Show"} filters`}
                  >
                    <GiSettingsKnobs className="rotate-90 scale-y-110 text-xl font-bold" />
                  </button>
                </header>
                <PagesCategoriesMenu
                  pagesCategories={pagesCategories}
                  setSelectedPagesCategories={setSelectedHandles}
                  selectedPagesCategories={selectedHandles}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}
        <div className="hidden sm:flex">
          <AnimatePresence>
            {isFiltersMenuActive && (
              <motion.div
                initial={{ scaleX: 0, width: 0 }}
                animate={{ scaleX: 1, width: "auto" }}
                exit={{ scaleX: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="z-[2] h-full origin-left flex-col gap-1 bg-bg-primary-500 py-main-p-3 rtl:origin-right sm:flex"
              >
                <header className="flex justify-between gap-2">
                  <h3 className="text-h4 text-text-primary-300 sm:whitespace-nowrap">
                    Shop all
                  </h3>
                  <Clickable
                    variants={null}
                    onClick={() => setIsFiltersMenuActive((prev) => !prev)}
                    title={`${isFiltersMenuActive ? "Hide" : "Show"} filters`}
                  >
                    <GiSettingsKnobs className="rotate-90 scale-y-110 text-xl font-bold" />
                  </Clickable>
                </header>
                <PagesCategoriesMenu
                  pagesCategories={pagesCategories}
                  setSelectedPagesCategories={setSelectedHandles}
                  selectedPagesCategories={selectedHandles}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="isolate flex max-w-full flex-grow flex-col gap-12 overflow-hidden bg-bg-primary-100 px-4 py-12 transition-all dark:bg-bg-primary-900 sm:rounded-2xl sm:px-8 lg:px-12">
          <header className="flex justify-between">
            <h1 className="text-h1 font-semibold">
              {selectedHandles.length === pagesCategories.length ||
              selectedHandles.length === 0
                ? "All Packs"
                : "Filtered Lists"}
            </h1>
            <Clickable
              variants={null}
              onClick={() => setIsFiltersMenuActive((prev) => !prev)}
              title={`${isFiltersMenuActive ? "Hide" : "Show"} filters`}
              className="flex items-center gap-1"
            >
              <span className="font-medium text-text-primary-300">
                {isFiltersMenuActive ? "Hide" : "Show"} filters
              </span>
              <GiSettingsKnobs className="rotate-90 scale-y-110 text-xl font-bold" />
            </Clickable>
          </header>
          <div className="flex flex-col gap-8">
            {filteredCollectionsByHandle.map((collection) => (
              <article key={collection[0]} className="flex flex-col gap-4">
                <h2 className="text-h4 font-normal capitalize text-text-primary-300">
                  <Clickable
                    href={`/collections/${collection[0]}`}
                    isA="next-js"
                    className="border-b-3 border-b-transparent hover:border-b-text-primary-200 focus:border-b-text-primary-200"
                  >
                    {collection[0].replaceAll("-", " ")}
                  </Clickable>
                </h2>
                <div className="">
                  <CardsSlider
                    isNavButtonsOutside
                    collections={collection[1]}
                    CardElem={ProductCard}
                    nextSlideButtonClassName="scale-[50%] -translate-y-[200%] lg:-translate-y-[225%]"
                    previousSlideButtonClassName="scale-[50%] -translate-y-[200%] lg:-translate-y-[225%]"
                    swiperProps={{
                      breakpoints: {
                        384: { slidesPerView: 1 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                      },
                    }}
                    cardsSharedProps={{
                      isPlayButtonActive: true,
                      extraDetailsElemProps: {
                        buttonProps: {
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                          variants: {
                            btn: "light:primary_dark:secondary",
                            py: "sm",
                            px: "lg",
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          } as any,
                        },
                      },
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsScreen;
