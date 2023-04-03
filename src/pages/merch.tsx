import { createProxySSGHelpers } from '@trpc/react-query/ssg';

import { type NextPage } from 'next';

import superjson from 'superjson';

import { api } from '~/utils/api';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import { ProductCard } from '~/components/shared/core/Cards/Card';
import CustomPageBuilder from '~/components/shared/core/CustomPageBuilder/index.tsx';

const MerchesPage: NextPage = () => {
	const merchQuery = api.merch.getAll.useQuery();
	const customPageStructureQuery = api.customPages.getOne.useQuery({
		mainTag: 'merch-page'
	});

	if (merchQuery.isLoading || customPageStructureQuery.isLoading)
		return <>Loading...</>;

	if (merchQuery.isError || customPageStructureQuery.isError)
		return (
			<>
				{customPageStructureQuery.error?.message || merchQuery.error?.message}
			</>
		);

	const productData = merchQuery.data!;
	const pageStructure = customPageStructureQuery.data;

	return (
		<CustomPageBuilder customPage={pageStructure}>
			<div
				className="grid gap-8 justify-items-center"
				style={{
					gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))'
				}}
			>
				{productData.map((item) => (
					<ProductCard
						key={item.handle}
						product={item as any}
						routeBase="/merch"
						containerVariants={{ w: null }}
					/>
				))}
			</div>
		</CustomPageBuilder>
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
	 * Prefetching the `merch.getAll` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await Promise.all([
		ssg.merch.getAll.prefetch(),
		ssg.customPages.getOne.prefetch({ mainTag: 'merch-page' })
	]);
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate()
		},
		revalidate: 10
	};
}

export default MerchesPage;
