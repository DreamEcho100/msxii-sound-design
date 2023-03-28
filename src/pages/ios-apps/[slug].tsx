// https://www.figma.com/proto/8qpI4blCNb8OlboHpMrIGO/https%3A%2F%2Fwww.surrealmachines.com%2F?node-id=319-43&scaling=scale-down-width&page-id=0%3A1

import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import superjson from 'superjson';
import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType
} from 'next';
import { z } from 'zod';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import { FakeIOSProducts } from '~/utils/appData';
import { api } from '~/utils/api';
import {
	BOXES_TYPE,
	BOXES_TYPES_map,
	Box,
	SUB_BOXES_TYPES_map,
	StandardSection,
	TabsBox
} from '~/utils/types/custom-page';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import customPageClasses from '~/styles/custom-page.module.css';
import { cx } from 'class-variance-authority';
import * as Tabs from '@radix-ui/react-tabs';
import InstagramIframe, { YouTubeIFrame } from '~/components/shared/Iframes';
import Slider from '~/components/shared/core/Cards/Slider';
import { SwiperSlide } from 'swiper/react';

const IOSAppPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const iosAppQuery = api.iosApps.getOneBySlug.useQuery(props.slug);

	if (iosAppQuery.isLoading) return <>Loading...</>;

	if (iosAppQuery.isError) return <>{iosAppQuery.error.message}</>;

	const iosAppData = iosAppQuery.data;

	const pageStructure = iosAppData.pageStructure;

	return (
		<div className="max-w-[100ch] mx-auto py-16 px-16 text-h6 flex flex-col gap-16 text-text-primary-400">
			{pageStructure.map((section, index) => (
				<SectionBody key={index} section={section} />
			))}
		</div>
	);
};

const SectionBody = ({ section }: { section: StandardSection }) => {
	return (
		<section
			className={cx(
				'flex flex-col gap-2',
				...(section.customPageClassesKeys
					? section.customPageClassesKeys.map((key) => customPageClasses[key])
					: [])
			)}
		>
			{!!(section.title || section.description) && (
				<header className="px-2">
					{section.title && (
						<h2 className="text-h4 font-medium">{section.title}</h2>
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
	const customPageClassName = createBoxTypeClass(box.___type);

	if (box.___type === BOXES_TYPES_map['two-columns'])
		return (
			<div className={cx(customPageClassName)}>
				{box.columns.map((column, index) => (
					<SectionBodyBox key={index} box={column} />
				))}
			</div>
		);

	if (box.___type === BOXES_TYPES_map['image-only'])
		return (
			<div className={cx(customPageClassName)}>
				<Image src={box.src} alt="" width={500} height={500} />
			</div>
		);

	if (box.___type === BOXES_TYPES_map['md'])
		return (
			<div className={cx(customPageClassName)}>
				<ReactMarkdown>{box.content}</ReactMarkdown>
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
			return <InstagramIframe src={box.src} />;
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

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: FakeIOSProducts.map((item) => ({
			params: { slug: item.slug }
		})),
		fallback: true
	};
};
export const getStaticProps = async (
	context: GetStaticPropsContext<{ slug: string }>
) => {
	const { slug } = z
		.object({ slug: z.string().trim().min(1) })
		.parse(context.params);

	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson // optional - adds superjson serialization
	});
	/*
	 * Prefetching the `iosApps.getOneBySlug` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await ssg.iosApps.getOneBySlug.prefetch(slug);
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
			slug
		},
		revalidate: 10
	};
};

export default IOSAppPage;
const TabsBox = ({ box, className }: { box: TabsBox; className: string }) => (
	<Tabs.Root
		className={cx('flex flex-col gap-5 leading-7 w-full', className)}
		defaultValue={box.tabs[0]?.title}
	>
		<Tabs.List className="w-full flex gap-4" aria-label="Manage your account">
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
