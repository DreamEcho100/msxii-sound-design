import { cx } from "class-variance-authority";
import Merch from "./components/Merch";
import BlueLabel from "./components/BlueLabel";
import CreateProductPageButton from "./components/CreateProductPageButton";
import CustomNextImage from "../../common/CustomNextImage";
import Clickable from "../Clickable";
import CustomPageBuilder from "../CustomPageBuilder";
import { type RouterOutputs } from "~/server/api/root";
import { Fragment, Suspense } from "react";

type Props = {
  customPgStructureData: RouterOutputs["customPgs"]["getOne"];
  pageCategoryItemsData?: RouterOutputs["customPgs"]["pagesCategories"]["getManyItems"];
  pageParams: {
    pgCategoryName: string;
    slug?: string | null;
  };
}; // & GetCustomPgDataProps;

const PgCategoryItems = (props: {
  data: RouterOutputs["customPgs"]["pagesCategories"]["getManyItems"];
  addPgToPgCategoryType?: "product";
}) => {
  if (props.data.items.length === 0 && !props.addPgToPgCategoryType)
    return <></>;

  return (
    <div
      className={cx(
        "grid gap-8 lg:flex-nowrap",
        "grid gap-8 lg:flex-nowrap lg:justify-between",
        props.data.items.length < 4
          ? "grid-cols-[repeat(auto-fit,_24.5rem)]"
          : "grid-cols-[repeat(auto-fit,_minmax(12rem,_1fr))]",
      )}
    >
      {props.addPgToPgCategoryType && (
        <Suspense>
          <CreateProductPageButton
            dataLength={props.data.items.length}
            itemsSlugs={props.data.items.map((item) => item.slug)}
          />
        </Suspense>
      )}
      {props.data.items.map((item) =>
        !item.slug ? (
          <Fragment key={item.id} />
        ) : (
          <div key={item.id} className="flex flex-col gap-4">
            <Clickable
              href={
                item.slug
                  ? `/${item.pgCategoryName}/${item.slug}`
                  : `/${item.pgCategoryName}`
              }
              isA="next-js"
              className="aspect-square w-full overflow-hidden rounded-lg"
            >
              <CustomNextImage
                priority
                src={
                  item?.img?.src ??
                  `https://api.dicebear.com/6.x/shapes/svg?seed=${item.pgCategoryName}/${item.slug}`
                }
                alt={item?.img?.altText ?? undefined}
                width={item?.img?.width ?? 500}
                height={item?.img?.height ?? 500}
                className="h-full w-full object-cover"
              />
            </Clickable>
            {item.slug && (
              <p>
                <Clickable
                  isA="next-js"
                  href={`/${item.pgCategoryName}/${item.slug}`}
                  target="_blank"
                  className="capitalize"
                >
                  {item.slug.replace("-", " ")}
                </Clickable>
              </p>
            )}
          </div>
        ),
      )}
    </div>
  );
};

const CustomPageScreen = (props: Props): React.JSX.Element => {
  return (
    <CustomPageBuilder pg={props.customPgStructureData}>
      <Suspense>
        {props.pageParams.pgCategoryName === "merch" &&
        !props.pageParams.slug ? (
          <Merch />
        ) : props.pageParams.pgCategoryName === "blue-label" &&
          !props.pageParams.slug ? (
          <BlueLabel />
        ) : (
          <></>
        )}
      </Suspense>
      {!props.pageParams.slug && props.pageCategoryItemsData && (
        <PgCategoryItems
          data={props.pageCategoryItemsData}
          addPgToPgCategoryType={
            !!(
              props.pageParams.pgCategoryName === "products" &&
              !props.pageParams.slug
            )
              ? "product"
              : undefined
          }
        />
      )}
    </CustomPageBuilder>
  );
};

export default CustomPageScreen;
