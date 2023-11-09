import {
  BoxTypes,
  IframeBoxTypes,
  PrismaClient,
  SlidesPerViewType,
  type Box as BoxModel,
} from "@prisma/client";
// import page from './data/lo-fly-dirt';
import defaultIOSAppsPages, {
  chomplrPageData,
  flyTape2PageData,
  flyTapePageData,
  loFlyDirtPageData,
} from "./data/ios-apps";
import pagesCategories from "./data/pagesCategories";
import { createId } from "@paralleldrive/cuid2";
import otherCustomPages from "./data/otherCustomPages";
import {
  type Box,
  type CustomPage,
  type RowsOnlyBox,
  TwoColumnsBox,
} from "../../src/libs/utils/types/custom-page";
// import loFlyDirtPageData from './data/lo-fly-dirt';

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

const seedPagesCategories = async () => {
  console.log("Starting seeding pagesCategories");

  await prisma.pageCategory.createMany({
    data: pagesCategories,
  });

  console.log("Ending seeding pagesCategories");
  console.log("\n\n");
};

const seedPage = async (page: CustomPage) => {
  console.log(
    `Starting seeding page: ${page.pageCategoryName}${
      page.slug ? `/${page.slug}` : ""
    }`,
  );

  const createdCustomPage = await prisma.page.create({
    data: {
      id: createId(),
      slug: page.slug,
      updatedAt: null,
      isActive: typeof page.isActive === "boolean" ? page.isActive : true,
      css: {
        create: {
          id: createId(),
          twVariants: page.twClassNameVariants,
          customClasses: page.customPageClassesKeys,
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
      pageCategory: { connect: { name: page.pageCategoryName } },
      image: page.image && {
        connectOrCreate: {
          create: { id: createId(), ...page.image },
          where: { src: page.image.src },
        },
      },
    },
  });

  const sectionToOrderMap = Object.fromEntries(
    page.pageStructure.map((section) => [section.order, section]),
  );

  const createSections = async () =>
    await prisma.$transaction(
      page.pageStructure.map((section) =>
        prisma.section.create({
          data: {
            id: createId(),
            page: { connect: { id: createdCustomPage.id } },
            css: {
              create: {
                id: createId(),
                twVariants: section.twClassNameVariants,
                customClasses: section.customPageClassesKeys,
              },
            },
            order: section.order,
          },
        }),
      ),
    );

  for await (const createdSection of await createSections()) {
    const section = sectionToOrderMap[createdSection.order]!;

    const sectionBoxes: (Exclude<Box, RowsOnlyBox | TwoColumnsBox> & {
      order: number;
    })[] = [];

    type SectionBoxes = typeof sectionBoxes;

    let sizePreBodyLoop = 0;

    if (section.title) {
      sizePreBodyLoop++;
      sectionBoxes.push({
        ___type: "header",
        title: section.title,
        description: section.description,
        order: 0,
      });
    }

    section.body.forEach((box, boxIndex) => {
      if (box.___type === "rows-only" || box.___type === "two-columns") return;

      sectionBoxes.push({ ...box, order: sizePreBodyLoop + boxIndex });
    });

    const createBoxes = async <Meta = undefined>(
      sectionBoxes: SectionBoxes,
      params: {
        sectionId?: string;
        meta?: Meta;
      },
    ): Promise<
      Meta extends undefined ? BoxModel[] : { meta: Meta; boxes: BoxModel[] }
    > => {
      const boxes: BoxModel[] = [];

      const createTypeBoxData = async (
        box: SectionBoxes[number],
      ): Promise<
        | false
        | (Omit<
            Parameters<PrismaClient["box"]["create"]>[0]["data"],
            "id" | "section" | "css" | "sectionId" | "cssId" | "order"
          > &
            Partial<
              Pick<Parameters<PrismaClient["box"]["create"]>[0]["data"], "css">
            >)
      > => {
        switch (box.___type) {
          case "header":
            return {
              type: BoxTypes.HEADER,
              headerBox: {
                create: {
                  id: createId(),
                  title: box.title,
                  description: box.description,
                },
              },
            };

          case "md":
            return {
              type: BoxTypes.MD,
              mdBox: {
                create: { id: createId(), content: box.content },
              },
            };

          case "image-only":
            return {
              type: BoxTypes.IMAGE,
              imageBox: {
                create: {
                  id: createId(),
                  src: box.src,
                  altText: box.altText,
                  width: box.width,
                  height: box.height,
                },
              },
            };

          case "iframe":
            return {
              type: BoxTypes.IFRAME,
              iframeBox: {
                create: {
                  id: createId(),
                  src: box.src,
                  title: box.title,
                  type:
                    box.___subType === "instagram"
                      ? IframeBoxTypes.INSTAGRAM
                      : box.___subType === "soundcloud"
                      ? IframeBoxTypes.SOUND_CLOUD
                      : IframeBoxTypes.YOUTUBE,
                },
              },
            };

          case "quote":
            return {
              type: BoxTypes.QUOTE,
              quoteBox: {
                create: {
                  id: createId(),
                  cite: box.cite,
                  content: box.content,
                },
              },
            };

          case "grid": {
            const itemsData = await createBoxes(
              box.items.map((item, itemIndex) => ({
                ...item,
                order: itemIndex,
              })),
              {},
            ).then((boxes) =>
              boxes.map((box) => ({ id: createId(), boxId: box.id })),
            );

            return {
              type: BoxTypes.GRID,
              grid: {
                create: {
                  id: createId(),
                  gridsBoxes: {
                    createMany: { data: itemsData },
                  },
                },
              },
              css: {
                create: {
                  id: createId(),
                  twVariants: box.twClassNameVariants,
                  customClasses: box.customPageClassesKeys,
                  inlineStyles: {
                    gridTemplateColumns: box.gridTemplateColumns,
                  },
                },
              },
            };
          }

          case "tabs": {
            const itemsData = await createBoxes(
              box.tabs.map((item, itemIndex) => ({
                ...item.data,
                order: itemIndex,
              })),
              {},
            ).then((boxes) =>
              boxes.map((_box, _boxIndex) => ({
                id: createId(),
                boxId: _box.id,
                title: box.tabs[_boxIndex]?.title ?? "",
              })),
            );

            return {
              type: BoxTypes.TABS_HOLDER,
              tabs: {
                create: {
                  id: createId(),
                  tabsBoxes: {
                    createMany: { data: itemsData },
                  },
                },
              },
            };
          }

          case "slider": {
            const slidesData = await createBoxes(
              box.slides.map((item, itemIndex) => ({
                ...item,
                order: itemIndex,
              })),
              {},
            ).then((boxes) =>
              boxes.map((_box, _boxIndex) => ({
                id: createId(),
                boxId: _box.id,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                title: box.slides[_boxIndex]?.title,
              })),
            );

            return {
              type: BoxTypes.SLIDER,
              slider: {
                create: {
                  id: createId(),
                  slidesPerViewType:
                    box.slidesPerViewType === "one-slide"
                      ? SlidesPerViewType.ONE_SLIDE
                      : box.slidesPerViewType === "large-slides"
                      ? SlidesPerViewType.LARGE_SLIDES
                      : SlidesPerViewType.DEFAULT,
                  slidersBoxes: {
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

      for await (const box of sectionBoxes) {
        const boxTypeData = await createTypeBoxData(box);

        if (!boxTypeData) continue;

        boxes.push(
          await prisma.box.create({
            data: {
              id: createId(),
              section: !params.sectionId
                ? undefined
                : { connect: { id: params.sectionId } },
              css: {
                create: {
                  id: createId(),
                  twVariants: box.twClassNameVariants,
                  customClasses: box.customPageClassesKeys,
                },
              },
              order: box.order,
              ...boxTypeData,
            },
          }),
        );
      }

      if (!params.meta) {
        return boxes as unknown as Promise<
          Meta extends undefined
            ? BoxModel[]
            : { meta: Meta; boxes: BoxModel[] }
        >;
      }

      return {
        meta: params.meta,
        boxes,
      } as unknown as Promise<
        Meta extends undefined ? BoxModel[] : { meta: Meta; boxes: BoxModel[] }
      >;
    };

    await createBoxes(sectionBoxes, {
      sectionId: createdSection.id,
    });

    // break; // Closes iterator, triggers return
  }

  console.log(
    `Ending seeding page: ${page.pageCategoryName}${
      page.slug ? `/${page.slug}` : ""
    }`,
  );
  console.log("\n");
};

const seedPages = async () => {
  console.log("Starting seeding pages");
  console.log("\n");

  const pages = [
    ...otherCustomPages,
    defaultIOSAppsPages,
    loFlyDirtPageData,
    flyTapePageData,
    flyTape2PageData,
    chomplrPageData,
  ];

  for await (const page of pages) {
    await seedPage(page);
  }

  console.log("\n");
  console.log("Ending seeding pages");
  console.log("\n\n");
};

const seedAll = async () => {
  await seedPagesCategories();
  await seedPages();
};

await seedAll();

// export type TPrisma = typeof prisma;
