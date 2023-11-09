"use client";
import { type CSSProperties, type ReactNode } from "react";
import BoxEditOverlay from "../../BoxEditOverlay";
import { type BxTypeQuote, type PgStoreApi } from "../../types";
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
import { trpcApi } from "~/app/libs/trpc/client";
import Form from "~/app/components/common/@de100/form-echo/Forms";
import CustomNextImage from "~/app/components/common/CustomNextImage";
import { type BxVariants, handleBxVariants } from "~/libs/utils/appData";
import { getValueByPathArray, newUpdatedByPathArray } from "~/libs/obj/update";
import { CreateOneCustomCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/customClasses";
import Accordion from "~/app/components/common/Accordion";
import ContainedInputField from "~/app/components/common/@de100/form-echo/Fields/Contained/Input";
import { createOneQuoteBxSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/quotes";
import TextTruncateManager from "~/app/components/common/TextTruncater";

type QuoteBx = { content: string; cite: string };
type QuoteFormStore = FormStoreApi<QuoteBx, typeof createOneQuoteBxSchema>;
type SharedProps = {
  bxDeepLevel: number;
  parentBx?: BxTypes;
  className?: string;
};
type Props = SharedProps & {
  bx: BxTypeQuote;
  path: (string | number)[];
  pageStore: PgStoreApi;
  style?: CSSProperties;
};

const BOX_TYPE = BxTypes.QUOTE;

const QuoteBxForm = (props: {
  store: QuoteFormStore;
  id: string;
  onSuccess: (params: {
    validatedValues: GetPassedValidationFieldsValues<
      typeof createOneQuoteBxSchema
    >;
  }) => void;
}) => {
  const updateOneRequest =
    trpcApi.dashboard.bxes.types.quotes.updateOne.useMutation({
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
        name="cite"
        labelProps={{ children: "cite" }}
      />
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

const QuoteBxView = (
  props: {
    childrenAfter?: ReactNode;
    style?: CSSProperties;
  } & SharedProps &
    QuoteBx,
) => {
  return (
    <div className={cx(props.className, "group")} style={props.style}>
      <CustomNextImage
        src={`https://api.dicebear.com/6.x/initials/svg?seed=${props.cite}`}
        alt={props.cite}
        width={150}
        height={150}
        className="relative left-0 h-16 w-16 -translate-x-2/3 rounded-full"
      />
      <div className="-ml-8 flex flex-col pt-2">
        <cite>
          <strong
            className={cx(
              "text-[75%] font-semibold text-text-primary-500",
              "group-focus-within:text-special-primary-600 group-hover:text-special-primary-600",
              "group-focus-within:text-special-primary-400 group-hover:text-special-primary-400",
            )}
          >
            {props.cite}
          </strong>
        </cite>
        <q className="flex-grow text-[70%] font-medium">
          <TextTruncateManager content={props.content} />
        </q>
      </div>
      {props.childrenAfter}
    </div>
  );
};

const QuoteBxFormView = (
  props: {
    quoteFormStore: QuoteFormStore;
    twVariantsFormStore: TwVariantsFormStore;
    customCssFormStore: CustomCssFormStore;
    style?: CSSProperties;
  } & SharedProps,
) => {
  const content = useStore(
    props.quoteFormStore,
    (store) => store.fields.content.value,
  );
  const cite = useStore(
    props.quoteFormStore,
    (store) => store.fields.cite.value,
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
    <QuoteBxView
      bxDeepLevel={props.bxDeepLevel}
      parentBx={props.parentBx}
      className={className}
      //
      content={content}
      cite={cite}
      style={props.style}
    />
  );
};

const QuoteBoxEditOverlay = (props: Props) => {
  const bx = useStore(
    props.pageStore,
    (state) => getValueByPathArray<BxTypeQuote>(state.page, props.path), // .slice(0, -1)
  );
  const quoteFormStore: QuoteFormStore = useCreateFormStore({
    initValues: {
      content: bx.quoteBx.content,
      cite: bx.quoteBx.cite,
    },
    validationSchema: createOneQuoteBxSchema,
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
        <QuoteBxFormView
          bxDeepLevel={props.bxDeepLevel}
          parentBx={props.parentBx}
          className={props.className}
          //
          quoteFormStore={quoteFormStore}
          twVariantsFormStore={twVariantsFormStore}
          customCssFormStore={customCssFormStore}
          //
          style={props.style}
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
                      >([...props.path, "css"], page, (prev: BxTypeQuote) => {
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
                      >([...props.path, "css"], page, (prev: BxTypeQuote) => {
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
                <QuoteBxForm
                  store={quoteFormStore}
                  id={bx.quoteBx.id}
                  onSuccess={(params) => {
                    props.pageStore.getState().utils.setPg((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >(
                        [...props.path, "quoteBx"],
                        page,
                        (prev: BxTypeQuote) => ({
                          ...prev,
                          content: params.validatedValues.content,
                          cite: params.validatedValues.cite,
                        }),
                      );
                    });
                  }}
                />
              ),
              titleElem: (
                <h3 className="text-h6 font-bold capitalize">quote bx form</h3>
              ),
              ___key: "quoteBx",
            },
          ]}
        />
      }
    />
  );
};

export const QuoteBxEditable = (props: Props) => {
  const bx = useStore(props.pageStore, (state) =>
    getValueByPathArray<BxTypeQuote>(state.page, props.path),
  );

  const quoteBxViewProps = {
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
    content: bx.quoteBx.content,
    cite: bx.quoteBx.cite,
    style: props.style,
  };

  return (
    <QuoteBxView
      {...quoteBxViewProps}
      childrenAfter={<QuoteBoxEditOverlay {...props} />}
    />
  );
};
