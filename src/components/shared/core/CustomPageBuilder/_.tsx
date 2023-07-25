import { type CSSProperties, type ReactNode } from 'react';

import { cx } from 'class-variance-authority';
import { SwiperSlide } from 'swiper/react';
import { BoxVariants, handleBoxVariants } from '~/utils/appData';
import customPageClasses from '~/styles/_custom-page.module.css';
import Slider from '~/components/shared/core/Shopify/Cards/Slider';
import { RouterOutputs } from '~/utils/api';
import { BoxTypes, SlidersHolderSlidePerViewType } from '@prisma/client';
import BoxEditOverlay from './BoxEditOverlay';
import CustomTabs from './CustomTabs';
import { StoreApi, createStore } from 'zustand';
import { MdBoxEditable } from './MdBox';
import { QuoteBoxEditable } from './QuoteBox';
import { HeaderBoxEditable } from './HeaderBox';
import { ImageBoxEditable } from './ImageBox';
import { IframeBoxEditable } from './IframeBox';

type Page = RouterOutputs['customPages']['_getOne'];
export type Css = Page['css'];
type Section = RouterOutputs['customPages']['_getOne']['sections'][number];
export type Box =
	RouterOutputs['customPages']['_getOne']['sections'][number]['body'][number];

export type GetBoxNonNullableItem<Key extends keyof Box> = NonNullable<
	Box[Key]
>;
export type GetBoxWithNullableItem<Key extends keyof Box> = Omit<Box, Key> & {
	[key in Key]: NonNullable<Box[Key]>;
};

export type BoxTypeMd = GetBoxWithNullableItem<'mdBox'>;
export type BoxTypeQuote = GetBoxWithNullableItem<'quoteBox'>;
export type BoxTypeHeader = GetBoxWithNullableItem<'headerBox'>;
export type BoxTypeImage = GetBoxWithNullableItem<'imageBox'>;
export type BoxTypeIframe = GetBoxWithNullableItem<'iframeBox'>;
export type BoxTypeTabsHolder = GetBoxWithNullableItem<'tabsHolder'>;

export type MdBox = BoxTypeMd['mdBox'];
export type QuoteBox = BoxTypeQuote['quoteBox'];
export type HeaderBox = BoxTypeHeader['headerBox'];
export type ImageBox = BoxTypeImage['imageBox'];
export type IframeBox = BoxTypeIframe['iframeBox'];
export type TabsHolderBox = BoxTypeTabsHolder['tabsHolder'];

type Props = {
	page: Page;
	children?: ReactNode;
	path?: (string | number)[];
};

type PageStore = {
	page: Page;
	utils: {
		setPage: (UpdaterOrValue: Page | ((UpdaterOrValue: Page) => Page)) => void;
	};
};
export type PageStoreApi = StoreApi<PageStore>;

const CustomPageBuilder = (props: Props) => {
	const pageStore = createStore<PageStore>((set) => ({
		page: props.page,
		utils: {
			setPage: (UpdaterOrValue) =>
				set((prevState: PageStore) => ({
					page:
						typeof UpdaterOrValue === 'function'
							? UpdaterOrValue(prevState.page)
							: UpdaterOrValue,
				})),
		},
	}));

	return (
		<div
			className={handleBoxVariants({
				...(props.page.css.twVariants as BoxVariants),
				className: 'text-h6 flex flex-col text-text-primary-400',
			})}
		>
			{props.page.sections.map((section, index) => (
				<SectionBody
					key={section.id}
					section={section}
					path={[...(props.path || []), 'sections', index]}
					pageStore={pageStore}
				/>
			))}
			{props.children}
		</div>
	);
};

const SectionBody = (props: {
	section: Section;
	boxDeepLevel?: number;
	path: (string | number)[];
	pageStore: PageStoreApi;
}) => {
	const boxDeepLevel = props.boxDeepLevel || 1;
	return (
		<section
			className={cx(
				'flex flex-col',
				handleBoxVariants(props.section.css.twVariants as BoxVariants),
				...(props.section.css.custom
					? props.section.css.custom.map((key) => customPageClasses[key])
					: []),
			)}
		>
			{props.section.body.map((box, boxIndex) => {
				return (
					<SectionBoxContainer
						key={box.id}
						box={box}
						boxDeepLevel={boxDeepLevel}
						path={[...props.path, 'body', boxIndex]}
						pageStore={props.pageStore}
					/>
				);
			})}
		</section>
	);
};

const createBoxTypeClass = (type: string) =>
	`${customPageClasses[`${type}-BOX`]} ${customPageClasses['BOX']} box ${
		customPageClasses.box
	}`;

export function SectionBoxContainer(props: {
	box: Box;
	parentBox?: BoxTypes;
	boxDeepLevel: number;
	path: (string | number)[];
	pageStore: PageStoreApi;
}) {
	return (
		<div
			className="box-container"
			style={
				{
					'--boxDeepLevel': props.boxDeepLevel,
					zIndex: props.boxDeepLevel.toString(),
				} as CSSProperties
			}
			// onPointerEnter={(event) => {
			// 	event.currentTarget.classList.add('active');
			// 	console.log('___ onPointerEnter', props);
			// }}
			// onPointerDown={() => {
			// 	console.log('___ onPointerDown', props);
			// }}
			// onPointerLeave={(event) => {
			// 	event.currentTarget.classList.remove('active');
			// 	console.log('___ onPointerLeave', props);
			// }}
		>
			<SectionBox
				box={props.box}
				parentBox={props.parentBox}
				boxDeepLevel={props.boxDeepLevel}
				path={props.path}
				pageStore={props.pageStore}
			/>
		</div>
	);
}

const SectionBox = (props: {
	box: Box;
	parentBox?: BoxTypes;
	boxDeepLevel: number;
	path: (string | number)[];
	pageStore: PageStoreApi;
}) => {
	const newBoxDeepLevel = props.boxDeepLevel + 1;
	const customPageClassName = cx(
		createBoxTypeClass(props.box.type),
		handleBoxVariants(props.box.css.twVariants as BoxVariants),
		...(props.box.css.custom
			? props.box.css.custom?.map((key) => customPageClasses[key])
			: []),
	);

	if (props.box.type === BoxTypes.HEADER && props.box.headerBox)
		return (
			<HeaderBoxEditable
				boxDeepLevel={props.boxDeepLevel}
				parentBox={props.parentBox}
				pageStore={props.pageStore}
				box={props.box}
				path={props.path}
				// It's already passed inside
				// path={[...props.path, 'headerBox']}
			/>
		);

	if (props.box.type === BoxTypes.IMAGE && props.box.imageBox)
		return (
			<ImageBoxEditable
				boxDeepLevel={props.boxDeepLevel}
				parentBox={props.parentBox}
				pageStore={props.pageStore}
				box={props.box}
				path={props.path}
				// It's already passed inside
				// path={[...props.path, 'imageBox']}
			/>
		);

	if (props.box.type === BoxTypes.MD && props.box.mdBox)
		return (
			<MdBoxEditable
				boxDeepLevel={props.boxDeepLevel}
				parentBox={props.parentBox}
				pageStore={props.pageStore}
				box={props.box}
				path={props.path}
				// It's already passed inside
				// path={[...props.path, 'mdBox']}
			/>
		);

	if (props.box.type === BoxTypes.QUOTE && props.box.quoteBox)
		return (
			<QuoteBoxEditable
				boxDeepLevel={props.boxDeepLevel}
				parentBox={props.parentBox}
				pageStore={props.pageStore}
				box={props.box}
				path={props.path}
				// It's already passed inside
				// path={[...props.path, 'quoteBox']}
				style={{ '--divider': 1 / 3, '--w': '3rem' } as CSSProperties}
			/>
		);

	if (props.box.type === BoxTypes.IFRAME)
		return (
			<IframeBoxEditable
				boxDeepLevel={props.boxDeepLevel}
				parentBox={props.parentBox}
				pageStore={props.pageStore}
				box={props.box}
				path={props.path}
				// It's already passed inside
				// path={[...props.path, 'mdBox']}
			/>
		);

	/*
	{
		if (props.box.iframeBox.type === IframeBoxTypes.YOUTUBE)
			return (
				<YouTubeIFrame
					childrenAfter={
						<BoxEditOverlay
							boxDeepLevel={props.boxDeepLevel}
							box={props.box}
							path={[...props.path, 'iframeBox']}
							pageStore={props.pageStore}
						/>
					}
					containerProps={{
						className: cx(
							'w-full rounded-3xl overflow-hidden relative isolate',
							customPageClassName,
						),
					}}
					youTubeIconVariants={{
						fontSize: props.parentBox === BoxTypes.SLIDER ? 'small' : 'medium',
					}}
					width={props.parentBox === BoxTypes.SLIDER ? '200' : '550'}
					height={props.parentBox === BoxTypes.SLIDER ? '200' : '550'}
					src={props.box.iframeBox.src}
					title={props.box.iframeBox.title || 'YouTube video player'}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				/>
			);

		if (props.box.iframeBox.type === IframeBoxTypes.INSTAGRAM)
			return (
				<InstagramIframe
					childrenAfter={
						<BoxEditOverlay
							boxDeepLevel={props.boxDeepLevel}
							box={props.box}
							path={[...props.path, 'iframeBox']}
							pageStore={props.pageStore}
						/>
					}
					src={props.box.iframeBox.src}
					title={props.box.iframeBox.title}
					className={customPageClassName}
				/>
			);

		if (props.box.iframeBox.type === IframeBoxTypes.SOUND_CLOUD)
			return (
				<SoundCloudIframe
					childrenAfter={
						<BoxEditOverlay
							boxDeepLevel={props.boxDeepLevel}
							box={props.box}
							path={[...props.path, 'iframeBox']}
							pageStore={props.pageStore}
						/>
					}
					src={props.box.iframeBox.src}
					title={props.box.iframeBox.title}
					className={customPageClassName}
				/>
			);
	}
	*/

	if (props.box.type === BoxTypes.TABS_HOLDER && props.box.tabsHolder) {
		return (
			<CustomTabs
				box={props.box.tabsHolder}
				className={cx(customPageClassName)}
				boxDeepLevel={newBoxDeepLevel}
				childrenAfter={
					<BoxEditOverlay
						boxDeepLevel={props.boxDeepLevel}
						box={props.box}
						path={[...props.path, 'tabsHolder']}
						pageStore={props.pageStore}
					/>
				}
				path={props.path}
				pageStore={props.pageStore}
			/>
		);
	}

	if (props.box.type === BoxTypes.SLIDER && props.box.sliderBox) {
		return (
			<div className={customPageClassName}>
				<Slider
					swiperProps={{
						className: cx(
							customPageClassName,
							customPageClasses['swiper'],
							'swiper-fluid',
						),
						breakpoints:
							props.box.sliderBox.slidesPerViewType ===
							SlidersHolderSlidePerViewType.LARGE_SLIDES
								? {
										640: { slidesPerView: 2 },
										1024: { slidesPerView: 3 },
										1280: { slidesPerView: 4 },
								  }
								: props.box.sliderBox.slidesPerViewType ===
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
					{props.box.sliderBox.boxesToSliders.map(
						(boxToSlider, boxToSliderIndex) => (
							<SwiperSlide key={boxToSlider.boxId} className="flex flex-col">
								<SectionBoxContainer
									box={boxToSlider.box as Box}
									parentBox={props.box.type}
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
						),
					)}
				</Slider>
				<BoxEditOverlay
					boxDeepLevel={props.boxDeepLevel}
					box={props.box}
					path={[...props.path, 'sliderBox']}
					pageStore={props.pageStore}
				/>
			</div>
		);
	}

	if (props.box.type === BoxTypes.GRID && props.box.gridBox) {
		return (
			<div
				className={customPageClassName}
				style={props.box.css.inlineStyles as CSSProperties}
			>
				{props.box.gridBox.boxesToGrids.map((boxToGrid, boxToGridIndex) => (
					<SectionBoxContainer
						key={boxToGrid.boxId}
						box={boxToGrid.box as Box}
						parentBox={props.box.type}
						boxDeepLevel={newBoxDeepLevel}
						path={[
							...props.path,
							'gridBox',
							'boxesToGrids',
							boxToGridIndex,
							'box',
						]}
						pageStore={props.pageStore}
					/>
				))}
				<BoxEditOverlay
					boxDeepLevel={props.boxDeepLevel}
					box={props.box}
					path={[...props.path, 'gridBox']}
					pageStore={props.pageStore}
				/>
			</div>
		);
	}

	return <></>;
};

export default CustomPageBuilder;
