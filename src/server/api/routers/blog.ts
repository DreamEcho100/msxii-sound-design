import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/libs/trpc";

export const blogRouter = createTRPCRouter({
  getMany: publicProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        limit: z.number().max(100).optional().nullish(),
      }),
    )
    .query(({ input }) => {
      const cursor = input.cursor ?? 0;
      const limit = input.limit ?? 12;

      const items = fakeBlogPostsData.slice(cursor, cursor + limit + 1);

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // const nextItem =
        items.pop();
        // nextCursor = nextItem!.myCursor;
        nextCursor = cursor + limit;
      }
      return {
        items,
        nextCursor,
      };
    }),
  getAllSize: publicProcedure
    .input(
      z
        .object({
          limit: z.number().max(100).optional().nullish(),
        })
        .optional(),
    )
    .query(({ input }) => {
      const limit = input?.limit ?? 12;
      return Math.ceil(fakeBlogPostsData.length / limit);
    }),
  getOneById: publicProcedure.input(z.string()).query(({ input }) => {
    const product = fakeBlogPostsData.find((item) => item.id === input);

    if (!product) throw new TRPCError({ code: "NOT_FOUND" });

    return product;
  }),
});

const _fakeBlogPostsData = [
  {
    id: "1",
    image: {
      src: "/images/blog/1.png",
    },
    title: "TAPE SERIES VOL. 1 FROM MSXIISOUND AND AKAI PRO",
  },
  {
    id: "2",
    image: {
      src: "/images/blog/2.png",
    },
    title: "HOLIDAY JAMS BY THE WVGRD",
  },
  {
    id: "3",
    image: {
      src: "/images/blog/3.png",
    },
    title: "THE SOUND BUSINESS PRO - INTERVIEW WITH ALTRUWEST",
  },
  {
    id: "4",
    image: {
      src: "/images/blog/4.png",
    },
    title: "@MALO_BEATS ON THE MPC USING MSXII DRUMS AND SAMPLES",
  },
  {
    id: "5",
    image: {
      src: "/images/blog/5.png",
    },
    title:
      "INTRODUCING THE FREE FORM EXPANSION FROM MSXII & NATIVE INSTRUMENTS",
  },
  {
    id: "6",
    image: {
      src: "/images/blog/6.png",
    },
    title: 'MSIMP DROPS NEW "VIOOOOOBES" BEAT-TAPE',
  },
];

const fakeBlogPostsData = "_"
  .repeat(9)
  .split("_")
  .map((_, index) =>
    (index % 3 === 0
      ? _fakeBlogPostsData
      : _fakeBlogPostsData.slice().reverse()
    ).map((item) => ({
      ...item,
      id: Math.random().toString(16),
    })),
  )
  .flat(1);
