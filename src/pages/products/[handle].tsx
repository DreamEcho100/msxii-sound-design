import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType
} from 'next';
import { z } from 'zod';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import { shopifyFakeProductsData } from '~/utils/appData';
import { RouterInputs, api } from '~/utils/api';
import CustomNextImage from '~/components/shared/CustomNextImage';
import ProductPrice from '~/components/shared/core/Shopify/ProductPrice';
import Clickable from '~/components/shared/core/Clickable';
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Head from 'next/head';
import CustomProductScreen from '~/components/shared/core/CustomProductScreen';

const ProductPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const productQuery = api.shopify.products.getOneByHandle.useQuery(
		props.input
	);

	if (productQuery.isLoading) return <>Loading...</>;

	if (productQuery.isError) return <>{productQuery.error.message}</>;

	const productData = productQuery.data;
	const mainVariant = productQuery.data.variants.edges[0]?.node;

	if (!mainVariant) return <>Product is not found</>;

	return (
		<>
			<Head>
				<title>{productData.title}</title>
				<meta name="description" content={productData.description} />
			</Head>
			<CustomProductScreen productData={productData} products={[]} />
		</>
	);
};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: shopifyFakeProductsData.map((item) => ({
			params: { handle: item.handle }
		})),
		fallback: true
	};
};
export const getStaticProps = async (
	context: GetStaticPropsContext<{ handle: string }>
) => {
	const { handle } = z
		.object({ handle: z.string().trim().min(1) })
		.parse(context.params);

	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson // optional - adds superjson serialization
	});

	const input: RouterInputs['shopify']['products']['getOneByHandle'] = {
		handle
	};
	/*
	 * Prefetching the `s.shopify.products.getOneByHandle` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await ssg.shopify.products.getOneByHandle.prefetch(input);
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
			input
		},
		revalidate: 10
	};
};

export default ProductPage;
