import { ShopifyProduct } from './types';

const handleDefaultImagesPath = (path: string) => `/images/${path}`;

enum ProductsTags {
	'New Releases' = 'New Releases',
	'Drum Kits' = 'Drum Kits',
	'Sample Packs' = 'Sample Packs',
	'Vinyl' = 'Vinyl',
	'Bundles' = 'Bundles',
	'Loops' = 'Loops',
	'One Shot Drums' = 'One Shot Drums',
	'Instrument Kits' = 'Instrument Kits',
	'Presets' = 'Presets'
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
	{
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
	},
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
	}
];
