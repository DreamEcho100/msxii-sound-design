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
			<section className="px-main-p-4 sm:px-main-p-2 py-main-p-1 flex flex-wrap justify-center md:flex-nowrap gap-8">
				<header className="flex flex-col-reverse items-center sm:items-start sm:flex-row-reverse md:flex-col-reverse gap-4 justify-center p-4">
					<div className="text-center sm:text-align-initial flex-grow flex flex-col items-center sm:items-start gap-4 p-4">
						<div className="flex flex-col gap-3">
							<h1 className="text-h3">{productData.title}</h1>
							<div className="w-fit flex flex-wrap gap-8 mx-auto sm:mx-0">
								<p className="whitespace-nowrap text-text-primary-500/60">
									<ProductPrice
										price={{
											amount: Number(mainVariant.price.amount),
											currencyCode: mainVariant.price.currencyCode
										}}
										compareAtPrice={
											mainVariant.compareAtPrice && {
												amount: Number(mainVariant.compareAtPrice.amount),
												currencyCode: mainVariant.compareAtPrice.currencyCode
											}
										}
									/>
								</p>
								<div className="flex rounded-xl overflow-hidden">
									<Clickable
										variants={{ btn: null, px: null, py: null, rounded: null }}
										className="bg-bg-primary-600 px-2 flex items-center justify-center"
										onClick={() =>
											setSelectedQuantity((prev) =>
												prev === 0 ? prev : prev - 1
											)
										}
										disabled={selectedQuantity === 0}
									>
										<FaMinus className="text-[60%]" />
									</Clickable>
									<input
										className="w-fit px-2"
										style={{
											width: `${selectedQuantity.toString().length + 2}ch`
										}}
										value={selectedQuantity}
										onChange={(event) =>
											setSelectedQuantity((prev) => {
												const valueAsNumberSchema = z
													.number()
													.min(0)
													.finite()
													.safeParse(Number(event.target.value));
												return valueAsNumberSchema.success
													? valueAsNumberSchema.data
													: prev;
												// isNaN(valueAsNumber) ||
												// 	!isFinite(valueAsNumber) ||
												// 	valueAsNumber < 0
												// 	? prev
												// 	: valueAsNumber;
											})
										}
										name="selectedQuantity"
									/>
									<Clickable
										variants={{ btn: null, px: null, py: null, rounded: null }}
										className="bg-bg-primary-600 px-2 flex items-center justify-center"
										onClick={() => setSelectedQuantity((prev) => prev + 1)}
									>
										<FaPlus className="text-[60%]" />
									</Clickable>
								</div>
							</div>
						</div>
						<Clickable className="uppercase" disabled={selectedQuantity === 0}>
							Add To Cart
						</Clickable>
					</div>
					<div className="aspect-square max-w-full w-60 lg:w-96 rounded-lg overflow-hidden">
						<CustomNextImage
							src={productData.featuredImage.url}
							alt={productData.featuredImage.altText}
							width={800}
							height={800}
							className="w-full h-full object-cover"
						/>
					</div>
				</header>
				<div
					className="custom-prose p-4"
					dangerouslySetInnerHTML={{
						__html: productData.descriptionHtml || productData.description
					}}
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
