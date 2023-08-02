import {
	StandardSection,
	BOXES_TYPES_map,
	IframeBox,
	SUB_BOXES_TYPES_map,
	TabsBox,
	Slider,
	CustomPage,
	Grid,
} from '../../../../src/utils/types/custom-page';
import { createStandardSection } from '../../utils';
import { iosAppPagesPageCategory } from '../pagesCategories';

export const ChomplrOSApp: StandardSection[] = (() => {
	const appLink = 'https://apps.apple.com/us/app/chomplr/id1470553213';

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
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-8930ec95--Chomplrappdisplay-Edited.jpg?v=1617338387',
			},
			{
				customPageClassesKeys: ['center-on-ls-md-screens'],
				twClassNameVariants: { 'gap-y': '2', px: '4' },
				___type: BOXES_TYPES_map['md'],
				content: `# Chomplr
## IOS-APP

[![](https://texttofloss.com/wp-content/uploads/2021/01/App-Store-Button-transparent.png?className=w-44)](${appLink})

The Chomplr name is taken from sample "Chopping Rompler", inspired by the timeless workflow of creating music using samples. Chomplr brings a new iOS approach to creative sample manipulation.

As a standalone module or AUv3 plugin, Chomplr offers quick access to it's robust sample library and an online store is built in.`,
			},
		],
	};
	const iframeBox: IframeBox = {
		___type: BOXES_TYPES_map['iframe'],
		___subType: SUB_BOXES_TYPES_map['youtube'],
		src: 'https://www.youtube.com/embed/sxgSyJ5J-LE?autoplay=0&loop=0&mute=0&controls=0&enablejsapi=1',
	};
	const tabsBox: TabsBox = {
		___type: BOXES_TYPES_map['tabs'],
		tabs: [
			{
				title: 'Description',
				data: {
					twClassNameVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `The Chomplr name is taken from sample "Chopping Rompler", inspired by the timeless workflow of creating music using samples. Chomplr brings a new iOS approach to creative sample manipulation. As a standalone module or AUv3 plugin, Chomplr offers quick access to it's robust sample library and an online store is built in. All samples in Chomplr are royalty free for use within the app.

Sample data can be edited and one or more effects added and adjusted in quick and simple fashion. While a wealth of parameters are provided, the true user experience and inspiration comes from slicing, tweaking and editing while playing by ear. Chomplr installs as an iOS AUv3 plugin instrument, compatible for use within host apps such as Garageband, Beatmaker 3, Cubasis, Audiobus, AUM, iMPC, and more.

![](https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-bf14c87c--Screen-Shot-20210402-at-121259-AM.png?v=1617340398)`,
				},
			},
			{
				title: 'Specs',
				data: {
					twClassNameVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `![](https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-87726dce--Screen-Shot-20210401-at-114212-PM.png?v=1617338611)`,
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
							content: `### What's New:
Chomplr 1.2.0; 
- adding sample import (IAP) function for .wav / .aiff / .mp3 / .m4a files
- adding support for iPhone
- adding store & browser filtering by type
- other fixes & enhancements

You can check out the reference guide/manual below. Download and save to your iPhone/iPad on iBooks.

[Download Now](https://www.dropbox.com/s/ayvw7jmr6ohu2wv/MSXII-Chomplr%201v2.pdf?dl=0)

> **READING IS FUNDAMENTAL.**`,
						},
						{
							customPageClassesKeys: [
								'center-on-ls-md-screens',
								'object-contain',
							],
							// twClassNameVariants: { w: '96' },
							___type: BOXES_TYPES_map['image-only'],
							src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-edf62089--Screen-Shot-20210621-at-123253-PM.png?v=1624482138',
						},
					],
				},
			},
		],
	};
	const slider: Slider = {
		___type: BOXES_TYPES_map['slider'],
		slides: [
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/Cqg0OA7htUA?autoplay=0&loop=0&mute=0&controls=0&enablejsapi=1',
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/8Z8E2f0-3_s?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1',
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/5KIpovYrVgM?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1',
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/-bc9IS4cTAo?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1',
			},
		],
	};
	const grid2: Grid = {
		___type: BOXES_TYPES_map['grid'],
		twClassNameVariants: { 'gap-x': '10', 'gap-y': '8' },
		gridTemplateColumns: `repeat(auto-fill, minmax(15rem, 1fr))`,
		items: [
			{
				// 01/21/2021
				___type: BOXES_TYPES_map['quote'],
				cite: 'Chim_ere',
				content: `You guys are on to something
Shoutout to you guys. Love the product and the add on capability. Can we look at filesize
reduction maybe something cloud based for the future. Also organization by bpm and key for the samples would be tremendo.
It gives it the crate digger vibe when sorting through but to also have the option would be mad for productivity.
Satisfied customer`,
			},
			{
				// 06/16/2020
				___type: BOXES_TYPES_map['quote'],
				cite: 'John Bartholomew',
				content: `The app we've been waiting for
You know when you search the App Store, looking for a music production app that you didn't know you absolutely NEEDED, well, this is that ONE. Truly a samplers dream, and I'm not exaggerating. MSXii Sound Design has been making sound design incredibly fun, and this app is no exception. Chomplr packs a punch, preloaded with incredible sounds and amazingly easy process to sketch ideas out, and I know I'm only scratching the surface. You have to experience it to know what you've been missing.......
o! Made a fire beat
It's very glitchy. It loses trigger start and end`,
			},
			{
				// 2y ago
				___type: BOXES_TYPES_map['quote'],
				cite: 'Elo The Source',
				content: `I love this romper sampler it's simple and complex at the same time just pick a sound and start sampling & playing looks great feels great the work flow is so smooth and the sounds in stock are great and the store sounds are amazing and affordable a must have but this baby now !!!`,
			},
			{
				// 2y ago
				___type: BOXES_TYPES_map['quote'],
				cite: 'Dee Dot Major Music',
				content: `MXSii does it once again
As a user of a lot of their past products on my iPad, in Maschine & the MPC software they always deliver and this time is no different. This is recommended for anybody that likes making music on the iPad and looking for something new to create with.`,
			},
			{
				// 2y ago
				___type: BOXES_TYPES_map['quote'],
				cite: '1985Music.com',
				content: `Game changing app
MSXII Sound really took iOS music production/beat making to	another level with this. Just download the app and purchase more of their sounds in the app and start creating instantly.`,
			},
		],
		// [
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CLuGkpDDRlb/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CCtMoZNBt7Y/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CMfLPRxjjJN/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CC4LSdjjylx/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CLxm8cRBT0t/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CBfn6gCFlcg/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CBfuNm-l0m7/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CBgycnWhsmX/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CBg6C-DDLte/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CJtubblDjjp/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CBhXuCZAuRH/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CBjGQ8HhQLC/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CBhVAAthJta/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CBjHPxApheh/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CBjxT40AciL/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CB0kO-fhFNr/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CB4Mxc8DOHG/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CB4QghSDOcD/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CB5yz03h-dl/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CB6w5URDkkw/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/padbeatmakers/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CJ5wMLrDvkt/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/tv/CI-kl3fgyhe/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CBlMUq8DUDH/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CIPK_ThjLhm/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/B9w_aSTnFzi/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CBlG2KMDr9Q/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CCALMMbhDQH/?utm_source=ig_embed&utm_campaign=loading'
		// 	},
		// 	{
		// 		___type: BOXES_TYPES_map['iframe'],
		// 		___subType: 'instagram',
		// 		src: 'https://www.instagram.com/p/CByeBQnh9SH/?utm_source=ig_embed&utm_campaign=loading'
		// 	}
		// ]
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
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-ce3c55b2--ChomplrAppstoreicon188x182.png?v=1589530651',
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
			body: [slider],
			title: 'Tutorial',
			twClassNameVariants: { 'gap-y': '4' },
		}),
		createStandardSection({
			order: 4,
			body: [grid2],
			// title: 'Chomplr Around The World',
			twClassNameVariants: { 'gap-y': '8' },
			// customPageClassesKeys: ['section-container-v1']
		}),
		createStandardSection({ order: 5, body: [grid3] }),
	];
})();

const chomplrPageData: CustomPage = {
	twClassNameVariants: {
		'max-w': '100ch',
		w: 'full',
		mx: 'auto',
		px: '8',
		py: '16',
		'gap-x': '16',
		'gap-y': '16',
	},
	slug: 'chomplr',
	image: {
		src: 'https://res.cloudinary.com/dpjuamt6q/image/upload/v1690933296/Chomplr_i937ue.png',
	},
	// title: 'Chomplr',
	pageCategoryName: iosAppPagesPageCategory.name,
	pageStructure: ChomplrOSApp,
};

export default chomplrPageData;
