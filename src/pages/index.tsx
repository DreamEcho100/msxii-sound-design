import { createServerSideHelpers } from '@trpc/react-query/server';
import { type NextPage } from 'next';
import Head from 'next/head';

import HomeScreen from '~/components/screens/Home';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import superjson from 'superjson';
import { api } from '~/utils/api';

const HomePage: NextPage = () => {
	const productsQuery = api.products.getAll.useQuery();
	const getAllBasicCollectionsShopify =
		api.shopify.collections.getAllBasic.useQuery();

	if (getAllBasicCollectionsShopify.isLoading || productsQuery.isLoading)
		return <>Loading...</>;

	if (getAllBasicCollectionsShopify.isError || productsQuery.isError)
		return (
			<>
				{productsQuery.error?.message ||
					getAllBasicCollectionsShopify.error?.message}
			</>
		);

	return (
		<>
			<Head>
				<title>MSXII Sound Design</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<HomeScreen
				products={productsQuery.data || []}
				collectionsBasic={getAllBasicCollectionsShopify.data}
			/>
		</>
	);
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
	await Promise.all([
		ssg.products.getAll.prefetch(),
		ssg.shopify.collections.getAllBasic.prefetch()
	]);
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate()
		},
		revalidate: 10
	};
}

export default HomePage;
