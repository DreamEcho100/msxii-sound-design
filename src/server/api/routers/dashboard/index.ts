import { eq, lte } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, adminProtectedProcedure } from '~/server/api/trpc';
import { updateMdBoxSchema } from '~/server/utils/validations-schemas/dashboard/boxes/types/md';

export const dashboardRouter = createTRPCRouter({
	categories: createTRPCRouter({
		getAll: adminProtectedProcedure.query(({ ctx }) => {
			return ctx.drizzleQueryClient.query.category.findMany();
		}),
		getManyItems: adminProtectedProcedure
			.input(
				z.object({
					categoryName: z.string().nonempty(),
					limit: z.number().min(1).max(100).optional().default(20),
					cursor: z.date().nullish(), // <-- "cursor" needs to exist, but can be any type
				}),
			)
			.query(async ({ ctx, input }) => {
				const limit = input.limit + 1;

				const items = await ctx.drizzleQueryClient.query.page.findMany({
					where(fields, operators) {
						return operators.and(
							operators.eq(fields.categoryName, input.categoryName),
							input.cursor ? lte(fields.createdAt, input.cursor) : undefined,
						);
					},
					orderBy(fields, operators) {
						return operators.desc(fields.createdAt);
					},
					limit,
					with: {
						image: true,
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
	boxes: createTRPCRouter({
		types: createTRPCRouter({
			md: createTRPCRouter({
				updateOne: adminProtectedProcedure
					.input(z.object(updateMdBoxSchema))
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
		}),
	}),
});
