import { type GetStaticProps } from 'next';
import CustomPageBuilder from '~/components/shared/core/CustomPageBuilder';
import { api } from '~/utils/api';
import superjson from 'superjson';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';

const SupportPage = () => {
	const customPageStructureQuery = api.customPages.getOne.useQuery({
		categoryName: 'support-page',
	});

	if (customPageStructureQuery.isLoading) return <>Loading...</>;

	if (customPageStructureQuery.isError)
		return <>{customPageStructureQuery.error.message}</>;

	const pageStructure = customPageStructureQuery.data;

	return <CustomPageBuilder customPage={pageStructure} />;
};

export const getStaticProps: GetStaticProps = async () => {
	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson, // optional - adds superjson serialization
	});
	/*
	 * Prefetching the `customPages.getOneBySlug` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await ssg.customPages.getOne.prefetch({ categoryName: 'support-page' });
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 10,
	};
};

export default SupportPage;
