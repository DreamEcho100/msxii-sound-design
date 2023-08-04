import { type CSSProperties, type ReactNode } from 'react';
import BoxEditOverlay from '../../BoxEditOverlay';
import { BoxTypeQuote, PageStoreApi } from '../../_';
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
import ContainedInputField from '~/components/shared/common/@de100/form-echo/Fields/Contained/Input';
import Accordion from '~/components/shared/common/Accordion';
import { createOneQuoteBoxSchema } from '~/server/utils/validations-schemas/dashboard/boxes/types/quotes';
import { api } from '~/utils/api';
import { toast } from 'react-toastify';

import customPageClasses from '~/styles/_custom-page.module.css';
import { CreateOneCustomCssSchema } from '~/server/utils/validations-schemas/dashboard/css/customClasses';
import { CustomCssFormStore, CustomCssForm } from '../../Css/CustomClasses';
import {
	type TwVariantsFormStore,
	TwVariantsForm,
	useCreateTwVariantsFormStore,
} from '../../Css/TwVariants';
import CustomNextImage from '~/components/shared/CustomNextImage';
import TextTruncateManager from '~/components/shared/common/TextTruncater';

type QuoteBox = { content: string; cite: string };
type QuoteFormStore = FormStoreApi<QuoteBox, typeof createOneQuoteBoxSchema>;
type SharedProps = {
	boxDeepLevel: number;
	parentBox?: BoxTypes;
	className?: string;
};
type Props = SharedProps & {
	box: BoxTypeQuote;
	path: (string | number)[];
	pageStore: PageStoreApi;
	style?: CSSProperties;
};

const BOX_TYPE = BoxTypes.QUOTE;

const QuoteBoxForm = (props: {
	store: QuoteFormStore;
	id: string;
	onSuccess: (params: {
		validatedValues: GetPassedValidationFieldsValues<
			typeof createOneQuoteBoxSchema
		>;
	}) => void;
}) => {
	const updateOneRequest =
		api.dashboard.boxes.types.quotes.updateOne.useMutation({
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
			}}
			store={props.store}
		>
			<ContainedInputField
				store={props.store}
				name="cite"
				labelProps={{ children: 'cite' }}
			/>
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

const QuoteBoxView = (
	props: {
		childrenAfter?: ReactNode;
		style?: CSSProperties;
	} & SharedProps &
		QuoteBox,
) => {
	return (
		<div className={cx(props.className, 'group')} style={props.style}>
			<CustomNextImage
				src={`https://api.dicebear.com/6.x/initials/svg?seed=${props.cite}`}
				alt={props.cite}
				width={150}
				height={150}
				className="w-16 h-16 rounded-full relative -translate-x-2/3 left-0"
			/>
			<div className="flex flex-col -ml-8 pt-2">
				<cite>
					<strong
						className={cx(
							'text-text-primary-500 font-semibold text-[75%]',
							'group-hover:text-special-primary-600 group-focus-within:text-special-primary-600',
							'group-hover:text-special-primary-400 group-focus-within:text-special-primary-400',
						)}
					>
						{props.cite}
					</strong>
				</cite>
				<q className="text-[70%] flex-grow font-medium">
					<TextTruncateManager content={props.content} />
				</q>
			</div>
			{props.childrenAfter}
		</div>
	);
};

const QuoteBoxFormView = (
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
		handleBoxVariants(store.fields.twVariants.value),
	);

	const customCssStr = useStore(
		props.customCssFormStore,
		(store) =>
			store.fields.customClasses.value
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
		<QuoteBoxView
			boxDeepLevel={props.boxDeepLevel}
			parentBox={props.parentBox}
			className={className}
			//
			content={content}
			cite={cite}
			style={props.style}
		/>
	);
};

const QuoteBoxEditOverlay = (props: Props) => {
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeQuote, // .slice(0, -1)
	);
	const quoteFormStore: QuoteFormStore = useCreateFormStore({
		initValues: {
			content: box.quoteBox.content,
			cite: box.quoteBox.cite,
		},
		validationSchema: createOneQuoteBoxSchema,
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
				<QuoteBoxFormView
					boxDeepLevel={props.boxDeepLevel}
					parentBox={props.parentBox}
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
									cssId={box.css.id}
									onSuccess={(params) => {
										props.pageStore.getState().utils.setPage((page) => {
											return newUpdatedByPathArray<
												// eslint-disable-next-line @typescript-eslint/ban-types
												Exclude<typeof page, Function>
											>([...props.path, 'css'], page, (prev: BoxTypeQuote) => {
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
											>([...props.path, 'css'], page, (prev: BoxTypeQuote) => {
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
							___key: 'twVariants',
						},
						{
							defaultOpen: true,
							contentChildren: (
								<QuoteBoxForm
									store={quoteFormStore}
									id={box.quoteBox.id}
									onSuccess={(params) => {
										props.pageStore.getState().utils.setPage((page) => {
											return newUpdatedByPathArray<
												// eslint-disable-next-line @typescript-eslint/ban-types
												Exclude<typeof page, Function>
											>(
												[...props.path, 'quoteBox'],
												page,
												(prev: BoxTypeQuote) => ({
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
								<h3 className="text-h6 font-bold capitalize">quote box form</h3>
							),
							___key: 'quoteBox',
						},
					]}
				/>
			}
		/>
	);
};

export const QuoteBoxEditable = (props: Props) => {
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeQuote,
	);

	const quoteBoxViewProps = {
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
		content: box.quoteBox.content,
		cite: box.quoteBox.cite,
		style: props.style,
	};

	return (
		<QuoteBoxView
			{...quoteBoxViewProps}
			childrenAfter={<QuoteBoxEditOverlay {...props} />}
		/>
	);
};
