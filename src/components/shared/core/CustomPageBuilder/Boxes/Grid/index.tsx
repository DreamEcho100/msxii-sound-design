import { type ReactNode } from 'react';
import BoxEditOverlay from '../../BoxEditOverlay';
import { BoxTypeGrid, PageStoreApi } from '../../_';
import { BoxTypes } from '@prisma/client';
import { useStore } from 'zustand';
import { getValueByPathArray, newUpdatedByPathArray } from '~/utils/obj/update';
import { cx } from 'class-variance-authority';
import { BoxVariants, handleBoxVariants } from '~/utils/appData';
import { useCreateFormStore } from '@de100/form-echo';
import Accordion from '~/components/shared/common/Accordion';

import customPageClasses from '~/styles/_custom-page.module.css';
import { CreateOneCustomCssSchema } from '~/server/utils/validations-schemas/dashboard/css/customCss';
import { CustomCssFormStore, CustomCssForm } from '../../Css/CustomClasses';
import {
	type TwVariantsFormStore,
	TwVariantsForm,
	useCreateTwVariantsFormStore,
} from '../../Css/TwVariants';

type Grid = {
	// slidesPerViewType: (typeof SlidesPerViewType)[keyof typeof SlidesPerViewType];
};
type SharedProps = {
	boxDeepLevel: number;
	parentBox?: BoxTypes;
	className?: string;

	// boxesToGrids: BoxTypeGrid['grid']['boxesToGrids']
	// path: (string | number)[];
	// pageStore: PageStoreApi;
};
type Props = SharedProps & {
	box: BoxTypeGrid;
	path: (string | number)[];
	pageStore: PageStoreApi;
};

const BOX_TYPE = BoxTypes.GRID;

const GridView = (
	props: {
		childrenAfter?: ReactNode;
		boxesToGrids: BoxTypeGrid['grid']['boxesToGrids'];
		path: (string | number)[];
		pageStore: PageStoreApi;
		// isDisplayingSlidesOut?: boolean;
		// forceRerender?: boolean;
	} & SharedProps &
		Grid,
) => {
	props;
	return <></>;
};

const GridFormView = (
	props: {
		// gridFormStore: GridFormStore;
		twVariantsFormStore: TwVariantsFormStore;
		customCssFormStore: CustomCssFormStore;
		//
		boxesToGrids: BoxTypeGrid['grid']['boxesToGrids'];
		path: (string | number)[];
		pageStore: PageStoreApi;
	} & SharedProps,
) => {
	// const slidesPerViewType = useStore(
	// 	props.gridFormStore,
	// 	(store) => store.fields.slidesPerViewType.value,
	// );
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
		<GridView
			boxDeepLevel={props.boxDeepLevel}
			parentBox={props.parentBox}
			className={className}
			//
			// slidesPerViewType={slidesPerViewType}
			boxesToGrids={props.boxesToGrids}
			path={props.path}
			pageStore={props.pageStore}
			// isDisplayingSlidesOut
			// forceRerender
		/>
	);
};

const GridEditOverlay = (
	props: Props & {
		boxesToGrids: BoxTypeGrid['grid']['boxesToGrids'];
	},
) => {
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeGrid, // .slice(0, -1)
	);
	// const gridFormStore: GridFormStore = useCreateFormStore({
	// 	initValues: {
	// 		// slidesPerViewType: box.grid.slidesPerViewType,
	// 	},
	// 	validationSchema: createOneGridSchema,
	// 	validationEvents: { change: true },
	// });
	const twVariantsFormStore = useCreateTwVariantsFormStore(
		props.box.css.twVariants,
	);
	const customCssFormStore: CustomCssFormStore = useCreateFormStore({
		initValues: {
			customCss: props.box.css.customClasses ?? [],
		},
		validationSchema: CreateOneCustomCssSchema,
	});

	return (
		<BoxEditOverlay
			{...props}
			ShowcaseBoxChildren={
				<GridFormView
					boxDeepLevel={props.boxDeepLevel}
					parentBox={props.parentBox}
					className={props.className}
					//
					// gridFormStore={gridFormStore}
					twVariantsFormStore={twVariantsFormStore}
					customCssFormStore={customCssFormStore}
					//
					path={props.path}
					pageStore={props.pageStore}
					boxesToGrids={props.boxesToGrids}
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
											>([...props.path, 'css'], page, (prev: BoxTypeGrid) => {
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
											>([...props.path, 'css'], page, (prev: BoxTypeGrid) => {
												return {
													...prev,
													customClasses: params.validatedValues.customCss,
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
								<>
									{/* <GridForm
									// store={gridFormStore}
									id={box.grid.id}
									// eslint-disable-next-line @typescript-eslint/no-unused-vars
									onSuccess={(params) => {
										props.pageStore.getState().utils.setPage((page) => {
											return newUpdatedByPathArray<
												// eslint-disable-next-line @typescript-eslint/ban-types
												Exclude<typeof page, Function>
											>([...props.path, 'grid'], page, (prev: BoxTypeGrid) => ({
												...prev,
												// slidesPerViewType:
												// 	params.validatedValues.slidesPerViewType,
											}));
										});
									}}
								/> */}
								</>
							),
							titleElem: (
								<h3 className="text-h6 font-bold capitalize">grid box form</h3>
							),
							___key: 'grid',
						},
					]}
				/>
			}
		/>
	);
};

export const GridEditable = (props: Props) => {
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeGrid,
	);

	const gridViewProps = {
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
		// slidesPerViewType: box.grid.slidesPerViewType,
		path: props.path,
		pageStore: props.pageStore,
		boxesToGrids: box.grid.boxesToGrids,
	};

	return (
		<GridView
			{...gridViewProps}
			childrenAfter={
				<GridEditOverlay {...props} boxesToGrids={box.grid.boxesToGrids} />
			}
		/>
	);
};
