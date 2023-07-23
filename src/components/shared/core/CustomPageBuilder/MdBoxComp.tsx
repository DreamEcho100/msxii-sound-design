import { type ReactNode } from 'react';
import ReactMarkdownFormatter from '~/components/shared/ReactMarkdownFormatter';
import BoxEditOverlay from './BoxEditOverlay';
import { BoxTypeMd, PageStoreApi } from './_';
import { BoxTypes } from '@prisma/client';
import { useStore } from 'zustand';
import { getValueByPathArray, newUpdatedByPathArray } from '~/utils/obj/update';
import { cx } from 'class-variance-authority';
import { BoxVariants, handleBoxVariants } from '~/utils/appData';
import customPageClasses from '~/styles/_custom-page.module.css';
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

type MdFormStore = FormStoreApi<{ content: string }, typeof createMdBoxSchema>;
type TwVariantsFormStore = FormStoreApi<BoxVariants, never>;
type CustomCssFormStore = FormStoreApi<{ customCss: string[] | null }, never>;

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
		Object.keys(store.fields)
			.map((key) => store.fields[key as keyof (typeof store)['fields']])
			.join(' '),
	);

	const customCssStr = useStore(
		props.customCssFormStore,
		(store) => store.fields.customCss.value?.join(' ') ?? undefined,
	);

	const className = cx(twVariantsStr, customCssStr);

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
		initValues: props.box.css.twVariants as BoxVariants,
		validationSchema: {},
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
