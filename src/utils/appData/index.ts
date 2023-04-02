import { VariantProps, cva } from 'class-variance-authority';

import { ShopifyProduct } from '../types';
import {
	TwoColumnsBox,
	BOXES_TYPES_map,
	IframeBox,
	SUB_BOXES_TYPES_map,
	TabsBox,
	SliderBox,
	StandardSection,
	SECTIONS_TYPES_map,
	RowsOnlyBox,
	CustomPage
} from '../types/custom-page';

const handleDefaultImagesPath = (path: string) => `/images/${path}`;

export enum ProductsTags {
	'New Releases' = 'New Releases',
	'Drum Kits' = 'Drum Kits',
	'Sample Packs' = 'Sample Packs',
	'Vinyl' = 'Vinyl',
	'Bundles' = 'Bundles',
	'Loops' = 'Loops',
	'One Shot Drums' = 'One Shot Drums',
	'Instrument Kits' = 'Instrument Kits',
	'Presets' = 'Presets',
	FreeLabel = 'Free Label'
}

export const fakeProductsBaseData = [
	{
		id: 1,
		title: 'Loops Go Crazy Vol. 5',
		price: 26.99,
		image: {
			src: handleDefaultImagesPath(
				'e6b9160e7b1a4bcfd9c8903c6b599305abd525fb.png'
			),
			alt: ''
		}
	},
	{
		id: 2,
		title: 'Schlump Loops Bundle',
		price: 369.99,
		image: {
			src: handleDefaultImagesPath(
				'cdf81d3835669a8af7c9b66cf2e0a098d0e62e69.png'
			),
			alt: ''
		}
	},
	{
		id: 3,
		title: 'The Horns of Ivory Soul Vol. 1',
		price: 437.84,
		image: {
			src: handleDefaultImagesPath(
				'17ee6b38a84b6a0fbb09316f5e46c8c0d039c40e.png'
			),
			alt: ''
		}
	},
	{
		id: 4,
		title: 'R&B Soul Guitar Loops Vol. 1',
		price: 24.99,
		image: {
			src: handleDefaultImagesPath(
				'c01cc1aeb8019c3d4605c89f0f27cf8d89b48307.png'
			),
			alt: ''
		}
	},
	{
		id: 5,
		title: 'High Art Vol. 1 - Tastemakers Edition',
		price: 26.99,
		image: {
			src: handleDefaultImagesPath(
				'cdf81d3835669a8af7c9b66cf2e0a098d0e62e69.png'
			),
			alt: ''
		}
	},
	{
		id: 6,
		title: 'Cassettes & Pedals Bundle',
		price: 39.99,
		image: {
			src: handleDefaultImagesPath(
				'cab913d3485600dd99e93f305b788f0cf3aefe5e.png'
			),
			alt: ''
		}
	},
	{
		id: 7,
		title: 'Sammich Kit 12',
		price: 27.99,
		image: {
			src: handleDefaultImagesPath(
				'87b6dec7d5bcf2c68d8bc2c35d17733ec4fbc969.png'
			),
			alt: ''
		}
	}
];

export const fakeProductsData = [
	...fakeProductsBaseData,
	...fakeProductsBaseData,
	...fakeProductsBaseData,
	...fakeProductsBaseData
].map((product) => ({ key: `${Date.now()}-${Math.random()}`, ...product }));

export const loopsGoCrazyVol5Product: ShopifyProduct = {
	id: 6879014912066,
	title: 'Loops Go Crazy Vol. 5',
	handle: 'loops-go-crazy-vol-5',
	description:
		'\u003cmeta charset="UTF-8"\u003e\n\u003cp data-mce-fragment="1"\u003eThe worldwide conglomerate @MSXIISOUND continues to keep music producers worldwide inspired with\u00a0the\u00a0Loops Go Crazy Vol. 5\u00a0sample pack! Back with the vibes, fans of our Billboard #1, multiple Grammy Nominated\u00a0\u003ca data-mce-fragment="1" href="https://www.msxaudio.com/search?type=product\u0026amp;q=lofi+melodics" target="_blank" data-mce-href="https://www.msxaudio.com/search?type=product\u0026amp;q=lofi+melodics"\u003eLofi Melodics\u003c/a\u003e series will find\u00a0this goldmine game changing!\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003e35\u00a0original\u00a0loops ready to rock in various tempos, keys, and with numerous textures and colors. Processed tastefully to add warmth, depth, and a creative touch, Loops Go Crazy Vol. 5\u00a0boasts more creativity, better\u00a0textures and the MSXII authentication you\'re looking for!\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eWhen you need the best, tap in with MSXII. Purchase now \u0026amp; be a champ.\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003e\u003cem data-mce-fragment="1"\u003eDemo showcases a selection of these samples in the pack!\u003c/em\u003e\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/TDI_97_Gu6c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen\u003e\u003c/iframe\u003e',
	published_at: '2023-01-20T18:42:55-06:00',
	created_at: '2023-01-20T18:42:50-06:00',
	vendor: 'MSXII Sound',
	type: '',
	tags: [ProductsTags.Loops],
	price: 84200,
	price_min: 84200,
	price_max: 84200,
	available: true,
	price_varies: false,
	compare_at_price: null,
	compare_at_price_min: 0,
	compare_at_price_max: 0,
	compare_at_price_varies: false,
	variants: [
		{
			id: 40172137873474,
			title: 'Default Title',
			option1: 'Default Title',
			option2: null,
			option3: null,
			sku: '',
			requires_shipping: false,
			taxable: false,
			featured_image: null,
			available: true,
			name: 'Loops Go Crazy Vol. 5',
			public_title: null,
			options: ['Default Title'],
			price: 84200,
			weight: 0,
			compare_at_price: null,
			inventory_quantity: -17,
			inventory_management: null,
			inventory_policy: 'deny',
			barcode: '',
			requires_selling_plan: false,
			selling_plan_allocations: []
		}
	],
	images: [
		'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazyVol.5Artwork.jpg?v=1674261773'
	],
	featured_image:
		'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazyVol.5Artwork.jpg?v=1674261773',
	options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
	url: '/products/loops-go-crazy-vol-5',
	media: [
		{
			alt: null,
			id: 22349355614274,
			position: 1,
			preview_image: {
				aspect_ratio: 1.0,
				height: 2000,
				width: 2000,
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazyVol.5Artwork.jpg?v=1674261773'
			},
			aspect_ratio: 1.0,
			height: 2000,
			media_type: 'image',
			src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazyVol.5Artwork.jpg?v=1674261773',
			width: 2000
		}
	],
	requires_selling_plan: false,
	selling_plan_groups: []
};

export const shopifyFakeProductsData: ShopifyProduct[] = [
	{
		id: 4740822827074,
		title: 'The Horns of Ivory Soul Vol. 1',
		handle: 'the-horns-of-ivory-soul-vol-1',
		description:
			'\u003cp\u003eMSXII Sound Design is proud to release The Horns of Ivory Soul Vol. 1! This instrument kit is built to pair with the first installment of our\u00a0\u003ca href="https://www.msxaudio.com/products/ivory-soul-vol-1-all-piano-chords-progressions" target="_blank"\u003eIvory Soul\u003c/a\u003e piano collection. We\'re bringing you soul, jazz, and vibes to sample from.\u00a0\u003c/p\u003e\n\u003cp\u003eWhen these horns are added to Ivory Soul, they go to a completely different stratosphere. They work incredible as is (if you just want to chop the horns alone), but this kit of 41 vintage horn stacks and solos longs for Ivory Soul! Enjoy and stay winning with MSXII Sound Design.\u00a0\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/-6sAjZIeHAU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""\u003e\u003c/iframe\u003e\n\u003cp\u003e\u003cem\u003e*Demo showcases the horns from this pack over the Ivory Soul Vol. 1 pianos. The pianos are not included in this product*\u003c/em\u003e\u003c/p\u003e',
		published_at: '2020-11-25T03:31:48-06:00',
		created_at: '2020-11-25T03:31:47-06:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags['New Releases']],
		price: 78000,
		price_min: 78000,
		price_max: 78000,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 32568466833474,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'The Horns of Ivory Soul Vol. 1',
				public_title: null,
				options: ['Default Title'],
				price: 78000,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -25,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/HornsofIvorySoul1art.jpg?v=1606296709'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/HornsofIvorySoul1art.jpg?v=1606296709',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/the-horns-of-ivory-soul-vol-1',
		media: [
			{
				alt: null,
				id: 7153028694082,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/HornsofIvorySoul1art.jpg?v=1606296709'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/HornsofIvorySoul1art.jpg?v=1606296709',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	loopsGoCrazyVol5Product,
	{
		id: 6849904443458,
		title: 'Schlump Loops Bundle',
		handle: 'schlump-loops-bundle',
		description:
			'\u003cp\u003eAll Schlump Loops combined into one bundled price! Over 420 schwangin, laid-back, off groove drum loops for you to use as-is or cut up for your music production. Here\'s what you\'ll get:\u003c/p\u003e\n\u003col\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-1" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 1\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-2" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 2\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-3" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 3\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-4" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 4\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-5" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 5\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-6" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 6\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-7" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 7\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-8" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 8\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-9" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 9\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-10" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 10\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-11" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 11\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-12" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 12\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-13" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 13\u003c/a\u003e\u003c/span\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\u003cspan style="font-size: 1.4em;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-loops-14" target="_blank" rel="noopener noreferrer"\u003eSchlump Loops 14\u003c/a\u003e\u003c/span\u003e\u003c/li\u003e\n\u003c/ol\u003e\n\u003ciframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/337241144\u0026amp;color=%23ff5500\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" height="166" width="100%" allow="autoplay" frameborder="no" scrolling="no"\u003e\u003c/iframe\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca style="color: #cccccc; text-decoration: none;" title="MSXIISound" href="https://soundcloud.com/msxiisound" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca style="color: #cccccc; text-decoration: none;" title="Schlump Loops Demo" href="https://soundcloud.com/msxiisound/schlump-drums-demo" target="_blank"\u003eSchlump Loops Demo\u003c/a\u003e\n\u003c/div\u003e\n\u003ciframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/338229397\u0026amp;color=%23ff5500\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" height="166" width="100%" allow="autoplay" frameborder="no" scrolling="no"\u003e\u003c/iframe\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca style="color: #cccccc; text-decoration: none;" title="MSXIISound" href="https://soundcloud.com/msxiisound" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca style="color: #cccccc; text-decoration: none;" title="Schlump Loops 2 Demo" href="https://soundcloud.com/msxiisound/schlump-loops-2-demo" target="_blank"\u003eSchlump Loops 2 Demo\u003c/a\u003e\n\u003c/div\u003e\n\u003ciframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/345657094\u0026amp;color=%23ff5500\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" height="166" width="100%" allow="autoplay" frameborder="no" scrolling="no"\u003e\u003c/iframe\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca style="color: #cccccc; text-decoration: none;" title="MSXIISound" href="https://soundcloud.com/msxiisound" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca style="color: #cccccc; text-decoration: none;" title="MSXII - Schlump Loops 3 Demo [Heated Edition]" href="https://soundcloud.com/msxiisound/msxii-schlump-loops-3-demo-heated-edition" target="_blank"\u003eMSXII - Schlump Loops 3 Demo [Heated Edition]\u003c/a\u003e\n\u003c/div\u003e\n\u003ciframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/414654237\u0026amp;color=%23ff5500\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" height="166" width="100%" allow="autoplay" frameborder="no" scrolling="no"\u003e\u003c/iframe\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca style="color: #cccccc; text-decoration: none;" title="MSXIISound" href="https://soundcloud.com/msxiisound" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca style="color: #cccccc; text-decoration: none;" title="Schlump Loops 4 Demo" href="https://soundcloud.com/msxiisound/schlump-loops-4-demo" target="_blank"\u003eSchlump Loops 4 Demo\u003c/a\u003e\n\u003c/div\u003e\n\u003ciframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/473689746\u0026amp;color=%23ff5500\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" height="166" width="100%" allow="autoplay" frameborder="no" scrolling="no"\u003e\u003c/iframe\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca style="color: #cccccc; text-decoration: none;" title="MSXIISound" href="https://soundcloud.com/msxiisound" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca style="color: #cccccc; text-decoration: none;" title="Schlump Loops 5 Demo" href="https://soundcloud.com/msxiisound/schlump-loops-5-demo" target="_blank"\u003eSchlump Loops 5 Demo\u003c/a\u003e\n\u003c/div\u003e\n\u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/-r2sMTHi5jU" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e \u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/0snOf1pjrbk" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e \u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/M8giEsOiYUI" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e \u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/lmJPym6QtaQ" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e \u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/3hUyGvvfr5I" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e \u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/6_AAYVVJlVc" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e \u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/XG1WXJRNh1k" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e \u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/BnhYZqMWfcg" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e \u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/MwjZ0Vr7Mh8" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e',
		published_at: '2022-11-18T16:26:48-06:00',
		created_at: '2022-11-18T16:26:39-06:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Bundles, ProductsTags.Loops],
		price: 1153800,
		price_min: 1153800,
		price_max: 1153800,
		available: true,
		price_varies: false,
		compare_at_price: 1365400,
		compare_at_price_min: 1365400,
		compare_at_price_max: 1365400,
		compare_at_price_varies: false,
		variants: [
			{
				id: 40090143293506,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Schlump Loops Bundle',
				public_title: null,
				options: ['Default Title'],
				price: 1153800,
				weight: 0,
				compare_at_price: 1365400,
				inventory_quantity: 0,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops-BUNDLEart.jpg?v=1668810401',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops1art.jpg?v=1668810402',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops2artwork.jpg?v=1668810402',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops3art.jpg?v=1668810401',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops4art.jpg?v=1668810401',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops5art.jpg?v=1668810403',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops6.jpg?v=1668810403',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops7_976a0793-7481-4199-81be-65f0cf748dd3.jpg?v=1668810403',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops8art_65caf9fa-0cc8-4519-a060-a3ceb592d970.jpg?v=1668810402',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops9artwork.jpg?v=1668810402',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops10artwork_9e2b2a11-333c-413a-a9db-de799f71a8ad.jpg?v=1668810403',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops11artwork_54a02c6b-6a6e-4ba5-8252-6f4124607c20.jpg?v=1668810403',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops12artwork_a36d3984-f8dd-47a8-8a91-334c6489cfd0.jpg?v=1668810402',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops13art_ff098f20-be03-48c3-ba15-1145df42ce81.jpg?v=1668810401',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops14art_ab274abf-1ef0-463d-bdaa-e365f4f23850.jpg?v=1668810402'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops-BUNDLEart.jpg?v=1668810401',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/schlump-loops-bundle',
		media: [
			{
				alt: null,
				id: 22080560791618,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops-BUNDLEart.jpg?v=1668810401'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops-BUNDLEart.jpg?v=1668810401',
				width: 2000
			},
			{
				alt: null,
				id: 22080560824386,
				position: 2,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops1art.jpg?v=1668810402'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops1art.jpg?v=1668810402',
				width: 2000
			},
			{
				alt: null,
				id: 22080560857154,
				position: 3,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops2artwork.jpg?v=1668810402'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops2artwork.jpg?v=1668810402',
				width: 2000
			},
			{
				alt: null,
				id: 22080560889922,
				position: 4,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops3art.jpg?v=1668810401'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops3art.jpg?v=1668810401',
				width: 2000
			},
			{
				alt: null,
				id: 22080560922690,
				position: 5,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops4art.jpg?v=1668810401'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops4art.jpg?v=1668810401',
				width: 2000
			},
			{
				alt: null,
				id: 22080560955458,
				position: 6,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops5art.jpg?v=1668810403'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops5art.jpg?v=1668810403',
				width: 2000
			},
			{
				alt: null,
				id: 22080560988226,
				position: 7,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops6.jpg?v=1668810403'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops6.jpg?v=1668810403',
				width: 2000
			},
			{
				alt: null,
				id: 22080561020994,
				position: 8,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops7_976a0793-7481-4199-81be-65f0cf748dd3.jpg?v=1668810403'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops7_976a0793-7481-4199-81be-65f0cf748dd3.jpg?v=1668810403',
				width: 2000
			},
			{
				alt: null,
				id: 22080561053762,
				position: 9,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops8art_65caf9fa-0cc8-4519-a060-a3ceb592d970.jpg?v=1668810402'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops8art_65caf9fa-0cc8-4519-a060-a3ceb592d970.jpg?v=1668810402',
				width: 2000
			},
			{
				alt: null,
				id: 22080561086530,
				position: 10,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops9artwork.jpg?v=1668810402'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops9artwork.jpg?v=1668810402',
				width: 2000
			},
			{
				alt: null,
				id: 22080561119298,
				position: 11,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops10artwork_9e2b2a11-333c-413a-a9db-de799f71a8ad.jpg?v=1668810403'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops10artwork_9e2b2a11-333c-413a-a9db-de799f71a8ad.jpg?v=1668810403',
				width: 2000
			},
			{
				alt: null,
				id: 22080561152066,
				position: 12,
				preview_image: {
					aspect_ratio: 1.0,
					height: 3000,
					width: 3000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops11artwork_54a02c6b-6a6e-4ba5-8252-6f4124607c20.jpg?v=1668810403'
				},
				aspect_ratio: 1.0,
				height: 3000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops11artwork_54a02c6b-6a6e-4ba5-8252-6f4124607c20.jpg?v=1668810403',
				width: 3000
			},
			{
				alt: null,
				id: 22080561184834,
				position: 13,
				preview_image: {
					aspect_ratio: 1.0,
					height: 3000,
					width: 3000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops12artwork_a36d3984-f8dd-47a8-8a91-334c6489cfd0.jpg?v=1668810402'
				},
				aspect_ratio: 1.0,
				height: 3000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops12artwork_a36d3984-f8dd-47a8-8a91-334c6489cfd0.jpg?v=1668810402',
				width: 3000
			},
			{
				alt: null,
				id: 22080561217602,
				position: 14,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops13art_ff098f20-be03-48c3-ba15-1145df42ce81.jpg?v=1668810401'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops13art_ff098f20-be03-48c3-ba15-1145df42ce81.jpg?v=1668810401',
				width: 2000
			},
			{
				alt: null,
				id: 22080561250370,
				position: 15,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops14art_ab274abf-1ef0-463d-bdaa-e365f4f23850.jpg?v=1668810402'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops14art_ab274abf-1ef0-463d-bdaa-e365f4f23850.jpg?v=1668810402',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6702735261762,
		title: 'R\u0026B Soul Guitar Loops Vol. 1',
		handle: 'r-b-soul-guitar-loops-vol-1',
		description:
			'\u003cp\u003e@MSXIISound is proud to present a much needed and\u00a0requested loop pack designed to bring you the modern sound of moody, soulful guitars!\u003c/p\u003e\n\u003cp\u003eR\u0026amp;B Soul Guitar Loops Vol. 1 enters at 35 loops of incredible samples to make HITS with. These loops are sure to inspire immediately as they touch on numerous vibes from soul, r\u0026amp;b, pop, funk, modern blues, lofi, and can be used in a variety of creative ways.\u003c/p\u003e\n\u003cp\u003eBuilt for the music producer\u00a0needing to lock in, these loops will take you there! Purchase the R\u0026amp;B Soul Guitar Loops Vol. 1 today let\'s get to the Billboard charts!\u00a0\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/0T_LYCIa89A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e',
		published_at: '2022-01-22T10:45:49-06:00',
		created_at: '2022-01-22T10:45:48-06:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Loops],
		price: 84200,
		price_min: 84200,
		price_max: 84200,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 39679927156802,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'R\u0026B Soul Guitar Loops Vol. 1',
				public_title: null,
				options: ['Default Title'],
				price: 84200,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -37,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/RNBSoulGuitarLoops_1_-2.jpg?v=1642869950'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/RNBSoulGuitarLoops_1_-2.jpg?v=1642869950',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/r-b-soul-guitar-loops-vol-1',
		media: [
			{
				alt: null,
				id: 21073774936130,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/RNBSoulGuitarLoops_1_-2.jpg?v=1642869950'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/RNBSoulGuitarLoops_1_-2.jpg?v=1642869950',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 1958690553922,
		title: 'Drums Out The SP404 Bundle',
		handle: 'drums-out-the-sp404-bundle',
		description:
			'\u003cmeta charset="utf-8"\u003e\n\u003cp\u003e\u003cspan\u003eA collection of our incredible Drums Out The SP404 series!\u003c/span\u003e\u003cspan\u003e\u00a0For a discounted, bundled price, you\'ll get:\u003c/span\u003e\u003c/p\u003e\n\u003col\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/drums-out-the-sp404-vol-1" target="_blank"\u003e\u003cspan\u003eDrums Out The SP404 Vol. 1\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/drums-out-the-sp404-vol-2" target="_blank"\u003e\u003cspan\u003eDrums Out The SP404 Vol. 2\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/drums-out-the-sp404-vol-3" target="_blank"\u003e\u003cspan\u003eDrums Out The SP404 Vol. 3\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/drums-out-the-sp404-vol-4" target="_blank"\u003e\u003cspan\u003eDrums Out The SP404 Vol. 4\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/drums-out-the-sp404-vol-5" target="_blank"\u003eDrums Out The SP404 Vol. 5\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/drums-out-the-sp404-vol-6" target="_blank"\u003eDrums Out The SP404 Vol. 6\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/drums-out-the-sp404-vol-7" target="_blank"\u003eDrums Out The SP404 Vol. 7\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/drums-out-the-sp404-vol-8" target="_blank" rel="noopener noreferrer"\u003eDrums Out The SP404 Vol. 8\u003c/a\u003e\u003c/li\u003e\n\u003c/ol\u003e\n\u003cp\u003e\u003cspan\u003ePeep the demo videos below!\u003c/span\u003e\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/sMYUa3IGBrU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""\u003e\u003c/iframe\u003e \u003ciframe width="560" height="515" src="https://www.youtube.com/embed/68TXeez91P4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""\u003e\u003c/iframe\u003e \u003ciframe width="560" height="515" src="https://www.youtube.com/embed/NTbf62-dU0U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""\u003e\u003c/iframe\u003e \u003ciframe width="560" height="515" src="https://www.youtube.com/embed/P3UJqFctQi4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""\u003e\u003c/iframe\u003e',
		published_at: '2019-07-19T00:27:04-05:00',
		created_at: '2019-07-19T00:36:12-05:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Bundles, ProductsTags['Drum Kits']],
		price: 592500,
		price_min: 592500,
		price_max: 592500,
		available: true,
		price_varies: false,
		compare_at_price: 723300,
		compare_at_price_min: 723300,
		compare_at_price_max: 723300,
		compare_at_price_varies: false,
		variants: [
			{
				id: 16123799666754,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Drums Out The SP404 Bundle',
				public_title: null,
				options: ['Default Title'],
				price: 592500,
				weight: 0,
				compare_at_price: 723300,
				inventory_quantity: -108,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Drums_out_the_SP404_Bundle.jpg?v=1563514576',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Drums_out_the_SP404_Vol.4_art.jpg?v=1563514579',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Drums_out_the_SP404_Vol.3_art_f32ad380-80b8-4562-92f5-c7c90f049d72.jpg?v=1563514583',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/DOTSP404_Vol.2_ART_2ab1f371-a760-447c-8f46-5b9ebdbbdba2.jpg?v=1563514585',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/DOTSP404_ART_1994f0eb-c310-4184-a927-d3e432395085.jpg?v=1563514587',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/DrumsouttheSP404v5art_60799f04-e6a8-4b50-abcb-a2c9fb75392d.jpg?v=1594274832',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/DrumsouttheSP404_Vol.6_90480a11-7baa-4b32-b940-479d0551abbf.jpg?v=1594274832',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/DrumsouttheSP404V7Art_1717f167-c43a-46d2-8c62-5f6d73066e8b.jpg?v=1621534635',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/DOTSP404Vol.8_0e929c53-e726-4929-b88a-33b83f90fa1a.jpg?v=1637769942'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Drums_out_the_SP404_Bundle.jpg?v=1563514576',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/drums-out-the-sp404-bundle',
		media: [
			{
				alt: null,
				id: 1889768112194,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Drums_out_the_SP404_Bundle.jpg?v=1563514576'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Drums_out_the_SP404_Bundle.jpg?v=1563514576',
				width: 2000
			},
			{
				alt: null,
				id: 1889768177730,
				position: 2,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Drums_out_the_SP404_Vol.4_art.jpg?v=1563514579'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Drums_out_the_SP404_Vol.4_art.jpg?v=1563514579',
				width: 2000
			},
			{
				alt: null,
				id: 1889768276034,
				position: 3,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Drums_out_the_SP404_Vol.3_art_f32ad380-80b8-4562-92f5-c7c90f049d72.jpg?v=1563514583'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Drums_out_the_SP404_Vol.3_art_f32ad380-80b8-4562-92f5-c7c90f049d72.jpg?v=1563514583',
				width: 2000
			},
			{
				alt: null,
				id: 1889768374338,
				position: 4,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/DOTSP404_Vol.2_ART_2ab1f371-a760-447c-8f46-5b9ebdbbdba2.jpg?v=1563514585'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/DOTSP404_Vol.2_ART_2ab1f371-a760-447c-8f46-5b9ebdbbdba2.jpg?v=1563514585',
				width: 2000
			},
			{
				alt: null,
				id: 1889768439874,
				position: 5,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/DOTSP404_ART_1994f0eb-c310-4184-a927-d3e432395085.jpg?v=1563514587'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/DOTSP404_ART_1994f0eb-c310-4184-a927-d3e432395085.jpg?v=1563514587',
				width: 2000
			},
			{
				alt: null,
				id: 6688044286018,
				position: 6,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/DrumsouttheSP404v5art_60799f04-e6a8-4b50-abcb-a2c9fb75392d.jpg?v=1594274832'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/DrumsouttheSP404v5art_60799f04-e6a8-4b50-abcb-a2c9fb75392d.jpg?v=1594274832',
				width: 2000
			},
			{
				alt: null,
				id: 6688042942530,
				position: 7,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/DrumsouttheSP404_Vol.6_90480a11-7baa-4b32-b940-479d0551abbf.jpg?v=1594274832'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/DrumsouttheSP404_Vol.6_90480a11-7baa-4b32-b940-479d0551abbf.jpg?v=1594274832',
				width: 2000
			},
			{
				alt: null,
				id: 20411468578882,
				position: 8,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/DrumsouttheSP404V7Art_1717f167-c43a-46d2-8c62-5f6d73066e8b.jpg?v=1621534635'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/DrumsouttheSP404V7Art_1717f167-c43a-46d2-8c62-5f6d73066e8b.jpg?v=1621534635',
				width: 2000
			},
			{
				alt: null,
				id: 20928619216962,
				position: 9,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/DOTSP404Vol.8_0e929c53-e726-4929-b88a-33b83f90fa1a.jpg?v=1637769942'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/DOTSP404Vol.8_0e929c53-e726-4929-b88a-33b83f90fa1a.jpg?v=1637769942',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6849880326210,
		title:
			'Cassettes \u0026 Pedals Vol. 10 - Ambient Loops, Textures, and Tones',
		handle: 'cassettes-pedals-vol-10-ambient-loops-textures-and-tones',
		description:
			'\u003cmeta charset="UTF-8"\u003e\n\u003cp data-mce-fragment="1"\u003eMSXIISound\u00a0presents Vol. 10\u00a0of the now classic\u00a0concept series, Cassettes \u0026amp; Pedals!\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eC\u0026amp;P Vol. 10\u00a0is a culmination of excellence!\u00a0We\'ve added more vibes and textures, crafted with airy vocal chops and guitar riffs that will surely inspire you. You need more than the usual in sample packs? This is it.\u00a0These are long-form compositions. Pack sits\u00a0over 439\u00a0mb before zip.\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eWe explored our vintage synths, guitars, vocals, outboard FX, pedals, and most importantly the nuances of cassette tape. Driving lush reverbs \u0026amp; delays in musical context to the Tascam Portastudio 4 track cassette recorder yields some interesting results!\u00a0\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003e30\u00a0full compositions bless\u00a0this sample pack. All\u00a0completely royalty-free\u00a0per our\u00a0\u003ca href="https://www.msxaudio.com/collections/blue-label" data-mce-fragment="1" data-mce-href="https://www.msxaudio.com/collections/blue-label" target="_blank"\u003eBlue Labe\u003c/a\u003el release\u00a0imprint. Be different \u0026amp; break away from the norm.\u00a0Purchase\u00a0the entire \u003ca href="https://www.msxaudio.com/collections/bundles/products/cassettes-pedals-bundle" data-mce-fragment="1" data-mce-href="https://www.msxaudio.com/collections/bundles/products/cassettes-pedals-bundle" target="_blank"\u003eCassettes \u0026amp; Pedals Bundle\u003c/a\u003e and save\u00a0if you\'ve missed them!\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eStay with us @MSXIISound on IG // Twitter\u00a0\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/VNXHmLnH4As" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e',
		published_at: '2022-11-18T14:58:12-06:00',
		created_at: '2022-11-18T14:58:09-06:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Loops, ProductsTags.FreeLabel],
		price: 93600,
		price_min: 93600,
		price_max: 93600,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 40090071466050,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Cassettes \u0026 Pedals Vol. 10 - Ambient Loops, Textures, and Tones',
				public_title: null,
				options: ['Default Title'],
				price: 93600,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -33,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_Pedals10.jpg?v=1668805091'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_Pedals10.jpg?v=1668805091',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/cassettes-pedals-vol-10-ambient-loops-textures-and-tones',
		media: [
			{
				alt: null,
				id: 22080056295490,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2500,
					width: 2500,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_Pedals10.jpg?v=1668805091'
				},
				aspect_ratio: 1.0,
				height: 2500,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_Pedals10.jpg?v=1668805091',
				width: 2500
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6849899003970,
		title: 'Sammich Kit 12',
		handle: 'sammich-kit-12',
		description:
			'\u003cmeta charset="UTF-8"\u003e\n\u003cp data-mce-fragment="1"\u003eBy request, @MSXIISound is pleased to present The Sammich Kit 12! Back with the\u00a0freshest sounds that have inspired an entire industry to get more creative. Per usual no fluff, no bulls**t! \u00a0Our sounds have been used in countless placed productions of MSXII \u0026amp;\u00a0network\u00a0syncs\u00a0like MTV, Vh1, E!, Oxygen, Centric, and BET.\u00a0 These drums have been eq\'d to cut through your mix, and compliment your work.\u00a0 Layered to taste, this kit is just plain slappin. \u00a051 original, instantly ready, unique sounds.\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eIf you know, you know.\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eThis drum kit features:\u003c/p\u003e\n\u003cul data-mce-fragment="1"\u003e\n\u003cli data-mce-fragment="1"\u003e51\u00a0sounds in 24bit .wav form\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eKicks, snares, hats, shakes, claps, live drum loop\u00a0combos for chopping, + more\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eNo fluff, no filler sounds, EVERYTHING is usable\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eSounds featured in all MSXII medley works\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eEQ\'d and mixed to taste--tweaked for immediate use\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eCompatible with all major software DAWs including; Ableton Live, Logic X, ProTools, FLStudio, Reason, Studio One etc.\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eCompatible hardware samplers that accept the WAV file format; Akai MPC/Force/Key 61, Maschine Plus, Elektron samplers, Chomplr, Koala etc.\u003c/li\u003e\n\u003c/ul\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/xD4VgPcfCiA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e',
		published_at: '2022-11-18T16:07:33-06:00',
		created_at: '2022-11-18T16:07:30-06:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags['New Releases']],
		price: 87300,
		price_min: 87300,
		price_max: 87300,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 40090137559106,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Sammich Kit 12',
				public_title: null,
				options: ['Default Title'],
				price: 87300,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -48,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SammichKit12.jpg?v=1668809252'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SammichKit12.jpg?v=1668809252',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/sammich-kit-12',
		media: [
			{
				alt: null,
				id: 22080441090114,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SammichKit12.jpg?v=1668809252'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SammichKit12.jpg?v=1668809252',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6849876131906,
		title: 'Loops Go Crazy Vol. 4',
		handle: 'loops-go-crazy-vol-4',
		description:
			'\u003cmeta charset="UTF-8"\u003e\n\u003cp data-mce-fragment="1"\u003eThe worldwide conglomerate @MSXIISOUND continues dropping perpetual heat with the\u00a0Loops Go Crazy Vol. 4\u00a0sample pack! Back with the vibes, fans of our famed \u003ca href="https://www.msxaudio.com/search?type=product\u0026amp;q=lofi+melodics" data-mce-fragment="1" data-mce-href="https://www.msxaudio.com/search?type=product\u0026amp;q=lofi+melodics" target="_blank"\u003eLofi Melodics\u003c/a\u003e series will find this especially appealing!\u00a0\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003e35\u00a0original\u00a0loops, ready to rock in various tempos, keys, and with numerous textures and colors. Processed tastefully to add warmth, depth, and a creative touch, Loops Go Crazy Vol. 4\u00a0carries the vibes, character, textures and authentication you\'re looking for!\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eWhen you need the best, tap in with MSXII. Purchase now \u0026amp; be a champ.\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003e\u003cem data-mce-fragment="1"\u003eDemo showcases a selection of these samples in the pack!\u003c/em\u003e\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/dqpuXJPk3Ho" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e',
		published_at: '2022-11-18T14:42:25-06:00',
		created_at: '2022-11-18T14:42:22-06:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Loops],
		price: 84200,
		price_min: 84200,
		price_max: 84200,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 40090062651458,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Loops Go Crazy Vol. 4',
				public_title: null,
				options: ['Default Title'],
				price: 84200,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -23,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazy4.jpg?v=1668804143'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazy4.jpg?v=1668804143',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/loops-go-crazy-vol-4',
		media: [
			{
				alt: null,
				id: 22079956615234,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazy4.jpg?v=1668804143'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazy4.jpg?v=1668804143',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6849883734082,
		title: 'Schlump Shots 8',
		handle: 'schlump-shots-8',
		description:
			'\u003cmeta charset="UTF-8"\u003e\n\u003cp data-mce-fragment="1"\u003eMSXII is proud to release\u00a0\u003cspan class="il" data-mce-fragment="1"\u003eSchlump\u003c/span\u003e\u003cspan data-mce-fragment="1"\u003e\u00a0\u003c/span\u003e\u003cspan class="il" data-mce-fragment="1"\u003eShots\u003c/span\u003e\u003cspan data-mce-fragment="1"\u003e\u00a0\u003c/span\u003e\u003cspan class="il" data-mce-fragment="1"\u003e8\u003c/span\u003e!\u00a0More drums for the collector heads!! You need beats that bang w/drums that sit incredibly well in any musical context? These are the ones you need.\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eYou\'ll find kicks, snares, layered percussion, off-time induced hits, and other unique drum elements that lend to "swing" in your beats. Cut from the Schlump Loops series pedigree. Choose MSXII--the most trusted name in sound design.\u00a0\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eKit Features:\u00a0\u003c/p\u003e\n\u003cul data-mce-fragment="1"\u003e\n\u003cli data-mce-fragment="1"\u003e59\u00a0all new, original\u003cspan data-mce-fragment="1"\u003e\u00a0\u003c/span\u003e\u003cspan class="il" data-mce-fragment="1"\u003eSchlump\u003c/span\u003e\u003cspan data-mce-fragment="1"\u003e\u00a0\u003c/span\u003eone\u003cspan data-mce-fragment="1"\u003e\u00a0\u003c/span\u003e\u003cspan class="il" data-mce-fragment="1"\u003eshots\u003c/span\u003e\u003cspan data-mce-fragment="1"\u003e\u00a0\u003c/span\u003ein 24\u00a0bit .wav format\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eOriginated from our live drum recordings--never rehashed, always new. Expertly crafted and mixed with punch, texture, and character\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eAuthentically unique and characterized by the sound design pros of MSXII\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eTop notch mixing quality.\u00a0Optimally spaced to sit right in your music immediately.\u00a0\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eCompatible with all DAWs, samplers, and iOS devices/apps that accept .wav format\u003c/li\u003e\n\u003c/ul\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/WF7EJTKipGc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e',
		published_at: '2022-11-18T15:16:06-06:00',
		created_at: '2022-11-18T15:16:04-06:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags['New Releases']],
		price: 93600,
		price_min: 93600,
		price_max: 93600,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 40090077823042,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Schlump Shots 8',
				public_title: null,
				options: ['Default Title'],
				price: 93600,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -29,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpShots8artwork.jpg?v=1668806165'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpShots8artwork.jpg?v=1668806165',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/schlump-shots-8',
		media: [
			{
				alt: null,
				id: 22080149782594,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpShots8artwork.jpg?v=1668806165'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpShots8artwork.jpg?v=1668806165',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6823109099586,
		title: 'Schlump Loops 11',
		handle: 'schlump-loops-11',
		description:
			'\u003cmeta charset="UTF-8"\u003e\n\u003cp data-mce-fragment="1"\u003e@MSXIISound releases Schlump Loops 11! This series is for the producer\u00a0that thinks\u00a0outside the box. 20 brand new,\u00a0original, uniquely textured drum loops in .wav format. All mixed and ready to go!\u003cspan class="Apple-converted-space" data-mce-fragment="1"\u003e\u00a0\u003c/span\u003e\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eUsing the loops as-is is ok...but the real beauty in the \u003ca href="https://www.msxaudio.com/search?q=schlump+loops" data-mce-fragment="1" data-mce-href="https://www.msxaudio.com/search?q=schlump+loops"\u003e\u003cspan data-mce-fragment="1"\u003eSchlump Loops series\u003c/span\u003e\u003c/a\u003e is finding the uniquely characterized one-shots \u0026amp; "in between" stuff. Pull these up in Serato Sample, Maschine, iOS device, FL Studio, Ableton, or your MPC and lock in! This drum kit is compatible with all DAWs, samplers, and iOS apps that accept .wav files!\u003cbr data-mce-fragment="1"\u003e\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003ePurchase and download now! #MSXII\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/6_AAYVVJlVc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e',
		published_at: '2022-10-04T00:55:50-05:00',
		created_at: '2022-10-04T00:55:45-05:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Loops],
		price: 84200,
		price_min: 84200,
		price_max: 84200,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 40014201815106,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Schlump Loops 11',
				public_title: null,
				options: ['Default Title'],
				price: 84200,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -40,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops11artwork.jpg?v=1664862947'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops11artwork.jpg?v=1664862947',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/schlump-loops-11',
		media: [
			{
				alt: null,
				id: 21885567074370,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 3000,
					width: 3000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops11artwork.jpg?v=1664862947'
				},
				aspect_ratio: 1.0,
				height: 3000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops11artwork.jpg?v=1664862947',
				width: 3000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6849870889026,
		title: 'Schlump Loops 13',
		handle: 'schlump-loops-13',
		description:
			'\u003cmeta charset="UTF-8"\u003e\n\u003cp data-mce-fragment="1"\u003e@MSXIISound releases Schlump Loops 13! This series is for the producer\u00a0that thinks\u00a0outside the box. 23 brand new,\u00a0original, uniquely textured drum loops in .wav format. All mixed and ready to go!\u003cspan class="Apple-converted-space" data-mce-fragment="1"\u003e\u00a0\u003c/span\u003e\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eUsing the loops as-is is ok...but the real beauty in the \u003ca href="https://www.msxaudio.com/search?q=schlump+loops" data-mce-fragment="1" data-mce-href="https://www.msxaudio.com/search?q=schlump+loops"\u003e\u003cspan data-mce-fragment="1"\u003eSchlump Loops series\u003c/span\u003e\u003c/a\u003e is finding the uniquely characterized one-shots \u0026amp; "in between" stuff. Pull these up in Serato Sample, Maschine, iOS device, FL Studio, Ableton, or your MPC and lock in! This drum kit is compatible with all DAWs, samplers, and iOS apps that accept .wav files!\u003cbr data-mce-fragment="1"\u003e\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003ePurchase and download now! #MSXII\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/BnhYZqMWfcg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e',
		published_at: '2022-11-18T14:24:29-06:00',
		created_at: '2022-11-18T14:24:25-06:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Loops],
		price: 93600,
		price_min: 93600,
		price_max: 93600,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 40090050494530,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Schlump Loops 13',
				public_title: null,
				options: ['Default Title'],
				price: 93600,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -26,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops13art.jpg?v=1668803067'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops13art.jpg?v=1668803067',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/schlump-loops-13',
		media: [
			{
				alt: null,
				id: 22079832522818,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops13art.jpg?v=1668803067'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops13art.jpg?v=1668803067',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6655544885314,
		title: 'Schlump Loops 10',
		handle: 'schlump-loops-10',
		description:
			'\u003cp data-mce-fragment="1"\u003e@MSXIISound releases the highly anticipated\u00a0Schlump Loops 10! This series is for the producer\u00a0that thinks\u00a0outside the box. 20 x 2 (40 loops total) original, uniquely textured drum loops in .wav format. All mixed and ready to go!\u003cspan class="Apple-converted-space" data-mce-fragment="1"\u003e\u00a0\u003c/span\u003e\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eAdditionally, Vol. 10\u00a0features a folder of the loops pressed w/our Tascam Cassette deck processing. For those that need even more texture and color!\u003cbr data-mce-fragment="1"\u003e\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eUsing the loops as-is is ok...but the real beauty in the \u003ca href="https://www.msxaudio.com/search?q=schlump+loops" data-mce-fragment="1" data-mce-href="https://www.msxaudio.com/search?q=schlump+loops"\u003e\u003cspan data-mce-fragment="1"\u003eSchlump Loops series\u003c/span\u003e\u003c/a\u003e is finding the uniquely characterized one-shots \u0026amp; "in between" stuff. Pull these up in Serato Sample, Maschine, iOS device, FL Studio, Ableton, or your MPC and lock in! This drum kit is compatible with all DAWs, samplers, and iOS apps that accept .wav files!\u003cbr data-mce-fragment="1"\u003e\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003ePurchase and download now! #MSXII\u003c/p\u003e\n\u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/3hUyGvvfr5I" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e',
		published_at: '2021-09-30T19:58:14-05:00',
		created_at: '2021-09-30T19:58:11-05:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Loops],
		price: 78000,
		price_min: 78000,
		price_max: 78000,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 39535726297154,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Schlump Loops 10',
				public_title: null,
				options: ['Default Title'],
				price: 78000,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -53,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops10artwork.jpg?v=1633049895'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops10artwork.jpg?v=1633049895',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/schlump-loops-10',
		media: [
			{
				alt: null,
				id: 20791213916226,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops10artwork.jpg?v=1633049895'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpLoops10artwork.jpg?v=1633049895',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6774551609410,
		title: 'Sammich Kit 11',
		handle: 'sammich-kit-11',
		description:
			'\u003cmeta charset="UTF-8"\u003e\n\u003cp data-mce-fragment="1"\u003eBy extremely popular demand, @MSXIISound is pleased to present The Sammich Kit 11! Back with the\u00a0freshest sounds that have inspired an entire industry to get more creative. Per usual no fluff, no bulls**t! \u00a0Our sounds have been used in countless placed productions of MSXII \u0026amp;\u00a0network\u00a0syncs\u00a0like MTV, Vh1, E!, Oxygen, Centric, and BET.\u00a0 These drums have been eq\'d to cut through your mix, and compliment your work.\u00a0 Layered to taste, this kit is just plain slappin. \u00a063\u00a0original, instantly ready, unique sounds.\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eIf you know, you know.\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eThis drum kit features:\u003c/p\u003e\n\u003cul data-mce-fragment="1"\u003e\n\u003cli data-mce-fragment="1"\u003e64 sounds in 24bit .wav form\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eKicks, snares, hats, shakes, claps, live drum loop\u00a0combos for chopping, + more\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eNo fluff, no filler sounds, EVERYTHING is usable\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eSounds featured in all MSXII medley works\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eEQ\'d and mixed to taste--tweaked for immediate use\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eCompatible with all major software DAWs including; Ableton Live, Logic X, ProTools, FLStudio, Reason, Studio One etc.\u003c/li\u003e\n\u003cli data-mce-fragment="1"\u003eCompatible hardware samplers that accept the WAV file format; Akai MPC/Force/Key 61, Maschine Plus, Elektron samplers, Chomplr, Koala etc.\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003e\u00a0\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/WvjiaZUAJr8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e\n\u003ciframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1308678004\u0026amp;color=%232e76c9\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true"\u003e\u003c/iframe\u003e\u003cdiv style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"\u003e\n\u003ca href="https://soundcloud.com/msxiisound" title="MSXIISound" target="_blank" style="color: #cccccc; text-decoration: none;"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca href="https://soundcloud.com/msxiisound/sammich-11-demo" title="Sammich 11 Demo (prod. Tone Jonez)" target="_blank" style="color: #cccccc; text-decoration: none;"\u003eSammich 11 Demo (prod. Tone Jonez)\u003c/a\u003e\n\u003c/div\u003e\n\u003ciframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1308756799\u0026amp;color=%232e76c9\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true"\u003e\u003c/iframe\u003e\u003cdiv style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"\u003e\n\u003ca href="https://soundcloud.com/msxiisound" title="MSXIISound" target="_blank" style="color: #cccccc; text-decoration: none;"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca href="https://soundcloud.com/msxiisound/sammich-kit-11-demo-prod-dstl" title="Sammich Kit 11 Demo (prod. DSTL)" target="_blank" style="color: #cccccc; text-decoration: none;"\u003eSammich Kit 11 Demo (prod. DSTL)\u003c/a\u003e\n\u003c/div\u003e',
		published_at: '2022-07-20T01:02:09-05:00',
		created_at: '2022-07-20T01:02:08-05:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags['Drum Kits']],
		price: 87300,
		price_min: 87300,
		price_max: 87300,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 39851274403906,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Sammich Kit 11',
				public_title: null,
				options: ['Default Title'],
				price: 87300,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -37,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SammichKit11Artwork.jpg?v=1658296929'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SammichKit11Artwork.jpg?v=1658296929',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/sammich-kit-11',
		media: [
			{
				alt: null,
				id: 21531845591106,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 3000,
					width: 3000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SammichKit11Artwork.jpg?v=1658296929'
				},
				aspect_ratio: 1.0,
				height: 3000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SammichKit11Artwork.jpg?v=1658296929',
				width: 3000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6740612284482,
		title: 'The Fret Library',
		handle: 'the-fret-library',
		description:
			'\u003cp\u003e@MSXIISound releases the new concept series, The Fret Library.\u00a0\u003c/p\u003e\n\u003cp\u003eThe Fret Library is a P Bass \u0026amp; Acoustic guitar compositional pack processed with the nicest of textures to allow for intricate sampling \u0026amp;\u00a0beat making. Sprinkled with full length compositions, the nuances of each string, each slide, \u0026amp; each bend in The Fret Library will inspire you to chop these samples into masterpieces.\u00a0\u003c/p\u003e\n\u003cp\u003eThere are 25 long-form compositions in the pack\u00a0\u0026amp;\u00a0a total of 131 loops that can be used if purchased with \u003cspan style="text-decoration: underline;"\u003estems\u003c/span\u003e. Both the acoustic guitar \u0026amp; P Bass parts have been stemmed out! All loops are labeled by their various keys \u0026amp; tempos.\u003c/p\u003e\n\u003cp\u003ePeep the demo \u0026amp; cop The Fret Library. Stay with us...#MSXII\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/zjHdz5LudhQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e',
		published_at: '2022-04-22T00:44:15-05:00',
		created_at: '2022-04-22T00:44:14-05:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags['New Releases']],
		price: 84200,
		price_min: 84200,
		price_max: 124800,
		available: true,
		price_varies: true,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 39769225560130,
				title: 'Compositions',
				option1: 'Compositions',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: true,
				featured_image: null,
				available: true,
				name: 'The Fret Library - Compositions',
				public_title: 'Compositions',
				options: ['Compositions'],
				price: 84200,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -10,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			},
			{
				id: 39769225592898,
				title: 'Compositions + Stems',
				option1: 'Compositions + Stems',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: true,
				featured_image: null,
				available: true,
				name: 'The Fret Library - Compositions + Stems',
				public_title: 'Compositions + Stems',
				options: ['Compositions + Stems'],
				price: 124800,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -17,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/TheFretLibraryArtwork.jpg?v=1650606256'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/TheFretLibraryArtwork.jpg?v=1650606256',
		options: [
			{
				name: 'Options',
				position: 1,
				values: ['Compositions', 'Compositions + Stems']
			}
		],
		url: '/products/the-fret-library',
		media: [
			{
				alt: null,
				id: 21292250595394,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 3000,
					width: 3000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/TheFretLibraryArtwork.jpg?v=1650606256'
				},
				aspect_ratio: 1.0,
				height: 3000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/TheFretLibraryArtwork.jpg?v=1650606256',
				width: 3000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6750064050242,
		title: 'Plush Mode Vol. 3',
		handle: 'plush-mode-vol-3',
		description:
			'\u003cmeta charset="UTF-8"\u003e\n\u003cp data-mce-fragment="1"\u003e@MSXIISound releases the all new, Plush Mode Vol. 3!\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eThis Rick Ross type sample pack brings even more of the strings, Rhodes, bass, harps, mallets and so much more into a\u00a0sampling\u00a0instrumentation masterpiece.\u00a0\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eAll new 25 original compositions + the options for stems grace this\u00a0\u003cspan data-mce-fragment="1"\u003eostentatiously rich \u0026amp; opulent sample pack. You\'ll find immediate inspiration to loop up or chop in your production. All samples are labeled by key \u0026amp; BPM.\u00a0\u003c/span\u003e\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/S2uaAz0hVCA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e',
		published_at: '2022-05-16T15:04:19-05:00',
		created_at: '2022-05-16T15:04:18-05:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags['New Releases']],
		price: 102900,
		price_min: 102900,
		price_max: 140300,
		available: true,
		price_varies: true,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 39791589720130,
				title: 'Compositions',
				option1: 'Compositions',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Plush Mode Vol. 3 - Compositions',
				public_title: 'Compositions',
				options: ['Compositions'],
				price: 102900,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -4,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			},
			{
				id: 39791589752898,
				title: 'Compositions + Stems',
				option1: 'Compositions + Stems',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Plush Mode Vol. 3 - Compositions + Stems',
				public_title: 'Compositions + Stems',
				options: ['Compositions + Stems'],
				price: 140300,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -13,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/PlushModeArtwork.jpg?v=1652731460'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/PlushModeArtwork.jpg?v=1652731460',
		options: [
			{
				name: 'Options',
				position: 1,
				values: ['Compositions', 'Compositions + Stems']
			}
		],
		url: '/products/plush-mode-vol-3',
		media: [
			{
				alt: null,
				id: 21344420593730,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/PlushModeArtwork.jpg?v=1652731460'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/PlushModeArtwork.jpg?v=1652731460',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6729496952898,
		title: 'Strings of Soul Vol. 1',
		handle: 'strings-of-soul-vol-1',
		description:
			'\u003cp\u003e@MSXIISound releases a most requested soulful, string composition pack with Strings of Soul Vol. 1!\u003c/p\u003e\n\u003cp\u003eThink of "Overnight Celebrity" by K. West\u00a0with the authenticity of that soulful touch you\'ve come to love from MSXII. There are 25 original string compositional arrangements\u00a0with the option for stems available at purchase.\u00a0\u003c/p\u003e\n\u003cp\u003eThese string compositions have been layered to give a more full, violin section sound that you can chop \u0026amp; use in your music production. 1.3GB download (with stems).\u00a0\u003c/p\u003e\n\u003cp\u003e\u003ci\u003eOur demo showcases our internal use of Strings of Soul Vol. 1 (drums not included) as well as a long-form demo of example compositions in the pack.\u00a0\u003c/i\u003e\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/NaXHA5sLXCI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""\u003e\u003c/iframe\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/UPztxBuLHRI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e\n\u003ciframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1237741528\u0026amp;color=%23ff5500\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true"\u003e\u003c/iframe\u003e\u003cdiv style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"\u003e\n\u003ca href="https://soundcloud.com/msxiisound" title="MSXIISound" target="_blank" style="color: #cccccc; text-decoration: none;"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca href="https://soundcloud.com/msxiisound/strings-of-soul-vol-1-demo-prod-tone-jonez" title="Strings Of Soul Vol. 1 Demo - (prod. Tone Jonez)" target="_blank" style="color: #cccccc; text-decoration: none;"\u003eStrings Of Soul Vol. 1 Demo - (prod. Tone Jonez)\u003c/a\u003e\n\u003c/div\u003e',
		published_at: '2022-03-23T20:21:29-05:00',
		created_at: '2022-03-23T20:21:27-05:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags['New Releases']],
		price: 84200,
		price_min: 84200,
		price_max: 124800,
		available: true,
		price_varies: true,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 39739832729666,
				title: 'Compositions',
				option1: 'Compositions',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Strings of Soul Vol. 1 - Compositions',
				public_title: 'Compositions',
				options: ['Compositions'],
				price: 84200,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -3,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			},
			{
				id: 39739832762434,
				title: 'Compositions + Stems',
				option1: 'Compositions + Stems',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Strings of Soul Vol. 1 - Compositions + Stems',
				public_title: 'Compositions + Stems',
				options: ['Compositions + Stems'],
				price: 124800,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -14,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/StringsofSoulVol.1art.jpg?v=1648084890'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/StringsofSoulVol.1art.jpg?v=1648084890',
		options: [
			{
				name: 'Options',
				position: 1,
				values: ['Compositions', 'Compositions + Stems']
			}
		],
		url: '/products/strings-of-soul-vol-1',
		media: [
			{
				alt: null,
				id: 21223463616578,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/StringsofSoulVol.1art.jpg?v=1648084890'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/StringsofSoulVol.1art.jpg?v=1648084890',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 4681548922946,
		title: 'Schlump Shots Bundle',
		handle: 'schlump-shots-bundle',
		description:
			'\u003cp\u003e\u003cspan style="background-color: #ffffff; color: #ff2a00;"\u003eUpdated 11/23/2020\u003c/span\u003e\u003c/p\u003e\n\u003cp\u003e\u003cspan style="background-color: #ffffff;"\u003eA collection of our\u00a0dope Schlump Shots products\u00a0from MSXII Sound Design. Over 354\u00a0new drums! Cut from that MSXII cloth For a discounted, bundled price, you\'ll get:\u003c/span\u003e\u003c/p\u003e\n\u003col\u003e\n\u003cli\u003e\u003cspan style="background-color: #ffffff;"\u003e\u003ca href="https://www.msxaudio.com/products/schlump-shots-1"\u003eSchlump Shots 1\u003c/a\u003e\u003cbr\u003e \u003c/span\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/schlump-shots-2" style="background-color: #ffffff;"\u003eSchlump Shots 2\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/schlump-shots-3" style="background-color: #ffffff;"\u003eSchlump Shots 3\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/schlump-shots-4" style="background-color: #ffffff;"\u003eSchlump Shots 4\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/schlump-shots-5" style="background-color: #ffffff;"\u003eSchlump Shots 5\u003cbr\u003e\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/schlump-shots-6" target="_blank"\u003eSchlump Shots 6\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/schlump-shots-7" target="_blank"\u003eSchlump Shots 7\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/collections/new-releases/products/schlump-shots-8" target="_blank" rel="noopener noreferrer"\u003eSchlump Shots 8\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/schlump-shots-9" target="_blank" rel="noopener noreferrer"\u003eSchlump Shots 9\u003c/a\u003e\u003c/li\u003e\n\u003c/ol\u003e\n\u003cp\u003e\u00a0\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/VnyxXzHFoHM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""\u003e\u003c/iframe\u003e\n\u003cp\u003e\u003cspan style="font-size: 19.600000381469727px;"\u003e\u003cbr\u003e\u003c/span\u003e\u003cbr\u003e \u003ciframe width="100%" height="166" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/359650151\u0026amp;color=%23ff5500\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" scrolling="no" frameborder="no" allow="autoplay"\u003e\u003c/iframe\u003e\u003c/p\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca href="https://soundcloud.com/msxiisound" title="MSXIISound" style="color: #cccccc; text-decoration: none;" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca href="https://soundcloud.com/msxiisound/schlump-shots-demo" title="Schlump Shots Demo" style="color: #cccccc; text-decoration: none;" target="_blank"\u003eSchlump Shots Demo\u003c/a\u003e\n\u003c/div\u003e\n\u003ciframe width="100%" height="166" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/384575522\u0026amp;color=%23ff5500\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" scrolling="no" frameborder="no" allow="autoplay"\u003e\u003c/iframe\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca href="https://soundcloud.com/msxiisound" title="MSXIISound" style="color: #cccccc; text-decoration: none;" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca href="https://soundcloud.com/msxiisound/schlump-shots-2-demo" title="Schlump Shots 2 Demo" style="color: #cccccc; text-decoration: none;" target="_blank"\u003eSchlump Shots 2 Demo\u003c/a\u003e\n\u003c/div\u003e\n\u003ciframe width="100%" height="166" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/425460000\u0026amp;color=%23ff5500\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" scrolling="no" frameborder="no" allow="autoplay"\u003e\u003c/iframe\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca href="https://soundcloud.com/msxiisound" title="MSXIISound" style="color: #cccccc; text-decoration: none;" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca href="https://soundcloud.com/msxiisound/schlump-shots-3-demo" title="Schlump Shots 3 Demo (prod. msimpmusic)" style="color: #cccccc; text-decoration: none;" target="_blank"\u003eSchlump Shots 3 Demo (prod. msimpmusic)\u003c/a\u003e\n\u003c/div\u003e\n\u003ciframe width="100%" height="166" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/533537115\u0026amp;color=%23ff5500\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" scrolling="no" frameborder="no" allow="autoplay"\u003e\u003c/iframe\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca href="https://soundcloud.com/msxiisound" title="MSXIISound" style="color: #cccccc; text-decoration: none;" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca href="https://soundcloud.com/msxiisound/schlump-4-demo-prod-officialtjonez" title="Schlump Shots 4 Demo [prod. @officialtjonez]" style="color: #cccccc; text-decoration: none;" target="_blank"\u003eSchlump Shots 4 Demo [prod. @officialtjonez]\u003c/a\u003e\n\u003c/div\u003e\n\u003ciframe width="100%" height="166" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/717930994\u0026amp;color=%23ff5500\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" scrolling="no" frameborder="no" allow="autoplay"\u003e\u003c/iframe\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca href="https://soundcloud.com/msxiisound" title="MSXIISound" style="color: #cccccc; text-decoration: none;" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca href="https://soundcloud.com/msxiisound/schlump-5-demo" title="Schlump Shots 5 Demo" style="color: #cccccc; text-decoration: none;" target="_blank"\u003eSchlump Shots 5 Demo\u003c/a\u003e\n\u003c/div\u003e',
		published_at: '2020-09-07T17:47:35-05:00',
		created_at: '2020-09-07T17:47:34-05:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Bundles],
		price: 684500,
		price_min: 684500,
		price_max: 684500,
		available: true,
		price_varies: false,
		compare_at_price: 841700,
		compare_at_price_min: 841700,
		compare_at_price_max: 841700,
		compare_at_price_varies: false,
		variants: [
			{
				id: 32438459433026,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Schlump Shots Bundle',
				public_title: null,
				options: ['Default Title'],
				price: 684500,
				weight: 0,
				compare_at_price: 841700,
				inventory_quantity: -52,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpShotsBUNDLE.jpg?v=1599518856'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpShotsBUNDLE.jpg?v=1599518856',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/schlump-shots-bundle',
		media: [
			{
				alt: null,
				id: 6930048024642,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpShotsBUNDLE.jpg?v=1599518856'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/SchlumpShotsBUNDLE.jpg?v=1599518856',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 9614926992,
		title: 'The Classic Era Bundle',
		handle: 'the-classic-era-bundle',
		description:
			'\u003cp\u003eEvery product from June 2013 - June 2017 [the MSXII 4 year\u00a0anniversary]! With new changes on deck, we\'ve decided to roll out\u00a0an\u00a0all-in-one product offering for our line up until now. The classic, MSXII material you love,\u00a0in one simple collection.\u003c/p\u003e\n\u003cp\u003eYou will receive\u00a0a unique download link \u0026amp; password via mailed thumb drive to your physical address upon purchase. \u003cstrong\u003eThis purchase will not yield an immediate download.\u003c/strong\u003e Your password will unlock your unique license to our products. See\u00a0any of our product pages for specific product info!\u003c/p\u003e\n\u003cmeta charset="utf-8"\u003e\n\u003cp\u003eNew products\u00a0after 7/1/2017, or beginning with \u003ca href="https://www.msxaudio.com/products/lofi-melodics-3" target="_blank" rel="noopener noreferrer"\u003eLofi Melodics 3\u003c/a\u003e, will proceed\u00a0as normal with enhanced quality\u00a0and value.\u00a0\u003c/p\u003e\n\u003cp\u003eEnjoy!\u003c/p\u003e',
		published_at: '2019-01-03T00:06:41-06:00',
		created_at: '2017-07-01T20:59:48-05:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Bundles],
		price: 10914200,
		price_min: 10914200,
		price_max: 10914200,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 40148402000,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'The Classic Era Bundle',
				public_title: null,
				options: ['Default Title'],
				price: 10914200,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -5,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Msxii_Classic_Era_Bundle.jpg?v=1498960791'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Msxii_Classic_Era_Bundle.jpg?v=1498960791',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/the-classic-era-bundle',
		media: [
			{
				alt: null,
				id: 353503051842,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Msxii_Classic_Era_Bundle.jpg?v=1498960791'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Msxii_Classic_Era_Bundle.jpg?v=1498960791',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 1944440832066,
		title: 'Brass Samples Bundle',
		handle: 'brass-samples-bundle',
		description:
			'\u003cp\u003eA collection of the finest brass samples from MSXII Sound Design. For a discounted, bundled price, you\'ll get:\u003c/p\u003e\n\u003col\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/the-vanguard-stax-vol-1" target="_blank" rel="noopener noreferrer"\u003eThe Vanguard Stax 1\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/the-vanguard-stax-vol-2" target="_blank" rel="noopener noreferrer"\u003eThe Vanguard Stax 2\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/vintage-soul-horns" target="_blank" rel="noopener noreferrer"\u003eVintage Soul Horns\u003c/a\u003e\u003c/li\u003e\n\u003c/ol\u003e\n\u003cp\u003eThe bundle also includes the stem versions of these products. See details on each below!\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/qdwA2O4NY5M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""\u003e\u003c/iframe\u003e \u003ciframe width="560" height="515" src="https://www.youtube.com/embed/ARyJjvSAUeo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""\u003e\u003c/iframe\u003e \u003ciframe width="560" height="515" src="https://www.youtube.com/embed/hENIzWGumoo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""\u003e\u003c/iframe\u003e',
		published_at: '2019-07-09T08:58:12-05:00',
		created_at: '2019-07-09T09:04:04-05:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Bundles],
		price: 265000,
		price_min: 265000,
		price_max: 265000,
		available: true,
		price_varies: false,
		compare_at_price: 343000,
		compare_at_price_min: 343000,
		compare_at_price_max: 343000,
		compare_at_price_varies: false,
		variants: [
			{
				id: 16033877360706,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Brass Samples Bundle',
				public_title: null,
				options: ['Default Title'],
				price: 265000,
				weight: 0,
				compare_at_price: 343000,
				inventory_quantity: -31,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Brass_Samples_Bundle.jpg?v=1562681048',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Vanguard_Stax_Vol.1_art.jpg?v=1563515070',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Vanguard_Stax_Vol.2_art.jpg?v=1563515072',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Vintage_Soul_Horns_Art.jpg?v=1563515075'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Brass_Samples_Bundle.jpg?v=1562681048',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/brass-samples-bundle',
		media: [
			{
				alt: null,
				id: 1866893721666,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Brass_Samples_Bundle.jpg?v=1562681048'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Brass_Samples_Bundle.jpg?v=1562681048',
				width: 2000
			},
			{
				alt: null,
				id: 1889772830786,
				position: 2,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Vanguard_Stax_Vol.1_art.jpg?v=1563515070'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Vanguard_Stax_Vol.1_art.jpg?v=1563515070',
				width: 2000
			},
			{
				alt: null,
				id: 1889772863554,
				position: 3,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Vanguard_Stax_Vol.2_art.jpg?v=1563515072'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Vanguard_Stax_Vol.2_art.jpg?v=1563515072',
				width: 2000
			},
			{
				alt: null,
				id: 1889772896322,
				position: 4,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Vintage_Soul_Horns_Art.jpg?v=1563515075'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Vintage_Soul_Horns_Art.jpg?v=1563515075',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6610023678018,
		title: 'Retro Drums Bundle',
		handle: 'retro-drums-bundle',
		description:
			'\u003cstrong\u003e\u003cstrong\u003e\ufeff\u003c/strong\u003e\u003c/strong\u003eA collection of the dopest\u00a0retro drums\u00a0from MSXII Sound Design. For a discounted, bundled price, you\'ll get:\n\u003col\u003e\n\u003cli\u003e\n\u003ca href="https://www.msxaudio.com/products/retro-drums-vol-1" target="_blank"\u003eRetro Drums 1\u003c/a\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://www.msxaudio.com/products/retro-drums-2" target="_blank"\u003eRetro Drums 2\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\n\u003ca href="https://www.msxaudio.com/products/retro-drums-3" target="_blank"\u003eRetro Drums 3\u003c/a\u003e\u003cbr\u003e\n\u003c/li\u003e\n\u003c/ol\u003e\n\u003cp\u003e\u00a0\u003c/p\u003e\n\u003cp\u003e\u003cspan data-mce-fragment="1"\u003eEach volume ships with both Maschine \u0026amp; Ableton Kit groups pre-mapped for instance usability in those respective programs as well!\u00a0\u003c/span\u003e\u003c/p\u003e\n\u003ch6\u003e\u003cspan style="font-size: 1.4em;"\u003e192 authentic (64 in each volume), vintage drums in 16 bit .wav format\u003c/span\u003e\u003c/h6\u003e\n\u003ch6\u003e\u003cspan style="font-size: 1.4em;"\u003eDrum Machines include: TR707, TR808, Oberheim DX, and Linn Drum LMI,\u00a0Linn Drum LM2, Korg DDD-1, Yamaha RX21, and the Kawai R100,\u00a0Korg Minipops, Vermona DRM mkII,\u00a0MPC60, \u0026amp; SP1200\u003c/span\u003e\u003c/h6\u003e\n\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\n\u003cbr\u003e \u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/r5vd1rnGLKo" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e \u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/fi89ociGENE" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e \u003ciframe title="YouTube video player" src="https://www.youtube.com/embed/SLhxHCpVzcE" height="515" width="560" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"\u003e\u003c/iframe\u003e\n\u003cp\u003e\u00a0\u003ciframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/321918185\u0026amp;color=%23403d35\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" height="166" width="100%" allow="autoplay" frameborder="no" scrolling="no"\u003e\u003c/iframe\u003e\u003c/p\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca style="color: #cccccc; text-decoration: none;" title="MSXIISound" href="https://soundcloud.com/msxiisound" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca style="color: #cccccc; text-decoration: none;" title="Retro Drums Vol. 1 Demo [prod. DSTL]" href="https://soundcloud.com/msxiisound/retro-drums-vol-1-demo" target="_blank"\u003eRetro Drums Vol. 1 Demo [prod. DSTL]\u003c/a\u003e\n\u003c/div\u003e\n\u003ciframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/324186183\u0026amp;color=%23403d35\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" height="166" width="100%" allow="autoplay" frameborder="no" scrolling="no"\u003e\u003c/iframe\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca style="color: #cccccc; text-decoration: none;" title="MSXIISound" href="https://soundcloud.com/msxiisound" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca style="color: #cccccc; text-decoration: none;" title="Retro Drums 2 Demo (prod. @Jus10_W)" href="https://soundcloud.com/msxiisound/retro-drums-2-demo-prod-jus10_w" target="_blank"\u003eRetro Drums 2 Demo (prod. @Jus10_W)\u003c/a\u003e\n\u003c/div\u003e\n\u003ciframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/334124142\u0026amp;color=%23403d35\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false\u0026amp;show_teaser=true" height="166" width="100%" allow="autoplay" frameborder="no" scrolling="no"\u003e\u003c/iframe\u003e\n\u003cdiv style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;"\u003e\n\u003ca style="color: #cccccc; text-decoration: none;" title="MSXIISound" href="https://soundcloud.com/msxiisound" target="_blank"\u003eMSXIISound\u003c/a\u003e \u00b7 \u003ca style="color: #cccccc; text-decoration: none;" title="Retro Drums 3 Demo" href="https://soundcloud.com/msxiisound/retro-drums-3-demo" target="_blank"\u003eRetro Drums 3 Demo\u003c/a\u003e\n\u003c/div\u003e',
		published_at: '2021-07-14T17:52:29-05:00',
		created_at: '2021-07-14T17:52:27-05:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Bundles],
		price: 193400,
		price_min: 193400,
		price_max: 193400,
		available: true,
		price_varies: false,
		compare_at_price: 249400,
		compare_at_price_min: 249400,
		compare_at_price_max: 249400,
		compare_at_price_varies: false,
		variants: [
			{
				id: 39413986820162,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Retro Drums Bundle',
				public_title: null,
				options: ['Default Title'],
				price: 193400,
				weight: 0,
				compare_at_price: 249400,
				inventory_quantity: -31,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/RetroDrumsBundleArt.png?v=1626303151',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Retro_Drums_Vol.1_Art_152920df-3210-41c7-8c86-9b5106d8e25a.jpg?v=1626303151',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Retro_Drums_Vol.2_1218aa4d-6c9b-4d29-b9bc-bb3a8d2d7409.jpg?v=1626303151',
			'https://cdn.shopify.com/s/files/1/0345/7209/products/RetroDrumsVol.3Art.jpg?v=1626303151'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/RetroDrumsBundleArt.png?v=1626303151',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/retro-drums-bundle',
		media: [
			{
				alt: null,
				id: 20546794356802,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/RetroDrumsBundleArt.png?v=1626303151'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/RetroDrumsBundleArt.png?v=1626303151',
				width: 2000
			},
			{
				alt: null,
				id: 20546794389570,
				position: 2,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Retro_Drums_Vol.1_Art_152920df-3210-41c7-8c86-9b5106d8e25a.jpg?v=1626303151'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Retro_Drums_Vol.1_Art_152920df-3210-41c7-8c86-9b5106d8e25a.jpg?v=1626303151',
				width: 2000
			},
			{
				alt: null,
				id: 20546794422338,
				position: 3,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Retro_Drums_Vol.2_1218aa4d-6c9b-4d29-b9bc-bb3a8d2d7409.jpg?v=1626303151'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Retro_Drums_Vol.2_1218aa4d-6c9b-4d29-b9bc-bb3a8d2d7409.jpg?v=1626303151',
				width: 2000
			},
			{
				alt: null,
				id: 20546794455106,
				position: 4,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/RetroDrumsVol.3Art.jpg?v=1626303151'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/RetroDrumsVol.3Art.jpg?v=1626303151',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 338431053,
		title: 'The Steinway Stabs',
		handle: 'the-steinway-stabs',
		description:
			'\u003cdiv\u003e\u003ciframe width="560" height="515" src="//www.youtube.com/embed/9-VBycfaEJo" frameborder="0" allowfullscreen="allowfullscreen"\u003e\u003c/iframe\u003e\u003c/div\u003e\n\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e\n\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e\n\u003cdiv\u003eMSXII Sound Design is pleased to release The Steinway Stabs!\u00a0 The project is from a Steinway and Sons 1910 Vertegrand Piano.\u00a0 As a family heirloom dating back to the 1960\'s, we\'ve now decided to put this incredible instrument out in it\'s most pure form. Steinway pianos have a history of fine craftsmanship and resonance. \u00a0This piano still has the ivory keytops and original strings.\u00a0 The Vertegrand is literally their model Grand piano flipped upright. \u00a0This improves overall resonance and tone which sets it apart from other upright studio pianos.\u00a0 If you want authentic, real, and legendary piano samples in your arsenal, look no further!\u003c/div\u003e\n\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e\n\u003cdiv\u003eKit Features:\u003c/div\u003e\n\u003cdiv\u003e\n\u003cul\u003e\n\u003cli\u003eLive recorded samples in 16bit .wav form of a Steinway and Sons 1910 Vertegrand Piano\u003c/li\u003e\n\u003cli\u003eNumerous playable chords including Maj and Min in various keys and inversions\u003c/li\u003e\n\u003cli\u003eFocused on more colorful chords; sus4 chords with +9 and +13 chords\u003c/li\u003e\n\u003cli\u003eIncludes block chords and the arpeggiated attacks\u003c/li\u003e\n\u003cli\u003eA sound that cannot be replicated due to the natural de-tuning of certain keys inducing tones and harmonics not achievable otherwise\u003c/li\u003e\n\u003cli\u003eMost chords with root on C, but can be mapped to fit whatever key you\'re working in\u003c/li\u003e\n\u003cli\u003ePair with octave bass notes for pure jazz\u003c/li\u003e\n\u003cli\u003eSamples organized by folders with key \u0026amp; chord info\u003c/li\u003e\n\u003cli\u003eCompatible with all major software DAWs and hardware samplers\u003c/li\u003e\n\u003cli\u003e\u003cstrong\u003eCompletely Royalty-Free\u003c/strong\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003ciframe width="100%" height="166" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/156923787\u0026amp;color=ff5500\u0026amp;auto_play=false\u0026amp;hide_related=false\u0026amp;show_comments=true\u0026amp;show_user=true\u0026amp;show_reposts=false" frameborder="no" scrolling="no"\u003e\u003c/iframe\u003e\n\u003c/div\u003e',
		published_at: '2014-07-03T09:51:00-05:00',
		created_at: '2014-07-03T09:58:08-05:00',
		vendor: 'MSXII Sound',
		type: 'Sample Pack',
		tags: ['Loops', 'Samples'],
		price: 93600,
		price_min: 93600,
		price_max: 93600,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 825051149,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'The Steinway Stabs',
				public_title: null,
				options: ['Default Title'],
				price: 93600,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -1,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				// quantity_rule: { min: 1, max: null, increment: 1 },
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Steinway_Stabs_Cover.jpg?v=1404399488'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Steinway_Stabs_Cover.jpg?v=1404399488',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/the-steinway-stabs',
		media: [
			{
				alt: null,
				id: 12360450114,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 1500,
					width: 1500,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Steinway_Stabs_Cover.jpg?v=1404399488'
				},
				aspect_ratio: 1.0,
				height: 1500,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Steinway_Stabs_Cover.jpg?v=1404399488',
				width: 1500
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6700008407106,
		title:
			'Cassettes \u0026 Pedals Vol. 9 - Ambient Loops, Textures, and Tones',
		handle: 'cassettes-pedals-vol-9-ambient-loops-textures-and-tones',
		description:
			'\u003cp data-mce-fragment="1"\u003e@MSXIISound releases\u00a0Vol. 9\u00a0of the now classic\u00a0concept series, Cassettes \u0026amp; Pedals!\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eC\u0026amp;P Vol. 9\u00a0is\u00a0uh vibe!\u00a0 Crafted with airy vocal chops, silky guitars, rumbling bass textures...\u00a0Vol. 9 has it all.\u00a0These are long-form compositions. Pack sits\u00a0over 425\u00a0mb before zip.\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eWe explored our vintage synths, guitars, vocals, outboard FX, pedals, and most importantly the nuances of cassette tape. Driving lush reverbs \u0026amp; delays in musical context to the Tascam Portastudio 4 track cassette recorder yields some interesting results!\u00a0\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003e25 full compositions bless\u00a0this sample pack. All\u00a0completely royalty-free\u00a0per our\u00a0\u003ca href="https://www.msxaudio.com/collections/blue-label" data-mce-fragment="1" data-mce-href="https://www.msxaudio.com/collections/blue-label" target="_blank"\u003eBlue Labe\u003c/a\u003el release\u00a0imprint. Be different \u0026amp; break away from the norm.\u00a0Purchase\u00a0the entire \u003ca href="https://www.msxaudio.com/collections/bundles/products/cassettes-pedals-bundle" data-mce-fragment="1" data-mce-href="https://www.msxaudio.com/collections/bundles/products/cassettes-pedals-bundle" target="_blank"\u003eCassettes \u0026amp; Pedals Bundle\u003c/a\u003e and save\u00a0if you\'ve missed them!\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eStay with us @MSXIISound on IG // Twitter\u00a0\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/JOFIbSx6FXg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e',
		published_at: '2022-01-16T23:41:58-06:00',
		created_at: '2022-01-16T23:41:56-06:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Loops, ProductsTags.FreeLabel],
		price: 93600,
		price_min: 93600,
		price_max: 93600,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 39669709668418,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Cassettes \u0026 Pedals Vol. 9 - Ambient Loops, Textures, and Tones',
				public_title: null,
				options: ['Default Title'],
				price: 93600,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -22,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				// quantity_rule: { min: 1, max: null, increment: 1 },
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_PedalsV.9art.jpg?v=1642398119'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_PedalsV.9art.jpg?v=1642398119',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/cassettes-pedals-vol-9-ambient-loops-textures-and-tones',
		media: [
			{
				alt: null,
				id: 21059307962434,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_PedalsV.9art.jpg?v=1642398119'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_PedalsV.9art.jpg?v=1642398119',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6539134140482,
		title:
			'Cassettes \u0026 Pedals Vol. 5 - Ambient Loops, Textures, and Tones',
		handle: 'cassettes-pedals-vol-5-ambient-loops-textures-and-tones',
		description:
			'\u003cp data-mce-fragment="1"\u003eMSXII Sound Design\u00a0releases Vol. 5\u00a0of the incredible concept series, Cassettes \u0026amp; Pedals! Volume 5\u00a0packs tons of mood invoking progressions, evolving textures, and tasteful character useful for sample chopping in your favorite sampler!\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eWe explored our vintage synths, guitars, vocals, outboard FX, pedals, and most importantly the nuances of cassette tape. Driving lush reverbs \u0026amp; delays in musical context to the Tascam Portastudio 4 track cassette recorder yields some interesting results!\u00a0\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003e26 full compositions grace this sample pack. All\u00a0completely royalty-free\u00a0per our\u00a0\u003ca data-mce-fragment="1" href="https://www.msxaudio.com/collections/blue-label" target="_blank" data-mce-href="https://www.msxaudio.com/collections/blue-label"\u003eBlue Labe\u003c/a\u003el release\u00a0imprint.\u00a0329\u00a0MB download before zip. Be different \u0026amp; break away from the norm.\u00a0Purchase both\u00a0\u003ca data-mce-fragment="1" href="https://www.msxaudio.com/products/cassettes-pedals-vol-1-ambient-loops-textures-and-tones" target="_blank" data-mce-href="https://www.msxaudio.com/products/cassettes-pedals-vol-1-ambient-loops-textures-and-tones"\u003e\u00a0C\u0026amp;P Vol. 1\u003c/a\u003e\u00a0,\u00a0\u003ca data-mce-fragment="1" href="https://www.msxaudio.com/products/cassettes-pedals-vol-2-ambient-loops-textures-and-tones" data-mce-href="https://www.msxaudio.com/products/cassettes-pedals-vol-2-ambient-loops-textures-and-tones"\u003eC\u0026amp;P Vol. 2\u003c/a\u003e\u00a0,\u003ca data-mce-fragment="1" href="https://www.msxaudio.com/products/cassettes-pedals-3-ambient-loops-textures-and-tones" target="_blank" data-mce-href="https://www.msxaudio.com/products/cassettes-pedals-3-ambient-loops-textures-and-tones"\u003eC\u0026amp;P Vol. 3\u003c/a\u003e, and \u003ca href="https://www.msxaudio.com/products/cassettes-pedals-vol-4-ambient-loops-textures-and-tones" target="_blank"\u003eC\u0026amp;P Vol. 4\u003c/a\u003e\u00a0if you\'ve missed them!\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eStay with us @MSXIISound on IG // Twitter\u003c/p\u003e\n\u003ciframe width="560" height="515\n15" src="https://www.youtube.com/embed/JUsAoubxMWs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""\u003e\u003c/iframe\u003e',
		published_at: '2021-03-03T19:16:23-06:00',
		created_at: '2021-03-03T19:16:22-06:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Loops, ProductsTags.FreeLabel],
		price: 93600,
		price_min: 93600,
		price_max: 93600,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 39253853929538,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Cassettes \u0026 Pedals Vol. 5 - Ambient Loops, Textures, and Tones',
				public_title: null,
				options: ['Default Title'],
				price: 93600,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -40,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				// quantity_rule: { min: 1, max: null, increment: 1 },
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_PedalsV.5_8d44b44c-f329-4bc9-9fc4-f03c44f826f3.jpg?v=1614820584'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_PedalsV.5_8d44b44c-f329-4bc9-9fc4-f03c44f826f3.jpg?v=1614820584',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/cassettes-pedals-vol-5-ambient-loops-textures-and-tones',
		media: [
			{
				alt: null,
				id: 20236712738882,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2000,
					width: 2000,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_PedalsV.5_8d44b44c-f329-4bc9-9fc4-f03c44f826f3.jpg?v=1614820584'
				},
				aspect_ratio: 1.0,
				height: 2000,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_PedalsV.5_8d44b44c-f329-4bc9-9fc4-f03c44f826f3.jpg?v=1614820584',
				width: 2000
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	},
	{
		id: 6849880326210,
		title:
			'Cassettes \u0026 Pedals Vol. 10 - Ambient Loops, Textures, and Tones',
		handle: 'cassettes-pedals-vol-10-ambient-loops-textures-and-tones',
		description:
			'\u003cmeta charset="UTF-8"\u003e\n\u003cp data-mce-fragment="1"\u003eMSXIISound\u00a0presents Vol. 10\u00a0of the now classic\u00a0concept series, Cassettes \u0026amp; Pedals!\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eC\u0026amp;P Vol. 10\u00a0is a culmination of excellence!\u00a0We\'ve added more vibes and textures, crafted with airy vocal chops and guitar riffs that will surely inspire you. You need more than the usual in sample packs? This is it.\u00a0These are long-form compositions. Pack sits\u00a0over 439\u00a0mb before zip.\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eWe explored our vintage synths, guitars, vocals, outboard FX, pedals, and most importantly the nuances of cassette tape. Driving lush reverbs \u0026amp; delays in musical context to the Tascam Portastudio 4 track cassette recorder yields some interesting results!\u00a0\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003e30\u00a0full compositions bless\u00a0this sample pack. All\u00a0completely royalty-free\u00a0per our\u00a0\u003ca href="https://www.msxaudio.com/collections/blue-label" data-mce-fragment="1" data-mce-href="https://www.msxaudio.com/collections/blue-label" target="_blank"\u003eBlue Labe\u003c/a\u003el release\u00a0imprint. Be different \u0026amp; break away from the norm.\u00a0Purchase\u00a0the entire \u003ca href="https://www.msxaudio.com/collections/bundles/products/cassettes-pedals-bundle" data-mce-fragment="1" data-mce-href="https://www.msxaudio.com/collections/bundles/products/cassettes-pedals-bundle" target="_blank"\u003eCassettes \u0026amp; Pedals Bundle\u003c/a\u003e and save\u00a0if you\'ve missed them!\u003c/p\u003e\n\u003cp data-mce-fragment="1"\u003eStay with us @MSXIISound on IG // Twitter\u00a0\u003c/p\u003e\n\u003ciframe width="560" height="515" src="https://www.youtube.com/embed/VNXHmLnH4As" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e',
		published_at: '2022-11-18T14:58:12-06:00',
		created_at: '2022-11-18T14:58:09-06:00',
		vendor: 'MSXII Sound',
		type: '',
		tags: [ProductsTags.Loops, ProductsTags.FreeLabel],
		price: 93600,
		price_min: 93600,
		price_max: 93600,
		available: true,
		price_varies: false,
		compare_at_price: null,
		compare_at_price_min: 0,
		compare_at_price_max: 0,
		compare_at_price_varies: false,
		variants: [
			{
				id: 40090071466050,
				title: 'Default Title',
				option1: 'Default Title',
				option2: null,
				option3: null,
				sku: '',
				requires_shipping: false,
				taxable: false,
				featured_image: null,
				available: true,
				name: 'Cassettes \u0026 Pedals Vol. 10 - Ambient Loops, Textures, and Tones',
				public_title: null,
				options: ['Default Title'],
				price: 93600,
				weight: 0,
				compare_at_price: null,
				inventory_quantity: -35,
				inventory_management: null,
				inventory_policy: 'deny',
				barcode: '',
				// quantity_rule: { min: 1, max: null, increment: 1 },
				requires_selling_plan: false,
				selling_plan_allocations: []
			}
		],
		images: [
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_Pedals10.jpg?v=1668805091'
		],
		featured_image:
			'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_Pedals10.jpg?v=1668805091',
		options: [{ name: 'Title', position: 1, values: ['Default Title'] }],
		url: '/products/cassettes-pedals-vol-10-ambient-loops-textures-and-tones',
		media: [
			{
				alt: null,
				id: 22080056295490,
				position: 1,
				preview_image: {
					aspect_ratio: 1.0,
					height: 2500,
					width: 2500,
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_Pedals10.jpg?v=1668805091'
				},
				aspect_ratio: 1.0,
				height: 2500,
				media_type: 'image',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/Cassettes_Pedals10.jpg?v=1668805091',
				width: 2500
			}
		],
		requires_selling_plan: false,
		selling_plan_groups: []
	}
];

const createStandardSection = (
	params: Pick<
		StandardSection,
		'body' | 'title' | 'description' | 'customPageClassesKeys'
	>
): StandardSection => ({
	___type: SECTIONS_TYPES_map['standard-section'],
	stylesVariants: { 'gap-x': '2', 'gap-y': '2' },
	...params
});

export const boxVariants = {
	'max-w': {
		'100ch': 'max-w-[100ch]'
	},
	w: {
		full: 'w-full',
		'40': 'w-40',
		'44': 'w-44',
		'48': 'w-48',
		'52': 'w-52',
		'56': 'w-56',
		'60': 'w-60',
		'64': 'w-64',
		'72': 'w-72',
		'80': 'w-80',
		'96': 'w-96'
	},
	h: {
		'40': 'w-40',
		'44': 'w-44',
		'48': 'w-48',
		'52': 'w-52',
		'56': 'w-56',
		'60': 'w-60',
		'64': 'w-64',
		'72': 'w-72',
		'80': 'w-80',
		'96': 'w-96'
	},
	'gap-x': {
		'1': 'gap-x-1',
		'2': 'gap-x-2',
		'3': 'gap-x-3',
		'4': 'gap-x-4',
		'5': 'gap-x-5',
		'6': 'gap-x-6',
		'7': 'gap-x-7',
		'8': 'gap-x-8',
		'9': 'gap-x-9',
		'10': 'gap-x-10',
		'11': 'gap-x-11',
		'12': 'gap-x-12',
		'14': 'gap-x-14',
		'16': 'gap-x-16',
		'18': 'gap-x-18',
		'20': 'gap-x-20'
	},
	'gap-y': {
		'1': 'gap-y-1',
		'2': 'gap-y-2',
		'3': 'gap-y-3',
		'4': 'gap-y-4',
		'5': 'gap-y-5',
		'6': 'gap-y-6',
		'7': 'gap-y-7',
		'8': 'gap-y-8',
		'9': 'gap-y-9',
		'10': 'gap-y-10',
		'11': 'gap-y-11',
		'12': 'gap-y-12',
		'14': 'gap-y-14',
		'16': 'gap-y-16',
		'18': 'gap-y-18',
		'20': 'gap-y-20'
	},
	mx: {
		auto: 'mx-auto'
	},
	px: {
		'1': 'px-1',
		'2': 'px-2',
		'3': 'px-3',
		'4': 'px-4',
		'5': 'px-5',
		'6': 'px-6',
		'7': 'px-7',
		'8': 'px-8',
		'9': 'px-9',
		'10': 'px-10',
		'11': 'px-11',
		'12': 'px-12',
		'14': 'px-14',
		'16': 'px-16',
		'18': 'px-18',
		'20': 'px-20'
	},
	py: {
		'1': 'py-1',
		'2': 'py-2',
		'3': 'py-3',
		'4': 'py-4',
		'5': 'py-5',
		'6': 'py-6',
		'7': 'py-7',
		'8': 'py-8',
		'9': 'py-9',
		'10': 'py-10',
		'11': 'py-11',
		'12': 'py-12',
		'14': 'py-14',
		'16': 'py-16',
		'18': 'py-18',
		'20': 'py-20'
	},
	leading: {
		3: 'leading-3',
		4: 'leading-4',
		5: 'leading-5',
		6: 'leading-6',
		7: 'leading-7',
		8: 'leading-8',
		9: 'leading-9',
		10: 'leading-10',
		none: 'leading-none',
		tight: 'leading-tight',
		snug: 'leading-snug',
		normal: 'leading-normal',
		relaxed: 'leading-relaxed',
		loose: 'leading-loose'
	},
	rounded: {
		sm: 'rounded-sm',
		rounded: 'rounded',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		'3xl': 'rounded-3xl',
		full: 'rounded-full'
	},
	'aspect-ratio': {
		square: 'aspect-square',
		video: 'aspect-video'
	}
} as const;

export const handleBoxVariants = cva('', {
	variants: boxVariants
});

export type BoxVariants = VariantProps<typeof handleBoxVariants>;

export const LoflyDirtIOSApp: StandardSection[] = (() => {
	const appLink =
		'https://apps.apple.com/us/app/lo-fly-dirt/id1292776927?ign-mpt=uo%3D4';

	const twoColumnsBox: TwoColumnsBox = {
		stylesVariants: { 'gap-x': '8' },
		___type: BOXES_TYPES_map['two-columns'],
		columns: [
			{
				stylesVariants: { 'aspect-ratio': 'square' },
				customPageClassesKeys: ['center-on-ls-md-screens', 'objects-contain'],
				___type: BOXES_TYPES_map['image-only'],
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-50b7d524--Screen-Shot-20200327-at-12507-AM.png?v=1585290536'
			},
			{
				customPageClassesKeys: ['center-on-ls-md-screens'],
				stylesVariants: { 'gap-y': '2', px: '4' },
				___type: BOXES_TYPES_map['md'],
				content: `# LO-FLY DIRT
	
## IOS-APP

[![](/images/custom-page/App-Store-Button-transparent.png)](${appLink})

An audio coloration utility plugin featuring individual modes for classic emulation of some iconic music production tools. This tool is meant to bring character, or "dirt" to your incoming audio signals. Lo-Fly Dirt installs as an Audio Unit effect for hosts that support the format such as Audio Bus, Beatmaker 3, Garage Band, Cubasis, AUM, etc.`
			}
		]
	};
	const iframeBox: IframeBox = {
		___type: BOXES_TYPES_map['iframe'],
		___subType: SUB_BOXES_TYPES_map['youtube'],
		src: 'https://www.youtube.com/embed/GeD0lopiqsw?autoplay=0&loop=0&mute=0&controls=0&enablejsapi=1'
	};
	const tabsBox: TabsBox = {
		___type: BOXES_TYPES_map['tabs'],
		tabs: [
			{
				title: 'Description',
				data: {
					stylesVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `An audio coloration utility plugin featuring individual modes for classic emulation of some iconic music production tools. This tool is meant to bring character, or "dirt" to your incoming audio signals.
					
Lo-Fly Dirt installs as an Audio Unit effect for hosts that support the format such as AUM, Audio Bus, Beatmaker 3, Garage Band, Cubasis, etc.`
				}
			},
			{
				title: 'Specs',
				data: {
					stylesVariants: { 'gap-y': '2', px: '4' },
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

Also built off the things we love about the classic 8 bit sound, but with a twist...this mode adds HP filtering and punch! Instant dirt is applied when this mode is activated, high pass filtering and punch is applied as you move the signal from dry to wet. The HP filter is set to cutoff at 300Hz`
				}
			},
			{
				title: 'User Manual',
				data: {
					stylesVariants: { 'gap-x': '8' },
					___type: BOXES_TYPES_map['two-columns'],
					columns: [
						{
							customPageClassesKeys: ['center-on-ls-md-screens'],
							stylesVariants: { 'gap-y': '2', px: '4' },
							___type: BOXES_TYPES_map['md'],
							content: `### Whats New:
	
3.0 updates:
- Adding factory & user presets
- Other fixes & enhancements

You can check out the reference guide below:

[Download Now](https://www.dropbox.com/s/qe3zlonoboja003/MSXII%20Lo-Fly%20Dirt%202v5%20Final.pdf?dl=0)`
						},
						{
							customPageClassesKeys: [
								'center-on-ls-md-screens',
								'object-contain'
							],
							___type: BOXES_TYPES_map['image-only'],
							src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-87a87505--loflydirtmanualdisplay.png?v=1589083025'
						}
					]
				}
			}
		]
	};
	const sliderBox: SliderBox = {
		___type: BOXES_TYPES_map['slider'],
		slides: [
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/fVYFHfw5bxE?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/vWyepI8I_R8?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/cGYDLxCIKnc?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1'
			}
		]
	};
	const sliderBox2: SliderBox = {
		___type: BOXES_TYPES_map['slider'],
		slides: [
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/B-PxUFQDDJv/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/B7zHSBxHmrw/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/BhcibxMAG8Z/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/B7sPExan8Js/?utm_source=ig_embed&utm_campaign=loading'
			}
		]
	};
	const rowsOnlyBox: RowsOnlyBox = {
		___type: 'rows-only',
		stylesVariants: { 'gap-y': '3' },
		customPageClassesKeys: ['center-content'],
		rows: [
			{
				stylesVariants: { rounded: '3xl' },
				___type: 'image-only',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-d22a5c09--MSXIIAUDIOLOFIDIRTAPPICON3x-Edited.jpg?v=1582621861'
			},
			{
				___type: 'md',
				content: `[![](/images/custom-page/App-Store-Button-transparent.png)](${appLink})`
			}
		]
	};

	return [
		createStandardSection({ body: [twoColumnsBox] }),
		createStandardSection({ body: [tabsBox] }),
		createStandardSection({ body: [iframeBox] }),
		createStandardSection({
			body: [sliderBox],
			title: 'Tutorial'
		}),
		createStandardSection({
			body: [{ ...sliderBox2, slidesPerViewType: 'large-slides' }],
			title: 'LO-FLY DIRT Around The Web',
			customPageClassesKeys: ['section-container-v1']
		}),
		createStandardSection({ body: [rowsOnlyBox] })
	];
})();
export const FlyTapeIOSApp: StandardSection[] = (() => {
	const appLink = 'https://apps.apple.com/us/app/fly-tape/id1343651192';

	const twoColumnsBox: TwoColumnsBox = {
		stylesVariants: { 'gap-x': '8' },
		___type: BOXES_TYPES_map['two-columns'],
		columns: [
			{
				stylesVariants: { 'aspect-ratio': 'square' },
				customPageClassesKeys: ['center-on-ls-md-screens', 'objects-contain'],
				___type: BOXES_TYPES_map['image-only'],
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-f357e20c--Flytapeappdisplay.png?v=1589053729'
			},
			{
				customPageClassesKeys: ['center-on-ls-md-screens'],
				stylesVariants: { 'gap-y': '2', px: '4' },
				___type: BOXES_TYPES_map['md'],
				content: `# Fly Tape
## IOS-APP

[![](/images/custom-page/App-Store-Button-transparent.png)](${appLink})

Fly-Tape is a unique MSXII look on some of the aspects about tape that we love while adding some unique features that are enjoyable!

Fly Tape installs as an iOS AUv3 FX plugin, designed for use within host apps such as Garageband, Beatmaker 3, Cubasis, Audiobus, and more. Standalone mode for demo purposes.`
			}
		]
	};
	const iframeBox: IframeBox = {
		___type: BOXES_TYPES_map['iframe'],
		___subType: SUB_BOXES_TYPES_map['youtube'],
		src: 'https://www.youtube.com/embed/OLPSb69q5mM?autoplay=0&loop=0&mute=0&controls=0&enablejsapi=1'
	};
	const tabsBox: TabsBox = {
		___type: BOXES_TYPES_map['tabs'],
		tabs: [
			{
				title: 'Description',
				data: {
					stylesVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `Named for it's performance style of use, users can adding FX to their incoming audio signals in many ways "on the Fly." Sliders for textured nuances such as hiss & pitch will allow you to dial in tasteful settings that can become reminiscent of cassette tapes. These also can be automated via midi cc for additional modulation.`
				}
			},
			{
				title: 'Specs',
				data: {
					stylesVariants: { 'gap-y': '2', px: '4' },
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
- Stutter: 112`
				}
			},
			{
				title: 'User Manual',
				data: {
					stylesVariants: { 'gap-x': '8' },
					___type: BOXES_TYPES_map['two-columns'],
					columns: [
						{
							customPageClassesKeys: ['center-on-ls-md-screens'],
							stylesVariants: { 'gap-y': '2', px: '4' },
							___type: BOXES_TYPES_map['md'],
							content: `### Whats New:
	
2.0 updates:
- General bug fixes, enhancements, and iOS 12 compatibility issues fixed.

You can check out the reference guide below

[Download Now](https://www.dropbox.com/s/b3fb168ozmz3i4o/MSXII%20Fly%20Tape%202v0%20Final.pdf?dl=0)`
						},
						{
							customPageClassesKeys: [
								'center-on-ls-md-screens',
								'object-contain'
							],
							___type: BOXES_TYPES_map['image-only'],
							src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-f7f4b998--FlyTapeManualImage.png?v=1589395846'
						}
					]
				}
			}
		]
	};
	const sliderBox: SliderBox = {
		___type: BOXES_TYPES_map['slider'],
		slides: [
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/dAaKwsDX11U?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/K-W9vtIRAZw?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/vWyepI8I_R8?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1'
			}
		]
	};
	const sliderBox2: SliderBox = {
		___type: BOXES_TYPES_map['slider'],
		slides: [
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/B86N3QiHJcn/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/B8qiCA6i3qa/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/BvJsq-qAqzU/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/B7sPExan8Js/?utm_source=ig_embed&utm_campaign=loading'
			}
		]
	};
	const rowsOnlyBox: RowsOnlyBox = {
		___type: 'rows-only',
		stylesVariants: { 'gap-y': '3' },
		customPageClassesKeys: ['center-content'],
		rows: [
			{
				stylesVariants: { rounded: '3xl' },
				___type: 'image-only',
				src: '/images/custom-page/FlyTapeappicon1.png'
			},
			{
				___type: 'md',
				content: `[![](/images/custom-page/App-Store-Button-transparent.png)](${appLink})`
			}
		]
	};

	return [
		createStandardSection({ body: [twoColumnsBox] }),
		createStandardSection({ body: [tabsBox] }),
		createStandardSection({ body: [iframeBox] }),
		createStandardSection({
			body: [sliderBox],
			title: 'Tutorial'
		}),
		createStandardSection({
			body: [{ ...sliderBox2, slidesPerViewType: 'large-slides' }],
			title: 'LO-FLY DIRT Around The Web',
			customPageClassesKeys: ['section-container-v1']
		}),
		createStandardSection({ body: [rowsOnlyBox] })
	];
})();
export const FlyTape2IOSApp: StandardSection[] = (() => {
	const appLink = 'https://apps.apple.com/us/app/fly-tape-2/id1552463664';

	const twoColumnsBox: TwoColumnsBox = {
		stylesVariants: { 'gap-x': '8' },
		___type: BOXES_TYPES_map['two-columns'],
		columns: [
			{
				stylesVariants: { 'aspect-ratio': 'square' },
				customPageClassesKeys: ['center-on-ls-md-screens', 'objects-contain'],
				___type: BOXES_TYPES_map['image-only'],
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-baa9b738--Screen-Shot-20210324-at-35800-PM.png?v=1616619654'
			},
			{
				stylesVariants: { 'gap-y': '2', px: '4' },
				___type: BOXES_TYPES_map['md'],
				customPageClassesKeys: ['center-on-ls-md-screens'],
				content: `# Fly Tape 2
## IOS-APP

[![](/images/custom-page/App-Store-Button-transparent.png)](${appLink})

FlyTape 2 builds on the principles of the original FlyTape. A love of vintage sounds and character is our thing and FlyTape 2 fits this ethos as a unique take on the features of classic tape. Named for it's style, performance and user improvisation control, it's FX can be added to incoming audio signals in many ways "on the fly". Sliders for textured nuances such as noise hiss will allow you to dial in tasteful settings reminiscent of cassette tapes. These also can be automated via midi cc for additional modulation.

FlyTape 2 installs as an iOS AUv3 plugin effect, designed for use within host apps such as Garageband, Beatmaker 3, Cubasis, Audiobus, and more.`
			}
		]
	};
	const iframeBox: IframeBox = {
		___type: BOXES_TYPES_map['iframe'],
		___subType: SUB_BOXES_TYPES_map['youtube'],
		src: 'https://www.youtube.com/embed/gTB_8Vc0bXg?autoplay=0&loop=0&mute=0&controls=0&enablejsapi=1'
	};
	const tabsBox: TabsBox = {
		___type: BOXES_TYPES_map['tabs'],
		tabs: [
			{
				title: 'Description',
				data: {
					stylesVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `FlyTape 2 builds on the principles of the original FlyTape. A love of vintage sounds and character is our thing and FlyTape 2 fits this ethos as a unique take on the features of classic tape. Named for it's style, performance and user improvisation control, it's FX can be added to incoming audio signals in many ways "on the fly".

Sliders for textured nuances such as noise hiss will allow you to dial in tasteful settings reminiscent of cassette tapes. These also can be automated via midi cc for additional modulation.

FlyTape 2 installs as an iOS AUv3 plugin effect, designed for use within host apps such as Garageband, AUM, Beatmaker 3, Cubasis, Audiobus, and more.

![](https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-48baa9b7--ft2-site.jpg?v=1616619608)
					`
				}
			},
			{
				title: 'Specs',
				data: {
					stylesVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `![](https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-70d1e1f6--Screen-Shot-20210331-at-35150-PM-Edited.jpg?v=1617224012)`
				}
			},
			{
				title: 'User Manual',
				data: {
					stylesVariants: { 'gap-x': '8' },
					___type: BOXES_TYPES_map['two-columns'],
					columns: [
						{
							customPageClassesKeys: ['center-on-ls-md-screens'],
							stylesVariants: { 'gap-y': '2', px: '4' },
							___type: BOXES_TYPES_map['md'],
							content: `### Whats New:
	
- Fly Tape 2 - Version  1.0 Release

You can check out the reference guide/manual below. Download and save to your iPhone/iPad on iBooks

[Download Now](https://www.dropbox.com/s/ezrh4mgarxka8u2/MSXII%20Fly%20Tape%202%20User%20Manual.pdf?dl=0)

> **READING IS FUNDAMENTAL.**`
						},
						{
							customPageClassesKeys: [
								'center-on-ls-md-screens',
								'object-contain'
							],
							___type: BOXES_TYPES_map['image-only'],
							src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-6ed32248--Screen-Shot-20210324-at-13333-PM.png?v=1616610936'
						}
					]
				}
			}
		]
	};
	const iframeBox2: IframeBox = {
		___type: BOXES_TYPES_map['iframe'],
		___subType: SUB_BOXES_TYPES_map['youtube'],
		src: 'https://www.youtube.com/embed/JkfyYC4lqwg?autoplay=0&loop=0&mute=0&controls=0&enablejsapi=1'
	};
	const sliderBox: SliderBox = {
		___type: BOXES_TYPES_map['slider'],
		slides: [
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CNTX4dLn0hd/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CNS7eIgDxgB/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CNToL2vD7YT/?utm_source=ig_embed&utm_campaign=loading'
			}
		]
	};
	const rowsOnlyBox: RowsOnlyBox = {
		___type: 'rows-only',
		stylesVariants: { 'gap-y': '3' },
		customPageClassesKeys: ['center-content'],
		rows: [
			{
				stylesVariants: { rounded: '3xl' },
				___type: 'image-only',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-2248baa9--tape-2-crop.jpg?v=1616617146'
			},
			{
				___type: 'md',
				content: `[![](/images/custom-page/App-Store-Button-transparent.png)](${appLink})`
			}
		]
	};

	return [
		createStandardSection({ body: [twoColumnsBox] }),
		createStandardSection({ body: [tabsBox] }),
		createStandardSection({ body: [iframeBox] }),
		createStandardSection({
			body: [iframeBox2],
			title: 'Tutorial'
		}),
		createStandardSection({
			body: [{ ...sliderBox, slidesPerViewType: 'large-slides' }],
			title: 'LO-FLY DIRT Around The Web',
			customPageClassesKeys: ['section-container-v1']
		}),
		createStandardSection({ body: [rowsOnlyBox] })
	];
})();
export const ChomplrOSApp: StandardSection[] = (() => {
	const appLink = 'https://apps.apple.com/us/app/chomplr/id1470553213';

	const twoColumnsBox: TwoColumnsBox = {
		stylesVariants: { 'gap-x': '8' },
		___type: BOXES_TYPES_map['two-columns'],
		columns: [
			{
				stylesVariants: { 'aspect-ratio': 'square' },
				customPageClassesKeys: ['center-on-ls-md-screens', 'objects-contain'],
				___type: BOXES_TYPES_map['image-only'],
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-8930ec95--Chomplrappdisplay-Edited.jpg?v=1617338387'
			},
			{
				customPageClassesKeys: ['center-on-ls-md-screens'],
				stylesVariants: { 'gap-y': '2', px: '4' },
				___type: BOXES_TYPES_map['md'],
				content: `# Chomplr
## IOS-APP

[![](/images/custom-page/App-Store-Button-transparent.png)](${appLink})

The Chomplr name is taken from sample "Chopping Rompler", inspired by the timeless workflow of creating music using samples. Chomplr brings a new iOS approach to creative sample manipulation.

As a standalone module or AUv3 plugin, Chomplr offers quick access to it's robust sample library and an online store is built in.`
			}
		]
	};
	const iframeBox: IframeBox = {
		___type: BOXES_TYPES_map['iframe'],
		___subType: SUB_BOXES_TYPES_map['youtube'],
		src: 'https://www.youtube.com/embed/sxgSyJ5J-LE?autoplay=0&loop=0&mute=0&controls=0&enablejsapi=1'
	};
	const tabsBox: TabsBox = {
		___type: BOXES_TYPES_map['tabs'],
		tabs: [
			{
				title: 'Description',
				data: {
					stylesVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `The Chomplr name is taken from sample "Chopping Rompler", inspired by the timeless workflow of creating music using samples. Chomplr brings a new iOS approach to creative sample manipulation. As a standalone module or AUv3 plugin, Chomplr offers quick access to it's robust sample library and an online store is built in. All samples in Chomplr are royalty free for use within the app.

Sample data can be edited and one or more effects added and adjusted in quick and simple fashion. While a wealth of parameters are provided, the true user experience and inspiration comes from slicing, tweaking and editing while playing by ear. Chomplr installs as an iOS AUv3 plugin instrument, compatible for use within host apps such as Garageband, Beatmaker 3, Cubasis, Audiobus, AUM, iMPC, and more.

![](https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-bf14c87c--Screen-Shot-20210402-at-121259-AM.png?v=1617340398)`
				}
			},
			{
				title: 'Specs',
				data: {
					stylesVariants: { 'gap-y': '2', px: '4' },
					___type: BOXES_TYPES_map['md'],
					content: `![](https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-87726dce--Screen-Shot-20210401-at-114212-PM.png?v=1617338611)`
				}
			},
			{
				title: 'User Manual',
				data: {
					stylesVariants: { 'gap-x': '8' },
					___type: BOXES_TYPES_map['two-columns'],
					columns: [
						{
							customPageClassesKeys: ['center-on-ls-md-screens'],
							stylesVariants: { 'gap-y': '2', px: '4' },
							___type: BOXES_TYPES_map['md'],
							content: `### What's New:
Chomplr 1.2.0; 
- adding sample import (IAP) function for .wav / .aiff / .mp3 / .m4a files
- adding support for iPhone
- adding store & browser filtering by type
- other fixes & enhancements

You can check out the reference guide/manual below. Download and save to your iPhone/iPad on iBooks.

[Download Now](https://www.dropbox.com/s/ayvw7jmr6ohu2wv/MSXII-Chomplr%201v2.pdf?dl=0)

> **READING IS FUNDAMENTAL.**`
						},
						{
							customPageClassesKeys: [
								'center-on-ls-md-screens',
								'object-contain'
							],
							___type: BOXES_TYPES_map['image-only'],
							src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-f7f4b998--FlyTapeManualImage.png?v=1589395846'
						}
					]
				}
			}
		]
	};
	const sliderBox: SliderBox = {
		___type: BOXES_TYPES_map['slider'],
		slides: [
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/Cqg0OA7htUA?autoplay=0&loop=0&mute=0&controls=0&enablejsapi=1'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/8Z8E2f0-3_s?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/5KIpovYrVgM?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: SUB_BOXES_TYPES_map['youtube'],
				src: 'https://www.youtube.com/embed/-bc9IS4cTAo?autoplay=0&loop=0&mute=0&controls=1&enablejsapi=1'
			}
		]
	};
	const sliderBox2: SliderBox = {
		___type: BOXES_TYPES_map['slider'],
		slides: [
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CLuGkpDDRlb/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CCtMoZNBt7Y/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CMfLPRxjjJN/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CC4LSdjjylx/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CLxm8cRBT0t/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CBfn6gCFlcg/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CBfuNm-l0m7/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CBgycnWhsmX/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CBg6C-DDLte/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CJtubblDjjp/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CBhXuCZAuRH/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CBjGQ8HhQLC/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CBhVAAthJta/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CBjHPxApheh/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CBjxT40AciL/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CB0kO-fhFNr/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CB4Mxc8DOHG/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CB4QghSDOcD/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CB5yz03h-dl/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CB6w5URDkkw/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/padbeatmakers/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CJ5wMLrDvkt/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/tv/CI-kl3fgyhe/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CBlMUq8DUDH/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CIPK_ThjLhm/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/B9w_aSTnFzi/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CBlG2KMDr9Q/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CCALMMbhDQH/?utm_source=ig_embed&utm_campaign=loading'
			},
			{
				___type: BOXES_TYPES_map['iframe'],
				___subType: 'instagram',
				src: 'https://www.instagram.com/p/CByeBQnh9SH/?utm_source=ig_embed&utm_campaign=loading'
			}
		]
	};
	const rowsOnlyBox: RowsOnlyBox = {
		___type: 'rows-only',
		stylesVariants: { 'gap-y': '3' },
		customPageClassesKeys: ['center-content'],
		rows: [
			{
				stylesVariants: { rounded: '3xl' },
				___type: 'image-only',
				src: 'https://cdn.shopify.com/s/files/1/0345/7209/t/28/assets/pf-ce3c55b2--ChomplrAppstoreicon188x182.png?v=1589530651'
			},
			{
				___type: 'md',
				content: `[![](/images/custom-page/App-Store-Button-transparent.png)](${appLink})`
			}
		]
	};

	return [
		createStandardSection({ body: [twoColumnsBox] }),
		createStandardSection({ body: [tabsBox] }),
		createStandardSection({ body: [iframeBox] }),
		createStandardSection({
			body: [sliderBox],
			title: 'Tutorial'
		}),
		createStandardSection({
			body: [{ ...sliderBox2, slidesPerViewType: 'large-slides' }],
			title: 'LO-FLY DIRT Around The Web',
			customPageClassesKeys: ['section-container-v1']
		}),
		createStandardSection({ body: [rowsOnlyBox] })
	];
})();

export const loFlyDirtBasicData = {
	title: 'Lo-Fly Dirt',
	slug: 'lo-fly-dirt'
};
export const flyTape2BasicData = {
	title: 'Fly Tape 2',
	slug: 'fly-tape-2'
};
export const flyTapeBasicData = {
	title: 'Fly Tape',
	slug: 'fly-tape'
};
export const chomplrBasicData = {
	title: 'Chomplr',
	slug: 'chomplr'
};

export const IOSProductsBasicData = [
	loFlyDirtBasicData,
	flyTape2BasicData,
	flyTapeBasicData,
	chomplrBasicData
] as const;

export const CustomPages: CustomPage[] = [
	{
		stylesVariants: {
			'max-w': '100ch',
			mx: 'auto',
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16'
		},
		slug: IOSProductsBasicData[0].slug,
		mainTag: 'ios-app-sub-page',
		pageStructure: LoflyDirtIOSApp
	},
	{
		stylesVariants: {
			'max-w': '100ch',
			mx: 'auto',
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16'
		},
		slug: IOSProductsBasicData[1].slug,
		mainTag: 'ios-app-sub-page',
		pageStructure: FlyTape2IOSApp
	},
	{
		stylesVariants: {
			'max-w': '100ch',
			mx: 'auto',
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16'
		},
		slug: IOSProductsBasicData[2].slug,
		mainTag: 'ios-app-sub-page',
		pageStructure: FlyTapeIOSApp
	},
	{
		stylesVariants: {
			'max-w': '100ch',
			mx: 'auto',
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16'
		},
		slug: IOSProductsBasicData[3].slug,
		mainTag: 'ios-app-sub-page',
		pageStructure: ChomplrOSApp
	},
	{
		stylesVariants: {
			'max-w': '100ch',
			mx: 'auto',
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16'
		},
		slug: 'about',
		mainTag: 'about-page',
		pageStructure: [
			{
				stylesVariants: { 'gap-y': '16' },
				___type: 'standard-section',
				title: 'About MSX Audio',
				body: [
					{
						customPageClassesKeys: ['blog-post'],
						___type: 'md',
						content: `## What we do

MSXII is committed to providing the audio community with quality, well-thought out, up-to-date, relevant & vintage sounds; sounds that are ready to use in your projects upon download. All material released is recorded through state-of-the-art equipment such as the SSL Duality, UA & Avalon preamps, vintage Neumann microphones, and into Apogee converters before landing into either Protools, Logic, or Live for print. Some projects will also receive further processing into vintage tape machines and other analog boards for added warmth and character. All products are mix-ready with light to little compression. No limiting or mastering is processed on our sounds to provide the user with the best possible end result for their project.

## Credibility

Our products and services have been used by and associated with the likes of numerous industry musicians and companies including: Dr. Dre, Ryan Leslie, Jay Electronica, MTV, VH1, E!, Snoop Dog, 9th Wonder, Eminem, Lil Brother, Centric, E!, Native Instruments, Output, Drumbroker, Novation, Intua, Akai, Ableton, and many more.

![](/images/custom-page/credibility.png)

## Compatibility

All MSXII kits, breaks, sample packs, and sounds are compatible with any DAW, software program, drum machine or iOS device that accepts the .wav format. This includes Native Instruments Maschine, All Akai MPC's, Logic Pro/X, Pro Tools, Ableton Live, Propellerhead Reason, Cubase, Nuendo, FL Studio, and more.

![](/images/custom-page/compatibility.png){.center}

With any questions regarding our kits, breaks, or sample packs, contact us at msxaudio@gmail.com`
					}
				]
			}
		]
	},
	{
		stylesVariants: {
			'max-w': '100ch',
			mx: 'auto',
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16'
		},
		slug: 'support',
		mainTag: 'support-page',
		pageStructure: [
			{
				stylesVariants: { 'gap-y': '16' },
				___type: 'standard-section',
				title: 'Support',
				body: [
					{
						customPageClassesKeys: ['blog-post'],
						___type: 'md',
						content: `## I purchased a product(s) and can't find the download link. Where is it?

All drum kits and digital downloads links are sent to the e-mail address your order was placed under. Occasionally, some e-mail services and filters will re-direct our e-mails to your SPAM Folder/Filter. If your PayPal e-mail address is different than the order e-mail address, check your PayPal e-mail inbox. Please check your SPAM Folder/Filter before contacting us. Should you have further trouble locating your order download link, email us at support@msxaudio.com.

## Are MSXII Sound Design packs royalty free?

Some are.  Most notably our Blue Label products & those selected vibes from our app, Chomplr. You will see licensing info in each product we offer. For projects that are not royalty free such as the Soulful Stems 3, the Lofi Melodics Series, etc, you are able to sample from it and get a fair split on writers share & publishing with us. MSXII writers will be credited as writers of the works (co-production credit) which will all be worked out prior to your placement release.  All MSXII kits and sample packs are made completely from scratch and are our sole original works.  We guarantee no clearance issues. See PartyNextDoor's "Love Me Again" for an example below as our own [M.SIMPSON] is credited for writing the sample.

![](https://s3-alpha-sig.figma.com/img/51b7/a1b0/41cc88a345253c17c84169da96ad0a81?Expires=1681084800&Signature=iKHREd70av-HYVb6BmSD9oOWVFk2C35Mk0rNT24L4qsuh0VZUI8kxtuYmSdW9ruTZ3Z~1HrmrFYKT1w~o6hmoJbT8Hab~MMY9RoHXzGzgSMN-jWLt~mVBFpkoPrwG0ZiPBB2WgOb5GVAP80oJ2DyNVli1P69WMHIJHHGoZiQ6FFMa-pwQOanSgOlwTBnr5P7KPVoo1vXqObQCuKycpP5dWAEJi4fPGZoH~mfVtpryU3IAiO-UzzGQgSNG1uO9wZmTy9dHUsZIjmGsHQyEUjl1VzZbTaVc25B7uKF~uTgwuJ9qg~77rYVB7BGeZWW2cfsYZ44HiL11KpenfsHt-Vm3Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4)

## Are your sounds compatible with my software/sampler?

All MSXII Sound Design kits, breaks, sample packs, and sounds are compatible with any DAW, software program, drum machine or iOS device that accepts the .wav format. This includes Native Instruments Maschine, Beatmaker 3, Korg Gadget, Cubasis, All Akai MPC's, Logic Pro/X, Pro Tools, Ableton Live, Propellerhead Reason, Cubase, Nuendo, FL Studio, and more.

## What is your refund policy?

Since we sell a digital product, there are no refunds that are given.  We're as transparent as possible with the creation of our product to ensure the end user has full knowledge of what their purchase will yield.  A good name is better than any dollar...we pride ourselves on a solid business and a solid product.

## How often do you do free giveaways & contests?

We do these from time to time.  In order to be notified of any MSXII giveaways or contests, you must subscribe to our mailing list.  To sign up, click here.

## PRIVACY POLICY

We are committed to protecting your privacy. There is an opt-in policy to receive marketing and other e-blasts about future products available as well as deals and coupons. If you do not wish to receive these emails you can opt out by simply removing the check from the marketing box below upon check out. We will never sell your email or personal information.

## SECURITY POLICY

Your payment and personal information is always safe. Our SSL (secure server software) is the industry standard and among the best software available today for secure commerce transactions. It encrypts all of your personal information, including credit card number, name, and address, so that it cannot be read over the internet.
For all other questions and inquiries, feel free to email our support at support@msxaudio.com.`
					}
				]
			}
		]
	},
	{
		stylesVariants: {
			'max-w': '100ch',
			mx: 'auto',
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16'
		},
		slug: 'license-agreement',
		mainTag: 'license-agreement-page',
		pageStructure: [
			{
				stylesVariants: { 'gap-y': '16' },
				___type: 'standard-section',
				title: 'License Agreement',
				description: `By purchasing any MSXII Sound Design product you accept the following product license agreement:`,
				body: [
					{
						customPageClassesKeys: ['blog-post'],
						___type: 'md',
						content: `#### 1. License Grant:

The license for this product is granted only to a single user.  You may use our product(s) on up to two (2) computers, which computers shall be owned and used by you exclusively.  If you need more, special arrangements may be made on a case-by-case basis.  All sounds and samples in compositional format in our products are licensed, but not sold, to you by MSXII Sound Design for commercial and non-commercial use in music, sound-effect, audio/video post-production, performance, broadcast or similar finished content-creation and production use with proper clearance for any commercial usage.

This license is nontransferable and expressly forbids resale or lease or share of the product(s).

This license also expressly forbids any inclusion of content contained within our libraries, or any other MSXII Sound Design library, into any other virtual instrument, sample pack, drum kit, or library of any kind, without our express written consent. This license forbids any re-distribution method of this product, or its sounds, through any means, including but not limited to, re-sampling, mixing, processing, isolating, or embedding into software or hardware of any kind, for the purpose of re-recording or reproduction as part of any free or commercial library of musical and/or sound effect samples and/or articulations, or any form of musical sample or sound effect sample playback system or device or on a stand alone basis.

#### 2.  Rights Policy:

The product, including accompanying documentation, is protected by copyright laws and international copyright treaties, as well as other intellectual property laws and treaties. MSXII Sound Design retains full copyright privileges and complete ownership of all recorded sounds, instrument programming, documentation and musical performances included in these product(s).  Any rights not specifically granted herein are reserved by MSXII Sound Design.

Any unauthorized use, distribution or reproduction of the product shall not be permitted, shall constitute a violation of law, and shall entitle MSXII Sound Design to, in addition to any other remedy at law or equity, injunctive relief.  It is unlawful to deliberately circumvent, alter or delete technological measures of protection and information provided by MSXII Sound Design which identifies the products, its owner and the terms and conditions for its use. If the product(s) ends up in other people's music, you will be held legally responsible, so we ask you to keep this product for yourself.  You further agree to take all reasonable steps to protect this product from unauthorized copying or use.

#### 3. Limited Warranty/Limitation of Liability:

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, MSXII SOUND DESIGN DISCLAIMS ALL WARRANTIES AND CONDITIONS, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, WARRANTIES OF SATISFACTORY QUALITY, TITLE, AND NON-INFRINGEMENT, WITH REGARD TO THE PRODUCT. TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER MSXII SOUND DESIGN, ITS SUPPLIERS, DEALERS, DISTRIBUTORS, NOR THE AGENTS OR EMPLOYEES OF THE FOREGOING WILL BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL, SPECIAL OR INCIDENTAL DAMAGES OF ANY SORT, (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOST PROFITS, BUSINESS INTERRUPTION OR LOSS OF DATA ARISING OUT OF THE USE OF THE PRODUCT) WHETHER OR NOT SAME HAVE BEEN NOTIFIED OF THE POSSIBILITY OF SUCH DAMAGES, OR OF ANY CLAIM BY ANY OTHER PARTY.

#### 4. Term:

This license agreement is effective from the moment the product is received by any means, within or outside of these terms.  The license will remain in full effect until termination.  The license is terminated if you break any of the terms or conditions of this agreement.  Upon termination you agree to destroy all copies and contents of the product at your own expense.  In the event of termination, the following sections of this license will survive: 1,2,3,4,5 and 6.

#### 5. Bundles & Discounts

All bundle and discounted purchases and prices apply only to the product line at the time of purchase. Customers who purchased a bundle or used a discount to the complete product line are not eligible for additional discounts or free products on future product releases unless specifically noted by MSXII Sound Design.

#### 6. General Terms:

(a) This license shall be governed by Texas law applicable to contracts fully negotiated, executed and performed therein. Only the Texas courts (state and federal) shall have jurisdiction over controversies regarding this license; any proceeding involving such a controversy shall be brought in those courts, and not elsewhere. In the event of any claim arising from the breach or alleged breach of the terms of this license, the prevailing party shall be entitled to reasonable attorneys’ fees and court costs.

(b) You agree that this license contains the complete agreement between the parties hereto, and supersedes all other communication, relating to the subject matter of the license.

(c) You acknowledge that you have read this license and understand it and agree to be bound by its terms and conditions.`
					}
				]
			}
		]
	},
	{
		stylesVariants: {
			'max-w': '100ch',
			mx: 'auto',
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16'
		},
		slug: 'creative-space',
		mainTag: 'creative-space-page',
		pageStructure: [
			{
				stylesVariants: { 'gap-y': '16' },
				___type: 'standard-section',
				title: 'Creative Space',
				body: [
					{
						stylesVariants: { w: 'full', rounded: '3xl' },
						___type: 'image-only',
						src: 'https://cdn.shopify.com/s/files/1/0345/7209/files/unnamed_1024x1024.jpg?974986980763682955'
					},
					{
						___type: 'md',
						content: `Welcome to Creative Space!  This is a series of instructional videos showing the creative use and possibilities of MSX Audio sample packs, drum kits, construction packs, and drum breaks.  You're welcome to learn and enjoy!`
					},
					{
						___type: 'iframe',
						___subType: 'youtube',
						src: 'https://www.youtube.com/embed/DQajIJ_LWUY?rel=0'
					},
					{
						___type: 'iframe',
						___subType: 'youtube',
						src: 'https://www.youtube.com/embed/3ny7mrUjpZA?rel=0'
					},
					{
						___type: 'iframe',
						___subType: 'soundcloud',
						src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/250757664&color=ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false'
					},
					{
						___type: 'iframe',
						___subType: 'youtube',
						src: 'https://www.youtube.com/embed/XJihPAHx3mc?rel=0'
					},
					{
						___type: 'iframe',
						___subType: 'youtube',
						src: 'https://www.youtube.com/embed/KacmJqcf8kU?rel=0'
					},
					{
						___type: 'iframe',
						___subType: 'youtube',
						src: 'https://www.youtube.com/embed/iJeasAskVUk?rel=0'
					}
				]
			}
		]
	},
	{
		stylesVariants: {
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16'
		},
		slug: 'blue-label',
		mainTag: 'blue-label-page',
		pageStructure: [
			{
				stylesVariants: { 'gap-y': '16' },
				___type: 'standard-section',
				title: 'BLUE LABEL',
				body: [
					{
						stylesVariants: { w: 'full', rounded: '3xl' },
						___type: 'image-only',
						src: 'https://s3-alpha-sig.figma.com/img/6b87/e37b/85972ec45a3df6dda53c3dc2cc6a1668?Expires=1681084800&Signature=APuChhqaPDDGQ~v27MUlWEaokRsH7p7vIV0bKZOirtCBXVXkRcPc7jPIbipb4cP765HlYfGDcV2loyCtsbzAFF6FmLW5Wu01R5Dd~0K446QWPCrrIuZIklJ-m3Z6d3DN2Dd2Spn5vv8AQI97ungPJRGBNVlZpBM~LzlkXqfMX8h45UmgJrMdEUVr3TXj5KFuvbF95CXPyDvfUlUqEQhuCl6cc4aM0ZIcvratmii1SaBUmkIjIo-VF7RfH-yLvVGo~eLCKg0pbIvcJVwpZSl7JrbKdIpj-BUlGg26FRRVnNYYd2SWQSpW-h-CFsp~kXvTQDVJIzMXWmfdlyQz1Vo9eA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
					},
					{
						___type: 'md',
						content: `Welcome to the MSXII Blue Label.  The MSXII Blue Label is a brand new segment of periodic releases that are completely royalty-free for use. No such follow up or clearance is required. While we have a very clear, concise license use case policy with our compositional based products such as Lofi Melodics, Synthesized Soul, 70's Soul Aesthetics etc, we understand that all end use cases are different. Here's a line & label that requires no questions asked. Use however, whenever, wherever you'd like & generate as much income in your endeavors as possible w/o having to contact our support. Each product will be marked with a "Blue Label" banner in the top left corner of it's product as well as include a .pdf inside its packaging. Most MSXII Blue Label compositional packs will include stems options at checkout or as included in the product. Trap Melodics Vol. 1 kicks this off!`
					}
				]
			}
		]
	}
];
