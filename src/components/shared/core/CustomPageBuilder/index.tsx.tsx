import * as Tabs from '@radix-ui/react-tabs';
import { cx } from 'class-variance-authority';
import ReactMarkdown from 'react-markdown';
import { SwiperSlide } from 'swiper/react';
import { handleBoxVariants } from '~/utils/appData';
import {
	BOXES_TYPE,
	BOXES_TYPES_map,
	Box,
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
import Image from 'next/image';

type Props = {
	pageStructure: StandardSection[];
};

const CustomPageBuilder = (props: Props) => {
	return (
		<div className="max-w-[100ch] mx-auto py-16 px-4 sm:px-16 text-h6 flex flex-col gap-16 text-text-primary-400">
			{props.pageStructure.map((section, index) => (
				<SectionBody key={index} section={section} sectionIndex={index} />
			))}
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
				<header>
					{section.title && (
						<h2
							className={cx(
								sectionIndex === 0 ? 'text-h1' : 'text-h4',
								'font-medium'
							)}
						>
							{section.title}
						</h2>
					)}
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
			<div className={cx(customPageClassName, 'w-40')}>
				<Image src={box.src} alt="" width={500} height={500} />
			</div>
		);

	if (box.___type === BOXES_TYPES_map['md'])
		return (
			<div className={cx(customPageClassName)}>
				<ReactMarkdown
					components={{
						img: ({ node, ...props }) => {
							if (!props.src) return <></>;
							return (
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								<Image
									alt=""
									{...props}
									unoptimized
									width={100}
									height={500}
									onLoadingComplete={(img) => {
										img.width = img.naturalWidth;
										img.height = img.naturalHeight;
									}}
								/>
							);
						}
					}}
				>
					{box.content}
				</ReactMarkdown>
			</div>
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
								: {
										400: { slidesPerView: 2 },
										768: { slidesPerView: 3 },
										1024: { slidesPerView: 4 },
										1280: { slidesPerView: 5 }
								  }
					}}
				>
					{box.slides.map((slide) => (
						<SwiperSlide key={slide.src} className="flex flex-col">
							<SectionBodyBox box={slide} parentBox={box.___type} />
						</SwiperSlide>
					))}
				</Slider>
			</div>
		);
	}

	return <></>;
};

export default CustomPageBuilder;
