import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next';
import { z } from 'zod';
import { appRouter } from '~/server/api/root';
import { cx } from 'class-variance-authority';
import { createInnerTRPCContext } from '~/server/api/trpc';
// import { shopifyFakeProductsData } from '~/utils/appData';
import { RouterInputs, api } from '~/utils/api';
import { BasicProductCard } from '~/components/shared/core/Shopify/Cards/Card';
import Head from 'next/head';
import shopify from '~/utils/shopify/client';

const ProductPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const productsQuery = api.shopify.collections.getOneByHandle.useQuery(
		props.input,
	);

	if (productsQuery.isLoading) return <>Loading...</>;

	if (productsQuery.isError) return <>{productsQuery.error.message}</>;

	const productsData = productsQuery.data;

	return (
		<>
			<Head>
				<title>{props.input.handle.replace('-', ' ')}</title>
				{/* <meta name="description" content={productData.description} /> */}
			</Head>
			<section
				className={cx(
					'px-main-p-4 sm:px-main-p-2 py-main-p-1',
					'flex flex-col gap-10',
				)}
			>
				<header className="flex flex-col gap-6 text-center lg:text-align-initial">
					<h1 className="text-h3 font-semibold capitalize">
						{props.input.handle.replace('-', ' ')}
					</h1>
				</header>
				<div className="grid grid-cols-[repeat(auto-fill,_minmax(12rem,_1fr))] gap-8 lg:justify-between lg:flex-nowrap">
					{productsData.products.edges.map(({ node }) => (
						<BasicProductCard
							key={node.handle}
							product={node}
							containerVariants={{ w: null }}
						/>
					))}
				</div>
			</section>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = (await shopify.collections.queries.allHandles()).map(
		(handle) => ({
			params: { handle },
		}),
	);
	return {
		paths,
		fallback: true,
	};
};
export const getStaticProps = async (
	context: GetStaticPropsContext<{ handle: string }>,
) => {
	const { handle } = z
		.object({ handle: z.string().trim().min(1) })
		.parse(context.params);

	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson, // optional - adds superjson serialization
	});

	const input: RouterInputs['shopify']['collections']['getOneByHandle'] = {
		handle,
	};

	/*
	 * Prefetching the `customPages.getOneBySlug` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await ssg.shopify.collections.getOneByHandle.prefetch(input);
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
			input,
		},
		revalidate: 10,
	};
};

export default ProductPage;
