import { type ReactNode } from 'react';
import BoxEditOverlay from '../../BoxEditOverlay';
import { BoxTypeImage, PageStoreApi } from '../../_';
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
import { createOneImageBoxSchema } from '~/server/utils/validations-schemas/dashboard/boxes/types/images';
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
import { BsX } from 'react-icons/bs';

type ImageBox = {
	src: string;
	altText: string | null;
	width: number | null;
	height: number | null;
};
type ImageFormStore = FormStoreApi<ImageBox, typeof createOneImageBoxSchema>;
type SharedProps = {
	boxDeepLevel: number;
	parentBox?: BoxTypes;
	className?: string;
};
type Props = {
	box: BoxTypeImage;
	path: (string | number)[];
	pageStore: PageStoreApi;
} & SharedProps;

const BOX_TYPE = BoxTypes.IMAGE;

const ImageBoxForm = (props: {
	store: ImageFormStore;
	id: string;
	onSuccess: (params: {
		validatedValues: GetPassedValidationFieldsValues<
			typeof createOneImageBoxSchema
		>;
	}) => void;
}) => {
	const updateOneRequest =
		api.dashboard.boxes.types.images.updateOne.useMutation({
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
				name="src"
				labelProps={{ children: 'src' }}
			/>
			<ContainedInputField
				store={props.store}
				name="altText"
				labelProps={{ children: 'alt text' }}
			/>
			<fieldset>
				<div className="relative">
					<ContainedInputField
						store={props.store}
						name="width"
						labelProps={{
							children: (
								<>
									initial width <small>while loading</small>
								</>
							),
						}}
						type="number"
					/>
					<div className="absolute top-0 right-1 rtl:right-auto rtl:left-1">
						<button
							type="button"
							onClick={() => {
								props.store
									.getState()
									// eslint-disable-next-line @typescript-eslint/no-explicit-any
									.utils.handleOnInputChange('width', null as any);
							}}
						>
							<BsX />
						</button>
					</div>
				</div>
				<div className="relative">
					<ContainedInputField
						store={props.store}
						name="height"
						labelProps={{
							children: (
								<>
									initial height <small>while loading</small>
								</>
							),
						}}
						type="number"
					/>
					<div className="absolute top-0 right-1 rtl:right-auto rtl:left-1">
						<button
							type="button"
							onClick={() => {
								props.store
									.getState()
									// eslint-disable-next-line @typescript-eslint/no-explicit-any
									.utils.handleOnInputChange('height', null as any);
							}}
						>
							<BsX />
						</button>
					</div>
				</div>
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

const ImageBoxView = (
	props: {
		childrenAfter?: ReactNode;
	} & SharedProps &
		ImageBox,
) => {
	return (
		<div className={props.className}>
			<CustomNextImage
				src={props.src}
				width={props.width || 800}
				height={props.height || 800}
				alt={props.altText || ''}
			/>
			{props.childrenAfter}
		</div>
	);
};

const ImageBoxFormView = (
	props: {
		imageFormStore: ImageFormStore;
		twVariantsFormStore: TwVariantsFormStore;
		customCssFormStore: CustomCssFormStore;
	} & SharedProps,
) => {
	const src = useStore(props.imageFormStore, (store) => store.fields.src.value);
	const altText = useStore(
		props.imageFormStore,
		(store) => store.fields.altText.value,
	);
	const width = useStore(
		props.imageFormStore,
		(store) => store.fields.width.value,
	);
	const height = useStore(
		props.imageFormStore,
		(store) => store.fields.height.value,
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
		<ImageBoxView
			boxDeepLevel={props.boxDeepLevel}
			parentBox={props.parentBox}
			className={className}
			//
			src={src}
			altText={altText}
			width={width}
			height={height}
		/>
	);
};

const ImageBoxEditOverlay = (props: Props) => {
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeImage, // .slice(0, -1)
	);
	const imageFormStore: ImageFormStore = useCreateFormStore({
		initValues: {
			src: box.imageBox.src,
			altText: box.imageBox.altText,
			width: box.imageBox.width,
			height: box.imageBox.height,
		},
		validationSchema: createOneImageBoxSchema,
		validationEvents: { change: true },
		valuesFromFieldsToStore: {
			altText: (val) => (val ? val : null),
			width: (val) => (val ? Number(val) : null),
			height: (val) => (val ? Number(val) : null),
		},
		valuesFromStoreToFields: {
			altText: (val) => val ?? '',
			width: (val) => (typeof val === 'number' ? val.toString() : ''),
			height: (val) => (typeof val === 'number' ? val.toString() : ''),
		},
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
				<ImageBoxFormView
					boxDeepLevel={props.boxDeepLevel}
					parentBox={props.parentBox}
					className={props.className}
					//
					imageFormStore={imageFormStore}
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
											>([...props.path, 'css'], page, (prev: BoxTypeImage) => {
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
											>([...props.path, 'css'], page, (prev: BoxTypeImage) => {
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
								<ImageBoxForm
									store={imageFormStore}
									id={box.imageBox.id}
									onSuccess={(params) => {
										props.pageStore.getState().utils.setPage((page) => {
											return newUpdatedByPathArray<
												// eslint-disable-next-line @typescript-eslint/ban-types
												Exclude<typeof page, Function>
											>(
												[...props.path, 'imageBox'],
												page,
												(prev: BoxTypeImage) => ({
													...prev,
													src: params.validatedValues.src,
													altText: params.validatedValues.altText,
													width: params.validatedValues.width,
													height: params.validatedValues.height,
												}),
											);
										});
									}}
								/>
							),
							titleElem: (
								<h3 className="text-h6 font-bold capitalize">image box form</h3>
							),
							___key: 'imageBox',
						},
					]}
				/>
			}
		/>
	);
};

export const ImageBoxEditable = (props: Props) => {
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeImage,
	);

	const imageBoxViewProps = {
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
		src: box.imageBox.src,
		altText: box.imageBox.altText,
		width: box.imageBox.width,
		height: box.imageBox.height,
	};

	return (
		<ImageBoxView
			{...imageBoxViewProps}
			childrenAfter={<ImageBoxEditOverlay {...props} />}
		/>
	);
};
