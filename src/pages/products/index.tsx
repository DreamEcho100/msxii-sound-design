import type {} from // GetStaticPropsContext,
// InferGetStaticPropsType
'next';
import ProductsScreen from '~/components/screens/Products';

import { createServerSideHelpers } from '@trpc/react-query/server';
import { createInnerTRPCContext } from '~/server/api/trpc';
import superjson from 'superjson';
import { appRouter } from '~/server/api/root';
import { api } from '~/utils/api';

const ProductsPage = () =>
	// props: InferGetStaticPropsType<typeof getStaticProps>
	{
		const productsQuery = api.products.getAll.useQuery();

		return <ProductsScreen products={productsQuery.data || []} />;
	};

export async function getStaticProps() {
	// context: GetStaticPropsContext<undefined>
	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson // optional - adds superjson serialization
	});
	/*
	 * Prefetching the `products.getAll` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await ssg.products.getAll.prefetch();
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate()
		},
		revalidate: 10
	};
}

export default ProductsPage;
