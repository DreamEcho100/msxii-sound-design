import { eq } from "drizzle-orm";
import { z } from "zod";
// import { createTRPCRouter, adminProtectedProcedure } from "~/server/api/trpc";
// import { updateOneMdBxSchema } from "~/server/utils/validations-schemas/dashboard/boxes/types/mds";
// import { updateOneQuoteBxSchema } from "~/server/utils/validations-schemas/dashboard/boxes/types/quotes";
// import { updateOneHeaderBxSchema } from "~/server/utils/validations-schemas/dashboard/boxes/types/headers";
// import { UpdateOneCustomCssSchema } from "~/server/utils/validations-schemas/dashboard/css/customClasses";
// import { UpdateOneTwVariantsSchema } from "~/server/utils/validations-schemas/dashboard/css/twVariants";
// import { updateOneImageBxSchema } from "~/server/utils/validations-schemas/dashboard/boxes/types/images";
// import { updateOneIframeBxSchema } from "~/server/utils/validations-schemas/dashboard/boxes/types/iframes";
// import { updateOneSliderSchema } from "~/server/utils/validations-schemas/dashboard/boxes/types/sliders";
// import { UpdateOneInlineStyleCssSchema } from "~/server/utils/validations-schemas/dashboard/css/inlineStyles";
import { createId } from "@paralleldrive/cuid2";
import { adminProtectedProcedure, createTRPCRouter } from "~/server/libs/trpc";
import { updateOneHeaderBxSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/headers";
import { updateOneIframeBxSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/iframes";
import { updateOneImageBxSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/images";
import { updateOneMdBxSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/mds";
import { updateOneQuoteBxSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/quotes";
import { updateOneSliderSchema } from "~/libs/utils/validations-schemas/dashboard/boxes/types/sliders";
import { UpdateOneCustomCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/customClasses";
import { UpdateOneInlineStyleCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/inlineStyles";
import { UpdateOneTwVariantsSchema } from "~/libs/utils/validations-schemas/dashboard/css/twVariants";

export const dashboardRouter = createTRPCRouter({
  shopify: createTRPCRouter({
    getProducts: adminProtectedProcedure
      .input(
        z.object({
          title: z.string().min(3).optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        return (
          await ctx.shopify.products.queries.manyBasic({
            first: 100,
            query: {
              title: input?.title ? `${input.title}*` : undefined,
            },
          })
        ).products.edges;
        // await getShopifyClient().product.fetch
      }),
  }),
  pages: createTRPCRouter({
    createOneProductByTemplate: adminProtectedProcedure
      .input(
        z.object({
          slug: z.string().min(3),
          //
          imageSrc: z.string().min(3).nullable().optional(),
          imageAltText: z.string().min(3).nullable().optional(),
          imageWidth: z.number().min(0).nullable().optional(),
          imageHeight: z.number().min(0).nullable().optional(),
          //
          seoTitle: z.string().min(3),
          seoDescription: z.string().min(3).nullable().optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        //
        await ctx.drizzleQueryClient.transaction(async (tx) => {
          const [newPgCssId, newPgSeoId, newPgImageId] = await Promise.all([
            tx
              .insert(ctx.drizzleSchema.css)
              .values({
                id: createId(),
                twVariants: {
                  "max-w": "100ch",
                  w: "full",
                  mx: "auto",
                  px: "8",
                  py: "16",
                  "gap-x": "16",
                  "gap-y": "16",
                },
              })
              .returning({ id: ctx.drizzleSchema.css.id })
              .then((res) => res[0]!.id),
            tx
              .insert(ctx.drizzleSchema.seo)
              .values({
                id: createId(),
                title: input.seoTitle,
                description: input.seoDescription,
              })
              .returning({ id: ctx.drizzleSchema.seo.id })
              .then((res) => res[0]!.id),
            !input.imageSrc
              ? null
              : tx
                  .insert(ctx.drizzleSchema.img)
                  .values({
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    id: createId(),
                    src: input.imageSrc,
                    altText: input.imageAltText,
                    width: input.imageWidth,
                    height: input.imageHeight,
                  })
                  .returning({ id: ctx.drizzleSchema.img.id })
                  .then((res) => res[0]!.id),
          ]);

          const newPgId = await tx
            .insert(ctx.drizzleSchema.pg)
            .values({
              id: createId(),
              isActive: false,
              cssId: newPgCssId,
              seoId: newPgSeoId,
              imgId: newPgImageId,
              slug: input.slug,
              pgCategoryName: "products",
            })
            .returning({ id: ctx.drizzleSchema.pg.id })
            .then((res) => res[0]!.id);

          const section1CssId = await tx
            .insert(ctx.drizzleSchema.css)
            .values({
              id: createId(),
              twVariants: {
                "gap-y": "4",
              },
            })
            .returning({ id: ctx.drizzleSchema.css.id })
            .then((res) => res[0]!.id);

          const newSect1Id = await tx
            .insert(ctx.drizzleSchema.sect)
            .values({
              id: createId(),
              pgId: newPgId,
              order: 0,
              cssId: section1CssId,
            })
            .returning({ id: ctx.drizzleSchema.sect.id })
            .then((res) => res[0]!.id);

          {
            const section1Bx1CssId = await tx
              .insert(ctx.drizzleSchema.css)
              .values({
                id: createId(),
              })
              .returning({ id: ctx.drizzleSchema.css.id })
              .then((res) => res[0]!.id);
            const section1Bx1Id = await tx
              .insert(ctx.drizzleSchema.bx)
              .values({
                id: createId(),
                sectId: newSect1Id,
                order: 0,
                type: "HEADER",
                cssId: section1Bx1CssId,
              })
              .returning({ id: ctx.drizzleSchema.bx.id })
              .then((res) => res[0]!.id);
            await tx.insert(ctx.drizzleSchema.headerBx).values({
              id: createId(),
              bxId: section1Bx1Id,
              title: "Details",
            });

            const section1Bx2CssId = await tx
              .insert(ctx.drizzleSchema.css)
              .values({
                id: createId(),
                twVariants: {
                  "gap-y": "4",
                },
              })
              .returning({ id: ctx.drizzleSchema.css.id })
              .then((res) => res[0]!.id);
            const section1Bx2Id = await tx
              .insert(ctx.drizzleSchema.bx)
              .values({
                id: createId(),
                sectId: newSect1Id,
                order: 1,
                cssId: section1Bx2CssId,
                type: "MD",
              })
              .returning({ id: ctx.drizzleSchema.bx.id })
              .then((res) => res[0]!.id);
            await tx.insert(ctx.drizzleSchema.mdBx).values({
              id: createId(),
              bxId: section1Bx2Id,
              content: `MSXII Sound Design presents Schlump Loops 6! Like no other, Volume 6 delivers more character, textures, tone, & grooves! Schlump Loops 6 is for the producer that needs that new! New sounds within drumbreaks & grooves to use as is, or to chop! Using the loops as-is is ok...but the really beauty in the Schlump Loops series is finding the uniquely characterized one-shots & "in between" stuff.

Pull these up in Serato Sample, Maschine, iOS device, FL Studio, Ableton, or your MPC and lock in! Cop Schlump Loops 5 and add it to your collection of the best drums the game has to offer! Kit Features: 40 original, uniquely textured drum loops in .wav format Mixed ready to go.

Levels set under 0 Db to allow for max idea building, minimal gain staging Chop new one-shots, find new grooves, build more distinct loops by mix & matching Numerous tempos, tons of textures, vibes, character, and originality Loops labeled with bpm for easy file management Not for resale, repurposing, sharing or pirating Compatible with all DAWs, samplers, and iOS apps that accept .wav files`,
            });

            const section1Bx3CssId = await tx
              .insert(ctx.drizzleSchema.css)
              .values({
                id: createId(),
              })
              .returning({ id: ctx.drizzleSchema.css.id })
              .then((res) => res[0]!.id);
            const section1Bx3Id = await tx
              .insert(ctx.drizzleSchema.bx)
              .values({
                id: createId(),
                sectId: newSect1Id,
                order: 2,
                cssId: section1Bx3CssId,
                type: "IFRAME",
              })
              .returning({ id: ctx.drizzleSchema.bx.id })
              .then((res) => res[0]!.id);
            await tx.insert(ctx.drizzleSchema.iframeBx).values({
              id: createId(),
              bxId: section1Bx3Id,
              type: "YOUTUBE",
              src: "https://www.youtube.com/embed/-r2sMTHi5jU",
            });
          }

          const section2CssId = await tx
            .insert(ctx.drizzleSchema.css)
            .values({
              id: createId(),
              twVariants: {
                "gap-y": "4",
              },
              customClasses: ["section-container-v1"],
            })
            .returning({ id: ctx.drizzleSchema.css.id })
            .then((res) => res[0]!.id);

          const newSect2Id = await tx
            .insert(ctx.drizzleSchema.sect)
            .values({
              id: createId(),
              pgId: newPgId,
              order: 1,
              cssId: section2CssId,
            })
            .returning({ id: ctx.drizzleSchema.sect.id })
            .then((res) => res[0]!.id);

          {
            const section2Bx1CssId = await tx
              .insert(ctx.drizzleSchema.css)
              .values({
                id: createId(),
                inlineStyles: {
                  gridTemplateColumns: "1fr",
                },
                twVariants: {
                  "gap-y": "8",
                },
              })
              .returning({ id: ctx.drizzleSchema.css.id })
              .then((res) => res[0]!.id);
            const section2Bx1Id = await tx
              .insert(ctx.drizzleSchema.bx)
              .values({
                id: createId(),
                sectId: newSect2Id,
                order: 0,
                type: "GRID",
                cssId: section2Bx1CssId,
              })
              .returning({ id: ctx.drizzleSchema.bx.id })
              .then((res) => res[0]!.id);
            const section2Bx1GridId = await tx
              .insert(ctx.drizzleSchema.grid)
              .values({
                id: createId(),
                bxId: section2Bx1Id,
              })
              .returning({ id: ctx.drizzleSchema.grid.id })
              .then((res) => res[0]!.id);

            {
              const section2Bx1GridBx1IdCssId = await tx
                .insert(ctx.drizzleSchema.css)
                .values({
                  id: createId(),
                })
                .returning({ id: ctx.drizzleSchema.css.id })
                .then((res) => res[0]!.id);
              const section2Bx1GridBx1Id = await tx
                .insert(ctx.drizzleSchema.bx)
                .values({
                  id: createId(),
                  // sectId: newSect2Id,
                  order: 0,
                  type: "HEADER",
                  cssId: section2Bx1GridBx1IdCssId,
                })
                .returning({ id: ctx.drizzleSchema.bx.id })
                .then((res) => res[0]!.id);
              await tx.insert(ctx.drizzleSchema.headerBx).values({
                id: createId(),
                bxId: section2Bx1GridBx1Id,
                title: "Preview Samples",
              });

              const section2Bx1GridBx2IdCssId = await tx
                .insert(ctx.drizzleSchema.css)
                .values({
                  id: createId(),
                })
                .returning({ id: ctx.drizzleSchema.css.id })
                .then((res) => res[0]!.id);
              const section2Bx1GridBx2Id = await tx
                .insert(ctx.drizzleSchema.bx)
                .values({
                  id: createId(),
                  // sectId: newSect2Id,
                  order: 1,
                  type: "IFRAME",
                  cssId: section2Bx1GridBx2IdCssId,
                })
                .returning({ id: ctx.drizzleSchema.bx.id })
                .then((res) => res[0]!.id);
              await tx.insert(ctx.drizzleSchema.iframeBx).values({
                id: createId(),
                bxId: section2Bx1GridBx2Id,
                type: "SOUND_CLOUD",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/718025401%3Fsecret_token%3Ds-CjhnZ&color=%23c74c4c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
              });

              const section2Bx1GridBx3IdCssId = await tx
                .insert(ctx.drizzleSchema.css)
                .values({
                  id: createId(),
                })
                .returning({ id: ctx.drizzleSchema.css.id })
                .then((res) => res[0]!.id);
              const section2Bx1GridBx3Id = await tx
                .insert(ctx.drizzleSchema.bx)
                .values({
                  id: createId(),
                  // sectId: newSect2Id,
                  order: 2,
                  type: "IFRAME",
                  cssId: section2Bx1GridBx3IdCssId,
                })
                .returning({ id: ctx.drizzleSchema.bx.id })
                .then((res) => res[0]!.id);
              const section2Bx1GridBx3Iframe = await tx
                .insert(ctx.drizzleSchema.iframeBx)
                .values({
                  id: createId(),
                  bxId: section2Bx1GridBx3Id,
                  type: "SOUND_CLOUD",
                  src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/718025401%3Fsecret_token%3Ds-CjhnZ&color=%23c74c4c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&_=2",
                });
              section2Bx1GridBx3Iframe;

              const section2Bx1GridBx4IdCssId = await tx
                .insert(ctx.drizzleSchema.css)
                .values({
                  id: createId(),
                })
                .returning({ id: ctx.drizzleSchema.css.id })
                .then((res) => res[0]!.id);
              const section2Bx1GridBx4Id = await tx
                .insert(ctx.drizzleSchema.bx)
                .values({
                  id: createId(),
                  // sectId: newSect2Id,
                  order: 3,
                  type: "MD",
                  cssId: section2Bx1GridBx4IdCssId,
                })
                .returning({ id: ctx.drizzleSchema.bx.id })
                .then((res) => res[0]!.id);
              const section2Bx1GridBx4Header = await tx
                .insert(ctx.drizzleSchema.mdBx)
                .values({
                  id: createId(),
                  bxId: section2Bx1GridBx4Id,
                  content: "&plus; so many more high quality samples",
                });
              section2Bx1GridBx4Header;

              await tx.insert(ctx.drizzleSchema.gridBx).values([
                {
                  id: createId(),
                  bxId: section2Bx1GridBx1Id,
                  order: 0,
                  gridId: section2Bx1GridId,
                },
                {
                  id: createId(),
                  bxId: section2Bx1GridBx2Id,
                  order: 1,
                  gridId: section2Bx1GridId,
                },
                {
                  id: createId(),
                  bxId: section2Bx1GridBx3Id,
                  order: 2,
                  gridId: section2Bx1GridId,
                },
                {
                  id: createId(),
                  bxId: section2Bx1GridBx4Id,
                  order: 3,
                  gridId: section2Bx1GridId,
                },
              ]);
            }
          }
        });
        //
      }),
  }),
  pagesCategories: createTRPCRouter({
    getAll: adminProtectedProcedure.query(({ ctx }) => {
      return ctx.drizzleQueryClient.query.pgCategory.findMany();
    }),
    getOne: adminProtectedProcedure
      .input(
        z.object({
          pgCategoryName: z.string().min(1),
          slug: z.string().min(1).optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        return ctx.drizzleQueryClient.query.pgCategory.findFirst({
          where(fields, operators) {
            return operators.eq(fields.name, input.pgCategoryName);
          },
        });
      }),
  }),
  bxes: createTRPCRouter({
    types: createTRPCRouter({
      mds: createTRPCRouter({
        updateOne: adminProtectedProcedure
          .input(z.object(updateOneMdBxSchema))
          .mutation(async ({ ctx, input }) => {
            const bx = await ctx.drizzleQueryClient.query.mdBx.findFirst({
              where(fields, operators) {
                return operators.eq(fields.id, input.id);
              },
            });

            if (!bx) {
              throw new Error("Bx not found");
            }

            bx.content = input.content;

            await ctx.drizzleQueryClient
              .update(ctx.drizzleSchema.mdBx)
              .set({
                content: input.content,
              })
              .where(eq(ctx.drizzleSchema.mdBx.id, input.id));

            return bx;
          }),
      }),
      quotes: createTRPCRouter({
        updateOne: adminProtectedProcedure
          .input(z.object(updateOneQuoteBxSchema))
          .mutation(async ({ ctx, input }) => {
            const bx = await ctx.drizzleQueryClient.query.quoteBx.findFirst({
              where(fields, operators) {
                return operators.eq(fields.id, input.id);
              },
            });

            if (!bx) {
              throw new Error("Bx not found");
            }

            bx.content = input.content ?? bx.content;
            bx.cite = input.cite ?? bx.cite;

            await ctx.drizzleQueryClient
              .update(ctx.drizzleSchema.quoteBx)
              .set({
                content: input.content,
                cite: input.cite,
              })
              .where(eq(ctx.drizzleSchema.quoteBx.id, input.id));

            return bx;
          }),
      }),
      headers: createTRPCRouter({
        updateOne: adminProtectedProcedure
          .input(z.object(updateOneHeaderBxSchema))
          .mutation(async ({ ctx, input }) => {
            const bx = await ctx.drizzleQueryClient.query.headerBx.findFirst({
              where(fields, operators) {
                return operators.eq(fields.id, input.id);
              },
            });

            if (!bx) {
              throw new Error("Bx not found");
            }

            bx.title = input.title ?? bx.title;
            bx.description = input.description ?? bx.description;

            await ctx.drizzleQueryClient
              .update(ctx.drizzleSchema.headerBx)
              .set({
                title: input.title,
                description: input.description,
              })
              .where(eq(ctx.drizzleSchema.headerBx.id, input.id));

            return bx;
          }),
      }),
      images: createTRPCRouter({
        updateOne: adminProtectedProcedure
          .input(z.object(updateOneImageBxSchema))
          .mutation(async ({ ctx, input }) => {
            const bx = await ctx.drizzleQueryClient.query.imgBx.findFirst({
              where(fields, operators) {
                return operators.eq(fields.id, input.id);
              },
            });

            if (!bx) {
              throw new Error("Bx not found");
            }

            bx.src = input.src ?? bx.src;
            bx.altText = input.altText ?? bx.altText;
            bx.width = input.width ?? bx.width;
            bx.height = input.height ?? bx.height;

            await ctx.drizzleQueryClient
              .update(ctx.drizzleSchema.imgBx)
              .set({
                src: input.src,
                altText: input.altText,
                width: input.width,
                height: input.height,
              })
              .where(eq(ctx.drizzleSchema.imgBx.id, input.id));

            return bx;
          }),
      }),
      iframes: createTRPCRouter({
        updateOne: adminProtectedProcedure
          .input(z.object(updateOneIframeBxSchema))
          .mutation(async ({ ctx, input }) => {
            const bx = await ctx.drizzleQueryClient.query.iframeBx.findFirst({
              where(fields, operators) {
                return operators.eq(fields.id, input.id);
              },
            });

            if (!bx) {
              throw new Error("Bx not found");
            }

            bx.src = input.src ?? bx.src;
            bx.title = input.title ?? bx.title;
            bx.type = input.type ?? bx.type;

            await ctx.drizzleQueryClient
              .update(ctx.drizzleSchema.iframeBx)
              .set({
                src: input.src,
                title: input.title,
                type: input.type,
              })
              .where(eq(ctx.drizzleSchema.iframeBx.id, input.id));

            return bx;
          }),
      }),
      sliders: createTRPCRouter({
        updateOne: adminProtectedProcedure
          .input(z.object(updateOneSliderSchema))
          .mutation(async ({ ctx, input }) => {
            const bx = await ctx.drizzleQueryClient.query.slider.findFirst({
              where(fields, operators) {
                return operators.eq(fields.id, input.id);
              },
            });

            if (!bx) {
              throw new Error("Bx not found");
            }

            bx.slidesPerViewType =
              input.slidesPerViewType ?? bx.slidesPerViewType;

            await ctx.drizzleQueryClient
              .update(ctx.drizzleSchema.slider)
              .set({
                slidesPerViewType: input.slidesPerViewType,
              })
              .where(eq(ctx.drizzleSchema.slider.id, input.id));

            return bx;
          }),
      }),
      tabs: createTRPCRouter({
        updateOneName: adminProtectedProcedure
          .input(
            z.object({
              tabsBxId: z.string().cuid(),
              title: z.string().min(3),
            }),
          )
          .mutation(async ({ ctx, input }) => {
            const bx = await ctx.drizzleQueryClient.query.tabsBx.findFirst({
              where(fields, operators) {
                return operators.eq(fields.id, input.tabsBxId);
              },
            });

            if (!bx) {
              throw new Error("Bx not found");
            }

            bx.title = input.title ?? bx.title;

            await ctx.drizzleQueryClient
              .update(ctx.drizzleSchema.tabsBx)
              .set({
                title: input.title,
              })
              .where(eq(ctx.drizzleSchema.tabsBx.id, input.tabsBxId));

            return bx;
          }),
      }),
    }),
  }),
  css: createTRPCRouter({
    twVariants: createTRPCRouter({
      setOne: adminProtectedProcedure
        .input(z.object(UpdateOneTwVariantsSchema))
        .mutation(async ({ ctx, input }) => {
          const bx = await ctx.drizzleQueryClient.query.css.findFirst({
            where(fields, operators) {
              return operators.eq(fields.id, input.cssId);
            },
          });

          if (!bx) {
            throw new Error("CSS not found");
          }

          bx.twVariants = input.twVariants;

          await ctx.drizzleQueryClient
            .update(ctx.drizzleSchema.css)
            .set({
              twVariants: input.twVariants,
            })
            .where(eq(ctx.drizzleSchema.css.id, input.cssId));

          return bx;
        }),
    }),
    customClasses: createTRPCRouter({
      setOne: adminProtectedProcedure
        .input(z.object(UpdateOneCustomCssSchema))
        .mutation(async ({ ctx, input }) => {
          const bx = await ctx.drizzleQueryClient.query.css.findFirst({
            where(fields, operators) {
              return operators.eq(fields.id, input.cssId);
            },
          });

          if (!bx) {
            throw new Error("CSS not found");
          }

          // NOTE: Should I allow it to be null?
          bx.customClasses = input.customClasses ?? [];

          await ctx.drizzleQueryClient
            .update(ctx.drizzleSchema.css)
            .set({
              customClasses: input.customClasses,
            })
            .where(eq(ctx.drizzleSchema.css.id, input.cssId));

          return bx;
        }),
    }),
    inlineStyles: createTRPCRouter({
      setOne: adminProtectedProcedure
        .input(z.object(UpdateOneInlineStyleCssSchema))
        .mutation(async ({ ctx, input }) => {
          const bx = await ctx.drizzleQueryClient.query.css.findFirst({
            where(fields, operators) {
              return operators.eq(fields.id, input.cssId);
            },
          });

          if (!bx) {
            throw new Error("CSS not found");
          }

          // NOTE: Should I allow it to be null?
          bx.inlineStyles = input.inlineStyles || {};

          await ctx.drizzleQueryClient
            .update(ctx.drizzleSchema.css)
            .set({
              inlineStyles: input.inlineStyles,
            })
            .where(eq(ctx.drizzleSchema.css.id, input.cssId));

          return bx;
        }),
    }),
  }),
});
