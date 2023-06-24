import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import {
	getQQLManyArticlesInputSchema,
	getQQLManyBasicArticlesInputSchema
} from '~/utils/shopify/client/gql/blogs/articles';

export const shopifyBlogsRouter = createTRPCRouter({
	// getAll: publicProcedure.query(
	// 	async ({ ctx, input }) => await ctx.shopify.gqlClient.blogs.queries.all()
	// ),
	articles: createTRPCRouter({
		getMany: publicProcedure
			.input(getQQLManyArticlesInputSchema)
			.query(async ({ ctx, input }) => {
				const data = await ctx.shopify.gqlClient.blogs.articles.queries.many(
					input
				);

				let nextCursor: typeof input.cursor | undefined = undefined;
				if (data.articles.pageInfo.hasNextPage) {
					nextCursor =
						data.articles.edges[data.articles.edges.length - 1]!.cursor;
				}

				return {
					items: data.articles.edges,
					nextCursor
				};
			}),
		getManyBasic: publicProcedure
			.input(getQQLManyBasicArticlesInputSchema)
			.query(
				async ({
					ctx,
					input
					// = {
					// 	limit: 100,
					// 	cursor:
					// 		'eyJsYXN0X2lkIjo1NTU4NDMzODc0NTgsImxhc3RfdmFsdWUiOjU1NTg0MzM4NzQ1OH0='
					// }
				}) => {
					const data =
						await ctx.shopify.gqlClient.blogs.articles.queries.manyBasic(input);

					let nextCursor: typeof input.cursor | undefined = undefined;
					console.log('data.articles.pageInfo', data.articles.pageInfo);
					console.log(
						'data.articles.edges[data.articles.edges.length - 1]?.cursor',
						data.articles.edges[data.articles.edges.length - 1]?.cursor
					);
					if (data.articles.pageInfo.hasNextPage) {
						nextCursor =
							data.articles.edges[data.articles.edges.length - 1]!.cursor;
					}

					return {
						items: data.articles.edges,
						nextCursor
					};
				}
			)
	})
});
