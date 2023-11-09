import { iosAppPgsPgCategory } from "../pagesCategories";
import { createStandardSect } from "../../utils";
import { type CustomPg } from "../../../../src/libs/utils/types/custom-page";

export { default as chomplrPgData } from "./chomplr";
export { default as flyTapePgData } from "./fly-tape";
export { default as flyTape2PgData } from "./fly-tape-2";
export { default as loFlyDirtPgData } from "./lo-fly-dirt";

const defaultIOSAppsPgs: CustomPg = {
  twClassNameVariants: {
    px: "12",
    py: "8",
    "gap-x": "16",
    "gap-y": "16",
  },
  // image: {
  // 	src: 'https://www.msxaudio.com/cdn/shop/t/28/assets/pf-14628b40-cf9b-4aa0-bb27-4a9d4df56e9c--LoFly-Dirt-App-Banner.jpg?v=1580772023',
  // },
  // title: 'Lo-Fly Dirt',
  // slug: 'lo-fly-dirt',
  pgCategoryName: iosAppPgsPgCategory.name,
  title: "IOS Apps",
  description: null,
  pageStructure: [
    createStandardSect({
      order: 0,
      body: [
        {
          ___type: "header",
          title: "iOS Apps",
          description: "Explore our unique and practical iOS apps.",
        },
      ],
    }),
  ],
};

export default defaultIOSAppsPgs;
