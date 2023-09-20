"use client";
import { type ReactNode } from "react";
import BoxEditOverlay from "../../BoxEditOverlay";
import { type BoxTypeIframe } from "../../_";

import { type PageStoreApi } from "../../types";
import { BoxTypes, IframeBoxTypes } from "@prisma/client";
import { useStore } from "zustand";
import { cx } from "class-variance-authority";
import {
  type FormStoreApi,
  type GetPassedValidationFieldsValues,
  useCreateFormStore,
} from "@de100/form-echo";
import { toast } from "react-toastify";

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
import { trpcApi } from "~/app/libs/trpc/client";
import ContainedDropdownField from "~/app/components/common/@de100/form-echo/Fields/Contained/Dropdown";
import ContainedInputField from "~/app/components/common/@de100/form-echo/Fields/Contained/Input";
import Form from "~/app/components/common/@de100/form-echo/Forms";
import Accordion from "~/app/components/common/Accordion";
import {
  YouTubeIFrame,
  InstagramIframe,
  SoundCloudIframe,
} from "~/app/components/common/Iframes";
import { getValueByPathArray, newUpdatedByPathArray } from "~/libs/obj/update";
import { handleBoxVariants, type BoxVariants } from "~/libs/utils/appData";
import { createOneIframeBoxSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/iframes";
import { CreateOneCustomCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/customClasses";

type IframeBox = {
  src: string;
  title: string | null;
  type: IframeBoxTypes;
};
type IframeFormStore = FormStoreApi<IframeBox, typeof createOneIframeBoxSchema>;
type SharedProps = {
  boxDeepLevel: number;
  parentBox?: BoxTypes;
  className?: string;
};
type Props = {
  box: BoxTypeIframe;
  path: (string | number)[];
  pageStore: PageStoreApi;
} & SharedProps;

const BOX_TYPE = BoxTypes.IFRAME;

const IframeBoxForm = (props: {
  store: IframeFormStore;
  id: string;
  onSuccess: (params: {
    validatedValues: GetPassedValidationFieldsValues<
      typeof createOneIframeBoxSchema
    >;
  }) => void;
}) => {
  const updateOneRequest =
    trpcApi.dashboard.boxes.types.iframes.updateOne.useMutation({
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
          ...params.validatedValues,
        });

        props.onSuccess(params);
      }}
      store={props.store}
    >
      <ContainedDropdownField
        isA="combobox"
        data={
          Object.values(
            IframeBoxTypes,
          ) as unknown as (keyof typeof IframeBoxTypes)[]
        }
        store={props.store}
        name="type"
        labelProps={{ children: "type" }}
        getOptionChildren={(value) => value.replaceAll("_", " ").toLowerCase()}
        getDisplayValue={(value) => value.replaceAll("_", " ").toLowerCase()}
        getOptionKey={(value) => value}
      />
      <ContainedInputField
        store={props.store}
        name="src"
        labelProps={{ children: "src" }}
      />
      <ContainedInputField
        store={props.store}
        name="title"
        labelProps={{ children: "title" }}
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

const IframeBoxView = (
  props: {
    childrenAfter?: ReactNode;
  } & SharedProps &
    IframeBox,
) => {
  if (props.type === IframeBoxTypes.YOUTUBE)
    return (
      <YouTubeIFrame
        containerProps={{
          className: cx(
            "w-full rounded-3xl overflow-hidden relative isolate",
            props.className,
          ),
        }}
        childrenAfter={props.childrenAfter}
        youTubeIconVariants={{
          fontSize: props.parentBox === BoxTypes.SLIDER ? "small" : "medium",
        }}
        width={props.parentBox === BoxTypes.SLIDER ? "200" : "550"}
        height={props.parentBox === BoxTypes.SLIDER ? "200" : "550"}
        src={props.src}
        title={props.title ?? "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    );

  if (props.type === IframeBoxTypes.INSTAGRAM)
    return (
      <InstagramIframe
        className={props.className}
        src={props.src}
        title={props.title}
        childrenAfter={props.childrenAfter}
      />
    );

  if (props.type === IframeBoxTypes.SOUND_CLOUD)
    return (
      <SoundCloudIframe
        className={props.className}
        src={props.src}
        title={props.title}
        childrenAfter={props.childrenAfter}
      />
    );

  return <></>;
};

const IframeBoxFormView = (
  props: {
    iframeFormStore: IframeFormStore;
    twVariantsFormStore: TwVariantsFormStore;
    customCssFormStore: CustomCssFormStore;
  } & SharedProps,
) => {
  const src = useStore(
    props.iframeFormStore,
    (store) => store.fields.src.value,
  );
  const title = useStore(
    props.iframeFormStore,
    (store) => store.fields.title.value,
  );
  const type = useStore(
    props.iframeFormStore,
    (store) => store.fields.type.value,
  );
  // const width = useStore(
  // 	props.iframeFormStore,
  // 	(store) => store.fields.width.value,
  // );
  // const height = useStore(
  // 	props.iframeFormStore,
  // 	(store) => store.fields.height.value,
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

  const className = cx(
    props.className,
    customPageClasses[`${BOX_TYPE}-BOX`],
    twVariantsStr,
    customCssStr,
  );

  return (
    <IframeBoxView
      boxDeepLevel={props.boxDeepLevel}
      parentBox={props.parentBox}
      className={className}
      //
      src={src}
      title={title}
      type={type}
      // width={width}
      // height={height}
    />
  );
};

const IframeBoxEditOverlay = (props: Props) => {
  const box = useStore(
    props.pageStore,
    (state) => getValueByPathArray<BoxTypeIframe>(state.page, props.path), // .slice(0, -1)
  );
  const iframeFormStore: IframeFormStore = useCreateFormStore({
    initValues: {
      src: box.iframeBox.src,
      title: box.iframeBox.title,
      type: box.iframeBox.type,
      // width: box.iframeBox.width,
      // height: box.iframeBox.height,
    },
    validationSchema: createOneIframeBoxSchema,
    validationEvents: { change: true },
    valuesFromFieldsToStore: {
      title: (val) => (val ? val : null),
      // width: (val) => (val ? Number(val) : null),
      // height: (val) => (val ? Number(val) : null),
    },
    valuesFromStoreToFields: {
      title: (val) => val ?? "",
      // width: (val) => (typeof val === 'number' ? val.toString() : ''),
      // height: (val) => (typeof val === 'number' ? val.toString() : ''),
    },
  });
  const twVariantsFormStore = useCreateTwVariantsFormStore(
    props.box.css.twVariants,
  );
  const customCssFormStore: CustomCssFormStore = useCreateFormStore({
    initValues: {
      customClasses: props.box.css.customClasses ?? [],
    },
    validationSchema: CreateOneCustomCssSchema,
  });

  return (
    <BoxEditOverlay
      {...props}
      ShowcaseBoxChildren={
        <IframeBoxFormView
          boxDeepLevel={props.boxDeepLevel}
          parentBox={props.parentBox}
          className={props.className}
          //
          iframeFormStore={iframeFormStore}
          twVariantsFormStore={twVariantsFormStore}
          customCssFormStore={customCssFormStore}
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
                      >([...props.path, "css"], page, (prev: BoxTypeIframe) => {
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
                      >([...props.path, "css"], page, (prev: BoxTypeIframe) => {
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
              ___key: "twVariants",
            },
            {
              defaultOpen: true,
              contentChildren: (
                <IframeBoxForm
                  store={iframeFormStore}
                  id={box.iframeBox.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPage((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >(
                        [...props.path, "iframeBox"],
                        page,
                        (prev: BoxTypeIframe) => ({
                          ...prev,
                          src: params.validatedValues.src,
                          title: params.validatedValues.title,
                          type: params.validatedValues.type,
                          // width: params.validatedValues.width,
                          // height: params.validatedValues.height,
                        }),
                      );
                    });
                  }}
                />
              ),
              titleElem: (
                <h3 className="text-h6 font-bold capitalize">
                  iframe box form
                </h3>
              ),
              ___key: "iframeBox",
            },
          ]}
        />
      }
    />
  );
};

export const IframeBoxEditable = (props: Props) => {
  const box = useStore(props.pageStore, (state) =>
    getValueByPathArray<BoxTypeIframe>(state.page, props.path),
  );

  const iframeBoxViewProps = {
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
    //
    type: box.iframeBox.type,
    src: box.iframeBox.src,
    title: box.iframeBox.title,
    // width: box.iframeBox.width,
    // height: box.iframeBox.height,
  };

  return (
    <IframeBoxView
      {...iframeBoxViewProps}
      childrenAfter={<IframeBoxEditOverlay {...props} />}
    />
  );
};
