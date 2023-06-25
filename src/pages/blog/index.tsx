import { createServerSideHelpers } from '@trpc/react-query/server';
import { useState } from 'react';
import { AppRouter, appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import superjson from 'superjson';
import { api } from '~/utils/api';
import { InferGetStaticPropsType } from 'next';
import { inferRouterInputs } from '@trpc/server';
import {
	HiOutlineArrowNarrowLeft,
	HiOutlineArrowNarrowRight
} from 'react-icons/hi';
import Clickable from '~/components/shared/core/Clickable';
import CustomNextImage from '~/components/shared/CustomNextImage';

const BlogPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const [currentPageIndex, setCurrentPageIndex] = useState(0);
	const articlesQuery = api.shopify.blog.articles.getManyBasic.useInfiniteQuery(
		props.blogGetManyInput,
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			keepPreviousData: true
		}
	);

	if (articlesQuery.isLoading) return <>Loading...</>;

	if (articlesQuery.isError) return <>Error</>;

	const pages = articlesQuery.data.pages;
	const pagesLength = pages.length;
	const isOnLastPage = currentPageIndex === pagesLength - 1;

	if (!pages[currentPageIndex]) return <>No articles found</>;

	const currentPageItems = pages[currentPageIndex]!.items;

	// currentPageIndex === pagesSize - 1 &&
	const disableNextPageButton =
		articlesQuery.isFetching || (isOnLastPage && !articlesQuery.hasNextPage); //  || !articlesQuery.hasNextPage;
	const disablePreviousPageButton =
		articlesQuery.isFetching || currentPageIndex === 0;

	const goToNextPage = async () => {
		if (isOnLastPage) {
			if (!articlesQuery.hasNextPage) return;

			await articlesQuery.fetchNextPage();
		}

		setCurrentPageIndex((prev) => prev + 1);
	};
	const goToPreviousPage = async () => {
		if (currentPageIndex === 0) return;

		setCurrentPageIndex((prev) => prev - 1);
	};

	// return <blogScreen blog={articlesQuery.data || []} />;
	return (
		<div className="px-main-p-3 sm:px-main-p-1 py-main-p-1 flex flex-col gap-12">
			<header>
				<h1 className="text-h3 font-semibold">MSXII Sound Blog</h1>
			</header>
			<section className="flex flex-col gap-8">
				<header>
					<h2 className="text-h4 text-text-primary-400 font-semibold">News</h2>
				</header>
				<div
					className="grid gap-x-8 gap-y-12 justify-items-center"
					style={{
						gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))'
					}}
				>
					{currentPageItems.map(({ node }) => (
						<article
							key={node.id}
							className="text-center w-56 flex flex-col gap-4"
						>
							<Clickable
								variants={{ btn: null, px: null, py: null }}
								// className="mx-auto capitalize"
								isA="next-js"
								href={`/blog/${node.id.replace('gid://shopify/Article/', '')}`}
								className="rounded-lg aspect-square overflow-hidden"
							>
								<CustomNextImage
									src={node.image.url}
									alt={node.image.altText || ''}
									width={node.image.width || 300}
									height={node.image.height || 300}
									className="object-cover w-full h-full duration-300 ease-in hover:scale-110"
									priority
								/>
							</Clickable>
							<h3 className="text-[1rem] leading-snug font-light flex-grow">
								<small>{node.title}</small>
							</h3>
							<p>read more</p>
						</article>
					))}
				</div>
				<footer className="flex flex-col items-center justify-center mt-4">
					<div className="flex items-center gap-6 text-h5 text-text-primary-400">
						<Clickable
							variants={null}
							className="flex items-center disabled:text-text-primary-200 disabled:cursor-not-allowed"
							disabled={disablePreviousPageButton}
							onClick={goToPreviousPage}
						>
							{!disablePreviousPageButton && (
								<>
									<HiOutlineArrowNarrowLeft className="translate-y-[10%]" />
									&nbsp;
								</>
							)}
							Older
						</Clickable>
						<Clickable
							variants={null}
							className="flex items-center disabled:text-text-primary-200 disabled:cursor-not-allowed"
							disabled={disableNextPageButton}
							onClick={goToNextPage}
						>
							Newer
							{!disableNextPageButton && (
								<>
									&nbsp;
									<HiOutlineArrowNarrowRight className="translate-y-[10%]" />
								</>
							)}
						</Clickable>
					</div>
				</footer>
			</section>
		</div>
	);
};

export async function getStaticProps() {
	// context: GetStaticPropsContext<undefined>
	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson // optional - adds superjson serialization
	});
	/*
	 * Prefetching the `blog.articles.getManyBasic` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	const blogGetManyInput: inferRouterInputs<AppRouter>['shopify']['blog']['articles']['getManyBasic'] =
		{
			limit: 24
		};
	await ssg.shopify.blog.articles.getManyBasic.prefetchInfinite(
		blogGetManyInput
	);

	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
			blogGetManyInput
		},
		revalidate: 10
	};
}

export default BlogPage;
