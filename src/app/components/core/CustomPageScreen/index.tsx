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
  customPageStructureData: RouterOutputs["customPages"]["getOne"];
  pageCategoryItemsData?: RouterOutputs["customPages"]["pagesCategories"]["getManyItems"];
  pageParams: {
    pageCategoryName: string;
    slug?: string | null;
  };
}; // & GetCustomPageDataProps;

const PageCategoryItems = (props: {
  data: RouterOutputs["customPages"]["pagesCategories"]["getManyItems"];
  addPageToPageCategoryType?: "product";
}) => {
  if (props.data.items.length === 0 && !props.addPageToPageCategoryType)
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
      {props.addPageToPageCategoryType && (
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
                  ? `/${item.pageCategoryName}/${item.slug}`
                  : `/${item.pageCategoryName}`
              }
              isA="next-js"
              className="aspect-square w-full overflow-hidden rounded-lg"
            >
              <CustomNextImage
                priority
                src={
                  item?.image?.src ??
                  `https://api.dicebear.com/6.x/shapes/svg?seed=${item.pageCategoryName}/${item.slug}`
                }
                alt={item?.image?.altText ?? undefined}
                width={item?.image?.width ?? 500}
                height={item?.image?.height ?? 500}
                className="h-full w-full object-cover"
              />
            </Clickable>
            {item.slug && (
              <p>
                <Clickable
                  isA="next-js"
                  href={`/${item.pageCategoryName}/${item.slug}`}
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
    <CustomPageBuilder page={props.customPageStructureData}>
      <Suspense>
        {props.pageParams.pageCategoryName === "merch" &&
        !props.pageParams.slug ? (
          <Merch />
        ) : props.pageParams.pageCategoryName === "blue-label" &&
          !props.pageParams.slug ? (
          <BlueLabel />
        ) : (
          <></>
        )}
      </Suspense>
      {!props.pageParams.slug && props.pageCategoryItemsData && (
        <PageCategoryItems
          data={props.pageCategoryItemsData}
          addPageToPageCategoryType={
            !!(
              props.pageParams.pageCategoryName === "products" &&
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
