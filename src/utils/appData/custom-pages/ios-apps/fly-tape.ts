import {
	StandardSection,
	BOXES_TYPES_map,
	IframeBox,
	SUB_BOXES_TYPES_map,
	TabsBox,
	Slider,
	CustomPage,
	Grid,
} from '~/utils/types/custom-page';
import { createStandardSection } from '../utils';

export const FlyTapeIOSApp: StandardSection[] = (() => {
	const appLink = 'https://apps.apple.com/us/app/fly-tape/id1343651192';

	const grid: Grid = {
		twClassNameVariants: { 'gap-x': '8' },
		___type: BOXES_TYPES_map['grid'],
		gridTemplateColumns: `repeat(auto-fit, minmax(20rem, 1fr))`,
		items: [
			{
				customPageClassesKeys: ['center-on-ls-md-screens', 'objects-contain'],
				twClassNameVariants: { 'aspect-ratio': 'square' }, // w: '96', h: '96',
				___type: BOXES_TYPES_map['image-only'],
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-f357e20c--Flytapeappdisplay.png?v=1589053729',
			},
			{
				customPageClassesKeys: ['center-on-ls-md-screens'],
				twClassNameVariants: { 'gap-y': '2', px: '4' },
				___type: BOXES_TYPES_map['md'],
				content: `# Fly Tape
## IOS-APP

[![](https://texttofloss.com/wp-content/uploads/2021/01/App-Store-Button-transparent.png?className=w-44)](${appLink})

Fly-Tape is a unique MSXII look on some of the aspects about tape that we love while adding some unique features that are enjoyable!

Fly Tape installs as an iOS AUv3 FX plugin, designed for use within host apps such as Garageband, Beatmaker 3, Cubasis, Audiobus, and more. Standalone mode for demo purposes.`,
			},
		],
	};
	const iframeBox: IframeBox = {
		___type: BOXES_TYPES_map['iframe'],
		___subType: SUB_BOXES_TYPES_map['youtube'],
		src: 'https://www.youtube.com/embed/OLPSb69q5mM?autoplay=0&loop=0&mute=0&controls=0&enablejsapi=1',
	};
	const tabsBox: TabsBox = {
		___type: BOXES_TYPES_map['tabs'],
		tabs: [
			{
				title: 'Description',
				data: {
					twClassNameVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `Named for it's performance style of use, users can adding FX to their incoming audio signals in many ways "on the Fly." Sliders for textured nuances such as hiss & pitch will allow you to dial in tasteful settings that can become reminiscent of cassette tapes. These also can be automated via midi cc for additional modulation.`,
				},
			},
			{
				title: 'Specs',
				data: {
					twClassNameVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `### Fly Tape FX:

Fly Tape includes numerous touch based FX. These FX also release upon button release to enhance the performance experience. Additionally, some FX have more settings upon a quick, double-tap of the effect.


### Play Button

- Will start audio (demo drum loop) in standalone mode
- Disabled while in plugin mode

### Stop Button

- Will stop playing audio with a scrubbing, slow down effect
- Release will resume audio

### Pause Button

- A simple audio mute. Useful for drops in performance
- Release will resume audio

### Bypass Switch

- Bypass Fly-Tape audio effect unit as a whole

### Noise Slider

- Gradual increase of "hiss" simulation from left to right

### Pitch Slider

- Gradual detuning of audio from left (normal) to right (-.50 cents)

### Half-Speed FX Button

- Plays audio at half-speed
- Normal playback resumes on release
- Half-Speed will stay in time with current host tempo

### Saturate Button

- 2 saturation modes "Clean" & "Gritty" available
- Quick double tap will prompt small menu option
- Release will resume normal audio without effect

### Lofi Button

- 3 lofi modes "70's", "80's", and "90's" available
- Quick double tap will prompt small menu option
- Release will resume normal audio without effect

### Loop Button

- Reverses and loops audio while pressed
- Release will resume normal audio without effect

### Stutter Button

- 8 stutter quantize settings available
- Quick double tap will prompt small menu option
- Settings available are 1/2, 1/4, 1/8, 1/8T, 1/16, 1/16T, 1/32, 1/64
- Stutter is immediate upon press, release will resume audio without effect

### Tips:

FX buttons can be chained in unique ways to deliver awesome results such as Lofi "70's --> Saturate "Clean" --> Half-Speed.

All parameters of Fly Tape can be mapped in your favorite hosts. For example, you can map the Noise & Pitch sliders to faders or knobs on your favorite midi controller.

Fly Tape's Midi CC values are listed below:

- Bypass: 102
- Pitch: 103
- Noise: 104
- Tape Stop: 106
- Mute (Pause): 107
- Half-Speed: 108
- Saturate: 109
- Lofi: 110
- Loop: 111
- Stutter: 112`,
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
	
2.0 updates:
- General bug fixes, enhancements, and iOS 12 compatibility issues fixed.

You can check out the reference guide below

[Download Now](https://www.dropbox.com/s/b3fb168ozmz3i4o/MSXII%20Fly%20Tape%202v0%20Final.pdf?dl=0)`,
						},
						{
							customPageClassesKeys: [
								'center-on-ls-md-screens',
								'object-contain',
							],
							// twClassNameVariants: { w: '96' },
							___type: BOXES_TYPES_map['image-only'],
							src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-f7f4b998--FlyTapeManualImage.png?v=1589395846',
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
				src: 'https://www.youtube.com/embed/dAaKwsDX11U?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1',
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/K-W9vtIRAZw?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1',
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/vWyepI8I_R8?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1',
			},
		],
	};
	const slider2: Slider = {
		___type: BOXES_TYPES_map['slider'],
		slidesPerViewType: 'large-slides',
		slides: [
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/B86N3QiHJcn/?utm_source=ig_embed&utm_campaign=loading',
			},
			// {
			// 	___type: BOXES_TYPES_map['iframe'],
			// 	___subType: 'instagram',
			// 	src: 'https://www.instagram.com/p/B8qiCA6i3qa/?utm_source=ig_embed&utm_campaign=loading'
			// },
			// {
			// 	___type: BOXES_TYPES_map['iframe'],
			// 	___subType: 'instagram',
			// 	src: 'https://www.instagram.com/p/BvJsq-qAqzU/?utm_source=ig_embed&utm_campaign=loading'
			// },
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/B7sPExan8Js/?utm_source=ig_embed&utm_campaign=loading',
			},
		],
	};
	const grid2: Grid = {
		___type: BOXES_TYPES_map['grid'],
		twClassNameVariants: { 'gap-y': '3' },
		gridTemplateColumns: `1fr`,
		customPageClassesKeys: ['center-content'],
		items: [
			{
				twClassNameVariants: { rounded: '5xl', w: '40', h: '40' },
				___type: 'image-only',
				src: '/images/custom-page/FlyTapeappicon1.png',
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
			body: [slider2],
			title: 'Fly Tape Around The Web',
			customPageClassesKeys: ['section-container-v1'],
		}),
		createStandardSection({ order: 5, body: [grid2] }),
	];
})();

const flyTapePageData: CustomPage = {
	twClassNameVariants: {
		'max-w': '100ch',
		mx: 'auto',
		px: '8',
		py: '16',
		'gap-x': '16',
		'gap-y': '16',
	},
	slug: 'fly-tape',
	// title: 'Fly Tape',
	categoryName: 'ios-apps-pages',
	pageStructure: FlyTapeIOSApp,
};

export default flyTapePageData;
