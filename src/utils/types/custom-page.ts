export const SECTIONS_TYPES = ['standard-section'] as const;
export type SECTIONS_TYPE = (typeof SECTIONS_TYPES)[number];
export const SECTIONS_TYPES_map = Object.fromEntries(
	SECTIONS_TYPES.map((item) => [item, item])
) as {
	[Key in SECTIONS_TYPE]: Key;
};

export const BOXES_TYPES = [
	'two-columns',
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

export const SUB_BOXES_TYPES = ['youtube', 'instagram'] as const;
export type SUB_BOXES_TYPE = (typeof SUB_BOXES_TYPES)[number];
export const SUB_BOXES_TYPES_map = Object.fromEntries(
	SUB_BOXES_TYPES.map((item) => [item, item])
) as {
	[Key in SUB_BOXES_TYPE]: Key;
};

export type ImageOnly = {
	___type: (typeof BOXES_TYPES_map)['image-only'];
	src: string;
};
export type MDBox = {
	___type: (typeof BOXES_TYPES_map)['md'];
	content: string;
};
export type IframeBox = {
	___type: (typeof BOXES_TYPES_map)['iframe'];
	___subType: SUB_BOXES_TYPE;
	src: string;
};
export type TabsBox = {
	___type: (typeof BOXES_TYPES_map)['tabs'];
	tabs: {
		title: string;
		data: Box;
	}[];
};
export type SliderBox = {
	___type: (typeof BOXES_TYPES_map)['slider'];
	slides: IframeBox[];
	slidesPerViewType?: 'default' | 'large-slides'; // ! move to there own enums
};
export type TwoColumnsBox = {
	___type: (typeof BOXES_TYPES_map)['two-columns'];
	columns: (ImageOnly | MDBox)[];
};

export type Box =
	| ImageOnly
	| MDBox
	| IframeBox
	| TabsBox
	| SliderBox
	| TwoColumnsBox;

export type StandardSection = {
	___type: (typeof SECTIONS_TYPES_map)['standard-section'];
	customPageClassesKeys?: string[];
	title?: string;
	description?: string;
	body: Box[];
};
