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
	'slider',
	'quote',
	'grid'
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

// Prisma model done
export type ImageOnly = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['image-only'];
	src: string;
};
// Prisma model done
export type MDBox = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['md'];
	content: string;
};
// Prisma model done
export type IframeBox = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['iframe'];
	___subType: SUB_BOXES_TYPE;
	src: string;
};
// Prisma model done
export type QuoteBox = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['quote'];
	cite: string;
	content: string;
};

/**  **/
// Prisma model done
export type TabsBox = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['tabs'];
	tabs: {
		title: string;
		data: Box;
	}[];
};
// Prisma model done
export type SliderBox = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['slider'];
	slides: (IframeBox | QuoteBox)[];
	slidesPerViewType?: 'default' | 'one-slide' | 'large-slides'; // ! move to there own enums
};
export type TwoColumnsBox = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['two-columns'];
	columns: (ImageOnly | MDBox)[];
};
export type GridBox = {
	___type: (typeof BOXES_TYPES_map)['grid'];

	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	// rows: Exclude<Box, RowsOnlyBox>[];
	_gridTemplateColumns?: {
		min1: string;
		min2?: string;
	};
	gridTemplateColumns?: string;
	items: (ImageOnly | MDBox | IframeBox | QuoteBox)[];
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
	| QuoteBox
	//
	| RowsOnlyBox
	//
	| TabsBox
	| SliderBox
	| TwoColumnsBox
	| GridBox;

export type StandardSection = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof SECTIONS_TYPES_map)['standard-section'];
	title?: string;
	description?: string;
	body: Box[];
};

export type CustomPage = {
	stylesVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	slug: string;
	mainTag?: string | undefined;
	pageStructure: StandardSection[];
};
