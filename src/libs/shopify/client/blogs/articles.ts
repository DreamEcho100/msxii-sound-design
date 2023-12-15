import { gql } from "graphql-request";
import {
  type Article,
  type EdgesWithPagination,
  type Edges,
} from "../../types";
import { graphQLClient } from "../_utils";
import { z } from "zod";
import { buildGQLArgsString, gqlImageText, gqlSEOText } from "../utils";

const gqlBasicArticleSchemaText = `handle
id
onlineStoreUrl
excerpt
title
publishedAt
tags
image { ${gqlImageText} }
authorV2 {
	bio
	email
	firstName
	lastName
	name
}
blog {
	id
	handle
	title
}`;
const gqlArticleSchemaText = `handle
id
onlineStoreUrl
content
contentHtml
excerpt
excerptHtml
title
publishedAt
tags
image { ${gqlImageText} }
seo { ${gqlSEOText} }
authorV2 {
	bio
	email
	firstName
	lastName
	name
}
blog {
	id
	handle
	title
}`;

export const getQQLManyArticlesInputSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
});
const getManyArticlesGQLQuery = async (
  input: z.infer<typeof getQQLManyArticlesInputSchema>,
) => {
  const argsMap = {
    first: input.limit,
    after: input.cursor && `"${input.cursor}"`,
  };

  // https://shopify.dev/docs/api/storefront/2023-10/objects/Article
  const template = gql`
						query {
							articles(${buildGQLArgsString(argsMap)}) {
								edges {
									cursor
									node {
										${gqlArticleSchemaText}
									}
								}
								pageInfo {
									hasNextPage
									hasPreviousPage
								}
							}
						}
					`;

  return await graphQLClient.request<{
    articles: EdgesWithPagination<Article>;
  }>(template);
};

export const getQQLManyBasicArticlesInputSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  reverse: z.boolean().nullish().default(true),
  cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
});
const getManyBasicArticlesGQLQuery = async (
  input: z.infer<typeof getQQLManyBasicArticlesInputSchema>,
) => {
  const argsMap = {
    first: input.limit,
    reverse: input.reverse,
    after: input.cursor && `"${input.cursor}"`,
    sortKey: "PUBLISHED_AT",
  };

  // https://shopify.dev/docs/api/storefront/2023-10/objects/Article
  const template = gql`
						query {
							articles(${buildGQLArgsString(argsMap)}) {
								edges {
									cursor
									node {
										${gqlBasicArticleSchemaText}
									}
								}
								pageInfo {
									hasNextPage
									hasPreviousPage
								}
							}
						}
					`;

  return await graphQLClient.request<{
    articles: EdgesWithPagination<Article>;
  }>(template);
};
const geAllIdsAndHandlesGQLQuery = async () => {
  // https://shopify.dev/docs/api/storefront/2023-10/objects/Article
  const template = gql`
    query {
      articles(first: 250) {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `;

  return await graphQLClient.request<{
    articles: Edges<Pick<Article, "id" | "handle">>;
  }>(template);
};

export const getOneArticleByIdGQLQueryInputSchema = z.string().min(1);
const getOneArticleByIdGQLQuery = async (
  input: z.infer<typeof getOneArticleByIdGQLQueryInputSchema>,
) => {
  // https://shopify.dev/docs/api/storefront/2023-10/objects/Article
  const template = gql`
		query {
			article(id: "${input}") {
				${gqlArticleSchemaText}
			}
		}
	`;

  return await graphQLClient.request<{
    article: Article;
  }>(template);
};

export const getOneArticleByHandleGQLQueryInputSchema = z.string().min(1);
const getOneArticleByHandleGQLQuery = async (
  input: z.infer<typeof getOneArticleByHandleGQLQueryInputSchema>,
) => {
  // https://shopify.dev/docs/api/storefront/2023-10/objects/Article
  const template = gql`
		query {
			blogByHandle(handle: "${input}") {
				${gqlArticleSchemaText}
			}
		}
	`;

  return await graphQLClient.request<{
    blogByHandle: Article;
  }>(template);
};

const articles = {
  queries: {
    many: getManyArticlesGQLQuery,
    manyBasic: getManyBasicArticlesGQLQuery,
    allIdsAndHandles: geAllIdsAndHandlesGQLQuery,
    oneArticleById: getOneArticleByIdGQLQuery,
    oneArticleByHandle: getOneArticleByHandleGQLQuery,
  },
};

export default articles;
