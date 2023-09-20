"use client";
import { type FormStoreApi } from "@de100/form-echo";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { useStore } from "zustand";
import CustomCombobox from "~/app/components/common/@de100/form-echo/Fields/Base/Combobox";
import Form from "~/app/components/common/@de100/form-echo/Forms";
import { trpcApi } from "~/app/libs/trpc/client";
import { type CreateOneCustomCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/customClasses";
// import CustomCombobox from '~/components/shared/common/@de100/form-echo/Fields/Base/Combobox';
// import Form from '~/components/shared/common/@de100/form-echo/Forms';
// import { type CreateOneCustomCssSchema } from '~/server/utils/validations-schemas/dashboard/css/customClasses';
// import { api } from '~/utils/api';

import customPageClasses from "~/app/styles/_custom-page.module.css";

export type CustomCssFormStore = FormStoreApi<
  { customClasses: string[] },
  typeof CreateOneCustomCssSchema
>;

export const customClassesConfig = (() => {
  const customClassesConfig: {
    originalKeys: string[];
    items: Record<string, string>;
    originalKeyToBeatifiedKeyEntries: [string, string][];
    originalKeyToBeatifiedKeyMap: Record<string, string>;
    beatifiedKeyToOriginalKeyMap: Record<string, string>;
    beatifiedKeys: string[];
  } = {
    originalKeys: [],
    items: {},
    originalKeyToBeatifiedKeyEntries: [],
    originalKeyToBeatifiedKeyMap: {},
    beatifiedKeyToOriginalKeyMap: {},
    beatifiedKeys: [],
  };
  for (const key in customPageClasses) {
    if (!key.endsWith("BOX")) {
      customClassesConfig.originalKeys.push(key);
      customClassesConfig.items[key] = customPageClasses[key]!;

      const beatifiedKey = customPageClasses[key]!.replace(
        /^_custom-page_|__\w+$/g,
        "",
      ).replace(/[-_]{1,}/g, " ");
      customClassesConfig.beatifiedKeys.push(beatifiedKey);
      customClassesConfig.beatifiedKeyToOriginalKeyMap[beatifiedKey] =
        customPageClasses[key]!;
      customClassesConfig.originalKeyToBeatifiedKeyMap[
        customPageClasses[key]!
      ] = beatifiedKey;
    }
  }

  customClassesConfig.originalKeyToBeatifiedKeyEntries = Object.entries(
    customClassesConfig.originalKeyToBeatifiedKeyMap,
  );

  return customClassesConfig;
})();

export const CustomCssForm = (props: {
  store: CustomCssFormStore;
  cssId: string;
  onSuccess: (params: {
    validatedValues: {
      customClasses: string[] | null;
    };
  }) => void;
}) => {
  const setOneRequest = trpcApi.dashboard.css.customClasses.setOne.useMutation({
    onError(error) {
      toast(error.message, { type: "error" });
    },
    onSuccess() {
      toast("Successful submission!", { type: "success" });
    },
  });

  const customClasses = useStore(
    props.store,
    (store) => store.fields.customClasses.value,
  );

  return (
    <Form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={async (event, params) => {
        event.preventDefault();
        await setOneRequest.mutateAsync({
          cssId: props.cssId,
          customClasses: params.validatedValues.customClasses,
          // ??
          // customClasses: params.validatedValues.customClasses,
        });

        props.onSuccess(params);
      }}
      store={props.store}
    >
      <fieldset className="flex min-w-[unset] flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {customClasses?.map((item) =>
            !customPageClasses[item] ? (
              <Fragment key={item} />
            ) : (
              <button
                key={item}
                type="button"
                className="rounded-lg border px-2 py-1 hover:brightness-90 focus:brightness-75"
              >
                {
                  customClassesConfig.originalKeyToBeatifiedKeyMap[
                    customPageClasses[item]!
                  ]
                }
              </button>
            ),
          )}
        </div>
        <CustomCombobox
          data={customClassesConfig.originalKeyToBeatifiedKeyEntries}
          // value={customClasses[variantKey]}
          setSelected={(value) => {
            props.store
              .getState()
              .utils.handleOnInputChange("customClasses", (prev) => [
                value,
                ...prev,
              ]);

            return value;
          }}
          getOptionChildren={(value) => value[1]}
          getDisplayValue={(value) => value[1]}
          getOptionKey={(value) => value[1]}
        />
        {/* {boxVariantsData.variantsKeys.map((variantKey) => (
					<div
						key={variantKey}
						className="flex flex-col justify-between gap-1 py-2 px-4 border border-neutral-400 rounded-md"
					>
						<div className="flex gap-2 justify-between items-start">
							<span className="capitalize font-semibold">
								{variantKey.replace(/-/g, ' ')}
							</span>
							<button
								type="button"
								onClick={() =>
									props.store
										.getState()
										.utils.handleOnInputChange('customClasses', (prev) => ({
											...prev,
											[variantKey]: null,
										}))
								}
							>
								X
							</button>
						</div>
						<CustomCombobox
							data={boxVariantsData.variantsToItemsKeys[variantKey]!}
							value={customClasses[variantKey]}
							setSelected={(value) => {
								props.store
									.getState()
									.utils.handleOnInputChange('customClasses', (prev) => ({
										...prev,
										[variantKey]: value,
									}));

								return value;
							}}
							getOptionChildren={(value) => value}
							getDisplayValue={(value) => (value as string) ?? '__'}
							getOptionKey={(value) => value}
						/>
					</div>
				))} */}
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
};
