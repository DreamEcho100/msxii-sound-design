import {
	useState,
	type CSSProperties,
	type HTMLAttributes,
	type ReactNode,
} from 'react';

import * as Tabs from '@radix-ui/react-tabs';
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

type Page = RouterOutputs['customPages']['_getOne'];
type Section = RouterOutputs['customPages']['_getOne']['sections'][number];
type Box =
	RouterOutputs['customPages']['_getOne']['sections'][number]['body'][number];
type QuoteBox = NonNullable<
	RouterOutputs['customPages']['_getOne']['sections'][number]['body'][number]['quoteBox']
>;
type TabsHolder = NonNullable<
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
				<SectionBody key={index} section={section} boxDeepLevel={0} />
			))}
			{props.children}
		</div>
	);
};

const TabsBox = ({
	box,
	className,
	boxDeepLevel,
}: {
	box: TabsHolder;
	className: string;
	boxDeepLevel: number;
}) => (
	<Tabs.Root
		className={cx('flex flex-col gap-5 leading-7 w-full', className)}
		defaultValue={box.boxesToTabsHolders[0]?.title}
	>
		<Tabs.List
			className="w-full flex gap-4 items-center justify-center md:justify-start md:items-start"
			aria-label="Manage your account"
		>
			{box.boxesToTabsHolders.map((boxToTabsHolder) => (
				<Tabs.Trigger
					key={boxToTabsHolder.tabsHolderId}
					className={cx(
						'text-h4 font-light border-[0.125rem] border-solid border-transparent',
						'data-[state=active]:font-bold data-[state=active]:border-solid data-[state=active]:pb-1 data-[state=active]:border-b-text-primary-400 data-[state=active]:text-text-primary-600',
					)}
					value={boxToTabsHolder.title}
				>
					{boxToTabsHolder.title}
				</Tabs.Trigger>
			))}
		</Tabs.List>

		{box.boxesToTabsHolders.map((boxToTabsHolder) => (
			<Tabs.Content
				key={boxToTabsHolder.boxId}
				className=""
				value={boxToTabsHolder.title}
			>
				<SectionBodyBox
					box={boxToTabsHolder.box as Box}
					boxDeepLevel={boxDeepLevel + 1}
				/>
			</Tabs.Content>
		))}
	</Tabs.Root>
);

const Quote = ({
	box,
	...props
}: HTMLAttributes<HTMLDivElement> & { box: QuoteBox }) => {
	const TEXT_MAX_LENGTH = 200;
	const isTextLong = box.content.length > TEXT_MAX_LENGTH;

	const [isFullTextActive, setIsFullTextActive] = useState(!isTextLong);

	return (
		<div {...props} className={cx(props.className, 'group')}>
			<CustomNextImage
				src={`https://api.dicebear.com/6.x/initials/svg?seed=${box.cite}`}
				alt={box.cite}
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
						{box.cite}
					</strong>
				</cite>
				<q className="text-[70%] flex-grow font-medium">
					<pre
						className="whitespace-pre-wrap inline"
						style={{ fontFamily: 'inherit' }}
					>
						{isFullTextActive
							? box.content
							: box.content.slice(0, TEXT_MAX_LENGTH)}
					</pre>
					{isTextLong && (
						<>
							{isFullTextActive ? (
								<>&nbsp;&nbsp;&nbsp;&nbsp;</>
							) : (
								<>...&nbsp;</>
							)}
							<button
								className={cx(
									'text-[90%] capitalize',
									'text-special-primary-800 hover:text-special-primary-600 focus:text-special-primary-600',
									'dark:text-special-primary-600 dark:hover:text-special-primary-400 dark:focus:text-special-primary-400',
								)}
								onClick={() => setIsFullTextActive((prev) => !prev)}
							>
								<strong className="font-semibold">
									<em>see {isFullTextActive ? 'less' : 'more'}</em>
								</strong>
							</button>
						</>
					)}
				</q>
			</div>
		</div>
	);
};

const SectionBody = ({
	section,
	boxDeepLevel,
}: {
	section: Section;
	boxDeepLevel: number;
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
					<SectionBodyBox
						key={box.id}
						box={box}
						boxDeepLevel={boxDeepLevel + 1}
					/>
				);
			})}
		</section>
	);
};

const createBoxTypeClass = (type: string) =>
	`${customPageClasses[`${type}-BOX`]} ${customPageClasses.box}`;

const SectionBodyBox = ({
	box,
	parentBox,
	boxDeepLevel,
}: {
	box: Box;
	parentBox?: BoxTypes;
	boxDeepLevel: number;
}) => {
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
			// TODO: A way to detect if there is multiple main page titles?
			if (box.headerBox.isMainPageTitle) return 'h1';

			return `h${boxDeepLevel + 1}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
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
					weservNlOptimized={false}
				/>
			</div>
		);

	if (box.type === BoxTypes.MD && box.mdBox)
		return (
			<div className={cx(customPageClassName)}>
				<ReactMarkdownFormatter content={box.mdBox.content} />
			</div>
		);

	if (box.type === BoxTypes.QUOTE && box.quoteBox)
		return (
			<Quote
				className={cx(customPageClassName)}
				style={{ '--divider': 1 / 3, '--w': '3rem' } as CSSProperties}
				box={box.quoteBox}
			/>
		);

	if (box.type === BoxTypes.TABS_HOLDER && box.tabsHolder) {
		return (
			<TabsBox
				box={box.tabsHolder}
				className={cx(customPageClassName)}
				boxDeepLevel={boxDeepLevel}
			/>
		);
	}

	if (box.type === BoxTypes.IFRAME) {
		if (box.iframeBox.type === IframeBoxTypes.YOUTUBE)
			return (
				<YouTubeIFrame
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
					src={box.iframeBox.src}
					title={box.iframeBox.title}
					className={customPageClassName}
				/>
			);

		if (box.iframeBox.type === IframeBoxTypes.SOUND_CLOUD)
			return (
				<SoundcloudIframe
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
							<SectionBodyBox
								box={boxToSlider.box as Box}
								parentBox={box.type}
								boxDeepLevel={boxDeepLevel + 1}
							/>
						</SwiperSlide>
					))}
				</Slider>
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
					<SectionBodyBox
						key={boxToGrid.boxId}
						box={boxToGrid.box as Box}
						parentBox={box.type}
						boxDeepLevel={boxDeepLevel + 1}
					/>
				))}
			</div>
		);
	}

	return <></>;
};

export default CustomPageBuilder;
