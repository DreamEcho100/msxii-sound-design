export * from './custom-pages/utils';

import { CustomPage } from '../types/custom-page';

export const loFlyDirtBasicData = {
	title: 'Lo-Fly Dirt',
	slug: 'lo-fly-dirt',
};
export const flyTape2BasicData = {
	title: 'Fly Tape 2',
	slug: 'fly-tape-2',
};
export const flyTapeBasicData = {
	title: 'Fly Tape',
	slug: 'fly-tape',
};
export const chomplrBasicData = {
	title: 'Chomplr',
	slug: 'chomplr',
};

export const IOSProductsBasicData = [
	loFlyDirtBasicData,
	flyTape2BasicData,
	flyTapeBasicData,
	chomplrBasicData,
];

export const CustomPages: CustomPage[] = [
	{
		twClassNameVariants: {
			'gap-x': '16',
			'gap-y': '16',
		},
		slug: 'champion-hoodie',
		pageCategoryName: 'merch',
		pageStructure: [
			{
				order: 0,
				twClassNameVariants: { 'gap-y': '16' },
				___type: 'standard-section',
				body: [
					{
						twClassNameVariants: { 'max-w': '125ch', mx: 'auto' },
						customPageClassesKeys: ['blog-post'],
						___type: 'md',
						content: `## Details
Lorem ipsum dolor sit amet consectetur adipisicing elit.
Necessitatibus amet tempore delectus voluptatibus perspiciatis, et
tempora non, deserunt molestias sint unde at debitis obcaecati nobis
incidunt asperiores. Fugit, doloremque voluptates.

|                 |     S    |   M      |     L    |     X    |    2XL   |
| --------------- | -------- | -------- | -------- | -------- | -------- |
| Length (inches) |  27 1/2  |  28 1/2  |  29 1/2  |  30 1/2  |  31 1/2  |
| Width (inches)  |    21    |    23    | 	25 	 	 |    27  	|	 29      |

`,
					},
				],
			},
		],
	},
];
