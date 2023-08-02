import { CustomPage } from '~/utils/types/custom-page';
import { iosAppPagesPageCategory } from '../pagesCategories';
import { createStandardSection } from '../../utils';

export { default as chomplrPageData } from './chomplr';
export { default as flyTapePageData } from './fly-tape';
export { default as flyTape2PageData } from './fly-tape-2';
export { default as loFlyDirtPageData } from './lo-fly-dirt';

const defaultIOSAppsPages: CustomPage = {
	twClassNameVariants: {
		px: '12',
		py: '8',
		'gap-x': '16',
		'gap-y': '16',
	},
	// image: {
	// 	src: 'https://www.msxaudio.com/cdn/shop/t/28/assets/pf-14628b40-cf9b-4aa0-bb27-4a9d4df56e9c--LoFly-Dirt-App-Banner.jpg?v=1580772023',
	// },
	// title: 'Lo-Fly Dirt',
	// slug: 'lo-fly-dirt',
	pageCategoryName: iosAppPagesPageCategory.name,
	title: 'IOS Apps',
	description: null,
	pageStructure: [
		createStandardSection({
			order: 0,
			body: [
				{
					___type: 'header',
					title: 'iOS Apps',
					description: 'Explore our unique and practical iOS apps.',
				},
			],
		}),
	],
};

export default defaultIOSAppsPages;
