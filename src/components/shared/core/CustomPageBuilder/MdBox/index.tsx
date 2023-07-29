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
import { createOneMdBoxSchema } from '~/server/utils/validations-schemas/dashboard/boxes/types/mds';
import { api } from '~/utils/api';
import { toast } from 'react-toastify';

import customPageClasses from '~/styles/_custom-page.module.css';
import { CreateOneCustomCssSchema } from '~/server/utils/validations-schemas/dashboard/css/customCss';
import { CustomCssFormStore, CustomCssForm } from '../Css/CustomClasses';
import {
	type TwVariantsFormStore,
	TwVariantsForm,
	useCreateTwVariantsFormStore,
} from '../Css/TwVariants';

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
	const updateOneRequest = api.dashboard.boxes.types.mds.updateOne.useMutation({
		onError(error) {
			toast(error.message, { type: 'error' });
		},
		onSuccess() {
			toast('Successful submission!', { type: 'success' });
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
				rows={15}
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
			store.fields.customCss.value
				?.map((key) => customPageClasses[key])
				.join(' ') ?? undefined,
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
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeMd, // .slice(0, -1)
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
			customCss: props.box.css.custom ?? [],
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
		boxDeepLevel: props.boxDeepLevel,
		parentBox: props.parentBox,
		className: cx(
			customPageClasses[`${BOX_TYPE}-BOX`],
			props.className,
			handleBoxVariants(box.css.twVariants as BoxVariants),
			...(box.css.custom
				? box.css.custom?.map((key) => customPageClasses[key])
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
