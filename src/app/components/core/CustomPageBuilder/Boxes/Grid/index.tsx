"use client";
import { type CSSProperties, type ReactNode } from "react";
import BoxEditOverlay from "../../BoxEditOverlay";
import {
  type Box,
  type BoxTypeGrid,
  type Css,
  type PageStoreApi,
} from "../../types";
import { BoxTypes } from "@prisma/client";
import { useStore } from "zustand";
import { cx } from "class-variance-authority";
import { useCreateFormStore } from "@de100/form-echo";

import customPageClasses from "~/app/styles/_custom-page.module.css";
import {
  type CustomCssFormStore,
  CustomCssForm,
} from "../../Css/CustomClasses";
import {
  type TwVariantsFormStore,
  TwVariantsForm,
  useCreateTwVariantsFormStore,
} from "../../Css/TwVariants";
import {
  GridTemplateManager,
  type InlineStylesFormProps,
  type InlineStylesFormStore,
  useInlineStylesFormStore,
  useSetInlineStylesOneRequest,
} from "../../Css/InlineStyles";
import Form from "~/app/components/common/@de100/form-echo/Forms";
import Accordion from "~/app/components/common/Accordion";
import { getValueByPathArray, newUpdatedByPathArray } from "~/libs/obj/update";
import { handleBoxVariants, type BoxVariants } from "~/libs/utils/appData";
import { CreateOneCustomCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/customClasses";
import { SectionBoxContainer } from "../../SectionBoxContainer";

type Grid = {
  // slidesPerViewType: (typeof SlidesPerViewType)[keyof typeof SlidesPerViewType];
};
type SharedProps = {
  boxDeepLevel: number;
  parentBox?: BoxTypes;
  className?: string;
  inlineStyles?: Css["inlineStyles"];

  // gridsBoxes: BoxTypeGrid['grid']['gridsBoxes']
  // path: (string | number)[];
  // pageStore: PageStoreApi;
};
type Props = SharedProps & {
  box: BoxTypeGrid;
  path: (string | number)[];
  pageStore: PageStoreApi;
};

const BOX_TYPE = BoxTypes.GRID;

const GridView = (
  props: {
    childrenAfter?: ReactNode;
    gridsBoxes: BoxTypeGrid["grid"]["gridsBoxes"];
    path: (string | number)[];
    pageStore: PageStoreApi;
    // isDisplayingSlidesOut?: boolean;
    // forceRerender?: boolean;
  } & SharedProps &
    Grid,
) => {
  const newBoxDeepLevel = props.boxDeepLevel + 1;

  return (
    <div
      className={props.className}
      style={props.inlineStyles as CSSProperties}
    >
      {props.gridsBoxes.map((gridBox, gridBoxIndex) => (
        <SectionBoxContainer
          key={gridBox.boxId}
          box={gridBox.box as Box}
          parentBox={props.parentBox}
          boxDeepLevel={newBoxDeepLevel}
          path={[...props.path, "grid", "gridsBoxes", gridBoxIndex, "box"]}
          pageStore={props.pageStore}
        />
      ))}
      {props.childrenAfter}
    </div>
  );
};

export const InlineStylesForm = (props: InlineStylesFormProps) => {
  const setOneRequest = useSetInlineStylesOneRequest();

  const gridTemplateColumns = useStore(
    props.store,
    (store) => store.fields.gridTemplateColumns.value,
  );
  const gridTemplateRows = useStore(
    props.store,
    (store) => store.fields.gridTemplateRows.value,
  );

  return (
    <Form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={async (event, params) => {
        event.preventDefault();
        await setOneRequest.mutateAsync({
          cssId: props.cssId,
          inlineStyles: params.validatedValues,
        });

        props.onSuccess(params);
      }}
      store={props.store}
    >
      <div className="flex flex-col gap-2">
        <fieldset className="flex min-w-[unset] max-w-full flex-col gap-2 rounded-sm border p-4 shadow-md">
          <legend className="capitalize">template columns</legend>
          <GridTemplateManager
            name="gridTemplateColumns"
            gridTemplate={gridTemplateColumns}
            setGridTemplate={(gridTemplate) => {
              props.store
                .getState()
                .utils.setFieldValue("gridTemplateColumns", gridTemplate);
            }}
          />
        </fieldset>
        <fieldset className="flex min-w-[unset] max-w-full flex-col gap-2 rounded-sm border p-4 shadow-md">
          <legend className="capitalize">template rows</legend>
          <GridTemplateManager
            name="gridTemplateRows"
            gridTemplate={gridTemplateRows}
            setGridTemplate={(gridTemplate) => {
              props.store
                .getState()
                .utils.setFieldValue("gridTemplateRows", gridTemplate);
            }}
          />
        </fieldset>
      </div>
      <button
        type="submit"
        disabled={setOneRequest.isLoading}
        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        submit
      </button>
    </Form>
  );
};

const GridFormView = (
  props: {
    // gridFormStore: GridFormStore;
    twVariantsFormStore: TwVariantsFormStore;
    customCssFormStore: CustomCssFormStore;
    inlineStylesFormStore: InlineStylesFormStore;
    //
    gridsBoxes: BoxTypeGrid["grid"]["gridsBoxes"];
    path: (string | number)[];
    pageStore: PageStoreApi;
  } & SharedProps,
) => {
  // const slidesPerViewType = useStore(
  // 	props.gridFormStore,
  // 	(store) => store.fields.slidesPerViewType.value,
  // );
  const twVariantsStr = useStore(props.twVariantsFormStore, (store) =>
    handleBoxVariants(store.fields.twVariants.value),
  );

  const customCssStr = useStore(
    props.customCssFormStore,
    (store) =>
      store.fields.customClasses.value
        ?.map((key) => customPageClasses[key])
        .join(" ") ?? undefined,
  );

  const styles = useStore(props.inlineStylesFormStore, (store) => {
    const styles: Record<string, string | number> = {};

    let key: keyof (typeof store)["fields"];
    for (key in store.fields) {
      const element = store.fields[key].value;

      if (typeof element === "string" || typeof element === "number")
        styles[key] = element;
    }

    return styles;
  });

  const className = cx(
    props.className,
    customPageClasses[`${BOX_TYPE}-BOX`],
    twVariantsStr,
    customCssStr,
  );

  return (
    <GridView
      boxDeepLevel={props.boxDeepLevel}
      parentBox={props.parentBox}
      className={className}
      inlineStyles={styles}
      //
      // slidesPerViewType={slidesPerViewType}
      gridsBoxes={props.gridsBoxes}
      path={props.path}
      pageStore={props.pageStore}
      // isDisplayingSlidesOut
      // forceRerender
    />
  );
};

const GridEditOverlay = (
  props: Props & {
    gridsBoxes: BoxTypeGrid["grid"]["gridsBoxes"];
  },
) => {
  const box = useStore(
    props.pageStore,
    (state) => getValueByPathArray<BoxTypeGrid>(state.page, props.path), // .slice(0, -1)
  );
  // const gridFormStore: GridFormStore = useCreateFormStore({
  // 	initValues: {
  // 		// slidesPerViewType: box.grid.slidesPerViewType,
  // 	},
  // 	validationSchema: createOneGridSchema,
  // 	validationEvents: { change: true },
  // });
  const twVariantsFormStore = useCreateTwVariantsFormStore(
    props.box.css.twVariants,
  );
  const customCssFormStore: CustomCssFormStore = useCreateFormStore({
    initValues: {
      customClasses: props.box.css.customClasses ?? [],
    },
    validationSchema: CreateOneCustomCssSchema,
  });

  const inlineStylesFormStore = useInlineStylesFormStore({
    gridTemplateColumns: "",
    gridTemplateRows: "",
    ...((props.box.css.inlineStyles as Record<string, string>) || {}),
  });

  return (
    <BoxEditOverlay
      {...props}
      ShowcaseBoxChildren={
        <GridFormView
          boxDeepLevel={props.boxDeepLevel}
          parentBox={props.parentBox}
          className={props.className}
          inlineStyles={props.box.css.inlineStyles}
          //
          // gridFormStore={gridFormStore}
          twVariantsFormStore={twVariantsFormStore}
          customCssFormStore={customCssFormStore}
          inlineStylesFormStore={inlineStylesFormStore}
          //
          path={props.path}
          pageStore={props.pageStore}
          gridsBoxes={props.gridsBoxes}
        />
      }
      EditSideMenuChildren={
        <Accordion
          disclosures={[
            {
              contentChildren: (
                <TwVariantsForm
                  store={twVariantsFormStore}
                  cssId={box.css.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPage((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >([...props.path, "css"], page, (prev: BoxTypeGrid) => {
                        return {
                          ...prev,
                          twVariants: params.values.twVariants,
                        };
                      });
                    });
                  }}
                />
              ),
              titleElem: (
                <h3 className="text-h6 font-bold capitalize">
                  TW variants form
                </h3>
              ),
              ___key: "twVariants",
            },
            {
              isHidden: true,
              contentChildren: (
                <CustomCssForm
                  store={customCssFormStore}
                  cssId={box.css.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPage((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >([...props.path, "css"], page, (prev: BoxTypeGrid) => {
                        return {
                          ...prev,
                          customClasses: params.validatedValues.customClasses,
                        };
                      });
                    });
                  }}
                />
              ),
              titleElem: (
                <h3 className="text-h6 font-bold capitalize">custom classes</h3>
              ),
              ___key: "customClasses",
            },
            {
              defaultOpen: true,
              contentChildren: (
                <InlineStylesForm
                  store={inlineStylesFormStore}
                  cssId={box.css.id}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPage((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >([...props.path, "grid"], page, (prev: BoxTypeGrid) => ({
                        ...prev,
                        // slidesPerViewType:
                        // 	params.validatedValues.slidesPerViewType,
                      }));
                    });
                  }}
                />
              ),
              titleElem: (
                <h3 className="text-h6 font-bold capitalize">
                  grid inline styles box form
                </h3>
              ),
              ___key: "grid",
            },
          ]}
        />
      }
    />
  );
};

export const GridEditable = (props: Props) => {
  const box = useStore(props.pageStore, (state) =>
    getValueByPathArray<BoxTypeGrid>(state.page, props.path),
  );

  const gridViewProps = {
    boxDeepLevel: props.boxDeepLevel,
    parentBox: props.parentBox,
    className: cx(
      customPageClasses[`${BOX_TYPE}-BOX`],
      props.className,
      handleBoxVariants(box.css.twVariants as BoxVariants),
      ...(box.css.customClasses
        ? box.css.customClasses?.map((key) => customPageClasses[key])
        : []),
    ),
    inlineStyles: box.css.inlineStyles,
    //
    // slidesPerViewType: box.grid.slidesPerViewType,
    path: props.path,
    pageStore: props.pageStore,
    gridsBoxes: box.grid.gridsBoxes,
  };

  return (
    <GridView
      {...gridViewProps}
      childrenAfter={
        <GridEditOverlay {...props} gridsBoxes={box.grid.gridsBoxes} />
      }
    />
  );
};
