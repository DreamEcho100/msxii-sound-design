import {
  type Dispatch,
  type InputHTMLAttributes,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CardsSlider } from "~/components/shared/core/Shopify/Cards/Slider";
import Clickable from "~/components/shared/core/Clickable";
import { GiSettingsKnobs } from "react-icons/gi";

import { useSearchParams } from "next/navigation";
import { useBasicCollectionsHandleFilterManager } from "~/utils/hooks";
import { type RouterOutputs } from "~/utils/api";
import { ProductCard } from "~/components/shared/core/Shopify/Cards/Card";
import { cx } from "class-variance-authority";

const CheckboxField = ({
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className="flex cursor-pointer items-center gap-1 capitalize md:whitespace-nowrap">
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

const SideMenu = (props: {
  isFiltersMenuActive: boolean;
  setIsFiltersMenuActive: Dispatch<SetStateAction<boolean>>;
  pagesCategories: string[];
  setSelectedHandles: Dispatch<SetStateAction<string[]>>;
  selectedHandles: string[];
}) => {
  // const filterMenuOnSMScreensCloseButtonRef = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (!filterMenuOnSMScreensCloseButtonRef.current) return;
  //     filterMenuOnSMScreensCloseButtonRef.current.click();
  //   }, 0);

  //   return () => clearTimeout(timeoutId);
  // }, []);

  return (
    <>
      <div
        className={cx(
          "bg-bg-primary absolute left-0 top-0 z-[2] h-full max-w-[90%] origin-left bg-bg-primary-500 p-8 rtl:origin-right md:pointer-events-none md:hidden md:opacity-0",
          "overflow-x-hidden transition-all duration-300",
          props.isFiltersMenuActive ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col gap-1">
          <header className="flex justify-between gap-2">
            <h3 className="text-h4 text-text-primary-300 md:whitespace-nowrap">
              Shop all
            </h3>
            <button
              onClick={() => props.setIsFiltersMenuActive((prev) => !prev)}
              // ref={filterMenuOnSMScreensCloseButtonRef}
              type="button"
              title={`${props.isFiltersMenuActive ? "Hide" : "Show"} filters`}
            >
              <GiSettingsKnobs className="rotate-90 scale-y-110 text-xl font-bold" />
            </button>
          </header>
          <PagesCategoriesMenu
            pagesCategories={props.pagesCategories}
            setSelectedPagesCategories={props.setSelectedHandles}
            selectedPagesCategories={props.selectedHandles}
          />
        </div>
      </div>
      <div className="hidden md:flex">
        <div
          className={cx(
            "z-[2] h-full origin-left flex-col gap-1 bg-bg-primary-500 py-main-p-3 rtl:origin-right md:flex",
            "overflow-x-hidden transition-all duration-300",
            props.isFiltersMenuActive ? "w-auto scale-100" : "w-0 scale-0"
          )}
        >
          <header className="flex justify-between gap-2">
            <h3 className="text-h4 text-text-primary-300 md:whitespace-nowrap">
              Shop all
            </h3>
            <Clickable
              variants={null}
              onClick={() => props.setIsFiltersMenuActive((prev) => !prev)}
              title={`${props.isFiltersMenuActive ? "Hide" : "Show"} filters`}
            >
              <GiSettingsKnobs className="rotate-90 scale-y-110 text-xl font-bold" />
            </Clickable>
          </header>
          <PagesCategoriesMenu
            pagesCategories={props.pagesCategories}
            setSelectedPagesCategories={props.setSelectedHandles}
            selectedPagesCategories={props.selectedHandles}
          />
        </div>
      </div>
    </>
  );
};

const ProductsScreen = ({
  collectionsBasic,
}: {
  collectionsBasic: RouterOutputs["shopify"]["collections"]["getAllBasic"];
}) => {
  const [isFiltersMenuActive, setIsFiltersMenuActive] = useState(false);
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
    <section className="flex flex-grow flex-col">
      <div className="relative flex flex-grow py-main-p-1 md:gap-main-p-3 md:p-main-p-3">
        <SideMenu
          isFiltersMenuActive={isFiltersMenuActive}
          setIsFiltersMenuActive={setIsFiltersMenuActive}
          pagesCategories={pagesCategories}
          setSelectedHandles={setSelectedHandles}
          selectedHandles={selectedHandles}
        />
        <div className="isolate flex max-w-full flex-grow flex-col gap-12 overflow-hidden bg-bg-primary-100 px-4 py-12 transition-all dark:bg-bg-primary-900 md:rounded-2xl md:px-8 lg:px-12">
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
          <div className="flex h-[75vh] min-h-[25rem] flex-grow flex-col gap-8 overflow-y-auto overflow-x-hidden">
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
                        384: { slidesPerView: 2 },
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
                            py: "md",
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
