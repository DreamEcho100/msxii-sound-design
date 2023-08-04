import { type InferGetStaticPropsType, type NextPage } from 'next';
import { type GetStaticPropsContext } from 'next';

// import { api } from '~/utils/api';
import superjson from 'superjson';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from '~/server/api/root';
import { z } from 'zod';
import { createInnerTRPCContext } from '~/server/api/trpc';

import CustomPageScreen from '~/components/shared/core/CustomPageScreen';
import drizzleQueryClient from '~/server/utils/drizzle/db/queryClient';

const DashboardCustomPageProfilePage: NextPage<
	InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
	return <CustomPageScreen pageParams={props.pageParams} />;
};

export async function getStaticPaths() {
	return {
		paths: (
			await drizzleQueryClient.query.pageCategory.findMany({
				columns: { name: true },
			})
		).map((item) => ({ params: { pageCategoryName: item.name } })),
		fallback: true,
	};
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
	const pageParams = z
		.object({ pageCategoryName: z.string().nonempty() })
		.parse(ctx.params);

	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: createInnerTRPCContext({}),
		transformer: superjson, // optional - adds superjson serialization
	});
	/*
	 * Prefetching the `customPages.getOneBySlug` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await Promise.all([
		ssg.customPages.getOne.prefetch(pageParams),
		ssg.customPages.pagesCategories.getManyItems.fetchInfinite(pageParams),
	]);
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
			pageParams,
		},
		revalidate: 60,
	};
};

export default DashboardCustomPageProfilePage;
