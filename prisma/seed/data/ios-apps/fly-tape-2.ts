import {
	StandardSection,
	BOXES_TYPES_map,
	IframeBox,
	SUB_BOXES_TYPES_map,
	TabsBox,
	CustomPage,
	Grid,
} from '../../../../src/utils/types/custom-page';
import { createStandardSection } from '../../utils';
import { iosAppPagesPageCategory } from '../pagesCategories';

const FlyTape2IOSApp: StandardSection[] = (() => {
	const appLink = 'https://apps.apple.com/us/app/fly-tape-2/id1552463664';

	const grid: Grid = {
		twClassNameVariants: { 'gap-x': '8' },
		___type: BOXES_TYPES_map['grid'],
		gridTemplateColumns: `repeat(auto-fit, minmax(20rem, 1fr))`,
		items: [
			{
				customPageClassesKeys: [
					'center-on-ls-md-screens',
					'objects-contain',
					'img-w-h-full',
				],
				twClassNameVariants: { 'aspect-ratio': 'square' }, // w: '96', h: '96',
				___type: BOXES_TYPES_map['image-only'],
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-baa9b738--Screen-Shot-20210324-at-35800-PM.png?v=1616619654',
			},
			{
				twClassNameVariants: { 'gap-y': '2', px: '4' },
				___type: BOXES_TYPES_map['md'],
				customPageClassesKeys: ['center-on-ls-md-screens'],
				content: `# Fly Tape 2
## IOS-APP

[![](https://texttofloss.com/wp-content/uploads/2021/01/App-Store-Button-transparent.png?className=w-44)](${appLink})

FlyTape 2 builds on the principles of the original FlyTape. A love of vintage sounds and character is our thing and FlyTape 2 fits this ethos as a unique take on the features of classic tape. Named for it's style, performance and user improvisation control, it's FX can be added to incoming audio signals in many ways "on the fly". Sliders for textured nuances such as noise hiss will allow you to dial in tasteful settings reminiscent of cassette tapes. These also can be automated via midi cc for additional modulation.

FlyTape 2 installs as an iOS AUv3 plugin effect, designed for use within host apps such as Garageband, Beatmaker 3, Cubasis, Audiobus, and more.`,
			},
		],
	};
	const iframeBox: IframeBox = {
		___type: BOXES_TYPES_map['iframe'],
		___subType: SUB_BOXES_TYPES_map['youtube'],
		src: 'https://www.youtube.com/embed/gTB_8Vc0bXg?autoplay=0&loop=0&mute=0&controls=0&enablejsapi=1',
	};
	const tabsBox: TabsBox = {
		___type: BOXES_TYPES_map['tabs'],
		tabs: [
			{
				title: 'Description',
				data: {
					twClassNameVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `FlyTape 2 builds on the principles of the original FlyTape. A love of vintage sounds and character is our thing and FlyTape 2 fits this ethos as a unique take on the features of classic tape. Named for it's style, performance and user improvisation control, it's FX can be added to incoming audio signals in many ways "on the fly".

Sliders for textured nuances such as noise hiss will allow you to dial in tasteful settings reminiscent of cassette tapes. These also can be automated via midi cc for additional modulation.

FlyTape 2 installs as an iOS AUv3 plugin effect, designed for use within host apps such as Garageband, AUM, Beatmaker 3, Cubasis, Audiobus, and more.

![](https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-baa9b738--Screen-Shot-20210324-at-35800-PM.png?v=1616619654&className=w-1/2,max-w-xs,mx-auto)
					`,
				},
			},
			{
				title: 'Specs',
				data: {
					twClassNameVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `![](https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-70d1e1f6--Screen-Shot-20210331-at-35150-PM-Edited.jpg?v=1617224012)`,
				},
			},
			{
				title: 'User Manual',
				data: {
					twClassNameVariants: { 'gap-x': '8', 'gap-y': '8' },
					___type: BOXES_TYPES_map['grid'],
					gridTemplateColumns: `repeat(auto-fit, minmax(20rem, 1fr))`,
					items: [
						{
							customPageClassesKeys: ['center-on-ls-md-screens'],
							twClassNameVariants: { 'gap-y': '2', px: '4' },
							___type: BOXES_TYPES_map['md'],
							content: `### Whats New:
	
- Fly Tape 2 - Version  1.0 Release

You can check out the reference guide/manual below. Download and save to your iPhone/iPad on iBooks

[Download Now](https://www.dropbox.com/s/ezrh4mgarxka8u2/MSXII%20Fly%20Tape%202%20User%20Manual.pdf?dl=0)

> **READING IS FUNDAMENTAL.**`,
						},
						{
							customPageClassesKeys: [
								'center-on-ls-md-screens',
								'object-contain',
							],
							// twClassNameVariants: { w: '96' },
							___type: BOXES_TYPES_map['image-only'],
							src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-6ed32248--Screen-Shot-20210324-at-13333-PM.png?v=1616610936',
						},
					],
				},
			},
		],
	};
	const iframeBox2: IframeBox = {
		___type: BOXES_TYPES_map['iframe'],
		___subType: SUB_BOXES_TYPES_map['youtube'],
		src: 'https://www.youtube.com/embed/JkfyYC4lqwg?autoplay=0&loop=0&mute=0&controls=0&enablejsapi=1',
	};
	const grid2: Grid = {
		___type: BOXES_TYPES_map['grid'],
		twClassNameVariants: { 'gap-x': '10', 'gap-y': '8' },
		gridTemplateColumns: `repeat(auto-fill, minmax(15rem, 1fr))`,
		items: [
			{
				// 10/10/2022
				___type: BOXES_TYPES_map['quote'],
				cite: 'Reclusorap',
				content: `Good but can be better
I really love this app a lot... i just wish that it will be a standalone where you can upload your tracks directly into it. It would be a plus if the developers could add even more effects than what it have. For people that like that SP-404 type of fx this would be good but not enough to satisfy your needs. I would like to emphasize that having 16 fx's would be a great addition for a Fly Tape 3 version!`,
			},
			{
				// 2y ago
				___type: BOXES_TYPES_map['quote'],
				cite: 'Smoovbeats',
				content: `Got better!!
You guys have done it again! Great app for adding sauce on the fly!`,
			},
			{
				// 2y ago
				___type: BOXES_TYPES_map['quote'],
				cite: 'Geeluminati',
				content: `MSXII Does It Again!
The original Fly Tape was like seasoning to my production but part 2 is now a main ingredient. The efx in real time are top notch like actual gear but somehow better.`,
			},
			// {
			// 	___type: BOXES_TYPES_map['iframe'],
			// 	___subType: 'instagram',
			// 	src: 'https://www.instagram.com/p/CNTX4dLn0hd/?utm_source=ig_embed&utm_campaign=loading'
			// },
			// {
			// 	___type: BOXES_TYPES_map['iframe'],
			// 	___subType: 'instagram',
			// 	src: 'https://www.instagram.com/p/CNS7eIgDxgB/?utm_source=ig_embed&utm_campaign=loading'
			// },
			// {
			// 	___type: BOXES_TYPES_map['iframe'],
			// 	___subType: 'instagram',
			// 	src: 'https://www.instagram.com/p/CNToL2vD7YT/?utm_source=ig_embed&utm_campaign=loading'
			// }
		],
	};
	const grid3: Grid = {
		___type: BOXES_TYPES_map['grid'],
		twClassNameVariants: { 'gap-y': '3' },
		gridTemplateColumns: `1fr`,
		customPageClassesKeys: ['center-content'],
		items: [
			{
				twClassNameVariants: { rounded: '5xl', w: '40', h: '40' },
				___type: 'image-only',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-2248baa9--tape-2-crop.jpg?v=1616617146',
			},
			{
				___type: 'md',
				content: `[![](https://texttofloss.com/wp-content/uploads/2021/01/App-Store-Button-transparent.png?className=w-44)](${appLink})`,
			},
		],
	};

	return [
		createStandardSection({ order: 0, body: [grid] }),
		createStandardSection({ order: 1, body: [tabsBox] }),
		createStandardSection({ order: 2, body: [iframeBox] }),
		createStandardSection({
			order: 3,
			body: [iframeBox2],
			title: 'Tutorial',
			twClassNameVariants: { 'gap-y': '4' },
		}),
		createStandardSection({
			order: 4,
			body: [grid2],
			// title: 'Fly Tape 2 Around The Web',
			twClassNameVariants: { 'gap-y': '8' },
			// customPageClassesKeys: ['section-container-v1']
		}),
		createStandardSection({ order: 5, body: [grid3] }),
	];
})();

const flyTape2PageData: CustomPage = {
	twClassNameVariants: {
		'max-w': '100ch',
		w: 'full',
		mx: 'auto',
		px: '8',
		py: '16',
		'gap-x': '16',
		'gap-y': '16',
	},
	slug: 'fly-tape-2',
	image: {
		src: 'https://res.cloudinary.com/dpjuamt6q/image/upload/v1690933304/Fly_Tape_2_uxgyol.png',
	},
	// title: 'Fly Tape 2',
	pageCategoryName: iosAppPagesPageCategory.name,
	pageStructure: FlyTape2IOSApp,
};

export default flyTape2PageData;
