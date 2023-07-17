import { createTRPCRouter, adminProtectedProcedure } from '~/server/api/trpc';

export const dashboardRouter = createTRPCRouter({
	getAllCategories: adminProtectedProcedure.query(({ ctx }) => {
		return ctx.drizzleQueryClient.query.category.findMany();
	}),
});
