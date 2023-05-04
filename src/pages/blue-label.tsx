import { type InferGetStaticPropsType, type GetStaticProps } from 'next';
import CustomPageBuilder from '~/components/shared/core/CustomPageBuilder/index.tsx';
import { api } from '~/utils/api';
import superjson from 'superjson';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import { ProductsTags } from '~/utils/appData';
import { ProductCard } from '~/components/shared/core/Cards/Card';

// import CustomNextImage from '~/components/shared/CustomNextImage';

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

	// return (
	// 	<div className="border border-solid border-black p-2 m-2 flex w-fit">
	// 		{'_'
	// 			.repeat(7)
	// 			.split('_')
	// 			.map((_, index) =>
	// 				index === 4 ? (
	// 					<></>
	// 				) : (
	// 					<CustomNextImage
	// 						key={index + 1}
	// 						src={`/images/custom-page/credibility/${index + 1}.png`}
	// 						width={192}
	// 						height={192}
	// 						className="object-contain"
	// 					/>
	// 				)
	// 			)}
	// 	</div>
	// );

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
						containerVariants={{ w: '72' }}
					/>
				))}
			</div>
		</CustomPageBuilder>
	);
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const ssg = createServerSideHelpers({
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
