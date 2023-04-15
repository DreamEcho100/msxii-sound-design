import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { GetStaticProps } from 'next';
import CustomProductScreen from '~/components/shared/core/CustomProductScreen';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import {
	championHoodieMerch as productData,
	merchesData
} from '~/utils/appData/merch';
import superjson from 'superjson';
import CustomPageBuilder from '~/components/shared/core/CustomPageBuilder/index.tsx';
import { api } from '~/utils/api';

// const media = productData.media[0]!;

// const medias = '_'
// 	.repeat(4)
// 	.split('_')
// 	.map(() => media);

const products = merchesData.filter((product) => product.id !== productData.id);

const TempPreviewProductPage = () => {
	const customPageStructureQuery = api.customPages.getOne.useQuery({
		mainTag: 'merch-page',
		slug: productData.handle
	});

	if (customPageStructureQuery.isLoading) return <>Loading...</>;

	if (customPageStructureQuery.isError)
		return <>{customPageStructureQuery.error.message}</>;

	const pageStructure = customPageStructureQuery.data;

	return (
		<CustomProductScreen
			productData={productData}
			products={products}
			cardsSliderProps={{
				cardsSharedProps: { routeBase: '/merch' }
			}}
		>
			<CustomPageBuilder customPage={pageStructure} />
		</CustomProductScreen>
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
	await ssg.customPages.getOne.prefetch({ mainTag: 'merch-page' });
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate()
		},
		revalidate: 10
	};
};

export default TempPreviewProductPage;
