import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { type NextPage } from 'next';

import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import superjson from 'superjson';
import { api } from '~/utils/api';
import { ProductCard } from '~/components/shared/core/Cards/Card';

const MerchesPage: NextPage = () => {
	const merchesQuery = api.merches.getAll.useQuery();

	if (merchesQuery.isLoading) return <>Loading...</>;

	if (merchesQuery.isError) return <>{merchesQuery.error.message}</>;

	const productData = merchesQuery.data!;

	return (
		<section className="flex flex-col gap-20 justify-center px-main-p-3 sm:px-main-p-1 py-main-p-1">
			<header className="sm:px-16 md:px-28">
				<h1 className="text-h3">Merch</h1>
			</header>
			<div className="flex flex-wrap gap-8 justify-center">
				{productData.map((item) => (
					<ProductCard
						key={item.handle}
						product={item as any}
						routeBase="/merches"
					/>
				))}
			</div>
		</section>
	);
};

export async function getStaticProps() {
	// context: GetStaticPropsContext<undefined>
	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson // optional - adds superjson serialization
	});
	/*
	 * Prefetching the `merches.getAll` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await ssg.merches.getAll.prefetch();
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate()
		},
		revalidate: 10
	};
}

export default MerchesPage;
