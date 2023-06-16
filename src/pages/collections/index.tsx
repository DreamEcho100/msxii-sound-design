import type {} from // GetStaticPropsContext,
// InferGetStaticPropsType
'next';
import CollectionsScreen from '~/components/screens/Collections';

import { createServerSideHelpers } from '@trpc/react-query/server';
import { createInnerTRPCContext } from '~/server/api/trpc';
import superjson from 'superjson';
import { appRouter } from '~/server/api/root';
import { RouterInputs, api } from '~/utils/api';

const CollectionsPage = ({
	input
}: {
	input: RouterInputs['shopify']['collections']['getAllBasic'];
}) =>
	// props: InferGetStaticPropsType<typeof getStaticProps>
	{
		const getAllBasicCollectionsShopify =
			api.shopify.collections.getAllBasic.useQuery(input);

		if (getAllBasicCollectionsShopify.isLoading) return <>Loading...</>;

		if (getAllBasicCollectionsShopify.isError)
			return <>{getAllBasicCollectionsShopify.error.message}</>;

		return (
			<CollectionsScreen
				collectionsBasic={getAllBasicCollectionsShopify.data}
			/>
		);
	};

export async function getStaticProps() {
	// context: GetStaticPropsContext<undefined>
	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson // optional - adds superjson serialization
	});

	const input: RouterInputs['shopify']['collections']['getAllBasic'] = {
		productsFirst: 100
	};
	/*
	 * Prefetching the `products.getAll` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await ssg.shopify.collections.getAllBasic.prefetch(input);
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
			input
		},
		revalidate: 10
	};
}

export default CollectionsPage;