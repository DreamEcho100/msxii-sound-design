import { z } from "zod";

import { isNull, lte } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "~/server/libs/trpc";
import { TRPCError } from "@trpc/server";

export const customPgsRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(
      z.object({
        slug: z.string().nullable().optional(),
        pgCategoryName: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const page = await ctx.drizzleQueryClient.query.pg.findFirst({
        with: {
          css: true,
          pgCategory: true,
          img: true,
          seo: true,
          sects: {
            with: {
              css: true,
              body: {
                with: {
                  css: true,
                  headerBx: true,
                  mdBx: true,
                  imgBx: true,
                  iframeBx: true,
                  quoteBx: true,
                  //

                  tabs: {
                    with: {
                      tabsBxs: {
                        with: {
                          bx: {
                            with: {
                              css: true,
                              headerBx: true,
                              mdBx: true,
                              imgBx: true,
                              iframeBx: true,
                              quoteBx: true,
                              //
                              grid: {
                                with: {
                                  gridsBxs: {
                                    with: {
                                      bx: {
                                        with: {
                                          css: true,
                                          headerBx: true,
                                          mdBx: true,
                                          imgBx: true,
                                          iframeBx: true,
                                          quoteBx: true,
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
                      slidesBxs: {
                        with: {
                          bx: {
                            with: {
                              css: true,
                              headerBx: true,
                              mdBx: true,
                              imgBx: true,
                              iframeBx: true,
                              quoteBx: true,
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
                      gridsBxs: {
                        with: {
                          bx: {
                            with: {
                              css: true,
                              headerBx: true,
                              mdBx: true,
                              imgBx: true,
                              iframeBx: true,
                              quoteBx: true,
                              //
                              grid: {
                                with: {
                                  gridsBxs: {
                                    with: {
                                      bx: {
                                        with: {
                                          css: true,
                                          headerBx: true,
                                          mdBx: true,
                                          imgBx: true,
                                          iframeBx: true,
                                          quoteBx: true,
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
            operators.eq(fields.pgCategoryName, input.pgCategoryName),
            input.slug
              ? operators.eq(fields.slug, input.slug)
              : isNull(fields.slug),
          );
        },
      });

      if (!page) throw new TRPCError({ code: "NOT_FOUND" });

      return page;
    }),
  pagesCategories: createTRPCRouter({
    getManyItems: publicProcedure
      .input(
        z.object({
          pgCategoryName: z.string().min(1),
          limit: z.number().min(1).max(100).optional().default(20),
          cursor: z.date().nullish(), // <-- "cursor" needs to exist, but can be any type
        }),
      )
      .query(async ({ ctx, input }) => {
        const limit = input.limit + 1;

        const items = await ctx.drizzleQueryClient.query.pg.findMany({
          where(fields, operators) {
            return operators.and(
              operators.eq(fields.pgCategoryName, input.pgCategoryName),
              input.cursor ? lte(fields.createdAt, input.cursor) : undefined,
            );
          },
          orderBy(fields, operators) {
            return operators.desc(fields.createdAt);
          },
          limit,
          with: {
            img: true,
            pgCategory: true,
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
