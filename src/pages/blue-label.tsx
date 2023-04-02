import { type InferGetStaticPropsType, type GetStaticProps } from 'next';
import CustomPageBuilder from '~/components/shared/core/CustomPageBuilder/index.tsx';
import { api } from '~/utils/api';
import superjson from 'superjson';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import { ProductsTags } from '~/utils/appData';
import { ProductCard } from '~/components/shared/core/Cards/Card';

function duplicateArrayItemsUntilLength<T>(array: T[], length: number): T[] {
	const arrayLength = array.length;
	const quotient = Math.floor(length / arrayLength);
	const remainder = length % arrayLength;
	const duplicatedArray = Array(quotient)
		.fill(null)
		.flatMap(() => array);
	return duplicatedArray.concat(array.slice(0, remainder));
}

const CreativeSpacePage = (
	props: InferGetStaticPropsType<typeof getStaticProps>
) => {
	const customPageStructureQuery = api.customPages.getOne.useQuery({
		mainTag: 'blue-label-page'
	});
	const productsQuery = api.products.getManyByTags.useQuery({
		tags: props.tags
	});

	if (productsQuery.isLoading || customPageStructureQuery.isLoading)
		return <>Loading...</>;

	if (productsQuery.isError || customPageStructureQuery.isError)
		return (
			<>
				{productsQuery.error?.message ||
					customPageStructureQuery.error?.message}
			</>
		);

	const pageStructure = customPageStructureQuery.data;
	const productData = duplicateArrayItemsUntilLength(productsQuery.data, 24);

	return (
		<div className="flex flex-col gap-12">
			<CustomPageBuilder customPage={pageStructure} />

			<div className="flex flex-wrap gap-8 justify-center">
				{productData.map((item) => (
					<ProductCard key={item.handle} product={item as any} />
				))}
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson // optional - adds superjson serialization
	});
	/*
	 * Prefetching the `customPages.getOneBySlug` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	const tags = [ProductsTags.FreeLabel];
	await Promise.all([
		ssg.products.getManyByTags.prefetch({ tags }),
		ssg.customPages.getOne.prefetch({ mainTag: 'blue-label-page' })
	]);
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
			tags
		},
		revalidate: 10
	};
};

export default CreativeSpacePage;
