export * from './hooks';

import { z } from 'zod';
import {
	type GridTemplateData,
	type GridTemplateDataTypes,
	type GridTemplateDataTypesMap,
} from '../types';

export const gridTemplateDataTypesMap: GridTemplateDataTypesMap = {
	empty: 'empty',
	repeatCount: 'repeatCount',
	trackList: 'trackList',
};
export const gridTemplateDataTypesList: GridTemplateDataTypes[] = [
	'empty',
	'repeatCount',
	'trackList',
];

export const getGridTemplateDataTypeEmpty = () => {
	return {
		type: gridTemplateDataTypesMap.empty,
	};
};

const trackListRegex =
	/(?:minmax\(\s*\d+(?:px|rem|%|fr|vw|vh)?\s*,\s*\d+(?:px|rem|%|fr|vw|vh)?\s*\)|fit-content\(\s*\d+(?:px|rem|%|fr|vw|vh)?\s*\)|\d*\.\d+|\d+\.\d*|\d+(?:px|rem|%|fr|vw|vh)|min-content|max-content|auto)(?:\s+|$)/g;
const trackListExamples = [
	'1fr',
	'250px',
	'60%',
	'1fr',
	'min-content',
	'max-content',
	'auto',
	'minmax(100px, 1fr)',
	'fit-content(200px)',
	'10px 30% auto',
	'min-content max-content',
];
const trackListSchema = z.string().nonempty().regex(trackListRegex);
export const getGridTemplateDataTrackListWithoutType = (
	gridTemplate = '1fr 1fr 1fr 1fr 1fr',
) => {
	return {
		trackListRegex,
		trackListSchema,
		trackListExamples,
		trackList: trackListSchema.parse(gridTemplate?.trim()),
	};
};
export const getGridTemplateDataTypeRepeatWithoutType = (
	gridTemplate = 'repeat(auto-fit, minmax(20rem, 1fr))',
) => {
	const formattedStr = gridTemplate.slice(
		'repeat('.length,
		gridTemplate.length - 1,
	);
	const formattedArr = formattedStr.split(new RegExp(`,(.+)`));

	const repeatCountRegex = /auto-fill|auto-fit|\d+/g;
	const repeatCountExamples = ['auto-fill', 'auto-fit', '2', '4', '5'];
	const repeatCount = z
		.string()
		.nonempty()
		.regex(repeatCountRegex)
		.parse(formattedArr[0]);

	return {
		repeatCountRegex,
		repeatCountExamples,
		repeatCount,
		//
		...getGridTemplateDataTrackListWithoutType(formattedArr[1]),
	};
};

export const getGridTemplateData = (str?: string | null): GridTemplateData => {
	if (!str) return getGridTemplateDataTypeEmpty();

	if (str.startsWith('repeat'))
		return {
			type: gridTemplateDataTypesMap.repeatCount,
			...getGridTemplateDataTypeRepeatWithoutType(str),
		};

	return {
		type: gridTemplateDataTypesMap.trackList,
		...getGridTemplateDataTrackListWithoutType(str),
	};
};
