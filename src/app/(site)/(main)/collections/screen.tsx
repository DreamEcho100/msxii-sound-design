"use client";
import { type Dispatch, type SetStateAction, useState, Suspense } from "react";
import { GiSettingsKnobs } from "react-icons/gi";

import { cx } from "class-variance-authority";
// import { CardsSlider } from "~/app/components/core/Shopify/Cards/Slider";
import Clickable from "~/app/components/core/Clickable";
import {
  type Edges,
  type BasicCollection,
  type TGetCollectionWithNoEdges,
} from "~/libs/shopify/types";
import ProductsCardsSlider from "~/app/components/core/Shopify/Cards/ProductsCardsSlider";
import SeeMoreSlideChildren from "~/app/components/core/SeeMoreSlideChildren";
import PagesCategoriesMenu from "./_components/PagesCategoriesMenu";

const SideMenu = (props: {
  isFiltersMenuActive: boolean;
  setIsFiltersMenuActive: Dispatch<SetStateAction<boolean>>;
  allHandles: string[];
  selectedHandles?: string[];
}) => {
  return (
    <>
      <div
        className={cx(
          "bg-bg-primary absolute left-0 top-0 z-[2] h-full max-w-[90%] origin-left bg-bg-primary-500 p-8 rtl:origin-right md:pointer-events-none md:hidden md:opacity-0",
          "overflow-x-hidden transition-all duration-300",
          props.isFiltersMenuActive ? "translate-x-0" : "-translate-x-full",
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
          <Suspense>
            <PagesCategoriesMenu
              handles={props.allHandles}
              selectedHandles={props.selectedHandles}
            />
          </Suspense>
        </div>
      </div>
      <div className="hidden md:flex">
        <div
          className={cx(
            "z-[2] h-full origin-left flex-col gap-1 bg-bg-primary-500 py-main-p-3 rtl:origin-right md:flex",
            "overflow-x-hidden transition-all duration-300",
            props.isFiltersMenuActive ? "w-auto scale-100" : "w-0 scale-0",
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
          <Suspense>
            <PagesCategoriesMenu
              handles={props.allHandles}
              // setSelectedPgsCategories={props.setSelectedHandles}
              selectedHandles={props.selectedHandles}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default function CollectionsScreen(props: {
  collectionsWithNoEdges: TGetCollectionWithNoEdges<Edges<BasicCollection>>[];
  handles: string[];
  selectedHandles?: string[];
}) {
  const [isFiltersMenuActive, setIsFiltersMenuActive] = useState(false);
  // const searchParams = useSearchParams();
  // const [isReady, setIsReady] = useState(false);
  // const [selectedHandles, setSelectedHandles] = useState<string[]>([]);
  // setSelectedHandles
  return (
    <section className="flex flex-grow flex-col">
      <div className="relative isolate flex flex-grow py-main-p-1 md:gap-main-p-3 md:p-main-p-3">
        <SideMenu
          isFiltersMenuActive={isFiltersMenuActive}
          setIsFiltersMenuActive={setIsFiltersMenuActive}
          allHandles={props.handles}
          selectedHandles={props.selectedHandles}
        />
        <div className="isolate flex max-w-full flex-grow flex-col gap-12 overflow-hidden bg-bg-primary-100 px-4 py-12 transition-all dark:bg-bg-primary-900 md:rounded-2xl md:px-8 lg:px-12">
          <header className="flex justify-between">
            <h1 className="text-h1 font-semibold">
              {!props.selectedHandles ||
              props.selectedHandles.length === props.handles.length ||
              props.selectedHandles.length === 0
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
            {props.collectionsWithNoEdges.map((collection) => (
              <article key={collection.id} className="flex flex-col gap-4">
                <h2 className="text-h4 font-normal capitalize text-text-primary-300">
                  <Clickable
                    href={`/collections/${collection.handle}`}
                    isA="next-js"
                    className="border-b-3 border-b-transparent hover:border-b-text-primary-200 focus:border-b-text-primary-200"
                  >
                    {collection.title.replaceAll("-", " ")}
                  </Clickable>
                </h2>
                <div>
                  <ProductsCardsSlider
                    isNavButtonsOutside
                    data={collection.products}
                    nextSlideButtonClassName="scale-[50%] -translate-y-[200%] lg:-translate-y-[225%]"
                    previousSlideButtonClassName="scale-[50%] -translate-y-[200%] lg:-translate-y-[225%]"
                    breakpoints={{
                      640: { slidesPerView: 2, spaceBetween: 15 },
                      768: { slidesPerView: 3 },
                      1024: { slidesPerView: 4 },
                      1280: { slidesPerView: 5 },
                    }}
                    extraLastSlideChildren={
                      collection.handle === "all-products" ? undefined : (
                        <SeeMoreSlideChildren
                          href={
                            collection.handle === "merch"
                              ? "/merch"
                              : `/collections/${collection.handle}`
                          }
                          linkClassName="-translate-y-[40%]"
                        />
                      )
                    }
                    compProps={{
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
}
