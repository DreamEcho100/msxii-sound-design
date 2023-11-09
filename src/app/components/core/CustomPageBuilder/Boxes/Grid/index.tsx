"use client";
import { type CSSProperties, type ReactNode } from "react";
import BoxEditOverlay from "../../BoxEditOverlay";
import {
  type Bx,
  type BxTypeGrid,
  type Css,
  type PgStoreApi,
} from "../../types";
import { BxTypes } from "@prisma/client";
import { useStore } from "zustand";
import { cx } from "class-variance-authority";
import { useCreateFormStore } from "@de100/form-echo";

import customPgClasses from "~/app/styles/_custom-page.module.css";
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
import { handleBxVariants, type BxVariants } from "~/libs/utils/appData";
import { CreateOneCustomCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/customClasses";
import { SectionBoxContainer } from "../../SectionBoxContainer";

type Grid = {
  // slidesPerViewType: (typeof SlidesPerViewType)[keyof typeof SlidesPerViewType];
};
type SharedProps = {
  bxDeepLevel: number;
  parentBx?: BxTypes;
  className?: string;
  inlineStyles?: Css["inlineStyles"];

  // gridsBxs: BxTypeGrid['grid']['gridsBxs']
  // path: (string | number)[];
  // pageStore: PgStoreApi;
};
type Props = SharedProps & {
  bx: BxTypeGrid;
  path: (string | number)[];
  pageStore: PgStoreApi;
};

const BOX_TYPE = BxTypes.GRID;

const GridView = (
  props: {
    childrenAfter?: ReactNode;
    gridsBxs: BxTypeGrid["grid"]["gridsBxs"];
    path: (string | number)[];
    pageStore: PgStoreApi;
    // isDisplayingSlidesOut?: boolean;
    // forceRerender?: boolean;
  } & SharedProps &
    Grid,
) => {
  const newBxDeepLevel = props.bxDeepLevel + 1;

  return (
    <div
      className={props.className}
      style={props.inlineStyles as CSSProperties}
    >
      {props.gridsBxs.map((gridBx, gridBxIndex) => (
        <SectionBoxContainer
          key={gridBx.bxId}
          bx={gridBx.bx as Bx}
          parentBx={props.parentBx}
          bxDeepLevel={newBxDeepLevel}
          path={[...props.path, "grid", "gridsBxs", gridBxIndex, "bx"]}
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
    gridsBxs: BxTypeGrid["grid"]["gridsBxs"];
    path: (string | number)[];
    pageStore: PgStoreApi;
  } & SharedProps,
) => {
  // const slidesPerViewType = useStore(
  // 	props.gridFormStore,
  // 	(store) => store.fields.slidesPerViewType.value,
  // );
  const twVariantsStr = useStore(props.twVariantsFormStore, (store) =>
    handleBxVariants(store.fields.twVariants.value),
  );

  const customCssStr = useStore(
    props.customCssFormStore,
    (store) =>
      store.fields.customClasses.value
        ?.map((key) => customPgClasses[key])
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
    customPgClasses[`${BOX_TYPE}-BOX`],
    twVariantsStr,
    customCssStr,
  );

  return (
    <GridView
      bxDeepLevel={props.bxDeepLevel}
      parentBx={props.parentBx}
      className={className}
      inlineStyles={styles}
      //
      // slidesPerViewType={slidesPerViewType}
      gridsBxs={props.gridsBxs}
      path={props.path}
      pageStore={props.pageStore}
      // isDisplayingSlidesOut
      // forceRerender
    />
  );
};

const GridEditOverlay = (
  props: Props & {
    gridsBxs: BxTypeGrid["grid"]["gridsBxs"];
  },
) => {
  const bx = useStore(
    props.pageStore,
    (state) => getValueByPathArray<BxTypeGrid>(state.page, props.path), // .slice(0, -1)
  );
  // const gridFormStore: GridFormStore = useCreateFormStore({
  // 	initValues: {
  // 		// slidesPerViewType: bx.grid.slidesPerViewType,
  // 	},
  // 	validationSchema: createOneGridSchema,
  // 	validationEvents: { change: true },
  // });
  const twVariantsFormStore = useCreateTwVariantsFormStore(
    props.bx.css.twVariants,
  );
  const customCssFormStore: CustomCssFormStore = useCreateFormStore({
    initValues: {
      customClasses: props.bx.css.customClasses ?? [],
    },
    validationSchema: CreateOneCustomCssSchema,
  });

  const inlineStylesFormStore = useInlineStylesFormStore({
    gridTemplateColumns: "",
    gridTemplateRows: "",
    ...((props.bx.css.inlineStyles as Record<string, string>) || {}),
  });

  return (
    <BoxEditOverlay
      {...props}
      ShowcaseBxChildren={
        <GridFormView
          bxDeepLevel={props.bxDeepLevel}
          parentBx={props.parentBx}
          className={props.className}
          inlineStyles={props.bx.css.inlineStyles}
          //
          // gridFormStore={gridFormStore}
          twVariantsFormStore={twVariantsFormStore}
          customCssFormStore={customCssFormStore}
          inlineStylesFormStore={inlineStylesFormStore}
          //
          path={props.path}
          pageStore={props.pageStore}
          gridsBxs={props.gridsBxs}
        />
      }
      EditSideMenuChildren={
        <Accordion
          disclosures={[
            {
              contentChildren: (
                <TwVariantsForm
                  store={twVariantsFormStore}
                  cssId={bx.css.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPg((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >([...props.path, "css"], page, (prev: BxTypeGrid) => {
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
                  cssId={bx.css.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPg((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >([...props.path, "css"], page, (prev: BxTypeGrid) => {
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
                  cssId={bx.css.id}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPg((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >([...props.path, "grid"], page, (prev: BxTypeGrid) => ({
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
                  grid inline styles bx form
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
  const bx = useStore(props.pageStore, (state) =>
    getValueByPathArray<BxTypeGrid>(state.page, props.path),
  );

  const gridViewProps = {
    bxDeepLevel: props.bxDeepLevel,
    parentBx: props.parentBx,
    className: cx(
      customPgClasses[`${BOX_TYPE}-BOX`],
      props.className,
      handleBxVariants(bx.css.twVariants as BxVariants),
      ...(bx.css.customClasses
        ? bx.css.customClasses?.map((key) => customPgClasses[key])
        : []),
    ),
    inlineStyles: bx.css.inlineStyles,
    //
    // slidesPerViewType: bx.grid.slidesPerViewType,
    path: props.path,
    pageStore: props.pageStore,
    gridsBxs: bx.grid.gridsBxs,
  };

  return (
    <GridView
      {...gridViewProps}
      childrenAfter={<GridEditOverlay {...props} gridsBxs={bx.grid.gridsBxs} />}
    />
  );
};
