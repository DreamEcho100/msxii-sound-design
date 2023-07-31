import { CSSProperties, type ReactNode } from 'react';
import BoxEditOverlay from '../../BoxEditOverlay';
import {
	Box,
	BoxTypeGrid,
	Css,
	PageStoreApi,
	SectionBoxContainer,
} from '../../_';
import { BoxTypes } from '@prisma/client';
import { useStore } from 'zustand';
import { getValueByPathArray, newUpdatedByPathArray } from '~/utils/obj/update';
import { cx } from 'class-variance-authority';
import { BoxVariants, handleBoxVariants } from '~/utils/appData';
import { useCreateFormStore } from '@de100/form-echo';
import Accordion from '~/components/shared/common/Accordion';

import customPageClasses from '~/styles/_custom-page.module.css';
import { CreateOneCustomCssSchema } from '~/server/utils/validations-schemas/dashboard/css/customClasses';
import { CustomCssFormStore, CustomCssForm } from '../../Css/CustomClasses';
import {
	type TwVariantsFormStore,
	TwVariantsForm,
	useCreateTwVariantsFormStore,
} from '../../Css/TwVariants';
import {
	GridTemplateManager,
	InlineStylesFormProps,
	InlineStylesFormStore,
	useInlineStylesFormStore,
	useSetInlineStylesOneRequest,
} from '../../Css/InlineStyles';
import Form from '~/components/shared/common/@de100/form-echo/Forms';

type Grid = {
	// slidesPerViewType: (typeof SlidesPerViewType)[keyof typeof SlidesPerViewType];
};
type SharedProps = {
	boxDeepLevel: number;
	parentBox?: BoxTypes;
	className?: string;
	inlineStyles?: Css['inlineStyles'];

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
	const newBoxDeepLevel = props.boxDeepLevel + 1;

	return (
		<div
			className={props.className}
			style={props.inlineStyles as CSSProperties}
		>
			{props.boxesToGrids.map((boxToGrid, boxToGridIndex) => (
				<SectionBoxContainer
					key={boxToGrid.boxId}
					box={boxToGrid.box as Box}
					parentBox={props.parentBox}
					boxDeepLevel={newBoxDeepLevel}
					path={[...props.path, 'grid', 'boxesToGrids', boxToGridIndex, 'box']}
					pageStore={props.pageStore}
				/>
			))}
			{props.childrenAfter}
		</div>
	);
};

export const InlineStylesForm = (props: InlineStylesFormProps) => {
	const setOneRequest = useSetInlineStylesOneRequest();

	const gridTemplateColumns = useStore(
		props.store,
		(store) => store.fields.gridTemplateColumns.value,
	);
	const gridTemplateRows = useStore(
		props.store,
		(store) => store.fields.gridTemplateRows.value,
	);

	return (
		<Form
			onSubmit={async (event, params) => {
				event.preventDefault();
				await setOneRequest.mutateAsync({
					cssId: props.cssId,
					inlineStyles: params.validatedValues,
				});

				props.onSuccess(params);
			}}
			store={props.store}
		>
			<div className="flex flex-col gap-2">
				<fieldset className="min-w-[unset] flex flex-col gap-2 border p-4 rounded-sm shadow-md max-w-full">
					<legend className="capitalize">template columns</legend>
					<GridTemplateManager
						name="gridTemplateColumns"
						gridTemplate={gridTemplateColumns}
						setGridTemplate={(gridTemplate) => {
							props.store
								.getState()
								.utils.setFieldValue('gridTemplateColumns', gridTemplate);
						}}
					/>
				</fieldset>
				<fieldset className="min-w-[unset] flex flex-col gap-2 border p-4 rounded-sm shadow-md max-w-full">
					<legend className="capitalize">template rows</legend>
					<GridTemplateManager
						name="gridTemplateRows"
						gridTemplate={gridTemplateRows}
						setGridTemplate={(gridTemplate) => {
							props.store
								.getState()
								.utils.setFieldValue('gridTemplateRows', gridTemplate);
						}}
					/>
				</fieldset>
			</div>
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

const GridFormView = (
	props: {
		// gridFormStore: GridFormStore;
		twVariantsFormStore: TwVariantsFormStore;
		customCssFormStore: CustomCssFormStore;
		inlineStylesFormStore: InlineStylesFormStore;
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
			store.fields.customClasses.value
				?.map((key) => customPageClasses[key])
				.join(' ') ?? undefined,
	);

	const styles = useStore(props.inlineStylesFormStore, (store) => {
		const styles: Record<string, string | number> = {};

		let key: keyof (typeof store)['fields'];
		for (key in store.fields) {
			const element = store.fields[key].value;

			if (typeof element === 'string' || typeof element === 'number')
				styles[key] = element;
		}

		return styles;
	});

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
			inlineStyles={styles}
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
			customClasses: props.box.css.customClasses ?? [],
		},
		validationSchema: CreateOneCustomCssSchema,
	});

	const inlineStylesFormStore = useInlineStylesFormStore({
		gridTemplateColumns: '',
		gridTemplateRows: '',
		...((props.box.css.inlineStyles as Record<string, string>) || {}),
	});

	return (
		<BoxEditOverlay
			{...props}
			ShowcaseBoxChildren={
				<GridFormView
					boxDeepLevel={props.boxDeepLevel}
					parentBox={props.parentBox}
					className={props.className}
					inlineStyles={props.box.css.inlineStyles}
					//
					// gridFormStore={gridFormStore}
					twVariantsFormStore={twVariantsFormStore}
					customCssFormStore={customCssFormStore}
					inlineStylesFormStore={inlineStylesFormStore}
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
							___key: 'customClasses',
						},
						{
							defaultOpen: true,
							contentChildren: (
								<InlineStylesForm
									store={inlineStylesFormStore}
									cssId={box.css.id}
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
								/>
							),
							titleElem: (
								<h3 className="text-h6 font-bold capitalize">
									grid inline styles box form
								</h3>
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
		inlineStyles: box.css.inlineStyles,
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
