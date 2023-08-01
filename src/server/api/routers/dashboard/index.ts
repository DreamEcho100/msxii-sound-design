import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, adminProtectedProcedure } from '~/server/api/trpc';
import { updateOneMdBoxSchema } from '~/server/utils/validations-schemas/dashboard/boxes/types/mds';
import { updateOneQuoteBoxSchema } from '~/server/utils/validations-schemas/dashboard/boxes/types/quotes';
import { updateOneHeaderBoxSchema } from '~/server/utils/validations-schemas/dashboard/boxes/types/headers';
import { UpdateOneCustomCssSchema } from '~/server/utils/validations-schemas/dashboard/css/customClasses';
import { UpdateOneTwVariantsSchema } from '~/server/utils/validations-schemas/dashboard/css/twVariants';
import { updateOneImageBoxSchema } from '~/server/utils/validations-schemas/dashboard/boxes/types/images';
import { updateOneIframeBoxSchema } from '~/server/utils/validations-schemas/dashboard/boxes/types/iframes';
import { updateOneSliderSchema } from '~/server/utils/validations-schemas/dashboard/boxes/types/sliders';
import { UpdateOneInlineStyleCssSchema } from '~/server/utils/validations-schemas/dashboard/css/inlineStyles';

export const dashboardRouter = createTRPCRouter({
	pagesCategories: createTRPCRouter({
		getAll: adminProtectedProcedure.query(({ ctx }) => {
			return ctx.drizzleQueryClient.query.pageCategory.findMany();
		}),
		getOne: adminProtectedProcedure
			.input(
				z.object({
					pageCategoryName: z.string().nonempty(),
					slug: z.string().nonempty().optional(),
				}),
			)
			.query(async ({ ctx, input }) => {
				return ctx.drizzleQueryClient.query.pageCategory.findFirst({
					where(fields, operators) {
						return operators.eq(fields.name, input.pageCategoryName);
					},
				});
			}),
	}),
	boxes: createTRPCRouter({
		types: createTRPCRouter({
			mds: createTRPCRouter({
				updateOne: adminProtectedProcedure
					.input(z.object(updateOneMdBoxSchema))
					.mutation(async ({ ctx, input }) => {
						const box = await ctx.drizzleQueryClient.query.mdBox.findFirst({
							where(fields, operators) {
								return operators.eq(fields.id, input.id);
							},
						});

						if (!box) {
							throw new Error('Box not found');
						}

						box.content = input.content;

						await ctx.drizzleQueryClient
							.update(ctx.drizzleSchema.mdBox)
							.set({
								content: input.content,
							})
							.where(eq(ctx.drizzleSchema.mdBox.id, input.id));

						return box;
					}),
			}),
			quotes: createTRPCRouter({
				updateOne: adminProtectedProcedure
					.input(z.object(updateOneQuoteBoxSchema))
					.mutation(async ({ ctx, input }) => {
						const box = await ctx.drizzleQueryClient.query.quoteBox.findFirst({
							where(fields, operators) {
								return operators.eq(fields.id, input.id);
							},
						});

						if (!box) {
							throw new Error('Box not found');
						}

						box.content = input.content ?? box.content;
						box.cite = input.cite ?? box.cite;

						await ctx.drizzleQueryClient
							.update(ctx.drizzleSchema.quoteBox)
							.set({
								content: input.content,
								cite: input.cite,
							})
							.where(eq(ctx.drizzleSchema.quoteBox.id, input.id));

						return box;
					}),
			}),
			headers: createTRPCRouter({
				updateOne: adminProtectedProcedure
					.input(z.object(updateOneHeaderBoxSchema))
					.mutation(async ({ ctx, input }) => {
						const box = await ctx.drizzleQueryClient.query.headerBox.findFirst({
							where(fields, operators) {
								return operators.eq(fields.id, input.id);
							},
						});

						if (!box) {
							throw new Error('Box not found');
						}

						box.title = input.title ?? box.title;
						box.description = input.description ?? box.description;

						await ctx.drizzleQueryClient
							.update(ctx.drizzleSchema.headerBox)
							.set({
								title: input.title,
								description: input.description,
							})
							.where(eq(ctx.drizzleSchema.headerBox.id, input.id));

						return box;
					}),
			}),
			images: createTRPCRouter({
				updateOne: adminProtectedProcedure
					.input(z.object(updateOneImageBoxSchema))
					.mutation(async ({ ctx, input }) => {
						const box = await ctx.drizzleQueryClient.query.imageBox.findFirst({
							where(fields, operators) {
								return operators.eq(fields.id, input.id);
							},
						});

						if (!box) {
							throw new Error('Box not found');
						}

						box.src = input.src ?? box.src;
						box.altText = input.altText ?? box.altText;
						box.width = input.width ?? box.width;
						box.height = input.height ?? box.height;

						await ctx.drizzleQueryClient
							.update(ctx.drizzleSchema.imageBox)
							.set({
								src: input.src,
								altText: input.altText,
								width: input.width,
								height: input.height,
							})
							.where(eq(ctx.drizzleSchema.imageBox.id, input.id));

						return box;
					}),
			}),
			iframes: createTRPCRouter({
				updateOne: adminProtectedProcedure
					.input(z.object(updateOneIframeBoxSchema))
					.mutation(async ({ ctx, input }) => {
						const box = await ctx.drizzleQueryClient.query.iframeBox.findFirst({
							where(fields, operators) {
								return operators.eq(fields.id, input.id);
							},
						});

						if (!box) {
							throw new Error('Box not found');
						}

						box.src = input.src ?? box.src;
						box.title = input.title ?? box.title;
						box.type = input.type ?? box.type;

						await ctx.drizzleQueryClient
							.update(ctx.drizzleSchema.iframeBox)
							.set({
								src: input.src,
								title: input.title,
								type: input.type,
							})
							.where(eq(ctx.drizzleSchema.iframeBox.id, input.id));

						return box;
					}),
			}),
			sliders: createTRPCRouter({
				updateOne: adminProtectedProcedure
					.input(z.object(updateOneSliderSchema))
					.mutation(async ({ ctx, input }) => {
						const box = await ctx.drizzleQueryClient.query.slider.findFirst({
							where(fields, operators) {
								return operators.eq(fields.id, input.id);
							},
						});

						if (!box) {
							throw new Error('Box not found');
						}

						box.slidesPerViewType =
							input.slidesPerViewType ?? box.slidesPerViewType;

						await ctx.drizzleQueryClient
							.update(ctx.drizzleSchema.slider)
							.set({
								slidesPerViewType: input.slidesPerViewType,
							})
							.where(eq(ctx.drizzleSchema.slider.id, input.id));

						return box;
					}),
			}),
			tabs: createTRPCRouter({
				updateOneName: adminProtectedProcedure
					.input(
						z.object({
							boxToTabsId: z.string().cuid(),
							title: z.string().min(3),
						}),
					)
					.mutation(async ({ ctx, input }) => {
						const box = await ctx.drizzleQueryClient.query.boxToTabs.findFirst({
							where(fields, operators) {
								return operators.eq(fields.id, input.boxToTabsId);
							},
						});

						if (!box) {
							throw new Error('Box not found');
						}

						box.title = input.title ?? box.title;

						await ctx.drizzleQueryClient
							.update(ctx.drizzleSchema.boxToTabs)
							.set({
								title: input.title,
							})
							.where(eq(ctx.drizzleSchema.boxToTabs.id, input.boxToTabsId));

						return box;
					}),
			}),
		}),
	}),
	css: createTRPCRouter({
		twVariants: createTRPCRouter({
			setOne: adminProtectedProcedure
				.input(z.object(UpdateOneTwVariantsSchema))
				.mutation(async ({ ctx, input }) => {
					const box = await ctx.drizzleQueryClient.query.css.findFirst({
						where(fields, operators) {
							return operators.eq(fields.id, input.cssId);
						},
					});

					if (!box) {
						throw new Error('CSS not found');
					}

					box.twVariants = input.twVariants;

					await ctx.drizzleQueryClient
						.update(ctx.drizzleSchema.css)
						.set({
							twVariants: input.twVariants,
						})
						.where(eq(ctx.drizzleSchema.css.id, input.cssId));

					return box;
				}),
		}),
		customClasses: createTRPCRouter({
			setOne: adminProtectedProcedure
				.input(z.object(UpdateOneCustomCssSchema))
				.mutation(async ({ ctx, input }) => {
					const box = await ctx.drizzleQueryClient.query.css.findFirst({
						where(fields, operators) {
							return operators.eq(fields.id, input.cssId);
						},
					});

					if (!box) {
						throw new Error('CSS not found');
					}

					// NOTE: Should I allow it to be null?
					box.customClasses = input.customClasses || [];

					await ctx.drizzleQueryClient
						.update(ctx.drizzleSchema.css)
						.set({
							customClasses: input.customClasses,
						})
						.where(eq(ctx.drizzleSchema.css.id, input.cssId));

					return box;
				}),
		}),
		inlineStyles: createTRPCRouter({
			setOne: adminProtectedProcedure
				.input(z.object(UpdateOneInlineStyleCssSchema))
				.mutation(async ({ ctx, input }) => {
					const box = await ctx.drizzleQueryClient.query.css.findFirst({
						where(fields, operators) {
							return operators.eq(fields.id, input.cssId);
						},
					});

					if (!box) {
						throw new Error('CSS not found');
					}

					// NOTE: Should I allow it to be null?
					box.inlineStyles = input.inlineStyles || {};

					await ctx.drizzleQueryClient
						.update(ctx.drizzleSchema.css)
						.set({
							inlineStyles: input.inlineStyles,
						})
						.where(eq(ctx.drizzleSchema.css.id, input.cssId));

					return box;
				}),
		}),
	}),
});
