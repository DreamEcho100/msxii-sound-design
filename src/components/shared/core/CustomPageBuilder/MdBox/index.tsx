import { type ReactNode } from 'react';
import ReactMarkdownFormatter from '~/components/shared/ReactMarkdownFormatter';
import BoxEditOverlay from '../BoxEditOverlay';
import { BoxTypeMd, PageStoreApi } from '../_';
import { BoxTypes } from '@prisma/client';
import { useStore } from 'zustand';
import { getValueByPathArray, newUpdatedByPathArray } from '~/utils/obj/update';
import { cx } from 'class-variance-authority';
import { BoxVariants, handleBoxVariants } from '~/utils/appData';
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

import customPageClasses from '~/styles/_custom-page.module.css';
import { CreateTwVariantsSchema } from '~/server/utils/validations-schemas/dashboard/css/twVariants';
import { CreateCustomCssSchema } from '~/server/utils/validations-schemas/dashboard/css/customCss';
import { CustomCssFormStore, CustomCssForm } from '../Css/CustomClasses';
import { TwVariantsFormStore, TwVariantsForm } from '../Css/TwVariants';

type MdFormStore = FormStoreApi<{ content: string }, typeof createMdBoxSchema>;

type Props = {
	box: BoxTypeMd;
	parentBox?: BoxTypes;
	boxDeepLevel: number;
	path: (string | number)[];
	pageStore: PageStoreApi;
	className?: string;
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
	const twVariantsStr = useStore(props.twVariantsFormStore, (store) =>
		handleBoxVariants(store.fields.twVariants.value),
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

const MdBoxEditOverlay = (props: Props) => {
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeMd, // .slice(0, -1)
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
		},
		validationSchema: CreateTwVariantsSchema,
	});
	const customCssFormStore: CustomCssFormStore = useCreateFormStore({
		initValues: {
			customCss: props.box.css.custom ?? [],
		},
		validationSchema: CreateCustomCssSchema,
	});

	return (
		<BoxEditOverlay
			boxDeepLevel={props.boxDeepLevel}
			box={props.box}
			path={props.path}
			pageStore={props.pageStore}
			ShowcaseBoxChildren={
				<MdBoxFormView
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
								<h3 className="text-h6 font-bold capitalize">
									TW variants form
								</h3>
							),
							___key: 'twVariants',
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
											>([...props.path, 'css'], page, (prev: BoxTypeMd) => {
												return {
													...prev,
													custom: params.validatedValues.customCss,
												};
											});
										});
									}}
								/>
							),
							titleElem: (
								<h3 className="text-h6 font-bold capitalize">custom classes</h3>
							),
							___key: 'twVariants',
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
											>([...props.path, 'mdBox'], page, (prev: BoxTypeMd) => ({
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
							___key: 'mdBox',
						},
					]}
				/>
			}
		/>
	);
};

export const MdBoxEditable = (props: Props) => {
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
				<MdBoxEditOverlay
					boxDeepLevel={props.boxDeepLevel}
					box={props.box}
					path={props.path} // {[...props.path, 'mdBox']}
					pageStore={props.pageStore}
				/>
			}
		/>
	);
};
