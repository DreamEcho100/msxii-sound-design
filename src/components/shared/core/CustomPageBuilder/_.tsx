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
import ReactMarkdownFormatter from './ReactMarkdownFormatter';
import { RouterOutputs } from '~/utils/api';
import {
	BoxTypes,
	IframeBoxTypes,
	SlidersHolderSlidePerViewType,
} from '@prisma/client';
import BoxEditOverlay from './BoxEditOverlay';
import Quote from './Quote';
import CustomTabs from './CustomTabs';

type Page = RouterOutputs['customPages']['_getOne'];
type Section = RouterOutputs['customPages']['_getOne']['sections'][number];
export type Box =
	RouterOutputs['customPages']['_getOne']['sections'][number]['body'][number];
export type QuoteBox = NonNullable<
	RouterOutputs['customPages']['_getOne']['sections'][number]['body'][number]['quoteBox']
>;
export type TabsHolder = NonNullable<
	RouterOutputs['customPages']['_getOne']['sections'][number]['body'][number]['tabsHolder']
>;

type Props = {
	page: Page;
	children?: ReactNode;
};

const CustomPageBuilder = (props: Props) => {
	return (
		<div
			className={handleBoxVariants({
				...(props.page.css.twVariants as BoxVariants),
				className: 'text-h6 flex flex-col text-text-primary-400',
			})}
		>
			{props.page.sections.map((section, index) => (
				<SectionBody key={section.id} section={section} />
			))}
			{props.children}
		</div>
	);
};

const SectionBody = ({
	section,
	boxDeepLevel = 1,
}: {
	section: Section;
	boxDeepLevel?: number;
}) => {
	return (
		<section
			className={cx(
				'flex flex-col',
				handleBoxVariants(section.css.twVariants as BoxVariants),
				...(section.css.custom
					? section.css.custom.map((key) => customPageClasses[key])
					: []),
			)}
		>
			{section.body.map((box) => {
				return (
					<SectionBoxContainer
						key={box.id}
						box={box}
						boxDeepLevel={boxDeepLevel}
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
}) {
	return (
		<>
			<div
				className="box-container"
				style={
					{
						'--boxDeepLevel': props.boxDeepLevel,
						zIndex: props.boxDeepLevel.toString(),
					} as CSSProperties
				}
				onPointerEnter={(event) => {
					event.currentTarget.classList.add('active');
					console.log('___ onPointerEnter', props);
				}}
				onPointerDown={() => {
					console.log('___ onPointerDown', props);
				}}
				onPointerLeave={(event) => {
					event.currentTarget.classList.remove('active');
					console.log('___ onPointerLeave', props);
				}}
			>
				<SectionBox
					box={props.box}
					parentBox={props.parentBox}
					boxDeepLevel={props.boxDeepLevel}
				/>
				{/* <div className="overlay" /> */}
			</div>
			{/* <style jsx>{`
                .box-container > *:not(.overlay) {
                    position: relative;
                }
                .box-container:hover > .overlay {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border: 0.0625rem solid #000;
                    z-index: 9;
                }
            `}</style> */}
		</>
	);
}

const SectionBox = ({
	box,
	parentBox,
	boxDeepLevel,
}: {
	box: Box;
	parentBox?: BoxTypes;
	boxDeepLevel: number;
}) => {
	const newBoxDeepLevel = boxDeepLevel + 1;
	const customPageClassName = cx(
		createBoxTypeClass(box.type),
		handleBoxVariants(box.css.twVariants as BoxVariants),
		...(box.css.custom
			? box.css.custom?.map((key) => customPageClasses[key])
			: []),
	);

	if (box.type === BoxTypes.HEADER && box.headerBox) {
		const HType = (() => {
			if (boxDeepLevel >= 5) return 'h6';

			if (box.headerBox.isMainPageTitle) return 'h1';

			return `h${boxDeepLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
		})();

		return (
			<header className="flex flex-col gap-8">
				{box.headerBox.title && (
					<HType
						className={cx(
							boxDeepLevel === 0 ? 'font-semibold' : '',
							'text-h3 text-text-primary-500',
						)}
					>
						{box.headerBox.title}
					</HType>
				)}
				{box.headerBox.description && <p>{box.headerBox.description}</p>}
				<BoxEditOverlay boxDeepLevel={boxDeepLevel} box={box} />
			</header>
		);
	}

	if (box.type === BoxTypes.IMAGE && box.imageBox)
		return (
			<div className={cx(customPageClassName)}>
				<CustomNextImage
					src={box.imageBox.src}
					width={box.imageBox.width || 800}
					height={box.imageBox.height || 800}
					alt={box.imageBox.altText || ''}
				/>
				<BoxEditOverlay boxDeepLevel={boxDeepLevel} box={box} />
			</div>
		);

	if (box.type === BoxTypes.MD && box.mdBox)
		return (
			<div className={cx(customPageClassName)}>
				<ReactMarkdownFormatter content={box.mdBox.content} />
				<BoxEditOverlay boxDeepLevel={boxDeepLevel} box={box} />
			</div>
		);

	if (box.type === BoxTypes.QUOTE && box.quoteBox)
		return (
			<Quote
				className={cx(customPageClassName)}
				style={{ '--divider': 1 / 3, '--w': '3rem' } as CSSProperties}
				box={box.quoteBox}
				childAfter={<BoxEditOverlay boxDeepLevel={boxDeepLevel} box={box} />}
			/>
		);

	if (box.type === BoxTypes.TABS_HOLDER && box.tabsHolder) {
		return (
			<CustomTabs
				box={box.tabsHolder}
				className={cx(customPageClassName)}
				boxDeepLevel={newBoxDeepLevel}
				childAfter={<BoxEditOverlay boxDeepLevel={boxDeepLevel} box={box} />}
			/>
		);
	}

	if (box.type === BoxTypes.IFRAME) {
		if (box.iframeBox.type === IframeBoxTypes.YOUTUBE)
			return (
				<YouTubeIFrame
					childAfter={<BoxEditOverlay boxDeepLevel={boxDeepLevel} box={box} />}
					containerProps={{
						className: cx(
							'w-full rounded-3xl overflow-hidden relative isolate',
							customPageClassName,
						),
					}}
					youTubeIconVariants={{
						fontSize: parentBox === BoxTypes.SLIDER ? 'small' : 'medium',
					}}
					width={parentBox === BoxTypes.SLIDER ? '200' : '550'}
					height={parentBox === BoxTypes.SLIDER ? '200' : '550'}
					src={box.iframeBox.src}
					title={box.iframeBox.title || 'YouTube video player'}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				/>
			);

		if (box.iframeBox.type === IframeBoxTypes.INSTAGRAM)
			return (
				<InstagramIframe
					childAfter={<BoxEditOverlay boxDeepLevel={boxDeepLevel} box={box} />}
					src={box.iframeBox.src}
					title={box.iframeBox.title}
					className={customPageClassName}
				/>
			);

		if (box.iframeBox.type === IframeBoxTypes.SOUND_CLOUD)
			return (
				<SoundcloudIframe
					childAfter={<BoxEditOverlay boxDeepLevel={boxDeepLevel} box={box} />}
					src={box.iframeBox.src}
					title={box.iframeBox.title}
					className={customPageClassName}
				/>
			);
	}

	if (box.type === BoxTypes.SLIDER && box.sliderBox) {
		return (
			<div className={customPageClassName}>
				<Slider
					// childAfter={<BoxEditOverlay boxDeepLevel={boxDeepLevel} box={box}/>}
					swiperProps={{
						className: cx(
							customPageClassName,
							customPageClasses['swiper'],
							'swiper-fluid',
						),
						breakpoints:
							box.sliderBox.slidesPerViewType ===
							SlidersHolderSlidePerViewType.LARGE_SLIDES
								? {
										640: { slidesPerView: 2 },
										1024: { slidesPerView: 3 },
										1280: { slidesPerView: 4 },
								  }
								: box.sliderBox.slidesPerViewType ===
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
					{box.sliderBox.boxesToSliders.map((boxToSlider) => (
						<SwiperSlide key={boxToSlider.boxId} className="flex flex-col">
							<SectionBoxContainer
								box={boxToSlider.box as Box}
								parentBox={box.type}
								boxDeepLevel={newBoxDeepLevel}
							/>
						</SwiperSlide>
					))}
				</Slider>
				<BoxEditOverlay boxDeepLevel={boxDeepLevel} box={box} />
			</div>
		);
	}

	if (box.type === BoxTypes.GRID && box.gridBox) {
		return (
			<div
				className={customPageClassName}
				style={box.css.inlineStyles as CSSProperties}
			>
				{box.gridBox.boxesToGrids.map((boxToGrid) => (
					<SectionBoxContainer
						key={boxToGrid.boxId}
						box={boxToGrid.box as Box}
						parentBox={box.type}
						boxDeepLevel={newBoxDeepLevel}
					/>
				))}
				<BoxEditOverlay boxDeepLevel={boxDeepLevel} box={box} />
			</div>
		);
	}

	return <></>;
};

export default CustomPageBuilder;
