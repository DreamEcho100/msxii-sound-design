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
import { RouterInputs, api } from '~/utils/api';
import Head from 'next/head';
import shopifyGQLClient from '~/utils/shopify/client/gql';
import CustomNextImage from '~/components/shared/CustomNextImage';
import { useEffect, useState } from 'react';

const ProductPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const articleByIdQuery = api.shopify.blog.articles.getOneById.useQuery(
		props.input
	);

	const [publishedAt, setPublishedAt] = useState(
		articleByIdQuery.data?.article.publishedAt
			? Intl.DateTimeFormat('en-gd', {
					dateStyle: 'long'
			  }).format(new Date(articleByIdQuery.data.article.publishedAt))
			: ''
	);

	useEffect(() => {
		if (articleByIdQuery.isSuccess) {
			setPublishedAt(
				articleByIdQuery.data.article.publishedAt
					? Intl.DateTimeFormat(undefined, {
							dateStyle: 'long'
					  }).format(new Date(articleByIdQuery.data.article.publishedAt))
					: ''
			);

			if (typeof window === 'undefined') return;
			const articleContentAnchors = document.querySelectorAll(
				'#article-content a'
			) as unknown as HTMLAnchorElement[];

			articleContentAnchors.forEach((item) => {
				item.target = '_blank';
			});
		}
	}, [articleByIdQuery.isSuccess, articleByIdQuery.data?.article.publishedAt]);

	if (articleByIdQuery.isLoading) return <>Loading...</>;

	if (articleByIdQuery.isError) return <>{articleByIdQuery.error.message}</>;

	const articleByIdData = articleByIdQuery.data.article;

	if (!articleByIdData) return <>Product is not found</>;

	return (
		<>
			<Head>
				<title>{articleByIdData.title}</title>
				<meta name="description" content={articleByIdData.excerpt} />
			</Head>
			<section className="px-main-p-4 sm:px-main-p-2 py-main-p-1 flex flex-col items-center justify-center md:flex-nowrap">
				<header className="flex flex-col gap-4 w-full">
					<div className="flex flex-col gap-4 text-center p-8">
						<h1 className="text-h1">{articleByIdData.title}</h1>
						<p>Posted on{publishedAt || articleByIdData.publishedAt}</p>
					</div>
					<CustomNextImage
						src={articleByIdData.image.url}
						alt={articleByIdData.image.altText || ''}
						width={articleByIdData.image.width || 800}
						height={articleByIdData.image.height || 800}
						className="object-cover w-full max-h-[50rem]"
					/>
					<div className="flex flex-col text-center p-8">
						<p>{articleByIdData.authorV2.name}</p>
						<p>
							<a
								href={`mailto:${articleByIdData.authorV2.email}`}
								rel="nofollow noreferrer"
								target="_blank"
							>
								{articleByIdData.authorV2.email}
							</a>
						</p>
						<p>{articleByIdData.authorV2.firstName}</p>
						{articleByIdData.authorV2.bio && (
							<p>{articleByIdData.authorV2.bio}</p>
						)}
					</div>
				</header>
				<section
					id="article-content"
					className="flex flex-col w-full max-w-[120ch] px-4 md:px-8 mx-auto prose lg:prose-xl dark:prose-invert leading-loose prose-lead:leading-loose blog-article"
					dangerouslySetInnerHTML={{
						__html: articleByIdData.contentHtml
					}}
				/>
			</section>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: (
			await shopifyGQLClient.blogs.articles.queries.allIds()
		).articles.edges.map((item) => ({
			params: { id: item.node.id.replace('gid://shopify/Article/', '') }
		})),
		fallback: true
	};
};
export const getStaticProps = async (
	context: GetStaticPropsContext<{ id: string }>
) => {
	const { id } = z
		.object({ id: z.string().trim().min(1) })
		.parse(context.params);

	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: await createInnerTRPCContext({ session: null }),
		transformer: superjson // optional - adds superjson serialization
	});

	const input: RouterInputs['shopify']['blog']['articles']['getOneById'] = `gid://shopify/Article/${id}`;
	/*
	 * Prefetching the `s.shopify.blog.articles` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await ssg.shopify.blog.articles.getOneById.prefetch(input);
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
