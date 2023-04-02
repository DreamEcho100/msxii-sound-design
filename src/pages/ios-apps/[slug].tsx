// https://www.figma.com/proto/8qpI4blCNb8OlboHpMrIGO/https%3A%2F%2Fwww.surrealmachines.com%2F?node-id=319-43&scaling=scale-down-width&page-id=0%3A1

import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType
} from 'next';
import { z } from 'zod';
import { CustomPages } from '~/utils/appData';
import { api } from '~/utils/api';
import CustomPageBuilder from '~/components/shared/core/CustomPageBuilder/index.tsx';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/api/root';
import superjson from 'superjson';
import { createInnerTRPCContext } from '~/server/api/trpc';

const IOSAppPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const customPageStructureQuery = api.customPages.getOne.useQuery({
		slug: props.slug
	});

	if (customPageStructureQuery.isLoading) return <>Loading...</>;

	if (customPageStructureQuery.isError)
		return <>{customPageStructureQuery.error.message}</>;

	const iosAppData = customPageStructureQuery.data;

	const pageStructure = iosAppData.pageStructure;

	return <CustomPageBuilder customPage={pageStructure} />;
};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: CustomPages.filter(
			(item) => item.mainTag === 'ios-app-sub-page'
		).map((item) => ({
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
	 * Prefetching the `customPages.getOneBySlug` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await ssg.customPages.getOne.prefetch({ slug });
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
