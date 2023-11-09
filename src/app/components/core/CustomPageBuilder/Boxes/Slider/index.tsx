"use client";
import { useState, type ReactNode, useEffect } from "react";
import BoxEditOverlay from "../../BoxEditOverlay";
import { type Bx, type BxTypeSlider, type PgStoreApi } from "../../types";
import { BxTypes, SlidesPerViewType } from "@prisma/client";
import { useStore } from "zustand";
import { cx } from "class-variance-authority";
import {
  type FormStoreApi,
  type GetPassedValidationFieldsValues,
  useCreateFormStore,
} from "@de100/form-echo";
import { toast } from "react-toastify";

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
import { trpcApi } from "~/app/libs/trpc/client";
import { createOneSliderSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/sliders";
import Form from "~/app/components/common/@de100/form-echo/Forms";
import ContainedDropdownField from "~/app/components/common/@de100/form-echo/Fields/Contained/Dropdown";
import { type BxVariants, handleBxVariants } from "~/libs/utils/appData";
import { getValueByPathArray, newUpdatedByPathArray } from "~/libs/obj/update";
import { CreateOneCustomCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/customClasses";
import Accordion from "~/app/components/common/Accordion";
import { SectionBoxContainer } from "../../SectionBoxContainer";
import { default as SliderComp } from "~/app/components/common/Slider";

type Slider = {
  slidesPerViewType: (typeof SlidesPerViewType)[keyof typeof SlidesPerViewType];
};
type SliderFormStore = FormStoreApi<Slider, typeof createOneSliderSchema>;
type SharedProps = {
  bxDeepLevel: number;
  parentBx?: BxTypes;
  className?: string;

  // slidesBxs: BxTypeSlider['slider']['slidesBxs']
  // path: (string | number)[];
  // pageStore: PgStoreApi;
};
type Props = SharedProps & {
  bx: BxTypeSlider;
  path: (string | number)[];
  pageStore: PgStoreApi;
};

const BOX_TYPE = BxTypes.SLIDER;

const slidesPerViewTypeDropdownData = Object.values<
  (typeof SlidesPerViewType)[keyof typeof SlidesPerViewType]
>(SlidesPerViewType).map((value) => ({
  value,
  name: value
    .split("_")
    .map(
      (word) =>
        `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`,
    )
    .join(" "),
}));

const SliderForm = (props: {
  store: SliderFormStore;
  id: string;
  onSuccess: (params: {
    validatedValues: GetPassedValidationFieldsValues<
      typeof createOneSliderSchema
    >;
  }) => void;
}) => {
  const updateOneRequest =
    trpcApi.dashboard.bxes.types.sliders.updateOne.useMutation({
      onError(error) {
        toast(error.message, { type: "error" });
      },
      onSuccess() {
        toast("Successful submission!", { type: "success" });
      },
    });

  return (
    <Form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={async (event, params) => {
        event.preventDefault();
        await updateOneRequest.mutateAsync({
          id: props.id,
          // ...params.validatedValues,
          slidesPerViewType: params.validatedValues.slidesPerViewType,
        });

        props.onSuccess(params);
      }}
      store={props.store}
    >
      <ContainedDropdownField
        store={props.store}
        name="slidesPerViewType"
        labelProps={{ children: "slides per view type" }}
        isA="combobx"
        data={slidesPerViewTypeDropdownData}
        getOptionChildren={(value) =>
          (typeof value === "string" ? value : value.value).toLowerCase()
        }
        getDisplayValue={(value) =>
          (typeof value === "string" ? value : value.value).toLowerCase()
        }
        getOptionKey={(value) =>
          typeof value === "string" ? value : value.value
        }
        onChange={(value) => {
          props.store.getState().utils.handleOnInputChange(
            "slidesPerViewType",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            (
              value as {
                value: "DEFAULT" | "ONE_SLIDE" | "LARGE_SLIDES";
                name: string;
              }
            ).value,
          );
        }}
        // defaultValue={{
        // 	value: props.store.getState().fields.slidesPerViewType.value,
        // 	name: props.store.getState().fields.slidesPerViewType.value
        // 		.split('_')
        // 		.map(
        // 			(word) =>
        // 				`${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`,
        // 		)
        // 		.join(' '),
        // }}
      />
      <button
        type="submit"
        disabled={updateOneRequest.isLoading}
        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        submit
      </button>
    </Form>
  );
};

const SlideComp = (props: {
  item: BxTypeSlider["slider"]["slidesBxs"][number];
  parentBx: "SLIDER";
  bxDeepLevel: number;
  path: (number | string)[];
  pageStore: PgStoreApi;
}) => {
  const { item, ..._props } = props;

  return (
    <>
      {/* <SwiperSlide key={slideBx.bxId} className="flex flex-col"> */}
      <SectionBoxContainer bx={item.bx as Bx} {..._props} />
      {/* </SwiperSlide> */}
    </>
  );
};

const SliderView = (
  props: {
    childrenAfter?: ReactNode;
    slidesBxs: BxTypeSlider["slider"]["slidesBxs"];
    path: (string | number)[];
    pageStore: PgStoreApi;
    isDisplayingSlidesOut?: boolean;
    forceRerender?: boolean;
  } & SharedProps &
    Slider,
) => {
  const newBxDeepLevel = props.bxDeepLevel + 1;
  const [watchedStateForRerender, setWatchedStateForRerender] = useState({
    slidesPerViewType: props.slidesPerViewType,
  });
  const [forceRerender, setForceRerender] = useState(false);

  useEffect(() => {
    if (watchedStateForRerender.slidesPerViewType === props.slidesPerViewType)
      return;

    setWatchedStateForRerender({
      slidesPerViewType: props.slidesPerViewType,
    });
    setForceRerender(true);
  }, [props.slidesPerViewType, watchedStateForRerender.slidesPerViewType]);

  useEffect(() => {
    if (!forceRerender) return;

    const timeoutId = setTimeout(() => setForceRerender(false), 0);

    return () => clearTimeout(timeoutId);
  }, [forceRerender]);

  return (
    <>
      <div className={props.className}>
        {!forceRerender && (
          <SliderComp
            className={cx(customPgClasses.swiper, "swiper-fluid")}
            breakpoints={
              props.slidesPerViewType === SlidesPerViewType.LARGE_SLIDES
                ? {
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                    1280: { slidesPerView: 4, spaceBetween: 30 },
                  }
                : props.slidesPerViewType === SlidesPerViewType.ONE_SLIDE
                ? { 0: { slidesPerView: 1 } }
                : {
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 4, spaceBetween: 30 },
                    1280: { slidesPerView: 5, spaceBetween: 30 },
                  }
            }
            data={props.slidesBxs}
            getSlideKey={(item) => item.id}
            SlideComp={SlideComp}
            compProps={(_, itemIndex) => ({
              parentBx: BOX_TYPE,
              bxDeepLevel: newBxDeepLevel,
              path: [...props.path, "slider", "slidesBxs", itemIndex, "bx"],
              pageStore: props.pageStore,
            })}
            isNavButtonsOutside
          />
        )}
        {props.childrenAfter}
      </div>
      {props.isDisplayingSlidesOut && (
        <>
          <section className="mx-4 mt-16 flex flex-col gap-8 border-[0.5rem] px-4 py-8">
            <header>
              <h2 className="text-center text-h2 capitalize">all slides ^</h2>
            </header>
            <section
              className="grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
              }}
            >
              {props.slidesBxs.map((slideBx, slideBxIndex) => (
                <SectionBoxContainer
                  key={slideBx.bxId}
                  bx={slideBx.bx as Bx}
                  parentBx={BOX_TYPE}
                  bxDeepLevel={newBxDeepLevel}
                  path={[
                    ...props.path,
                    "slider",
                    "slidesBxs",
                    slideBxIndex,
                    "bx",
                  ]}
                  pageStore={props.pageStore}
                />
              ))}
            </section>
          </section>
        </>
      )}
    </>
  );
};

const SliderFormView = (
  props: {
    sliderFormStore: SliderFormStore;
    twVariantsFormStore: TwVariantsFormStore;
    customCssFormStore: CustomCssFormStore;
    //
    slidesBxs: BxTypeSlider["slider"]["slidesBxs"];
    path: (string | number)[];
    pageStore: PgStoreApi;
  } & SharedProps,
) => {
  const slidesPerViewType = useStore(
    props.sliderFormStore,
    (store) => store.fields.slidesPerViewType.value,
  );
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

  const className = cx(
    props.className,
    customPgClasses[`${BOX_TYPE}-BOX`],
    twVariantsStr,
    customCssStr,
  );

  return (
    <SliderView
      bxDeepLevel={props.bxDeepLevel}
      parentBx={props.parentBx}
      className={className}
      //
      slidesPerViewType={slidesPerViewType}
      slidesBxs={props.slidesBxs}
      path={props.path}
      pageStore={props.pageStore}
      isDisplayingSlidesOut
      forceRerender
    />
  );
};

const SliderEditOverlay = (
  props: Props & {
    slidesBxs: BxTypeSlider["slider"]["slidesBxs"];
  },
) => {
  const bx = useStore(
    props.pageStore,
    (state) => getValueByPathArray<BxTypeSlider>(state.page, props.path), // .slice(0, -1)
  );
  const sliderFormStore: SliderFormStore = useCreateFormStore({
    initValues: {
      slidesPerViewType: bx.slider.slidesPerViewType,
    },
    validationSchema: createOneSliderSchema,
    validationEvents: { change: true },
  });
  const twVariantsFormStore = useCreateTwVariantsFormStore(
    props.bx.css.twVariants,
  );
  const customCssFormStore: CustomCssFormStore = useCreateFormStore({
    initValues: {
      customClasses: props.bx.css.customClasses ?? [],
    },
    validationSchema: CreateOneCustomCssSchema,
  });

  return (
    <BoxEditOverlay
      {...props}
      ShowcaseBxChildren={
        <SliderFormView
          bxDeepLevel={props.bxDeepLevel}
          parentBx={props.parentBx}
          className={props.className}
          //
          sliderFormStore={sliderFormStore}
          twVariantsFormStore={twVariantsFormStore}
          customCssFormStore={customCssFormStore}
          //
          path={props.path}
          pageStore={props.pageStore}
          slidesBxs={props.slidesBxs}
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
                      >([...props.path, "css"], page, (prev: BxTypeSlider) => {
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
                      >([...props.path, "css"], page, (prev: BxTypeSlider) => {
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
                <SliderForm
                  store={sliderFormStore}
                  id={bx.slider.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPg((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >(
                        [...props.path, "slider"],
                        page,
                        (prev: BxTypeSlider) => ({
                          ...prev,
                          slidesPerViewType:
                            params.validatedValues.slidesPerViewType,
                        }),
                      );
                    });
                  }}
                />
              ),
              titleElem: (
                <h3 className="text-h6 font-bold capitalize">slider bx form</h3>
              ),
              ___key: "slider",
            },
          ]}
        />
      }
    />
  );
};

export const SliderEditable = (props: Props) => {
  const bx = useStore(props.pageStore, (state) =>
    getValueByPathArray<BxTypeSlider>(state.page, props.path),
  );

  const sliderViewProps = {
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
    //
    slidesPerViewType: bx.slider.slidesPerViewType,
    path: props.path,
    pageStore: props.pageStore,
    slidesBxs: bx.slider.slidesBxs,
  };

  return (
    <SliderView
      {...sliderViewProps}
      childrenAfter={
        <SliderEditOverlay {...props} slidesBxs={bx.slider.slidesBxs} />
      }
    />
  );
};
