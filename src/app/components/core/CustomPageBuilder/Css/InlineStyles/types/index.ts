import { type FormStoreApi } from "@de100/form-echo";
import { z } from "zod";
import { CreateOneInlineStyleCssSchema } from "~/libs/utils/validations-schemas/dashboard/css/inlineStyles";
// import { CreateOneInlineStyleCssSchema } from '~/server/utils/validations-schemas/dashboard/css/inlineStyles';

const zodSchema = z.object(CreateOneInlineStyleCssSchema);

export type InlineStylesFormSchema = z.infer<typeof zodSchema>;

export type InlineStylesFormStore = FormStoreApi<
  InlineStylesFormSchema,
  typeof CreateOneInlineStyleCssSchema
>;

export type InlineStylesFormProps = {
  store: InlineStylesFormStore;
  cssId: string;
  onSuccess: (params: { validatedValues: InlineStylesFormSchema }) => void;
};

//
export type GridTemplateDataTypeEmpty = { type: "empty" };
export type GridTemplateDataTypeRepeat = {
  type: "repeatCount";
  repeatCountRegex: RegExp;
  repeatCountExamples: string[];
  repeatCount: string;
  trackListRegex: RegExp;
  trackListSchema: z.ZodString;
  trackListExamples: string[];
  trackList: string;
};
export type GridTemplateDataTrackList = {
  type: "trackList";
  trackListRegex: RegExp;
  trackListSchema: z.ZodString;
  trackListExamples: string[];
  trackList: string;
};
export type GridTemplateData =
  | GridTemplateDataTypeEmpty
  | GridTemplateDataTypeRepeat
  | GridTemplateDataTrackList;
export type GridTemplateDataTypes = GridTemplateData["type"];
export type GridTemplateDataTypesMap = {
  [Key in GridTemplateDataTypes]: Key;
};
