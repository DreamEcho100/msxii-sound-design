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
import { BOXES_TYPES_map, Box, TabsBox } from '~/utils/types/custom-page';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import customPageClasses from '~/styles/custom-page.module.css';
import { cx } from 'class-variance-authority';
import * as Tabs from '@radix-ui/react-tabs';

const IOSAppPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const iosAppQuery = api.iosApps.getOneBySlug.useQuery(props.slug);

	if (iosAppQuery.isLoading) return <>Loading...</>;

	if (iosAppQuery.isError) return <>{iosAppQuery.error.message}</>;

	const iosAppData = iosAppQuery.data;

	const pageStructure = iosAppData.pageStructure;

	return (
		<div className="py-8 px-8 text-h6">
			{pageStructure.map((section, index) => (
				<SectionBody key={index} boxes={section.body} />
			))}
		</div>
	);
};

const SectionBody = ({ boxes }: { boxes: Box[] }) => {
	return (
		<section className="max-w-[90ch] mx-auto">
			{boxes.map((box, index) => {
				return <SectionBodyBox key={index} box={box} />;
			})}
		</section>
	);
};

const SectionBodyBox = ({ box: box }: { box: Box }) => {
	const customPageClassName = customPageClasses[`${box.___type}-box`];
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
		return <TabsBox box={box} />;
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

const TabsBox = ({ box }: { box: TabsBox }) => (
	<Tabs.Root
		className="flex flex-col w-[300px] shadow-[0_2px_10px] shadow-blackA4"
		defaultValue={box.tabs[0]?.title}
	>
		<Tabs.List
			className="shrink-0 flex border-b border-mauve6"
			aria-label="Manage your account"
		>
			{box.tabs.map((tab) => (
				<Tabs.Trigger
					key={tab.title}
					className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
					value={tab.title}
				>
					{tab.title}
				</Tabs.Trigger>
			))}
		</Tabs.List>

		{box.tabs.map((tab) => (
			<Tabs.Content
				key={tab.title}
				className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
				value={tab.title}
			>
				<ReactMarkdown>{tab.data.content}</ReactMarkdown>
			</Tabs.Content>
		))}
	</Tabs.Root>
);
