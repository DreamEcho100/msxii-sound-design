// https://www.figma.com/proto/8qpI4blCNb8OlboHpMrIGO/https%3A%2F%2Fwww.surrealmachines.com%2F?node-id=319-43&scaling=scale-down-width&page-id=0%3A1

import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next';
import { z } from 'zod';
import { CustomPages } from '~/utils/appData';
import { api } from '~/utils/api';
import { CustomPageBuilder_ } from '~/components/shared/core/CustomPageBuilder';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from '~/server/api/root';
import superjson from 'superjson';
import { createInnerTRPCContext } from '~/server/api/trpc';

const IOSAppPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const customPageStructureQuery = api.customPages._getOne.useQuery(
		props.input,
	);

	if (customPageStructureQuery.isLoading) return <>Loading...</>;

	if (customPageStructureQuery.isError)
		return <>{customPageStructureQuery.error.message}</>;

	const page = customPageStructureQuery.data;

	return <CustomPageBuilder_ page={page} />;
};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: CustomPages.filter(
			(item) => item.categoryName === 'ios-app-page',
		).map((item) => ({
			params: { slug: item.slug },
		})),
		fallback: true,
	};
};
export const getStaticProps = async (
	context: GetStaticPropsContext<{ slug: string }>,
) => {
	const { slug } = z
		.object({ slug: z.string().trim().min(1) })
		.parse(context.params);

	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson, // optional - adds superjson serialization
	});

	const input = {
		slug: `/ios-apps/${slug}`,
	};
	/*
	 * Prefetching the `customPages.getOneBySlug` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await ssg.customPages._getOne.prefetch(input);
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
			input,
		},
		revalidate: 10,
	};
};

export default IOSAppPage;
