import { createServerSideHelpers } from '@trpc/react-query/server';

import { type InferGetStaticPropsType, type NextPage } from 'next';

import superjson from 'superjson';

import { appRouter } from '~/server/api/root';
import { type RouterInputs, api } from '~/utils/api';
import { createInnerTRPCContext } from '~/server/api/trpc';
import { ProductCard } from '~/components/shared/core/Shopify/Cards/Card';
import CustomPageBuilder from '~/components/shared/core/CustomPageBuilder';
import Head from 'next/head';

const MerchesPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
	props,
) => {
	const collectionQuery = api.shopify.collections.getOneByHandle.useQuery(
		props.input,
	);
	const customPageStructureQuery = api.customPages.getOne.useQuery({
		categoryName: 'merch-page',
	});

	if (collectionQuery.isLoading || customPageStructureQuery.isLoading)
		return <>Loading...</>;

	if (collectionQuery.isError || customPageStructureQuery.isError)
		return (
			<>
				{customPageStructureQuery.error?.message ||
					collectionQuery.error?.message}
			</>
		);

	const collectionData = collectionQuery.data!;
	const merchPageStructure = customPageStructureQuery.data;

	return (
		<>
			<Head>
				<title>{collectionData.title}</title>
				<meta name="description" content={collectionData.description} />
			</Head>
			<CustomPageBuilder customPage={merchPageStructure}>
				<div
					className="grid gap-8 justify-items-center"
					style={{
						gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
					}}
				>
					{collectionData.products.edges.map(({ node }) => (
						<ProductCard
							key={node.handle}
							product={node}
							// routeBase="/merch"
							containerVariants={{ w: null }}
							imageVariants={{ 'object-fit': 'contain' }}
						/>
					))}
				</div>
			</CustomPageBuilder>
		</>
	);
};

export async function getStaticProps() {
	// context: GetStaticPropsContext<undefined>
	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson, // optional - adds superjson serialization
	});

	const input: RouterInputs['shopify']['collections']['getOneByHandle'] = {
		handle: 'merch',
	};
	/*
	 * Prefetching the `shopify.collections.getOneByHandle` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await Promise.all([
		ssg.shopify.collections.getOneByHandle.prefetch(input),
		ssg.customPages.getOne.prefetch({ categoryName: 'merch-page' }),
	]);
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
			input,
		},
		revalidate: 10,
	};
}

export default MerchesPage;
