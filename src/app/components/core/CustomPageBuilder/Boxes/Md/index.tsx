"use client";
import { type ReactNode } from "react";
import BoxEditOverlay from "../../BoxEditOverlay";
import { type BxTypeMd, type PgStoreApi } from "../../types";
import { BxTypes } from "@prisma/client";
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
import ReactMarkdownFormatter from "~/app/components/common/ReactMarkdownFormatter";
import { getValueByPathArray, newUpdatedByPathArray } from "~/libs/obj/update";
import { handleBxVariants, type BxVariants } from "~/libs/utils/appData";
import { createOneMdBxSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/mds";
import { CreateOneCustomCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/customClasses";
import { trpcApi } from "~/app/libs/trpc/client";

type MdBx = {
  content: string;
};
type MdFormStore = FormStoreApi<MdBx, typeof createOneMdBxSchema>;
type SharedProps = {
  bxDeepLevel: number;
  parentBx?: BxTypes;
  className?: string;
};
type Props = {
  bx: BxTypeMd;
  path: (string | number)[];
  pageStore: PgStoreApi;
} & SharedProps;

const BOX_TYPE = BxTypes.MD;

const MdBxForm = (props: {
  store: MdFormStore;
  id: string;
  onSuccess: (params: {
    validatedValues: GetPassedValidationFieldsValues<
      typeof createOneMdBxSchema
    >;
  }) => void;
}) => {
  const updateOneRequest =
    trpcApi.dashboard.bxes.types.mds.updateOne.useMutation({
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
        // result.
      }}
      store={props.store}
    >
      <ContainedInputField
        isA="textarea"
        store={props.store}
        name="content"
        labelProps={{ children: "content" }}
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

const MdBxView = (
  props: {
    childrenAfter?: ReactNode;
  } & SharedProps &
    MdBx,
) => {
  return (
    <div className={props.className}>
      <ReactMarkdownFormatter content={props.content} />
      {props.childrenAfter}
    </div>
  );
};

const MdBxFormView = (
  props: {
    mdFormStore: MdFormStore;
    twVariantsFormStore: TwVariantsFormStore;
    customCssFormStore: CustomCssFormStore;
  } & SharedProps,
) => {
  const content = useStore(
    props.mdFormStore,
    (store) => store.fields.content.value,
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
    <MdBxView
      bxDeepLevel={props.bxDeepLevel}
      parentBx={props.parentBx}
      className={className}
      //
      content={content}
    />
  );
};

const MdBoxEditOverlay = (props: Props) => {
  const bx = useStore(
    props.pageStore,
    (state) => getValueByPathArray<BxTypeMd>(state.page, props.path), // .slice(0, -1)
  );
  const mdFormStore: MdFormStore = useCreateFormStore({
    initValues: {
      content: bx.mdBx.content,
    },
    validationSchema: createOneMdBxSchema,
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
        <MdBxFormView
          bxDeepLevel={props.bxDeepLevel}
          parentBx={props.parentBx}
          className={props.className}
          //
          mdFormStore={mdFormStore}
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
                      >([...props.path, "css"], page, (prev: BxTypeMd) => {
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
                      >([...props.path, "css"], page, (prev: BxTypeMd) => {
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
                <MdBxForm
                  store={mdFormStore}
                  id={bx.mdBx.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPg((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >([...props.path, "mdBx"], page, (prev: BxTypeMd) => ({
                        ...prev,
                        content: params.validatedValues.content,
                      }));
                    });
                  }}
                />
              ),
              titleElem: (
                <h3 className="text-h6 font-bold capitalize">MD bx form</h3>
              ),
              ___key: "mdBx",
            },
          ]}
        />
      }
    />
  );
};

export const MdBxEditable = (props: Props) => {
  const bx = useStore(props.pageStore, (state) =>
    getValueByPathArray<BxTypeMd>(state.page, props.path),
  );

  const mdBxViewProps = {
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
    content: bx.mdBx.content,
  };

  return (
    <MdBxView
      {...mdBxViewProps}
      childrenAfter={<MdBoxEditOverlay {...props} />}
    />
  );
};
