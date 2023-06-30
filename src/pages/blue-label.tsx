import { type InferGetStaticPropsType, type GetStaticProps } from 'next';
import CustomPageBuilder from '~/components/shared/core/CustomPageBuilder';
import { type RouterInputs, api } from '~/utils/api';
import superjson from 'superjson';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import { ProductCard } from '~/components/shared/core/Shopify/Cards/Card';
import Head from 'next/head';

const CreativeSpacePage = (
	props: InferGetStaticPropsType<typeof getStaticProps>
) => {
	const collectionQuery = api.shopify.collections.getOneByHandle.useQuery(
		props.input
	);
	const customPageStructureQuery = api.customPages.getOne.useQuery({
		mainTag: 'blue-label-page'
	});

	if (collectionQuery.isLoading || customPageStructureQuery.isLoading)
		return <>Loading...</>;

	if (collectionQuery.isError || customPageStructureQuery.isError)
		return (
			<>
				{collectionQuery.error?.message ||
					customPageStructureQuery.error?.message}
			</>
		);

	const pageStructure = customPageStructureQuery.data;
	const collectionData = collectionQuery.data;

	return (
		<>
			<Head>
				<title>{collectionData.title}</title>
				<meta name="description" content={collectionData.description} />
			</Head>
			<CustomPageBuilder
				customPage={
					pageStructure
					/*
					{
					stylesVariants: {
						px: '12',
						py: '16',
						'gap-x': '16',
						'gap-y': '16'
					},
					slug: 'blue-label',
					mainTag: 'blue-label-page',
					pageStructure: [
						{
							stylesVariants: { 'gap-y': '16' },
							___type: 'standard-section',
							title: 'Blue Label',
							body: [
								{
									stylesVariants: {
										w: 'full',
										rounded: '3xl',
										'max-w': '100ch',
										mx: 'auto'
									},
									___type: 'image-only',
									src: '/images/blue-label.png'
								},
								{
									___type: 'md',
									content:
										collectionData.description ||
										`Welcome to the MSXII Blue Label.  The MSXII Blue Label is a brand new segment of periodic releases that are completely royalty-free for use. No such follow up or clearance is required. While we have a very clear, concise license use case policy with our compositional based products such as Lofi Melodics, Synthesized Soul, 70's Soul Aesthetics etc, we understand that all end use cases are different. Here's a line & label that requires no questions asked. Use however, whenever, wherever you'd like & generate as much income in your endeavors as possible w/o having to contact our support. Each product will be marked with a "Blue Label" banner in the top left corner of it's product as well as include a .pdf inside its packaging. Most MSXII Blue Label compositional packs will include stems options at checkout or as included in the product. Trap Melodics Vol. 1 kicks this off!`
								}
							]
						}
					]
				}
			*/
				}
			>
				<div
					className="grid gap-x-8 gap-y-12 justify-items-center"
					style={{
						_gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))'
					}}
				>
					{collectionData.products.edges.map(({ node }) => (
						<ProductCard
							key={node.handle}
							product={node}
							containerVariants={{ w: '72' }}
						/>
					))}
				</div>
			</CustomPageBuilder>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson // optional - adds superjson serialization
	});

	const input: RouterInputs['shopify']['collections']['getOneByHandle'] = {
		handle: 'blue-label'
	};
	/*
	 * Prefetching the `customPages.getOneBySlug` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	// const tags = [ProductsTags.FreeLabel];
	await Promise.all([
		// ssg.products.getManyByTags.prefetch({ tags }),
		ssg.shopify.collections.getOneByHandle.prefetch(input),
		ssg.customPages.getOne.prefetch({ mainTag: 'blue-label-page' })
	]);
	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
			// tags,
			input
		},
		revalidate: 10
	};
};

export default CreativeSpacePage;
