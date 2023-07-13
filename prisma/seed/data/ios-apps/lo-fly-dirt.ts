// https://assets.stickpng.com/images/5a902db97f96951c82922874.png

import {
	StandardSection,
	BOXES_TYPES_map,
	IframeBox,
	SUB_BOXES_TYPES_map,
	TabsBox,
	SliderBox,
	CustomPage,
	GridBox,
} from '../../../../src/utils/types/custom-page';
import { createStandardSection } from '../../utils';

const LoflyDirtIOSApp: StandardSection[] = (() => {
	const appLink =
		'https://apps.apple.com/us/app/lo-fly-dirt/id1292776927?ign-mpt=uo%3D4';

	const gridBox: GridBox = {
		twClassNameVariants: { 'gap-x': '8' },
		___type: BOXES_TYPES_map['grid'],
		gridTemplateColumns: `repeat(auto-fit, minmax(20rem, 1fr))`,
		items: [
			{
				customPageClassesKeys: ['center-on-ls-md-screens', 'objects-contain'],
				twClassNameVariants: { 'aspect-ratio': 'square' }, // w: '96', h: '96',
				___type: BOXES_TYPES_map['image-only'],
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-50b7d524--Screen-Shot-20200327-at-12507-AM.png?v=1585290536',
			},
			{
				customPageClassesKeys: ['center-on-ls-md-screens'],
				twClassNameVariants: { 'gap-y': '2', px: '4' },
				___type: BOXES_TYPES_map['md'],
				content: `# LO-FLY DIRT
	
## IOS-APP

[![](https://texttofloss.com/wp-content/uploads/2021/01/App-Store-Button-transparent.png?className=w-44)](${appLink})

An audio coloration utility plugin featuring individual modes for classic emulation of some iconic music production tools. This tool is meant to bring character, or "dirt" to your incoming audio signals. Lo-Fly Dirt installs as an Audio Unit effect for hosts that support the format such as Audio Bus, Beatmaker 3, Garage Band, Cubasis, AUM, etc.`,
			},
		],
	};
	const iframeBox: IframeBox = {
		___type: BOXES_TYPES_map['iframe'],
		___subType: SUB_BOXES_TYPES_map['youtube'],
		src: 'https://www.youtube.com/embed/GeD0lopiqsw?autoplay=0&loop=0&mute=0&controls=0&enablejsapi=1',
	};
	const tabsBox: TabsBox = {
		___type: BOXES_TYPES_map['tabs'],
		tabs: [
			{
				title: 'Description',
				data: {
					twClassNameVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `An audio coloration utility plugin featuring individual modes for classic emulation of some iconic music production tools. This tool is meant to bring character, or "dirt" to your incoming audio signals.
					
Lo-Fly Dirt installs as an Audio Unit effect for hosts that support the format such as AUM, Audio Bus, Beatmaker 3, Garage Band, Cubasis, etc.`,
				},
			},
			{
				title: 'Specs',
				data: {
					twClassNameVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `### Default Mode:
	
Adds subtle character of the input sound. Simple saturation and light, preset compression are added to the overall sound bringing out unique tones & textures of your source audio. The wet/dry knob at the 100 or full position would leave source audio "warmed up.

### 60 Mode:

This preset mode is based on some of our favorite characteristics of an iconic drum machine. Activating this button should invite you to 12 bit nostalgia immediately boasting tasteful saturation, small amounts of compression, and a more rounded high end. Great on drums

### 404 Mode:

One of our favorites, this mode is the only mode that should add subtle low-pass filtering to the input signal. This mode will apply low pass filtering at 12db per octave around 11.6Khz. The wet/dry knob will continue to filter the sound to no more than 200Hz. The signal will benefit from some additional signal boosting with minimal make-up gain and small amounts of bit rate reduction, or "dirt.

### 1200 Mode:

Also built around our love for another iconic drum machine, this mode brings great punch, character, and dirt to any signal it treats. Especially useful for drums and percussion based audio. more punchier variation of the 60 mode. Enjoy 12 bit goodness by default, but additionally a boost the signals character by our dirt and boost in the low-mid frequencies

### 8 Bit Mode: 

Simply put, this mode brings back the classic sound of a legendary game console. We've added a bit of punch to the incoming signal and you're able to blend it with great 8 bit artifacts that will allow for some brand new creations...and fun

### SK- 5 Mode:

Also built off the things we love about the classic 8 bit sound, but with a twist...this mode adds HP filtering and punch! Instant dirt is applied when this mode is activated, high pass filtering and punch is applied as you move the signal from dry to wet. The HP filter is set to cutoff at 300Hz`,
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
	
3.0 updates:
- Adding factory & user presets
- Other fixes & enhancements

You can check out the reference guide below:

[Download Now](https://www.dropbox.com/s/qe3zlonoboja003/MSXII%20Lo-Fly%20Dirt%202v5%20Final.pdf?dl=0)`,
						},
						{
							customPageClassesKeys: [
								'center-on-ls-md-screens',
								'object-contain',
							],
							// twClassNameVariants: { w: '96' },
							___type: BOXES_TYPES_map['image-only'],
							src: '/images/ios-apps/Lo-fly@2x (1).jpg',
						},
					],
				},
			},
		],
	};
	const sliderBox: SliderBox = {
		___type: BOXES_TYPES_map['slider'],
		slides: [
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/fVYFHfw5bxE?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1',
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/vWyepI8I_R8?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1',
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/cGYDLxCIKnc?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1',
			},
		],
	};
	const gridBox2: GridBox = {
		___type: BOXES_TYPES_map['grid'],
		twClassNameVariants: { 'gap-x': '10', 'gap-y': '8' },
		gridTemplateColumns: `repeat(auto-fill, minmax(15rem, 1fr))`,
		items: [
			{
				// 06/06/2020
				___type: BOXES_TYPES_map['quote'],
				cite: 'John Bartholomew',
				content: `Sound design made easy!!
Such a great app. Makes sound design super easy and fun. Add texture to your drums and make them stand out in the mix with a punch. Really with this app bring flava to any sound within your productions. Definitely cop this if you have been missing out!`,
			},
			{
				// 02/01/2021
				___type: BOXES_TYPES_map['quote'],
				cite: 'seltzernpopcorn',
				content: `iiilllilillliiiild(-_-)bliiiilllilillliii
Thank you to MSXII for putting out this indispensable app for any producer looking to add a layer of grit and dirt that most distortion effects just don't do. I find myself using it on just about every production. The added presets have been wonderful (Goose Down in particular) I'll be bumping the MSXII creations through AUM and KOALA from here on out. SALUTE`,
			},
			{
				// 07/05/2020
				___type: BOXES_TYPES_map['quote'],
				cite: 'Dj Jiggz',
				content: `Use it on everything
I love how this app makes my samples sound. Plus its so much easier to treat a track with lo- fly rather than all the steps it would take to do the same thing with a number of different effects and plugins. Saturation, compression, bit reduction and more with just the turn of a knob and a few button presses. I use it on all my drum kits too. It gets a lot of use for many things.`,
			},
			// {
			// 	___type: BOXES_TYPES_map['iframe'],
			// 	___subType: 'instagram',
			// 	src: 'https://www.instagram.com/p/B-PxUFQDDJv/?utm_source=ig_embed&utm_campaign=loading'
			// },
			// {
			// 	___type: BOXES_TYPES_map['iframe'],
			// 	___subType: 'instagram',
			// 	src: 'https://www.instagram.com/p/B7zHSBxHmrw/?utm_source=ig_embed&utm_campaign=loading'
			// },
			// {
			// 	___type: BOXES_TYPES_map['iframe'],
			// 	___subType: 'instagram',
			// 	src: 'https://www.instagram.com/p/BhcibxMAG8Z/?utm_source=ig_embed&utm_campaign=loading'
			// },
			// {
			// 	___type: BOXES_TYPES_map['iframe'],
			// 	___subType: 'instagram',
			// 	src: 'https://www.instagram.com/p/B7sPExan8Js/?utm_source=ig_embed&utm_campaign=loading'
			// }
		],
	};
	const gridBox3: GridBox = {
		___type: BOXES_TYPES_map['grid'],
		twClassNameVariants: { 'gap-y': '3' },
		gridTemplateColumns: `1fr`,
		customPageClassesKeys: ['center-content'],
		items: [
			{
				twClassNameVariants: { rounded: '5xl', w: '40', h: '40' },
				___type: 'image-only',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-d22a5c09--MSXIIAUDIOLOFIDIRTAPPICON3x-Edited.jpg?v=1582621861',
			},
			{
				___type: 'md',
				content: `[![](https://texttofloss.com/wp-content/uploads/2021/01/App-Store-Button-transparent.png?className=w-44)](${appLink})`,
			},
		],
	};

	return [
		createStandardSection({ order: 0, body: [gridBox] }),
		createStandardSection({ order: 1, body: [tabsBox] }),
		createStandardSection({ order: 2, body: [iframeBox] }),
		createStandardSection({
			order: 3,
			body: [sliderBox],
			title: 'Tutorial',
			twClassNameVariants: { 'gap-y': '4' },
		}),
		createStandardSection({
			order: 4,
			body: [gridBox2],
			// title: 'LO-FLY Dirt Around The Web',
			twClassNameVariants: { 'gap-y': '8' },
			// customPageClassesKeys: ['section-container-v1']
		}),
		createStandardSection({ order: 5, body: [gridBox3] }),
	];
})();

const loFlyDirtPageData: CustomPage = {
	twClassNameVariants: {
		'max-w': '100ch',
		mx: 'auto',
		px: '8',
		py: '16',
		'gap-x': '16',
		'gap-y': '16',
	},
	// title: 'Lo-Fly Dirt',
	slug: 'lo-fly-dirt',
	category: 'ios-app-page',
	pageStructure: LoflyDirtIOSApp,
};

export default loFlyDirtPageData;
