"use client";
import { type ReactNode } from "react";
import BoxEditOverlay from "../../BoxEditOverlay";
import { type BxTypeIframe, type PgStoreApi } from "../../types";
import { BxTypes, IframeBxTypes } from "@prisma/client";
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
import { handleBxVariants, type BxVariants } from "~/libs/utils/appData";
import { createOneIframeBxSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/iframes";
import { CreateOneCustomCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/customClasses";

type IframeBx = {
  src: string;
  title: string | null;
  type: IframeBxTypes;
};
type IframeFormStore = FormStoreApi<IframeBx, typeof createOneIframeBxSchema>;
type SharedProps = {
  bxDeepLevel: number;
  parentBx?: BxTypes;
  className?: string;
};
type Props = {
  bx: BxTypeIframe;
  path: (string | number)[];
  pageStore: PgStoreApi;
} & SharedProps;

const BOX_TYPE = BxTypes.IFRAME;

const IframeBxForm = (props: {
  store: IframeFormStore;
  id: string;
  onSuccess: (params: {
    validatedValues: GetPassedValidationFieldsValues<
      typeof createOneIframeBxSchema
    >;
  }) => void;
}) => {
  const updateOneRequest =
    trpcApi.dashboard.bxes.types.iframes.updateOne.useMutation({
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
        isA="combobx"
        data={
          Object.values(
            IframeBxTypes,
          ) as unknown as (keyof typeof IframeBxTypes)[]
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

const IframeBxView = (
  props: {
    childrenAfter?: ReactNode;
  } & SharedProps &
    IframeBx,
) => {
  if (props.type === IframeBxTypes.YOUTUBE)
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
          fontSize: props.parentBx === BxTypes.SLIDER ? "small" : "medium",
        }}
        width={props.parentBx === BxTypes.SLIDER ? "200" : "550"}
        height={props.parentBx === BxTypes.SLIDER ? "200" : "550"}
        src={props.src}
        title={props.title ?? "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    );

  if (props.type === IframeBxTypes.INSTAGRAM)
    return (
      <InstagramIframe
        className={props.className}
        src={props.src}
        title={props.title}
        childrenAfter={props.childrenAfter}
      />
    );

  if (props.type === IframeBxTypes.SOUND_CLOUD)
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

const IframeBxFormView = (
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
    <IframeBxView
      bxDeepLevel={props.bxDeepLevel}
      parentBx={props.parentBx}
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
  const bx = useStore(
    props.pageStore,
    (state) => getValueByPathArray<BxTypeIframe>(state.page, props.path), // .slice(0, -1)
  );
  const iframeFormStore: IframeFormStore = useCreateFormStore({
    initValues: {
      src: bx.iframeBx.src,
      title: bx.iframeBx.title,
      type: bx.iframeBx.type,
      // width: bx.iframeBx.width,
      // height: bx.iframeBx.height,
    },
    validationSchema: createOneIframeBxSchema,
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
        <IframeBxFormView
          bxDeepLevel={props.bxDeepLevel}
          parentBx={props.parentBx}
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
                  cssId={bx.css.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPg((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >([...props.path, "css"], page, (prev: BxTypeIframe) => {
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
                      >([...props.path, "css"], page, (prev: BxTypeIframe) => {
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
              ___key: "customCss",
            },
            {
              defaultOpen: true,
              contentChildren: (
                <IframeBxForm
                  store={iframeFormStore}
                  id={bx.iframeBx.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPg((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >(
                        [...props.path, "iframeBx"],
                        page,
                        (prev: BxTypeIframe) => ({
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
                <h3 className="text-h6 font-bold capitalize">iframe bx form</h3>
              ),
              ___key: "iframeBx",
            },
          ]}
        />
      }
    />
  );
};

export const IframeBxEditable = (props: Props) => {
  const bx = useStore(props.pageStore, (state) =>
    getValueByPathArray<BxTypeIframe>(state.page, props.path),
  );

  const iframeBxViewProps = {
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
    type: bx.iframeBx.type,
    src: bx.iframeBx.src,
    title: bx.iframeBx.title,
    // width: bx.iframeBx.width,
    // height: bx.iframeBx.height,
  };

  return (
    <IframeBxView
      {...iframeBxViewProps}
      childrenAfter={<IframeBoxEditOverlay {...props} />}
    />
  );
};
