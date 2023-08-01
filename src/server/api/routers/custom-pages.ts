import { TRPCError } from '@trpc/server';

import { z } from 'zod';

import { CustomPages } from '~/utils/appData';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const customPagesRouter = createTRPCRouter({
	getAll: publicProcedure.query(() => {
		return CustomPages;
	}),
	getOne: publicProcedure
		.input(
			z.object({
				slug: z.string().optional(),
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
				slug: z.string().optional(),
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
					},
				},
				where(fields, operators) {
					return operators.and(
						operators.eq(fields.pageCategoryName, input.pageCategoryName),
						input.slug ? operators.eq(fields.slug, input.slug) : undefined,
					);
				},
			});

			if (!page) throw new TRPCError({ code: 'NOT_FOUND' });

			return page;
		}),
});
