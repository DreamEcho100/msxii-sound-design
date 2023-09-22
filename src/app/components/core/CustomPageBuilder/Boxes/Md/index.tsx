"use client";
import { type ReactNode } from "react";
import BoxEditOverlay from "../../BoxEditOverlay";
import { type BoxTypeMd } from "../../_";
import { type PageStoreApi } from "../../types";
import { BoxTypes } from "@prisma/client";
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
import ContainedInputField from "~/app/components/common/@de100/form-echo/Fields/Contained/Input";
import Form from "~/app/components/common/@de100/form-echo/Forms";
import Accordion from "~/app/components/common/Accordion";
import ReactMarkdownFormatter from "~/app/components/common/ReactMarkdownFormatter";
import { getValueByPathArray, newUpdatedByPathArray } from "~/libs/obj/update";
import { handleBoxVariants, type BoxVariants } from "~/libs/utils/appData";
import { createOneMdBoxSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/mds";
import { CreateOneCustomCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/customClasses";
import { trpcApi } from "~/app/libs/trpc/client";

type MdBox = {
  content: string;
};
type MdFormStore = FormStoreApi<MdBox, typeof createOneMdBoxSchema>;
type SharedProps = {
  boxDeepLevel: number;
  parentBox?: BoxTypes;
  className?: string;
};
type Props = {
  box: BoxTypeMd;
  path: (string | number)[];
  pageStore: PageStoreApi;
} & SharedProps;

const BOX_TYPE = BoxTypes.MD;

const MdBoxForm = (props: {
  store: MdFormStore;
  id: string;
  onSuccess: (params: {
    validatedValues: GetPassedValidationFieldsValues<
      typeof createOneMdBoxSchema
    >;
  }) => void;
}) => {
  const updateOneRequest =
    trpcApi.dashboard.boxes.types.mds.updateOne.useMutation({
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

const MdBoxView = (
  props: {
    childrenAfter?: ReactNode;
  } & SharedProps &
    MdBox,
) => {
  return (
    <div className={props.className}>
      <ReactMarkdownFormatter content={props.content} />
      {props.childrenAfter}
    </div>
  );
};

const MdBoxFormView = (
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
    <MdBoxView
      boxDeepLevel={props.boxDeepLevel}
      parentBox={props.parentBox}
      className={className}
      //
      content={content}
    />
  );
};

const MdBoxEditOverlay = (props: Props) => {
  const box = useStore(
    props.pageStore,
    (state) => getValueByPathArray<BoxTypeMd>(state.page, props.path), // .slice(0, -1)
  );
  const mdFormStore: MdFormStore = useCreateFormStore({
    initValues: {
      content: box.mdBox.content,
    },
    validationSchema: createOneMdBoxSchema,
    validationEvents: { change: true },
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
        <MdBoxFormView
          boxDeepLevel={props.boxDeepLevel}
          parentBox={props.parentBox}
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
                  cssId={box.css.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPage((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >([...props.path, "css"], page, (prev: BoxTypeMd) => {
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
                      >([...props.path, "css"], page, (prev: BoxTypeMd) => {
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
                <MdBoxForm
                  store={mdFormStore}
                  id={box.mdBox.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPage((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >([...props.path, "mdBox"], page, (prev: BoxTypeMd) => ({
                        ...prev,
                        content: params.validatedValues.content,
                      }));
                    });
                  }}
                />
              ),
              titleElem: (
                <h3 className="text-h6 font-bold capitalize">MD box form</h3>
              ),
              ___key: "mdBox",
            },
          ]}
        />
      }
    />
  );
};

export const MdBoxEditable = (props: Props) => {
  const box = useStore(props.pageStore, (state) =>
    getValueByPathArray<BoxTypeMd>(state.page, props.path),
  );

  const mdBoxViewProps = {
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
    content: box.mdBox.content,
  };

  return (
    <MdBoxView
      {...mdBoxViewProps}
      childrenAfter={<MdBoxEditOverlay {...props} />}
    />
  );
};
