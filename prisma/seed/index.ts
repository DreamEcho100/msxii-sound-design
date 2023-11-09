import {
  BxTypes,
  IframeBxTypes,
  PrismaClient,
  SlidesPerViewType,
  type Bx as BxModel,
} from "@prisma/client";
// import page from './data/lo-fly-dirt';
import defaultIOSAppsPgs, {
  chomplrPgData,
  flyTape2PgData,
  flyTapePgData,
  loFlyDirtPgData,
} from "./data/ios-apps";
import pagesCategories from "./data/pagesCategories";
import { createId } from "@paralleldrive/cuid2";
import otherCustomPages from "./data/otherCustomPages";
import {
  type Bx,
  type CustomPg,
  type RowsOnlyBx,
  type TwoColumnsBx,
} from "../../src/libs/utils/types/custom-page";
// import loFlyDirtPgData from './data/lo-fly-dirt';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn", "info"]
        : ["error"],
    errorFormat: "minimal",
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

const seedPgsCategories = async () => {
  console.log("Starting seeding pagesCategories");

  await prisma.pgCategory.createMany({
    data: pagesCategories,
  });

  console.log("Ending seeding pagesCategories");
  console.log("\n\n");
};

const seedPg = async (page: CustomPg) => {
  console.log(
    `Starting seeding page: ${page.pgCategoryName}${
      page.slug ? `/${page.slug}` : ""
    }`,
  );

  const createdCustomPg = await prisma.pg.create({
    data: {
      id: createId(),
      slug: page.slug,
      updatedAt: null,
      isActive: typeof page.isActive === "boolean" ? page.isActive : true,
      css: {
        create: {
          id: createId(),
          twVariants: page.twClassNameVariants,
          customClasses: page.customPgClassesKeys,
        },
      },
      seo: page.title
        ? {
            create: {
              id: createId(),
              title: page.title,
              description: page.description,
            },
          }
        : undefined,
      pgCategory: { connect: { name: page.pgCategoryName } },
      img: page.img && {
        connectOrCreate: {
          create: { id: createId(), ...page.img },
          where: { src: page.img.src },
        },
      },
    },
  });

  const sectionToOrderMap = Object.fromEntries(
    page.pageStructure.map((section) => [section.order, section]),
  );

  const createSects = async () =>
    await prisma.$transaction(
      page.pageStructure.map((section) =>
        prisma.sect.create({
          data: {
            id: createId(),
            pg: { connect: { id: createdCustomPg.id } },
            css: {
              create: {
                id: createId(),
                twVariants: section.twClassNameVariants,
                customClasses: section.customPgClassesKeys,
              },
            },
            order: section.order,
          },
        }),
      ),
    );

  for await (const createdSect of await createSects()) {
    const section = sectionToOrderMap[createdSect.order]!;

    const sectionBxs: (Exclude<Bx, RowsOnlyBx | TwoColumnsBx> & {
      order: number;
    })[] = [];

    type SectBxs = typeof sectionBxs;

    let sizePreBodyLoop = 0;

    if (section.title) {
      sizePreBodyLoop++;
      sectionBxs.push({
        ___type: "header",
        title: section.title,
        description: section.description,
        order: 0,
      });
    }

    section.body.forEach((bx, bxIndex) => {
      if (bx.___type === "rows-only" || bx.___type === "two-columns") return;

      sectionBxs.push({ ...bx, order: sizePreBodyLoop + bxIndex });
    });

    const createBxs = async <Meta = undefined>(
      sectionBxs: SectBxs,
      params: {
        sectId?: string;
        meta?: Meta;
      },
    ): Promise<
      Meta extends undefined ? BxModel[] : { meta: Meta; bxes: BxModel[] }
    > => {
      const bxes: BxModel[] = [];

      const createTypeBxData = async (
        bx: SectBxs[number],
      ): Promise<
        | false
        | (Omit<
            Parameters<PrismaClient["bx"]["create"]>[0]["data"],
            "id" | "section" | "css" | "sectId" | "cssId" | "order"
          > &
            Partial<
              Pick<Parameters<PrismaClient["bx"]["create"]>[0]["data"], "css">
            >)
      > => {
        switch (bx.___type) {
          case "header":
            return {
              type: BxTypes.HEADER,
              headerBx: {
                create: {
                  id: createId(),
                  title: bx.title,
                  description: bx.description,
                },
              },
            };

          case "md":
            return {
              type: BxTypes.MD,
              mdBx: {
                create: { id: createId(), content: bx.content },
              },
            };

          case "img-only":
            return {
              type: BxTypes.IMAGE,
              imgBx: {
                create: {
                  id: createId(),
                  src: bx.src,
                  altText: bx.altText,
                  width: bx.width,
                  height: bx.height,
                },
              },
            };

          case "iframe":
            return {
              type: BxTypes.IFRAME,
              iframeBx: {
                create: {
                  id: createId(),
                  src: bx.src,
                  title: bx.title,
                  type:
                    bx.___subType === "instagram"
                      ? IframeBxTypes.INSTAGRAM
                      : bx.___subType === "soundcloud"
                      ? IframeBxTypes.SOUND_CLOUD
                      : IframeBxTypes.YOUTUBE,
                },
              },
            };

          case "quote":
            return {
              type: BxTypes.QUOTE,
              quoteBx: {
                create: {
                  id: createId(),
                  cite: bx.cite,
                  content: bx.content,
                },
              },
            };

          case "grid": {
            const itemsData = await createBxs(
              bx.items.map((item, itemIndex) => ({
                ...item,
                order: itemIndex,
              })),
              {},
            ).then((bxes) =>
              bxes.map((bx) => ({ id: createId(), bxId: bx.id })),
            );

            return {
              type: BxTypes.GRID,
              grid: {
                create: {
                  id: createId(),
                  gridsBxs: {
                    createMany: { data: itemsData },
                  },
                },
              },
              css: {
                create: {
                  id: createId(),
                  twVariants: bx.twClassNameVariants,
                  customClasses: bx.customPgClassesKeys,
                  inlineStyles: {
                    gridTemplateColumns: bx.gridTemplateColumns,
                  },
                },
              },
            };
          }

          case "tabs": {
            const itemsData = await createBxs(
              bx.tabs.map((item, itemIndex) => ({
                ...item.data,
                order: itemIndex,
              })),
              {},
            ).then((bxes) =>
              bxes.map((_bx, _bxIndex) => ({
                id: createId(),
                bxId: _bx.id,
                title: bx.tabs[_bxIndex]?.title ?? "",
              })),
            );

            return {
              type: BxTypes.TABS_HOLDER,
              tabs: {
                create: {
                  id: createId(),
                  tabsBxs: {
                    createMany: { data: itemsData },
                  },
                },
              },
            };
          }

          case "slider": {
            const slidesData = await createBxs(
              bx.slides.map((item, itemIndex) => ({
                ...item,
                order: itemIndex,
              })),
              {},
            ).then((bxes) =>
              bxes.map((_bx, _bxIndex) => ({
                id: createId(),
                bxId: _bx.id,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                title: bx.slides[_bxIndex]?.title,
              })),
            );

            return {
              type: BxTypes.SLIDER,
              slider: {
                create: {
                  id: createId(),
                  slidesPerViewType:
                    bx.slidesPerViewType === "one-slide"
                      ? SlidesPerViewType.ONE_SLIDE
                      : bx.slidesPerViewType === "large-slides"
                      ? SlidesPerViewType.LARGE_SLIDES
                      : SlidesPerViewType.DEFAULT,
                  slidesBxs: {
                    createMany: { data: slidesData },
                  },
                },
              },
            };
          }

          default:
            return false;
        }
      };

      for await (const bx of sectionBxs) {
        const bxTypeData = await createTypeBxData(bx);

        if (!bxTypeData) continue;

        bxes.push(
          await prisma.bx.create({
            data: {
              id: createId(),
              sect: !params.sectId
                ? undefined
                : { connect: { id: params.sectId } },
              css: {
                create: {
                  id: createId(),
                  twVariants: bx.twClassNameVariants,
                  customClasses: bx.customPgClassesKeys,
                },
              },
              order: bx.order,
              ...bxTypeData,
            },
          }),
        );
      }

      if (!params.meta) {
        return bxes as unknown as Promise<
          Meta extends undefined ? BxModel[] : { meta: Meta; bxes: BxModel[] }
        >;
      }

      return {
        meta: params.meta,
        bxes,
      } as unknown as Promise<
        Meta extends undefined ? BxModel[] : { meta: Meta; bxes: BxModel[] }
      >;
    };

    await createBxs(sectionBxs, {
      sectId: createdSect.id,
    });

    // break; // Closes iterator, triggers return
  }

  console.log(
    `Ending seeding page: ${page.pgCategoryName}${
      page.slug ? `/${page.slug}` : ""
    }`,
  );
  console.log("\n");
};

const seedPgs = async () => {
  console.log("Starting seeding pages");
  console.log("\n");

  const pages = [
    ...otherCustomPages,
    defaultIOSAppsPgs,
    loFlyDirtPgData,
    flyTapePgData,
    flyTape2PgData,
    chomplrPgData,
  ];

  for await (const page of pages) {
    await seedPg(page);
  }

  console.log("\n");
  console.log("Ending seeding pages");
  console.log("\n\n");
};

const seedAll = async () => {
  await seedPgsCategories();
  await seedPgs();
};

await seedAll();

// export type TPrisma = typeof prisma;
