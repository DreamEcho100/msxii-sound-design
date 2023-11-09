import {
  SECTIONS_TYPES_map,
  type StandardSect,
} from "../../../src/libs/utils/types/custom-page";

export const createStandardSect = (
  params: Pick<
    StandardSect,
    | "order"
    | "body"
    | "title"
    | "description"
    | "customPgClassesKeys"
    | "twClassNameVariants"
  >,
): StandardSect => ({
  ___type: SECTIONS_TYPES_map["standard-section"],
  twClassNameVariants: { "gap-x": "2", "gap-y": "2" },
  ...params,
});
