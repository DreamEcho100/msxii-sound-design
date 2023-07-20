import { type CSSProperties, type ReactNode } from 'react';

import { cx } from 'class-variance-authority';
import { SwiperSlide } from 'swiper/react';
import { BoxVariants, handleBoxVariants } from '~/utils/appData';
import {
	InstagramIframe,
	SoundcloudIframe,
	YouTubeIFrame,
} from '~/components/shared/Iframes';
import customPageClasses from '~/styles/_custom-page.module.css';
import Slider from '~/components/shared/core/Shopify/Cards/Slider';
import CustomNextImage from '~/components/shared/CustomNextImage';
import { RouterOutputs } from '~/utils/api';
import {
	BoxTypes,
	IframeBoxTypes,
	SlidersHolderSlidePerViewType,
} from '@prisma/client';
import BoxEditOverlay from './BoxEditOverlay';
import Quote from './Quote';
import CustomTabs from './CustomTabs';
import { StoreApi, createStore } from 'zustand';
import MdBoxComp from './MdBoxComp';

type Page = RouterOutputs['customPages']['_getOne'];
type Section = RouterOutputs['customPages']['_getOne']['sections'][number];
export type Box =
	RouterOutputs['customPages']['_getOne']['sections'][number]['body'][number];
export type MdBox = NonNullable<
	RouterOutputs['customPages']['_getOne']['sections'][number]['body'][number]['mdBox']
>;
export type QuoteBox = NonNullable<
	RouterOutputs['customPages']['_getOne']['sections'][number]['body'][number]['quoteBox']
>;
export type TabsHolder = NonNullable<
	RouterOutputs['customPages']['_getOne']['sections'][number]['body'][number]['tabsHolder']
>;
export type BoxTypeMd = Omit<Box, 'mdBox'> & { mdBox: MdBox };

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
	console.log('\n\n\n');
	console.group('CustomPageBuilder');
	console.log('___ page', props.page);
	console.groupEnd();
	console.log('\n\n\n');

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

	if (props.box.type === BoxTypes.HEADER && props.box.headerBox) {
		const HType = (() => {
			if (props.boxDeepLevel >= 5) return 'h6';

			if (props.box.headerBox.isMainPageTitle) return 'h1';

			return `h${props.boxDeepLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
		})();

		return (
			<header className="flex flex-col gap-8">
				{props.box.headerBox.title && (
					<HType
						className={cx(
							props.boxDeepLevel === 0 ? 'font-semibold' : '',
							'text-h3 text-text-primary-500',
						)}
					>
						{props.box.headerBox.title}
					</HType>
				)}
				{props.box.headerBox.description && (
					<p>{props.box.headerBox.description}</p>
				)}
				<BoxEditOverlay
					boxDeepLevel={props.boxDeepLevel}
					box={props.box}
					path={[...props.path, 'headerBox']}
					pageStore={props.pageStore}
				/>
			</header>
		);
	}

	if (props.box.type === BoxTypes.IMAGE && props.box.imageBox)
		return (
			<div className={cx(customPageClassName)}>
				<CustomNextImage
					src={props.box.imageBox.src}
					width={props.box.imageBox.width || 800}
					height={props.box.imageBox.height || 800}
					alt={props.box.imageBox.altText || ''}
				/>
				<BoxEditOverlay
					boxDeepLevel={props.boxDeepLevel}
					box={props.box}
					path={[...props.path, 'imageBox']}
					pageStore={props.pageStore}
				/>
			</div>
		);

	if (props.box.type === BoxTypes.MD && props.box.mdBox)
		return (
			<MdBoxComp
				boxDeepLevel={props.boxDeepLevel}
				box={props.box}
				path={[...props.path, 'mdBox']}
				pageStore={props.pageStore}
			/>
		);

	if (props.box.type === BoxTypes.QUOTE && props.box.quoteBox)
		return (
			<Quote
				className={cx(customPageClassName)}
				style={{ '--divider': 1 / 3, '--w': '3rem' } as CSSProperties}
				box={props.box.quoteBox}
				childAfter={
					<BoxEditOverlay
						boxDeepLevel={props.boxDeepLevel}
						box={props.box}
						path={[...props.path, 'quoteBox']}
						pageStore={props.pageStore}
					/>
				}
			/>
		);

	if (props.box.type === BoxTypes.TABS_HOLDER && props.box.tabsHolder) {
		return (
			<CustomTabs
				box={props.box.tabsHolder}
				className={cx(customPageClassName)}
				boxDeepLevel={newBoxDeepLevel}
				childAfter={
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

	if (props.box.type === BoxTypes.IFRAME) {
		if (props.box.iframeBox.type === IframeBoxTypes.YOUTUBE)
			return (
				<YouTubeIFrame
					childAfter={
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
					childAfter={
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
				<SoundcloudIframe
					childAfter={
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
