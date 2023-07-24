import { Key, type ReactNode } from 'react';
import ReactMarkdownFormatter from '~/components/shared/ReactMarkdownFormatter';
import BoxEditOverlay from './BoxEditOverlay';
import { Box, BoxTypeMd, PageStoreApi } from './_';
import { BoxTypes } from '@prisma/client';
import { useStore } from 'zustand';
import { getValueByPathArray, newUpdatedByPathArray } from '~/utils/obj/update';
import { cx } from 'class-variance-authority';
import { BoxVariants, boxVariants, handleBoxVariants } from '~/utils/appData';
import {
	type FormStoreApi,
	type GetPassedValidationFieldsValues,
	useCreateFormStore,
} from '@de100/form-echo';
import Form from '~/components/shared/common/@de100/form-echo/Forms';
import ContainedInputField from '~/components/shared/common/@de100/form-echo/Fields/Contained/ContainedInput';
import Accordion from '~/components/shared/common/Accordion';
import { createMdBoxSchema } from '~/server/utils/validations-schemas/dashboard/boxes/types/md';
import { api } from '~/utils/api';
import { toast } from 'react-toastify';
import { dashboardStore } from '~/components/layouts/Dashboard/utils';

import customPageClasses from '~/styles/_custom-page.module.css';
import { CreateTwVariantsSchema } from '~/server/utils/validations-schemas/dashboard/css/twVariants';
import CustomCombobox from '../../common/@de100/form-echo/Fields/Base/Combobox';

const customPageClassesFilteredFromBoxes = (() => {
	const customPageClassesFilteredFromBoxes: {
		keys: string[];
		items: { [key: string]: string };
		beatifiedKeyToOriginalKey: { [key: string]: string };
		beatifiedKeys: string[];
	} = {
		keys: [],
		items: {},
		beatifiedKeys: [],
		beatifiedKeyToOriginalKey: {},
	};
	for (const key in customPageClasses) {
		if (!key.endsWith('BOX')) {
			customPageClassesFilteredFromBoxes.keys.push(key);
			customPageClassesFilteredFromBoxes.items[key] = customPageClasses[key]!;

			const beatifiedKey = customPageClasses[key]!.replace(
				/^_custom-page_|__\w+$/g,
				'',
			).replace(/[-_]{1,}/g, ' ');
			customPageClassesFilteredFromBoxes.beatifiedKeys.push(beatifiedKey);
			customPageClassesFilteredFromBoxes.beatifiedKeyToOriginalKey[
				beatifiedKey
			] = customPageClasses[key]!;
		}
	}

	return customPageClassesFilteredFromBoxes;
})();

const boxVariantsData = (() => {
	const boxVariantsData: {
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
		boxVariantsData.variantsToItemsKeys[boxVariantsKey] = Object.keys(
			boxVariants[boxVariantsKey]!,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		) as any;
	}

	return boxVariantsData;
})();

type MdFormStore = FormStoreApi<{ content: string }, typeof createMdBoxSchema>;
type TwVariantsFormStore = FormStoreApi<
	{
		twVariants: {
			[Key in keyof BoxVariants]: BoxVariants[Key];
		};
	}, // Box['css']['twVariants']
	typeof CreateTwVariantsSchema
>;
type CustomCssFormStore = FormStoreApi<{ customCss: string[] | null }, never>;

type Props = {
	box: BoxTypeMd;
	parentBox?: BoxTypes;
	boxDeepLevel: number;
	path: (string | number)[];
	pageStore: PageStoreApi;
	className?: string;
};

const TwVariantsForm = (props: {
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
	const updateOneRequest = api.dashboard.css.twVariants.updateOne.useMutation({
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
				await updateOneRequest.mutateAsync({
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
				{boxVariantsData.variantsKeys.map((variantKey) => (
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
							data={boxVariantsData.variantsToItemsKeys[variantKey]!}
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
				disabled={updateOneRequest.isLoading}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				submit
			</button>
		</Form>
	);
};
const MdBoxForm = (props: {
	store: MdFormStore;
	id: string;
	onSuccess: (params: {
		validatedValues: GetPassedValidationFieldsValues<typeof createMdBoxSchema>;
	}) => void;
}) => {
	const updateOneRequest = api.dashboard.boxes.types.md.updateOne.useMutation({
		onError(error) {
			toast(error.message, { type: 'error' });
		},
		onSuccess() {
			toast(`Successful submission!`, { type: 'success' });
		},
	});

	return (
		<Form
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
				labelProps={{ children: 'content' }}
				rows={30}
			/>
			<button
				type="submit"
				disabled={updateOneRequest.isLoading}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				submit
			</button>
		</Form>
	);
};

const MdBoxView = (props: {
	childrenAfter?: ReactNode;
	content: string;
	className: string;
}) => {
	return (
		<div className={props.className}>
			<ReactMarkdownFormatter content={props.content} />
			{props.childrenAfter}
		</div>
	);
};

const MdBoxFormView = (props: {
	mdFormStore: MdFormStore;
	twVariantsFormStore: TwVariantsFormStore;
	customCssFormStore: CustomCssFormStore;
}) => {
	const content = useStore(
		props.mdFormStore,
		(store) => store.fields.content.value,
	);
	const twVariantsStr = useStore(
		props.twVariantsFormStore,
		(store) => handleBoxVariants(store.fields.twVariants.value),
		// .map((key) => store.fields[key as keyof (typeof store)['fields']])
		// .join(' '),
	);

	const customCssStr = useStore(
		props.customCssFormStore,
		(store) =>
			store.fields.customCss.value
				?.map((key) => customPageClasses[key])
				.join(' ') ?? undefined,
	);

	const className = cx(
		twVariantsStr,
		customCssStr,
		customPageClasses['MD-BOX'],
	);

	return <MdBoxView content={content} className={className} />;
};

const MdBoxBoxEditOverlay = (props: Props) => {
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeMd, // .slice(0, -1)
	);

	const setMenuIsOpen = useStore(
		dashboardStore,
		(state) => state.utils.setMenuIsOpen,
	);

	const mdFormStore: MdFormStore = useCreateFormStore({
		initValues: {
			content: box.mdBox.content,
		},
		validationSchema: createMdBoxSchema,
		validationEvents: { change: true },
	});
	const twVariantsFormStore: TwVariantsFormStore = useCreateFormStore({
		initValues: {
			twVariants: props.box.css.twVariants as {
				[Key in keyof BoxVariants]: BoxVariants[Key];
			},
		}, // as BoxVariants,
		validationSchema: CreateTwVariantsSchema,
	});
	const customCssFormStore: CustomCssFormStore = useCreateFormStore({
		initValues: {
			customCss: props.box.css.custom,
		},
		validationSchema: {},
	});

	return (
		<BoxEditOverlay
			boxDeepLevel={props.boxDeepLevel}
			box={props.box}
			path={props.path}
			pageStore={props.pageStore}
			ShowcaseBoxChild={
				<section className="flex-grow bg-white py-12 px-8">
					<MdBoxFormView
						mdFormStore={mdFormStore}
						twVariantsFormStore={twVariantsFormStore}
						customCssFormStore={customCssFormStore}
					/>
				</section>
			}
			EditSideMenuChild={
				<section className="w-[30rem] py-12 px-8 flex-grow bg-white flex flex-col gap-8">
					<Accordion
						disclosures={[
							{
								defaultOpen: true,
								contentChildren: (
									<TwVariantsForm
										store={twVariantsFormStore}
										cssId={box.css.id}
										onSuccess={(params) => {
											setMenuIsOpen('sideEdit', false);

											props.pageStore.getState().utils.setPage((page) => {
												return newUpdatedByPathArray<
													// eslint-disable-next-line @typescript-eslint/ban-types
													Exclude<typeof page, Function>
												>([...props.path, 'css'], page, (prev: BoxTypeMd) => {
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
									<h3 className="text-h6 font-bold">TW Variants Form</h3>
								),
								key: 'twVariants',
							},
							{
								defaultOpen: true,
								contentChildren: (
									<MdBoxForm
										store={mdFormStore}
										id={box.mdBox.id}
										onSuccess={(params) => {
											setMenuIsOpen('sideEdit', false);

											props.pageStore.getState().utils.setPage((page) => {
												return newUpdatedByPathArray<
													// eslint-disable-next-line @typescript-eslint/ban-types
													Exclude<typeof page, Function>
												>(
													[...props.path, 'mdBox'],
													page,
													(prev: BoxTypeMd) => ({
														...prev,
														content: params.validatedValues.content,
													}),
												);
											});
										}}
									/>
								),
								titleElem: <h3 className="text-h6 font-bold">MD Box Form</h3>,
								key: 'mdBox',
							},
						]}
					/>
				</section>
			}
		/>
	);
};

const MdBoxComp = (props: Props) => {
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeMd,
	);

	const mdBoxViewProps = {
		content: box.mdBox.content,
		className: cx(
			customPageClasses['MD-BOX'],
			props.className,
			handleBoxVariants(box.css.twVariants as BoxVariants),
			...(box.css.custom
				? box.css.custom?.map((key) => customPageClasses[key])
				: []),
		),
	};

	return (
		<MdBoxView
			{...mdBoxViewProps}
			childrenAfter={
				<MdBoxBoxEditOverlay
					boxDeepLevel={props.boxDeepLevel}
					box={props.box}
					path={props.path} // {[...props.path, 'mdBox']}
					pageStore={props.pageStore}
				/>
			}
		/>
	);
};

export default MdBoxComp;
