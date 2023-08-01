import { TRPCError } from '@trpc/server';

import { z } from 'zod';

import { CustomPages } from '~/utils/appData';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { isNull, lte } from 'drizzle-orm';

export const customPagesRouter = createTRPCRouter({
	getAll: publicProcedure.query(() => {
		return CustomPages;
	}),
	getOne: publicProcedure
		.input(
			z.object({
				slug: z.string().nullable().optional(),
				pageCategoryName: z.string().optional(),
			}),
		)
		.query(({ input }) => {
			if (!input.slug && !input.pageCategoryName)
				throw new TRPCError({ code: 'BAD_REQUEST' });

			const product = CustomPages.find(
				(item) =>
					(typeof input.slug === 'undefined' || item.slug === input.slug) &&
					(typeof input.pageCategoryName === 'undefined' ||
						item.pageCategoryName === input.pageCategoryName),
			);

			if (!product) throw new TRPCError({ code: 'NOT_FOUND' });

			return product;
		}),
	_getOne: publicProcedure
		.input(
			z.object({
				slug: z.string().nullable().optional(),
				pageCategoryName: z.string().nonempty(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const page = await ctx.drizzleQueryClient.query.page.findFirst({
				with: {
					css: true,
					pageCategory: true,
					image: true,
					sections: {
						with: {
							css: true,
							body: {
								with: {
									css: true,
									headerBox: true,
									mdBox: true,
									imageBox: true,
									iframeBox: true,
									quoteBox: true,
									//

									tabs: {
										with: {
											boxesToTabs: {
												with: {
													box: {
														with: {
															css: true,
															headerBox: true,
															mdBox: true,
															imageBox: true,
															iframeBox: true,
															quoteBox: true,
															//
															grid: {
																with: {
																	boxesToGrids: {
																		with: {
																			box: {
																				with: {
																					css: true,
																					headerBox: true,
																					mdBox: true,
																					imageBox: true,
																					iframeBox: true,
																					quoteBox: true,
																				},
																			},
																		},
																		orderBy(fields, operators) {
																			return operators.asc(fields.order);
																		},
																	},
																},
															},
														},
													},
												},
												orderBy(fields, operators) {
													return operators.asc(fields.order);
												},
											},
										},
									},
									slider: {
										with: {
											boxesToSliders: {
												with: {
													box: {
														with: {
															css: true,
															headerBox: true,
															mdBox: true,
															imageBox: true,
															iframeBox: true,
															quoteBox: true,
														},
													},
												},
												orderBy(fields, operators) {
													return operators.asc(fields.order);
												},
											},
										},
									},
									grid: {
										with: {
											boxesToGrids: {
												with: {
													box: {
														with: {
															css: true,
															headerBox: true,
															mdBox: true,
															imageBox: true,
															iframeBox: true,
															quoteBox: true,
															//
															grid: {
																with: {
																	boxesToGrids: {
																		with: {
																			box: {
																				with: {
																					css: true,
																					headerBox: true,
																					mdBox: true,
																					imageBox: true,
																					iframeBox: true,
																					quoteBox: true,
																				},
																			},
																		},
																		orderBy(fields, operators) {
																			return operators.asc(fields.order);
																		},
																	},
																},
															},
														},
													},
												},
												orderBy(fields, operators) {
													return operators.asc(fields.order);
												},
											},
										},
									},
								},
								orderBy(fields, operators) {
									return operators.asc(fields.order);
								},
							},
						},
						orderBy(fields, operators) {
							return operators.asc(fields.order);
						},
					},
				},
				where(fields, operators) {
					return operators.and(
						operators.eq(fields.pageCategoryName, input.pageCategoryName),
						input.slug
							? operators.eq(fields.slug, input.slug)
							: isNull(fields.slug),
					);
				},
			});

			if (!page) throw new TRPCError({ code: 'NOT_FOUND' });

			return page;
		}),
	pagesCategories: createTRPCRouter({
		getManyItems: publicProcedure
			.input(
				z.object({
					pageCategoryName: z.string().nonempty(),
					limit: z.number().min(1).max(100).optional().default(20),
					cursor: z.date().nullish(), // <-- "cursor" needs to exist, but can be any type
				}),
			)
			.query(async ({ ctx, input }) => {
				const limit = input.limit + 1;

				const items = await ctx.drizzleQueryClient.query.page.findMany({
					where(fields, operators) {
						return operators.and(
							operators.eq(fields.pageCategoryName, input.pageCategoryName),
							input.cursor ? lte(fields.createdAt, input.cursor) : undefined,
						);
					},
					orderBy(fields, operators) {
						return operators.desc(fields.createdAt);
					},
					limit,
					with: {
						image: true,
						pageCategory: true,
					},
				});

				let nextCursor: typeof input.cursor | undefined = undefined;

				if (items.length > limit) {
					const nextItem = items.pop();
					nextCursor = nextItem!.createdAt;
				}

				return {
					items,
					nextCursor,
				};
			}),
	}),
});
