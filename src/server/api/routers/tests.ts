import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const testsRouter = createTRPCRouter({
	1: publicProcedure.query(async ({ ctx }) => {
		const test1 = await ctx.drizzleQueryClient.query.page.findMany({
			with: {
				css: true,
				sections: {
					with: {
						css: true,
						body: {
							with: {
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
														headerBox: true,
														mdBox: true,
														imageBox: true,
														iframeBox: true,
														quoteBox: true,
													},
												},
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
														headerBox: true,
														mdBox: true,
														imageBox: true,
														iframeBox: true,
														quoteBox: true,
													},
												},
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
														headerBox: true,
														mdBox: true,
														imageBox: true,
														iframeBox: true,
														quoteBox: true,
													},
												},
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		return test1;
	}),
});
