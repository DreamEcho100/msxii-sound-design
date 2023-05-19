import {
	useState,
	type CSSProperties,
	type HTMLAttributes,
	type ReactNode
} from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { cx } from 'class-variance-authority';
import ReactMarkdown from 'react-markdown';
import { SwiperSlide } from 'swiper/react';
import { handleBoxVariants } from '~/utils/appData';
import {
	BOXES_TYPE,
	BOXES_TYPES_map,
	Box,
	CustomPage,
	QuoteBox,
	SUB_BOXES_TYPES_map,
	StandardSection,
	TabsBox
} from '~/utils/types/custom-page';
import {
	InstagramIframe,
	SoundcloudIframe,
	YouTubeIFrame
} from '~/components/shared/Iframes';
import customPageClasses from '~/styles/custom-page.module.css';
import Slider from '~/components/shared/core/Cards/Slider';
import CustomNextImage from '~/components/shared/CustomNextImage';
import remarkGfm from 'remark-gfm';

type Props = {
	customPage: CustomPage;
	children?: ReactNode;
};

const CustomPageBuilder = (props: Props) => {
	return (
		<div
			className={handleBoxVariants({
				...props.customPage.stylesVariants,
				className: 'text-h6 flex flex-col text-text-primary-400'
			})}
		>
			{props.customPage.pageStructure.map((section, index) => (
				<SectionBody key={index} section={section} sectionIndex={index} />
			))}
			{props.children}
		</div>
	);
};

const TabsBox = ({ box, className }: { box: TabsBox; className: string }) => (
	<Tabs.Root
		className={cx('flex flex-col gap-5 leading-7 w-full', className)}
		defaultValue={box.tabs[0]?.title}
	>
		<Tabs.List
			className="w-full flex gap-4 items-center justify-center md:justify-start md:items-start"
			aria-label="Manage your account"
		>
			{box.tabs.map((tab) => (
				<Tabs.Trigger
					key={tab.title}
					className={cx(
						'text-h4 font-light border-[0.125rem] border-solid border-transparent',
						'data-[state=active]:font-bold data-[state=active]:border-solid data-[state=active]:pb-1 data-[state=active]:border-b-text-primary-400 data-[state=active]:text-text-primary-600'
					)}
					value={tab.title}
				>
					{tab.title}
				</Tabs.Trigger>
			))}
		</Tabs.List>

		{box.tabs.map((tab) => (
			<Tabs.Content key={tab.title} className="" value={tab.title}>
				<SectionBodyBox box={tab.data} />
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
							'group-hover:text-special-primary-400 group-focus-within:text-special-primary-400'
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
									'dark:text-special-primary-600 dark:hover:text-special-primary-400 dark:focus:text-special-primary-400'
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

const ReactMarkdownFormatter = ({ content }: { content: string }) => {
	return (
		<ReactMarkdown
			components={{
				img: ({ node, src, ...props }) => {
					if (!src) return <></>;

					let url: URL;

					if (src.startsWith('/')) {
						url = new URL(`http://localhost:3000${src}`);
					} else url = new URL(src);

					const params = url.searchParams;
					console.log('url', url);
					const className = params.get('className')?.split(',').join(' '); // Outputs: "w40"

					console.log('className', className);

					return (
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						<CustomNextImage
							{...props}
							src={src}
							className={className}
							unoptimized
							width={800}
							height={800}
							onLoadingComplete={(img) => {
								img.width = img.naturalWidth;
								img.height = img.naturalHeight;
							}}
						/>
					);
				}
			}}
			remarkPlugins={[remarkGfm]}
		>
			{content}
		</ReactMarkdown>
	);
};

const SectionBody = ({
	section,
	sectionIndex
}: {
	section: StandardSection;
	sectionIndex: number;
}) => {
	return (
		<section
			className={cx(
				'flex flex-col',
				handleBoxVariants(section.stylesVariants),
				...(section.customPageClassesKeys
					? section.customPageClassesKeys.map((key) => customPageClasses[key])
					: [])
			)}
		>
			{!!(section.title || section.description) && (
				<header className="flex flex-col gap-8">
					{section.title && (
						<h2
							className={cx(
								sectionIndex === 0 ? 'font-semibold' : '',
								'text-h3 text-text-primary-500'
							)}
						>
							{section.title}
						</h2>
					)}
					{section.description && <p>{section.description}</p>}
				</header>
			)}
			{section.body.map((box, index) => {
				return <SectionBodyBox key={index} box={box} />;
			})}
		</section>
	);
};

const createBoxTypeClass = (___type: string) =>
	`${customPageClasses[`${___type}-box`]} ${customPageClasses.box}`;

const SectionBodyBox = ({
	box,
	parentBox
}: {
	box: Box;
	parentBox?: BOXES_TYPE;
}) => {
	const customPageClassName = cx(
		createBoxTypeClass(box.___type),
		handleBoxVariants(box.stylesVariants),
		...(box.customPageClassesKeys
			? box.customPageClassesKeys?.map((key) => customPageClasses[key])
			: [])
	);

	if (box.___type === BOXES_TYPES_map['two-columns'])
		return (
			<div className={cx(customPageClassName)}>
				{box.columns.map((column, index) => (
					<SectionBodyBox key={index} box={column} parentBox={box.___type} />
				))}
			</div>
		);

	if (box.___type === BOXES_TYPES_map['rows-only'])
		return (
			<div className={cx(customPageClassName)}>
				{box.rows.map((row, index) => (
					<SectionBodyBox key={index} box={row} parentBox={box.___type} />
				))}
			</div>
		);

	if (box.___type === BOXES_TYPES_map['image-only'])
		return (
			<div className={cx(customPageClassName)}>
				<CustomNextImage src={box.src} width={500} height={500} />
			</div>
		);

	if (box.___type === BOXES_TYPES_map['md'])
		return (
			<div className={cx(customPageClassName)}>
				<ReactMarkdownFormatter content={box.content} />
			</div>
		);

	if (box.___type === BOXES_TYPES_map['quote'])
		return (
			<Quote
				className={cx(customPageClassName)}
				style={{ '--divider': 1 / 3, '--w': '3rem' } as CSSProperties}
				box={box}
			/>
		);

	if (box.___type === BOXES_TYPES_map['tabs']) {
		return <TabsBox box={box} className={cx(customPageClassName)} />;
	}

	if (box.___type === BOXES_TYPES_map['iframe']) {
		if (box.___subType === SUB_BOXES_TYPES_map['youtube'])
			return (
				<YouTubeIFrame
					containerProps={{
						className: cx(
							'w-full rounded-3xl overflow-hidden relative isolate',
							customPageClassName
						)
					}}
					youTubeIconVariants={{
						fontSize:
							parentBox === BOXES_TYPES_map['slider'] ? 'small' : 'medium'
					}}
					width={parentBox === BOXES_TYPES_map['slider'] ? '200' : '550'}
					height={parentBox === BOXES_TYPES_map['slider'] ? '200' : '550'}
					src={box.src}
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				/>
			);
		if (box.___subType === SUB_BOXES_TYPES_map['instagram'])
			return <InstagramIframe src={box.src} className={customPageClassName} />;
		if (box.___subType === SUB_BOXES_TYPES_map['soundcloud'])
			return <SoundcloudIframe src={box.src} className={customPageClassName} />;
	}

	if (box.___type === BOXES_TYPES_map['slider']) {
		return (
			<div className={customPageClassName}>
				<Slider
					swiperProps={{
						className: cx(
							customPageClassName,
							customPageClasses['swiper'],
							'swiper-fluid'
						),
						breakpoints:
							box.slidesPerViewType === 'large-slides'
								? {
										640: { slidesPerView: 2 },
										1024: { slidesPerView: 3 },
										1280: { slidesPerView: 4 }
								  }
								: box.slidesPerViewType === 'one-slide'
								? { 0: { slidesPerView: 1 } }
								: {
										400: { slidesPerView: 2 },
										768: { slidesPerView: 3 },
										1024: { slidesPerView: 4 },
										1280: { slidesPerView: 5 }
								  }
					}}
				>
					{box.slides.map((slide, index) => (
						<SwiperSlide key={index} className="flex flex-col">
							<SectionBodyBox box={slide} parentBox={box.___type} />
						</SwiperSlide>
					))}
				</Slider>
			</div>
		);
	}

	if (box.___type === BOXES_TYPES_map['grid']) {
		return (
			<div
				className={customPageClassName}
				style={{
					gridTemplateColumns: `repeat(auto-fill, minmax(${
						box.gridTemplateColumns.min1
					}, ${box.gridTemplateColumns.min2 || '1fr'}))`
				}}
			>
				{box.items.map((item, index) => (
					<SectionBodyBox key={index} box={item} parentBox={box.___type} />
				))}
			</div>
		);
	}

	return <></>;
};

export default CustomPageBuilder;
