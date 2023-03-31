import { BoxVariants } from '../appData';

export const SECTIONS_TYPES = ['standard-section'] as const;
export type SECTIONS_TYPE = (typeof SECTIONS_TYPES)[number];
export const SECTIONS_TYPES_map = Object.fromEntries(
	SECTIONS_TYPES.map((item) => [item, item])
) as {
	[Key in SECTIONS_TYPE]: Key;
};

export const BOXES_TYPES = [
	'two-columns',
	'rows-only',
	'image-only',
	'md',
	'iframe',
	'tabs',
	'slider'
] as const;
export type BOXES_TYPE = (typeof BOXES_TYPES)[number];
export const BOXES_TYPES_map = Object.fromEntries(
	BOXES_TYPES.map((item) => [item, item])
) as {
	[Key in BOXES_TYPE]: Key;
};

export const SUB_BOXES_TYPES = ['youtube', 'instagram', 'soundcloud'] as const;
export type SUB_BOXES_TYPE = (typeof SUB_BOXES_TYPES)[number];
export const SUB_BOXES_TYPES_map = Object.fromEntries(
	SUB_BOXES_TYPES.map((item) => [item, item])
) as {
	[Key in SUB_BOXES_TYPE]: Key;
};

export type ImageOnly = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['image-only'];
	src: string;
};
export type MDBox = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['md'];
	content: string;
};
export type IframeBox = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['iframe'];
	___subType: SUB_BOXES_TYPE;
	src: string;
};
export type TabsBox = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['tabs'];
	tabs: {
		title: string;
		data: Box;
	}[];
};
export type SliderBox = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['slider'];
	slides: IframeBox[];
	slidesPerViewType?: 'default' | 'large-slides'; // ! move to there own enums
};
export type TwoColumnsBox = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['two-columns'];
	columns: (ImageOnly | MDBox)[];
};
export type RowsOnlyBox = {
	___type: (typeof BOXES_TYPES_map)['rows-only'];

	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	rows: Exclude<Box, RowsOnlyBox>[];
};

export type Box =
	| ImageOnly
	| MDBox
	| IframeBox
	| TabsBox
	| SliderBox
	| TwoColumnsBox
	| RowsOnlyBox;

export type StandardSection = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof SECTIONS_TYPES_map)['standard-section'];
	title?: string;
	description?: string;
	body: Box[];
};
