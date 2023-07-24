import { FormStoreApi } from '@de100/form-echo';
import { toast } from 'react-toastify';
import { useStore } from 'zustand';
import CustomCombobox from '~/components/shared/common/@de100/form-echo/Fields/Base/Combobox';
import Form from '~/components/shared/common/@de100/form-echo/Forms';
import { CreateTwVariantsSchema } from '~/server/utils/validations-schemas/dashboard/css/twVariants';
import { api } from '~/utils/api';
import { BoxVariants, boxVariants } from '~/utils/appData';

export type TwVariantsFormStore = FormStoreApi<
	{
		twVariants: {
			[Key in keyof BoxVariants]: BoxVariants[Key];
		};
	}, // Box['css']['twVariants']
	typeof CreateTwVariantsSchema
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
		twVariantsConfig.variantsToItemsKeys[boxVariantsKey] = Object.keys(
			boxVariants[boxVariantsKey]!,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		) as any;
	}

	return twVariantsConfig;
})();

export const TwVariantsForm = (props: {
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
}) => {
	const setOneRequest = api.dashboard.css.twVariants.setOne.useMutation({
		onError(error) {
			toast(error.message, { type: 'error' });
		},
		onSuccess() {
			toast(`Successful submission!`, { type: 'success' });
		},
	});

	const twVariants = useStore(
		props.store,
		(store) => store.fields.twVariants.value,
	);

	return (
		<Form
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
			<fieldset className="min-w-[unset] grid grid-cols-3 gap-2">
				{twVariantsConfig.variantsKeys.map((variantKey) => (
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
										.utils.handleOnInputChange('twVariants', (prev) => ({
											...prev,
											[variantKey]: null,
										}))
								}
							>
								X
							</button>
						</div>
						<CustomCombobox
							data={twVariantsConfig.variantsToItemsKeys[variantKey]!}
							value={twVariants[variantKey]}
							setSelected={(value: (typeof twVariants)[typeof variantKey]) => {
								props.store
									.getState()
									.utils.handleOnInputChange('twVariants', (prev) => ({
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
				))}
			</fieldset>
			<button
				type="submit"
				disabled={setOneRequest.isLoading}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				submit
			</button>
		</Form>
	);
};
