import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getOneArticleByHandleGQLQueryInputSchema,
  getOneArticleByIdGQLQueryInputSchema,
  getQQLManyArticlesInputSchema,
  getQQLManyBasicArticlesInputSchema,
} from "~/utils/shopify/client/blogs/articles";
// gid://shopify/Article/11589513
export const shopifyBlogsRouter = createTRPCRouter({
  // getAll: publicProcedure.query(
  // 	async ({ ctx, input }) => await ctx.shopify.blogs.queries.all()
  // ),
  articles: createTRPCRouter({
    getOneById: publicProcedure
      .input(getOneArticleByIdGQLQueryInputSchema)
      .query(async ({ ctx, input }) => {
        return (await ctx.shopify.blogs.articles.queries.oneArticleById(input))
          .article;
      }),
    getOneByHandle: publicProcedure
      .input(getOneArticleByHandleGQLQueryInputSchema)
      .query(async ({ ctx, input }) => {
        return (
          await ctx.shopify.blogs.articles.queries.oneArticleByHandle(input)
        ).blogByHandle;
      }),
    getMany: publicProcedure
      .input(getQQLManyArticlesInputSchema)
      .query(async ({ ctx, input }) => {
        const data = await ctx.shopify.blogs.articles.queries.many(input);

        let nextCursor: typeof input.cursor | undefined = undefined;
        if (data.articles.pageInfo.hasNextPage) {
          nextCursor =
            data.articles.edges[data.articles.edges.length - 1]!.cursor;
        }

        return {
          items: data.articles.edges,
          nextCursor,
        };
      }),
    getManyBasic: publicProcedure
      .input(getQQLManyBasicArticlesInputSchema)
      .query(async ({ ctx, input }) => {
        const data = await ctx.shopify.blogs.articles.queries.manyBasic(input);

        let nextCursor: typeof input.cursor | undefined = undefined;
        if (data.articles.pageInfo.hasNextPage) {
          nextCursor =
            data.articles.edges[data.articles.edges.length - 1]!.cursor;
        }

        return {
          items: data.articles.edges,
          nextCursor,
        };
      }),
  }),
});
