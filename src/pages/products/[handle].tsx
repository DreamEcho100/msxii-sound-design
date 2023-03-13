import { createProxySSGHelpers } from '@trpc/react-query/ssg';
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
import { api } from '~/utils/api';
import Image from 'next/image';
import ProductPrice from '~/components/shared/core/ProductPrice';
import Clickable from '~/components/shared/core/Clickable';

const ProductPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const productQuery = api.products.getOneByHandle.useQuery(props.handle);

	const productData = productQuery.data as NonNullable<
		typeof productQuery.data
	>;

	if (productQuery.isLoading) return <>Loading...</>;

	if (productQuery.isError) return <>{productQuery.error.message}</>;

	return (
		<>
			{/* <pre>
				<code>{JSON.stringify(productData, null, 2)}</code>
			</pre> */}
			<section className="px-main-p-4 sm:px-main-p-2 py-main-p-1 flex flex-wrap justify-center md:flex-nowrap gap-8">
				<header className="flex flex-col-reverse items-center sm:items-start sm:flex-row-reverse md:flex-col-reverse gap-4 justify-center p-4">
					<div className="text-center sm:text-align-initial flex-grow flex flex-col items-center sm:items-start gap-4 p-4">
						<div className="flex flex-col gap-3">
							<h1 className="text-h3">{productData.title}</h1>
							<p className="whitespace-nowrap text-text-primary-500/60">
								<ProductPrice
									price={productData.price}
									compare_at_price={productData.compare_at_price}
								/>
							</p>
						</div>
						<Clickable className="capitalize">Add To Cart</Clickable>
					</div>
					<div className="aspect-square max-w-full w-60 lg:w-96 rounded-lg overflow-hidden">
						<Image
							src={productData.featured_image}
							alt=""
							width={800}
							height={800}
							className="w-full h-full object-cover"
						/>
					</div>
				</header>
				<div
					className="custom-prose p-4"
					dangerouslySetInnerHTML={{ __html: productData.description }}
				></div>
			</section>
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

	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson // optional - adds superjson serialization
	});
	/*
	 * Prefetching the `products.getOneByHandle` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await ssg.products.getOneByHandle.prefetch(handle);
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
			handle
		},
		revalidate: 10
	};
};

export default ProductPage;
