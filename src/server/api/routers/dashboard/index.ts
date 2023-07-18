import { lte } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, adminProtectedProcedure } from '~/server/api/trpc';

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
});
