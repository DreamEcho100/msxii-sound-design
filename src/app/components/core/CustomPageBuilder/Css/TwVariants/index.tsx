"use client";
import { type FormStoreApi, useCreateFormStore } from "@de100/form-echo";
import { toast } from "react-toastify";
import { useStore } from "zustand";
import CustomCombobox from "~/app/components/common/@de100/form-echo/Fields/Base/Combobox";
import Form from "~/app/components/common/@de100/form-echo/Forms";
import { trpcApi } from "~/app/libs/trpc/client";
import { type BoxVariants, boxVariants } from "~/libs/utils/appData";
import { CreateOneTwVariantsSchema } from "~/libs/utils/validations-schemas/dashboard/css/twVariants";

export type TwVariantsFormStore = FormStoreApi<
  {
    twVariants: {
      [Key in keyof BoxVariants]: BoxVariants[Key];
    };
  }, // Box['css']['twVariants']
  typeof CreateOneTwVariantsSchema
>;

export const twVariantsConfig = (() => {
  const twVariantsConfig: {
    variantsToItemsKeys: {
      -readonly [Key in keyof BoxVariants]: BoxVariants[Key][];
    };
    variants: typeof boxVariants;
    variantsKeys: (keyof typeof boxVariants)[];
  } = {
    variantsToItemsKeys: {},
    variants: boxVariants,
    variantsKeys: Object.keys(boxVariants) as (keyof typeof boxVariants)[],
  };

  let boxVariantsKey: keyof typeof boxVariants;
  for (boxVariantsKey in boxVariants) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    twVariantsConfig.variantsToItemsKeys[boxVariantsKey] = Object.keys(
      boxVariants[boxVariantsKey]!,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any;
  }

  return twVariantsConfig;
})();

export function useCreateTwVariantsFormStore(twVariants: unknown) {
  return useCreateFormStore({
    initValues: {
      twVariants: twVariants as {
        [Key in keyof BoxVariants]: BoxVariants[Key];
      },
    },
    validationSchema: CreateOneTwVariantsSchema,
  }) satisfies TwVariantsFormStore;
}

export function TwVariantsForm(props: {
  store: TwVariantsFormStore;
  cssId: string;
  onSuccess: (params: {
    // Box['css']['twVariants']
    values: {
      twVariants: {
        [Key in keyof BoxVariants]: BoxVariants[Key];
      };
    };
  }) => void;
}) {
  const setOneRequest = trpcApi.dashboard.css.twVariants.setOne.useMutation({
    onError(error) {
      toast(error.message, { type: "error" });
    },
    onSuccess() {
      toast("Successful submission!", { type: "success" });
    },
  });

  const twVariants = useStore(
    props.store,
    (store) => store.fields.twVariants.value,
  );

  return (
    <Form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={async (event, params) => {
        event.preventDefault();
        await setOneRequest.mutateAsync({
          cssId: props.cssId,
          twVariants: params.values.twVariants,
          // ??
          // twVariants: params.validatedValues.twVariants,
        });

        props.onSuccess(params);
      }}
      store={props.store}
    >
      <fieldset className="grid min-w-[unset] grid-cols-3 gap-2">
        {twVariantsConfig.variantsKeys.map((variantKey) => (
          <div
            key={variantKey}
            className="flex flex-col justify-between gap-1 rounded-md border border-neutral-400 px-4 py-2"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold capitalize">
                {variantKey.replace(/-/g, " ")}
              </span>
              <button
                type="button"
                onClick={() =>
                  props.store
                    .getState()
                    .utils.handleOnInputChange("twVariants", (prev) => ({
                      ...prev,
                      [variantKey]: null,
                    }))
                }
              >
                X
              </button>
            </div>
            <CustomCombobox
              data={twVariantsConfig.variantsToItemsKeys[variantKey]}
              value={twVariants[variantKey]}
              setSelected={(value) => {
                props.store
                  .getState()
                  .utils.handleOnInputChange("twVariants", (prev) => ({
                    ...prev,
                    [variantKey]: value,
                  }));

                return value;
              }}
              getOptionChildren={(value) => value ?? "__"}
              getDisplayValue={(value) => (value as string) ?? "__"}
              getOptionKey={(value) => value}
            />
          </div>
        ))}
      </fieldset>
      <button
        type="submit"
        disabled={setOneRequest.isLoading}
        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        submit
      </button>
    </Form>
  );
}
