import { gql } from 'graphql-request';
import {
	type Article,
	type EdgesWithPagination,
	type Edges
} from '../../../types';
import { graphQLClient } from '../../utils';
import { z } from 'zod';
import { buildGQLArgsString, gqlImageText, gqlSEOText } from '../utils';

const gqlBasicArticleSchemaText = `handle
id
onlineStoreUrl
excerpt
excerptHtml
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
	cursor: z.string().nullish() // <-- "cursor" needs to exist, but can be any type
});
const getManyArticlesGQLQuery = async (
	input: z.infer<typeof getQQLManyArticlesInputSchema>
) => {
	const argsMap = {
		first: input.limit,
		after: input.cursor && `"${input.cursor}"`
	};

	// https://shopify.dev/docs/api/storefront/2023-04/objects/Article
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

	return (await graphQLClient.request(template)) as {
		articles: EdgesWithPagination<Article>;
	};
};

export const getQQLManyBasicArticlesInputSchema = z.object({
	limit: z.number().min(1).max(100).nullish(),
	cursor: z.string().nullish() // <-- "cursor" needs to exist, but can be any type
});
const getManyBasicArticlesGQLQuery = async (
	input: z.infer<typeof getQQLManyBasicArticlesInputSchema>
) => {
	const argsMap = {
		first: input.limit,
		after: input.cursor && `"${input.cursor}"`
	};

	// https://shopify.dev/docs/api/storefront/2023-04/objects/Article
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

	return (await graphQLClient.request(template)) as {
		articles: EdgesWithPagination<Article>;
	};
};
const geAllArticlesIdsGQLQuery = async () => {
	// https://shopify.dev/docs/api/storefront/2023-04/objects/Article
	const template = gql`
		query {
			articles(first: 250) {
				edges {
					node {
						id
					}
				}
			}
		}
	`;

	return (await graphQLClient.request(template)) as {
		articles: Edges<Pick<Article, 'id'>>;
	};
};

export const getOneArticleByIdGQLQueryInputSchema = z.string().min(1);
const getOneArticleByIdGQLQuery = async (
	input: z.infer<typeof getOneArticleByIdGQLQueryInputSchema>
) => {
	// https://shopify.dev/docs/api/storefront/2023-04/objects/Article
	const template = gql`
		query {
			article(id: "${input}") {
				${gqlArticleSchemaText}
			}
		}
	`;

	return (await graphQLClient.request(template)) as {
		article: Article;
	};
};

const articles = {
	queries: {
		many: getManyArticlesGQLQuery,
		manyBasic: getManyBasicArticlesGQLQuery,
		allIds: geAllArticlesIdsGQLQuery,
		oneArticleById: getOneArticleByIdGQLQuery
	}
};

export default articles;
