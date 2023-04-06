import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { cx } from 'class-variance-authority';
import { GetStaticProps } from 'next';
import superjson from 'superjson';
import CustomNextImage from '~/components/shared/CustomNextImage';
import { ProductCard } from '~/components/shared/core/Cards/Card';
import Clickable from '~/components/shared/core/Clickable';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import { api } from '~/utils/api';
import { ProductsTags } from '~/utils/appData';

const IOSAppsPage = () => {
	const productsQuery = api.products.getManyByTags.useQuery({
		tags: [ProductsTags['Vinyl']]
	});

	if (productsQuery.isLoading) return <>Loading...</>;

	if (productsQuery.isError) return <>{productsQuery.error.message}</>;

	const productsData = productsQuery.data;

	return (
		<section
			className={cx(
				'px-main-p-4 sm:px-main-p-2 py-main-p-1',
				'flex flex-col gap-10'
			)}
		>
			<header className="flex flex-col gap-6 text-center lg:text-align-initial">
				<h1 className="text-h3 font-semibold">Vinyl</h1>
			</header>
			<div className="grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-8 lg:justify-between lg:flex-nowrap">
				{productsData.map((item) => (
					<ProductCard
						key={item.handle}
						product={item as any}
						routeBase="/merch"
						containerVariants={{ w: null }}
					/>
				))}
			</div>
		</section>
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
	await ssg.products.getManyByTags.prefetch({ tags: [ProductsTags['Vinyl']] });
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate()
		},
		revalidate: 10
	};
};

export default IOSAppsPage;
