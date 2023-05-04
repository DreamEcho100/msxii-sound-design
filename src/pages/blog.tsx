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
	const [currentPageIndex, setCurrentPageIndex] = useState(
		props.blogGetManyInput.cursor ?? 0
	);
	const blogQuery = api.blog.getMany.useInfiniteQuery(props.blogGetManyInput, {
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
	const blogAllSizeQuery = api.blog.getAllSize.useQuery();

	if (blogQuery.isLoading) return <>Loading...</>;

	if (blogQuery.isError) return <>Error</>;

	const pages = blogQuery.data.pages;

	const currentPageItems = pages[currentPageIndex]!;
	const pagesSize = blogAllSizeQuery.data!;

	const disableNextPageButton =
		blogQuery.isFetching ||
		(currentPageIndex === pagesSize - 1 && !blogQuery.hasNextPage);
	const disablePreviousPageButton =
		blogQuery.isFetching || currentPageIndex === 0;

	const canGoTohNextPage = async () => {
		if (disableNextPageButton) return false;
		if (pages.length !== pagesSize)
			if (blogQuery.hasNextPage) {
				await blogQuery.fetchNextPage();
				return true;
			} else return false;

		return true;
	};
	const canGoTohPreviousPage = () => {
		if (disablePreviousPageButton) return false;
		return currentPageIndex !== 0;
	};

	// return <blogScreen blog={blogQuery.data || []} />;
	return (
		<div className="px-main-p-3 sm:px-main-p-1 py-main-p-1 flex flex-col gap-12">
			<header>
				<h1 className="text-h3 font-semibold">MSXII Sound Blog</h1>
			</header>
			<section className="flex flex-col gap-8">
				<header>
					<h2 className="text-h4 text-text-primary-400">News</h2>
				</header>
				<div className="flex flex-wrap gap-8">
					{currentPageItems.items.map((item) => (
						<article
							key={item.id}
							className="w-80 overflow-hidden rounded-lg flex flex-col gap-2 flex-grow"
						>
							<CustomNextImage
								unoptimized
								src={item.image.src}
								width={500}
								height={300}
								className="object-cover aspect-video"
							/>
							<h3 className="text-base font-light">{item.title}</h3>
						</article>
					))}
				</div>
				<footer className="flex flex-col items-center justify-center">
					<div className="flex items-center gap-6 text-h5 text-text-primary-400">
						<Clickable
							variants={null}
							className="flex items-center disabled:text-text-primary-200 disabled:cursor-not-allowed"
							disabled={disablePreviousPageButton}
							onClick={() => {
								if (canGoTohPreviousPage())
									setCurrentPageIndex((prev) => prev - 1);
							}}
						>
							{!disablePreviousPageButton && (
								<>
									<HiOutlineArrowNarrowLeft className="translate-y-[10%]" />
									&nbsp;
								</>
							)}
							Newer
						</Clickable>
						<Clickable
							variants={null}
							className="flex items-center disabled:text-text-primary-200 disabled:cursor-not-allowed"
							disabled={disableNextPageButton}
							onClick={async () => {
								if (await canGoTohNextPage()) {
									setCurrentPageIndex((prev) => prev + 1);
								}
							}}
						>
							Older
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
	 * Prefetching the `blog.getMany` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	const blogGetManyInput: inferRouterInputs<AppRouter>['blog']['getMany'] = {
		cursor: 0
	};
	await Promise.all([
		ssg.blog.getMany.prefetchInfinite(blogGetManyInput),
		ssg.blog.getAllSize.prefetch()
	]);

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
