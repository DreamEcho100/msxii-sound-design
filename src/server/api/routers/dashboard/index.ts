import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, adminProtectedProcedure } from "~/server/api/trpc";
import { updateOneMdBoxSchema } from "~/server/utils/validations-schemas/dashboard/boxes/types/mds";
import { updateOneQuoteBoxSchema } from "~/server/utils/validations-schemas/dashboard/boxes/types/quotes";
import { updateOneHeaderBoxSchema } from "~/server/utils/validations-schemas/dashboard/boxes/types/headers";
import { UpdateOneCustomCssSchema } from "~/server/utils/validations-schemas/dashboard/css/customClasses";
import { UpdateOneTwVariantsSchema } from "~/server/utils/validations-schemas/dashboard/css/twVariants";
import { updateOneImageBoxSchema } from "~/server/utils/validations-schemas/dashboard/boxes/types/images";
import { updateOneIframeBoxSchema } from "~/server/utils/validations-schemas/dashboard/boxes/types/iframes";
import { updateOneSliderSchema } from "~/server/utils/validations-schemas/dashboard/boxes/types/sliders";
import { UpdateOneInlineStyleCssSchema } from "~/server/utils/validations-schemas/dashboard/css/inlineStyles";
import { createId } from "@paralleldrive/cuid2";

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
          await ctx.shopify.products.queries.many({
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
          const [newPageCssId, newPageSeoId, newPageImageId] =
            await Promise.all([
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
                    .insert(ctx.drizzleSchema.image)
                    .values({
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      id: createId(),
                      src: input.imageSrc,
                      altText: input.imageAltText,
                      width: input.imageWidth,
                      height: input.imageHeight,
                    })
                    .returning({ id: ctx.drizzleSchema.image.id })
                    .then((res) => res[0]!.id),
            ]);

          const newPageId = await tx
            .insert(ctx.drizzleSchema.page)
            .values({
              id: createId(),
              isActive: false,
              cssId: newPageCssId,
              seoId: newPageSeoId,
              imageId: newPageImageId,
              slug: input.slug,
              pageCategoryName: "products",
            })
            .returning({ id: ctx.drizzleSchema.page.id })
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

          const newSection1Id = await tx
            .insert(ctx.drizzleSchema.section)
            .values({
              id: createId(),
              pageId: newPageId,
              order: 0,
              cssId: section1CssId,
            })
            .returning({ id: ctx.drizzleSchema.section.id })
            .then((res) => res[0]!.id);

          {
            const section1Box1CssId = await tx
              .insert(ctx.drizzleSchema.css)
              .values({
                id: createId(),
              })
              .returning({ id: ctx.drizzleSchema.css.id })
              .then((res) => res[0]!.id);
            const section1Box1Id = await tx
              .insert(ctx.drizzleSchema.box)
              .values({
                id: createId(),
                sectionId: newSection1Id,
                order: 0,
                type: "HEADER",
                cssId: section1Box1CssId,
              })
              .returning({ id: ctx.drizzleSchema.box.id })
              .then((res) => res[0]!.id);
            await tx.insert(ctx.drizzleSchema.headerBox).values({
              id: createId(),
              boxId: section1Box1Id,
              title: "Details",
            });

            const section1Box2CssId = await tx
              .insert(ctx.drizzleSchema.css)
              .values({
                id: createId(),
                twVariants: {
                  "gap-y": "4",
                },
              })
              .returning({ id: ctx.drizzleSchema.css.id })
              .then((res) => res[0]!.id);
            const section1Box2Id = await tx
              .insert(ctx.drizzleSchema.box)
              .values({
                id: createId(),
                sectionId: newSection1Id,
                order: 1,
                cssId: section1Box2CssId,
                type: "MD",
              })
              .returning({ id: ctx.drizzleSchema.box.id })
              .then((res) => res[0]!.id);
            await tx.insert(ctx.drizzleSchema.mdBox).values({
              id: createId(),
              boxId: section1Box2Id,
              content: `MSXII Sound Design presents Schlump Loops 6! Like no other, Volume 6 delivers more character, textures, tone, & grooves! Schlump Loops 6 is for the producer that needs that new! New sounds within drumbreaks & grooves to use as is, or to chop! Using the loops as-is is ok...but the really beauty in the Schlump Loops series is finding the uniquely characterized one-shots & "in between" stuff.

Pull these up in Serato Sample, Maschine, iOS device, FL Studio, Ableton, or your MPC and lock in! Cop Schlump Loops 5 and add it to your collection of the best drums the game has to offer! Kit Features: 40 original, uniquely textured drum loops in .wav format Mixed ready to go.

Levels set under 0 Db to allow for max idea building, minimal gain staging Chop new one-shots, find new grooves, build more distinct loops by mix & matching Numerous tempos, tons of textures, vibes, character, and originality Loops labeled with bpm for easy file management Not for resale, repurposing, sharing or pirating Compatible with all DAWs, samplers, and iOS apps that accept .wav files`,
            });

            const section1Box3CssId = await tx
              .insert(ctx.drizzleSchema.css)
              .values({
                id: createId(),
              })
              .returning({ id: ctx.drizzleSchema.css.id })
              .then((res) => res[0]!.id);
            const section1Box3Id = await tx
              .insert(ctx.drizzleSchema.box)
              .values({
                id: createId(),
                sectionId: newSection1Id,
                order: 2,
                cssId: section1Box3CssId,
                type: "IFRAME",
              })
              .returning({ id: ctx.drizzleSchema.box.id })
              .then((res) => res[0]!.id);
            await tx.insert(ctx.drizzleSchema.iframeBox).values({
              id: createId(),
              boxId: section1Box3Id,
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

          const newSection2Id = await tx
            .insert(ctx.drizzleSchema.section)
            .values({
              id: createId(),
              pageId: newPageId,
              order: 1,
              cssId: section2CssId,
            })
            .returning({ id: ctx.drizzleSchema.section.id })
            .then((res) => res[0]!.id);

          {
            const section2Box1CssId = await tx
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
            const section2Box1Id = await tx
              .insert(ctx.drizzleSchema.box)
              .values({
                id: createId(),
                sectionId: newSection2Id,
                order: 0,
                type: "GRID",
                cssId: section2Box1CssId,
              })
              .returning({ id: ctx.drizzleSchema.box.id })
              .then((res) => res[0]!.id);
            const section2Box1GridId = await tx
              .insert(ctx.drizzleSchema.grid)
              .values({
                id: createId(),
                boxId: section2Box1Id,
              })
              .returning({ id: ctx.drizzleSchema.grid.id })
              .then((res) => res[0]!.id);

            {
              const section2Box1GridBox1IdCssId = await tx
                .insert(ctx.drizzleSchema.css)
                .values({
                  id: createId(),
                })
                .returning({ id: ctx.drizzleSchema.css.id })
                .then((res) => res[0]!.id);
              const section2Box1GridBox1Id = await tx
                .insert(ctx.drizzleSchema.box)
                .values({
                  id: createId(),
                  // sectionId: newSection2Id,
                  order: 0,
                  type: "HEADER",
                  cssId: section2Box1GridBox1IdCssId,
                })
                .returning({ id: ctx.drizzleSchema.box.id })
                .then((res) => res[0]!.id);
              await tx.insert(ctx.drizzleSchema.headerBox).values({
                id: createId(),
                boxId: section2Box1GridBox1Id,
                title: "Preview Samples",
              });

              const section2Box1GridBox2IdCssId = await tx
                .insert(ctx.drizzleSchema.css)
                .values({
                  id: createId(),
                })
                .returning({ id: ctx.drizzleSchema.css.id })
                .then((res) => res[0]!.id);
              const section2Box1GridBox2Id = await tx
                .insert(ctx.drizzleSchema.box)
                .values({
                  id: createId(),
                  // sectionId: newSection2Id,
                  order: 1,
                  type: "IFRAME",
                  cssId: section2Box1GridBox2IdCssId,
                })
                .returning({ id: ctx.drizzleSchema.box.id })
                .then((res) => res[0]!.id);
              await tx.insert(ctx.drizzleSchema.iframeBox).values({
                id: createId(),
                boxId: section2Box1GridBox2Id,
                type: "SOUND_CLOUD",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/718025401%3Fsecret_token%3Ds-CjhnZ&color=%23c74c4c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
              });

              const section2Box1GridBox3IdCssId = await tx
                .insert(ctx.drizzleSchema.css)
                .values({
                  id: createId(),
                })
                .returning({ id: ctx.drizzleSchema.css.id })
                .then((res) => res[0]!.id);
              const section2Box1GridBox3Id = await tx
                .insert(ctx.drizzleSchema.box)
                .values({
                  id: createId(),
                  // sectionId: newSection2Id,
                  order: 2,
                  type: "IFRAME",
                  cssId: section2Box1GridBox3IdCssId,
                })
                .returning({ id: ctx.drizzleSchema.box.id })
                .then((res) => res[0]!.id);
              const section2Box1GridBox3Iframe = await tx
                .insert(ctx.drizzleSchema.iframeBox)
                .values({
                  id: createId(),
                  boxId: section2Box1GridBox3Id,
                  type: "SOUND_CLOUD",
                  src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/718025401%3Fsecret_token%3Ds-CjhnZ&color=%23c74c4c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&_=2",
                });
              section2Box1GridBox3Iframe;

              const section2Box1GridBox4IdCssId = await tx
                .insert(ctx.drizzleSchema.css)
                .values({
                  id: createId(),
                })
                .returning({ id: ctx.drizzleSchema.css.id })
                .then((res) => res[0]!.id);
              const section2Box1GridBox4Id = await tx
                .insert(ctx.drizzleSchema.box)
                .values({
                  id: createId(),
                  // sectionId: newSection2Id,
                  order: 3,
                  type: "MD",
                  cssId: section2Box1GridBox4IdCssId,
                })
                .returning({ id: ctx.drizzleSchema.box.id })
                .then((res) => res[0]!.id);
              const section2Box1GridBox4Header = await tx
                .insert(ctx.drizzleSchema.mdBox)
                .values({
                  id: createId(),
                  boxId: section2Box1GridBox4Id,
                  content: "&plus; so many more high quality samples",
                });
              section2Box1GridBox4Header;

              await tx.insert(ctx.drizzleSchema.gridBox).values([
                {
                  id: createId(),
                  boxId: section2Box1GridBox1Id,
                  order: 0,
                  gridId: section2Box1GridId,
                },
                {
                  id: createId(),
                  boxId: section2Box1GridBox2Id,
                  order: 1,
                  gridId: section2Box1GridId,
                },
                {
                  id: createId(),
                  boxId: section2Box1GridBox3Id,
                  order: 2,
                  gridId: section2Box1GridId,
                },
                {
                  id: createId(),
                  boxId: section2Box1GridBox4Id,
                  order: 3,
                  gridId: section2Box1GridId,
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
              throw new Error("Box not found");
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
              throw new Error("Box not found");
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
              throw new Error("Box not found");
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
              throw new Error("Box not found");
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
              throw new Error("Box not found");
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
              throw new Error("Box not found");
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
              tabsBoxId: z.string().cuid(),
              title: z.string().min(3),
            }),
          )
          .mutation(async ({ ctx, input }) => {
            const box = await ctx.drizzleQueryClient.query.tabsBox.findFirst({
              where(fields, operators) {
                return operators.eq(fields.id, input.tabsBoxId);
              },
            });

            if (!box) {
              throw new Error("Box not found");
            }

            box.title = input.title ?? box.title;

            await ctx.drizzleQueryClient
              .update(ctx.drizzleSchema.tabsBox)
              .set({
                title: input.title,
              })
              .where(eq(ctx.drizzleSchema.tabsBox.id, input.tabsBoxId));

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
            throw new Error("CSS not found");
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
            throw new Error("CSS not found");
          }

          // NOTE: Should I allow it to be null?
          box.customClasses = input.customClasses ?? [];

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
            throw new Error("CSS not found");
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
