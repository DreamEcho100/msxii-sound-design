import { gql } from 'graphql-request';
import { Edges } from '../../types';
import { graphQLClient } from '../_utils';
import articles from './articles';

type Blog = {
	//
};

const gqlArticleSchemaText = `handle
id
onlineStoreUrl
content
contentHtml
title`;

// const gqlBlogSchemaText = `title
// articles(first: 100) {
// 	edges {
// 		cursor
// 		node {
// 			${gqlArticleSchemaText}
// 		}
// 	}
// 	pageInfo {
// 		hasNextPage
// 		hasPreviousPage
// 	}
// }`;

const allBlogsQuery = async () => {
	// https://shopify.dev/docs/api/storefront/2023-04/objects/Blog
	const template = gql`
						query {
							articles(first: 100) {
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
		blogs: Edges<Blog>[];
	};
};

const blogs = {
	queries: {
		all: allBlogsQuery,
	},
	articles,
};

export default blogs;
