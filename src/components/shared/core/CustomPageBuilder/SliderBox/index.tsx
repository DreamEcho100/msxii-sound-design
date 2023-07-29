import { useState, type ReactNode, useEffect } from 'react';
import BoxEditOverlay from '../BoxEditOverlay';
import { Box, BoxTypeSlider, PageStoreApi, SectionBoxContainer } from '../_';
import { BoxTypes, SlidersHolderSlidePerViewType } from '@prisma/client';
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
import Accordion from '~/components/shared/common/Accordion';
import { createOneSliderBoxSchema } from '~/server/utils/validations-schemas/dashboard/boxes/types/sliders';
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
import ContainedDropdownField from '~/components/shared/common/@de100/form-echo/Fields/Contained/ContainedDropdown';
import Slider from '../../Shopify/Cards/Slider';
import { SwiperSlide } from 'swiper/react';

type SliderBox = {
	slidesPerViewType: (typeof SlidersHolderSlidePerViewType)[keyof typeof SlidersHolderSlidePerViewType];
};
type SliderFormStore = FormStoreApi<SliderBox, typeof createOneSliderBoxSchema>;
type SharedProps = {
	boxDeepLevel: number;
	parentBox?: BoxTypes;
	className: string;

	// boxesToSliders: BoxTypeSlider['sliderBox']['boxesToSliders']
	// path: (string | number)[];
	// pageStore: PageStoreApi;
};
type Props = SharedProps & {
	box: BoxTypeSlider;
	path: (string | number)[];
	pageStore: PageStoreApi;
	boxesToSliders: BoxTypeSlider['sliderBox']['boxesToSliders'];
};

const BOX_TYPE = BoxTypes.SLIDER;

const slidesPerViewTypeDropdownData = Object.values<
	(typeof SlidersHolderSlidePerViewType)[keyof typeof SlidersHolderSlidePerViewType]
>(SlidersHolderSlidePerViewType).map((value) => ({
	value,
	name: value
		.split('_')
		.map(
			(word) =>
				`${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`,
		)
		.join(' '),
}));

const SliderBoxForm = (props: {
	store: SliderFormStore;
	id: string;
	onSuccess: (params: {
		validatedValues: GetPassedValidationFieldsValues<
			typeof createOneSliderBoxSchema
		>;
	}) => void;
}) => {
	const updateOneRequest =
		api.dashboard.boxes.types.sliders.updateOne.useMutation({
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
					// ...params.validatedValues,
					slidesPerViewType: params.validatedValues.slidesPerViewType,
				});

				props.onSuccess(params);
			}}
			store={props.store}
		>
			<ContainedDropdownField
				store={props.store}
				name="slidesPerViewType"
				labelProps={{ children: 'slides per view type' }}
				isA="combobox"
				data={slidesPerViewTypeDropdownData}
				getOptionChildren={(value) => value.name}
				getDisplayValue={(value) => value.name}
				getOptionKey={(value) =>
					typeof value === 'string' ? value : value.value
				}
				onChange={(value) => {
					props.store.getState().utils.handleOnInputChange(
						'slidesPerViewType',
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						value.value,
					);
				}}
				// defaultValue={{
				// 	value: props.store.getState().fields.slidesPerViewType.value,
				// 	name: props.store.getState().fields.slidesPerViewType.value
				// 		.split('_')
				// 		.map(
				// 			(word) =>
				// 				`${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`,
				// 		)
				// 		.join(' '),
				// }}
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

const SliderBoxView = (
	props: {
		childrenAfter?: ReactNode;
		boxesToSliders: BoxTypeSlider['sliderBox']['boxesToSliders'];
		path: (string | number)[];
		pageStore: PageStoreApi;
		isDisplayingSlidesOut?: boolean;
		forceRerender?: boolean;
	} & SharedProps &
		SliderBox,
) => {
	const newBoxDeepLevel = props.boxDeepLevel + 1;
	const [watchedStateForRerender, setWatchedStateForRerender] = useState({
		slidesPerViewType: props.slidesPerViewType,
	});
	const [forceRerender, setForceRerender] = useState(false);

	useEffect(() => {
		if (watchedStateForRerender.slidesPerViewType === props.slidesPerViewType)
			return;

		setWatchedStateForRerender({
			slidesPerViewType: props.slidesPerViewType,
		});
		setForceRerender(true);
	}, [props.slidesPerViewType, watchedStateForRerender.slidesPerViewType]);

	useEffect(() => {
		if (!forceRerender) return;

		const timeoutId = setTimeout(() => setForceRerender(false), 0);

		return () => clearTimeout(timeoutId);
	}, [forceRerender]);

	return (
		<>
			<div className={props.className}>
				{!forceRerender && (
					<Slider
						swiperProps={{
							className: cx(customPageClasses['swiper'], 'swiper-fluid'),
							breakpoints:
								props.slidesPerViewType ===
								SlidersHolderSlidePerViewType.LARGE_SLIDES
									? {
											640: { slidesPerView: 2 },
											1024: { slidesPerView: 3 },
											1280: { slidesPerView: 4 },
									  }
									: props.slidesPerViewType ===
									  SlidersHolderSlidePerViewType.ONE_SLIDE
									? { 0: { slidesPerView: 1 } }
									: {
											400: { slidesPerView: 2 },
											768: { slidesPerView: 3 },
											1024: { slidesPerView: 4 },
											1280: { slidesPerView: 5 },
									  },
						}}
					>
						{props.boxesToSliders.map((boxToSlider, boxToSliderIndex) => (
							<SwiperSlide key={boxToSlider.boxId} className="flex flex-col">
								<SectionBoxContainer
									box={boxToSlider.box as Box}
									parentBox={BOX_TYPE}
									boxDeepLevel={newBoxDeepLevel}
									path={[
										...props.path,
										'sliderBox',
										'boxesToSliders',
										boxToSliderIndex,
										'box',
									]}
									pageStore={props.pageStore}
								/>
							</SwiperSlide>
						))}
					</Slider>
				)}
				{props.childrenAfter}
			</div>
			{props.isDisplayingSlidesOut && (
				<>
					<section className="flex flex-col gap-8 mx-4 mt-16 px-4 py-8 border-[0.5rem]">
						<header>
							<h2 className="text-h2 capitalize text-center">all slides ^</h2>
						</header>
						<section
							className="grid gap-4"
							style={{
								gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
							}}
						>
							{props.boxesToSliders.map((boxToSlider, boxToSliderIndex) => (
								<SectionBoxContainer
									key={boxToSlider.boxId}
									box={boxToSlider.box as Box}
									parentBox={BOX_TYPE}
									boxDeepLevel={newBoxDeepLevel}
									path={[
										...props.path,
										'sliderBox',
										'boxesToSliders',
										boxToSliderIndex,
										'box',
									]}
									pageStore={props.pageStore}
								/>
							))}
						</section>
					</section>
				</>
			)}
		</>
	);
};

const SliderBoxFormView = (
	props: {
		sliderFormStore: SliderFormStore;
		twVariantsFormStore: TwVariantsFormStore;
		customCssFormStore: CustomCssFormStore;
		//
		boxesToSliders: BoxTypeSlider['sliderBox']['boxesToSliders'];
		path: (string | number)[];
		pageStore: PageStoreApi;
	} & SharedProps,
) => {
	const slidesPerViewType = useStore(
		props.sliderFormStore,
		(store) => store.fields.slidesPerViewType.value,
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
		<SliderBoxView
			boxDeepLevel={props.boxDeepLevel}
			parentBox={props.parentBox}
			className={className}
			//
			slidesPerViewType={slidesPerViewType}
			boxesToSliders={props.boxesToSliders}
			path={props.path}
			pageStore={props.pageStore}
			isDisplayingSlidesOut
			forceRerender
		/>
	);
};

const SliderBoxEditOverlay = (props: Props) => {
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeSlider, // .slice(0, -1)
	);
	const sliderFormStore: SliderFormStore = useCreateFormStore({
		initValues: {
			slidesPerViewType: box.sliderBox.slidesPerViewType,
		},
		validationSchema: createOneSliderBoxSchema,
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
				<SliderBoxFormView
					boxDeepLevel={props.boxDeepLevel}
					parentBox={props.parentBox}
					className={props.className}
					//
					sliderFormStore={sliderFormStore}
					twVariantsFormStore={twVariantsFormStore}
					customCssFormStore={customCssFormStore}
					//
					path={props.path}
					pageStore={props.pageStore}
					boxesToSliders={props.boxesToSliders}
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
											>([...props.path, 'css'], page, (prev: BoxTypeSlider) => {
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
											>([...props.path, 'css'], page, (prev: BoxTypeSlider) => {
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
								<SliderBoxForm
									store={sliderFormStore}
									id={box.sliderBox.id}
									onSuccess={(params) => {
										props.pageStore.getState().utils.setPage((page) => {
											return newUpdatedByPathArray<
												// eslint-disable-next-line @typescript-eslint/ban-types
												Exclude<typeof page, Function>
											>(
												[...props.path, 'sliderBox'],
												page,
												(prev: BoxTypeSlider) => ({
													...prev,
													slidesPerViewType:
														params.validatedValues.slidesPerViewType,
												}),
											);
										});
									}}
								/>
							),
							titleElem: (
								<h3 className="text-h6 font-bold capitalize">
									slider box form
								</h3>
							),
							___key: 'sliderBox',
						},
					]}
				/>
			}
		/>
	);
};

export const SliderBoxEditable = (props: Props) => {
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeSlider,
	);

	const sliderBoxViewProps = {
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
		slidesPerViewType: box.sliderBox.slidesPerViewType,
		path: props.path,
		pageStore: props.pageStore,
		boxesToSliders: box.sliderBox.boxesToSliders,
	};

	return (
		<SliderBoxView
			{...sliderBoxViewProps}
			childrenAfter={
				<SliderBoxEditOverlay
					{...props}
					boxesToSliders={box.sliderBox.boxesToSliders}
				/>
			}
		/>
	);
};
