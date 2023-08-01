import { BoxVariants } from '../appData';

export const SECTIONS_TYPES = ['standard-section'] as const;
export type SECTIONS_TYPE = (typeof SECTIONS_TYPES)[number];
export const SECTIONS_TYPES_map = Object.fromEntries(
	SECTIONS_TYPES.map((item) => [item, item]),
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
	'grid',
	'header',
] as const;
export type BOXES_TYPE = (typeof BOXES_TYPES)[number];
export const BOXES_TYPES_map = Object.fromEntries(
	BOXES_TYPES.map((item) => [item, item]),
) as {
	[Key in BOXES_TYPE]: Key;
};

export const SUB_BOXES_TYPES = ['youtube', 'instagram', 'soundcloud'] as const;
export type SUB_BOXES_TYPE = (typeof SUB_BOXES_TYPES)[number];
export const SUB_BOXES_TYPES_map = Object.fromEntries(
	SUB_BOXES_TYPES.map((item) => [item, item]),
) as {
	[Key in SUB_BOXES_TYPE]: Key;
};

// Prisma model done
export type ImageOnly = {
	twClassNameVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['image-only'];
	src: string;
	altText?: string;
	width?: number;
	height?: number;
};
// Prisma model done
export type MdBox = {
	twClassNameVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['md'];
	content: string;
};
// Prisma model done
export type IframeBox = {
	twClassNameVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['iframe'];
	___subType: SUB_BOXES_TYPE;
	src: string;
	title?: string;
};
// Prisma model done
export type QuoteBox = {
	twClassNameVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['quote'];
	cite: string;
	content: string;
};

/**  **/
// Prisma model done
export type TabsBox = {
	twClassNameVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['tabs'];
	tabs: {
		title: string;
		data: Exclude<Box, RowsOnlyBox | TwoColumnsBox>;
	}[];
};
// Prisma model done
export type Slider = {
	twClassNameVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['slider'];
	slides: Exclude<Box, RowsOnlyBox | TwoColumnsBox>[];
	slidesPerViewType?: 'default' | 'one-slide' | 'large-slides'; // ! move to there own enums
};
// Prisma model done
export type Grid = {
	___type: (typeof BOXES_TYPES_map)['grid'];

	twClassNameVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	gridTemplateColumns?: string;
	items: Exclude<Box, RowsOnlyBox | TwoColumnsBox>[]; //(ImageOnly | MdBox | IframeBox | QuoteBox)[];
};
// x
export type TwoColumnsBox = {
	twClassNameVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof BOXES_TYPES_map)['two-columns'];
	columns: (ImageOnly | MdBox)[];
};
// x
export type RowsOnlyBox = {
	___type: (typeof BOXES_TYPES_map)['rows-only'];

	twClassNameVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	rows: Exclude<Box, RowsOnlyBox>[];
};

// { order: number } &
export type Box =
	| {
			twClassNameVariants?: BoxVariants;
			customPageClassesKeys?: string[];
			___type: (typeof BOXES_TYPES_map)['header'];
			title: string;
			description?: string | null;
	  }
	| ImageOnly
	| MdBox
	| IframeBox
	| QuoteBox
	//
	| TabsBox
	| Slider
	| Grid
	// x
	| RowsOnlyBox
	| TwoColumnsBox;

export type StandardSection = {
	twClassNameVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	___type: (typeof SECTIONS_TYPES_map)['standard-section'];
	title?: string;
	description?: string;
	body: Box[];
	order: number;
};

export type CustomPage = {
	twClassNameVariants?: BoxVariants;
	customPageClassesKeys?: string[];
	slug?: string;
	pageCategoryName: string;
	pageStructure: StandardSection[];
	title?: string | null;
	description?: string | null;
	isActive?: boolean;
	image?: {
		src: string;
		altText?: string;
		width?: number;
		height?: number;
	};
};
