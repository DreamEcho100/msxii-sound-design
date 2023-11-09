"use client";
import { type ReactNode } from "react";
import BoxEditOverlay from "../../BoxEditOverlay";
import { type BxTypeHeader, type PgStoreApi } from "../../types";
import { BxTypes, HeaderBxHType } from "@prisma/client";
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
import ContainedInputField from "~/app/components/common/@de100/form-echo/Fields/Contained/Input";
import Form from "~/app/components/common/@de100/form-echo/Forms";
import Accordion from "~/app/components/common/Accordion";
import { getValueByPathArray, newUpdatedByPathArray } from "~/libs/obj/update";
import { handleBxVariants, type BxVariants } from "~/libs/utils/appData";
import { createOneHeaderBxSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/headers";
import { CreateOneCustomCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/customClasses";
import { trpcApi } from "~/app/libs/trpc/client";

type HeaderBx = {
  title: string;
  description: string | null;
  hType: HeaderBxHType;
};
type HeaderFormStore = FormStoreApi<HeaderBx, typeof createOneHeaderBxSchema>;
type SharedProps = {
  bxDeepLevel: number;
  parentBx?: BxTypes;
  className?: string;
};
type Props = {
  bx: BxTypeHeader;
  path: (string | number)[];
  pageStore: PgStoreApi;
} & SharedProps;

const BOX_TYPE = BxTypes.HEADER;

const HeaderBxForm = (props: {
  store: HeaderFormStore;
  id: string;
  onSuccess: (params: {
    validatedValues: GetPassedValidationFieldsValues<
      typeof createOneHeaderBxSchema
    >;
  }) => void;
}) => {
  const updateOneRequest =
    trpcApi.dashboard.bxes.types.headers.updateOne.useMutation({
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
      <ContainedInputField
        store={props.store}
        name="title"
        labelProps={{ children: "title" }}
      />
      <ContainedInputField
        isA="textarea"
        store={props.store}
        name="description"
        labelProps={{ children: "description" }}
        rows={15}
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

const HeaderBxView = (
  props: {
    childrenAfter?: ReactNode;
    bxDeepLevel: number;
  } & SharedProps &
    HeaderBx,
) => {
  const HType = (() => {
    if (props.hType !== HeaderBxHType.DYNAMIC)
      return props.hType.toLowerCase() as Lowercase<
        Exclude<(typeof props)["hType"], (typeof HeaderBxHType)["DYNAMIC"]>
      >;

    if (props.bxDeepLevel >= 5) return "h6";

    return `h${props.bxDeepLevel}` as "h1" | "h2" | "h3" | "h4" | "h5";
  })();

  return (
    <header className={cx("relative flex flex-col gap-8", props.className)}>
      {props.title && (
        <HType
          className={cx(
            props.bxDeepLevel === 0 ? "font-semibold" : "",
            "text-h3 text-text-primary-500",
          )}
        >
          {props.title}
        </HType>
      )}
      {props.description && <p>{props.description}</p>}
      {props.childrenAfter}
    </header>
  );
};

const HeaderBxFormView = (
  props: {
    headerFormStore: HeaderFormStore;
    bxDeepLevel: number;
    twVariantsFormStore: TwVariantsFormStore;
    customCssFormStore: CustomCssFormStore;
  } & SharedProps,
) => {
  const title = useStore(
    props.headerFormStore,
    (store) => store.fields.title.value,
  );
  const description = useStore(
    props.headerFormStore,
    (store) => store.fields.description.value,
  );
  const hType = useStore(
    props.headerFormStore,
    (store) => store.fields.hType.value,
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
    <HeaderBxView
      title={title}
      description={description}
      hType={hType}
      className={className}
      bxDeepLevel={props.bxDeepLevel}
    />
  );
};

const HeaderBoxEditOverlay = (props: Props) => {
  const bx = useStore(
    props.pageStore,
    (state) => getValueByPathArray<BxTypeHeader>(state.page, props.path), // .slice(0, -1)
  );
  const headerFormStore: HeaderFormStore = useCreateFormStore({
    initValues: {
      title: bx.headerBx.title,
      description: bx.headerBx.description,
      hType: bx.headerBx.hType,
    },
    validationSchema: createOneHeaderBxSchema,
    validationEvents: { change: true },
    valuesFromFieldsToStore: {
      description: (val) => (val ? val : null),
    },
    valuesFromStoreToFields: {
      description: (val) => val ?? "",
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
        <HeaderBxFormView
          bxDeepLevel={props.bxDeepLevel}
          parentBx={props.parentBx}
          className={props.className}
          //
          headerFormStore={headerFormStore}
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
                      >([...props.path, "css"], page, (prev: BxTypeHeader) => {
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
                      >([...props.path, "css"], page, (prev: BxTypeHeader) => {
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
                <HeaderBxForm
                  store={headerFormStore}
                  id={bx.headerBx.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPg((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >(
                        [...props.path, "headerBx"],
                        page,
                        (prev: BxTypeHeader) => ({
                          ...prev,
                          title: params.validatedValues.title,
                          description: params.validatedValues.description,
                          hType: params.validatedValues.hType,
                        }),
                      );
                    });
                  }}
                />
              ),
              titleElem: (
                <h3 className="text-h6 font-bold capitalize">header bx form</h3>
              ),
              ___key: "headerBx",
            },
          ]}
        />
      }
    />
  );
};

export const HeaderBxEditable = (props: Props) => {
  const bx = useStore(props.pageStore, (state) =>
    getValueByPathArray<BxTypeHeader>(state.page, props.path),
  );

  const headerBxViewProps = {
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
    title: bx.headerBx.title,
    description: bx.headerBx.description,
    hType: bx.headerBx.hType,
  };

  return (
    <HeaderBxView
      {...headerBxViewProps}
      childrenAfter={<HeaderBoxEditOverlay {...props} />}
    />
  );
};
