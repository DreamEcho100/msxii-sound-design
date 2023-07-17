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
				category: z.string().optional(),
			}),
		)
		.query(({ input }) => {
			if (!input.slug && !input.category)
				throw new TRPCError({ code: 'BAD_REQUEST' });

			const product = CustomPages.find(
				(item) =>
					(typeof input.slug === 'undefined' || item.slug === input.slug) &&
					(typeof input.category === 'undefined' ||
						item.category === input.category),
			);

			if (!product) throw new TRPCError({ code: 'NOT_FOUND' });

			return product;
		}),
	_getOne: publicProcedure
		.input(
			z.object({
				slug: z.string().optional(),
				category: z.string().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const page = await ctx.drizzleQueryClient.query.page.findFirst({
				with: {
					css: true,
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

									tabsHolder: {
										with: {
											boxesToTabsHolders: {
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
									sliderBox: {
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
									gridBox: {
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
								orderBy(fields, operators) {
									return operators.asc(fields.order);
								},
							},
						},
					},
				},
				where(fields, operators) {
					return operators.and(
						input.slug ? operators.eq(fields.slug, input.slug) : undefined,
						input.category
							? operators.eq(fields.category, input.category)
							: undefined,
					);
				},
			});

			if (!page) throw new TRPCError({ code: 'NOT_FOUND' });

			return page;
		}),
});
