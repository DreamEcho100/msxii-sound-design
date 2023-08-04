import {
	SECTIONS_TYPES_map,
	type StandardSection,
} from '../../../src/utils/types/custom-page';

export const createStandardSection = (
	params: Pick<
		StandardSection,
		| 'order'
		| 'body'
		| 'title'
		| 'description'
		| 'customPageClassesKeys'
		| 'twClassNameVariants'
	>,
): StandardSection => ({
	___type: SECTIONS_TYPES_map['standard-section'],
	twClassNameVariants: { 'gap-x': '2', 'gap-y': '2' },
	...params,
});
