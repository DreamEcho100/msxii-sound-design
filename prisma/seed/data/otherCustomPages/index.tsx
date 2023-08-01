import { createStandardSection } from '../../utils';
import { CustomPage } from '../../../../src/utils/types/custom-page';
import {
	aboutPageCategory,
	blueLabelPageCategory,
	policiesPageCategory,
	productsPageCategory,
	supportPageCategory,
} from '../pagesCategories/index';

const otherCustomPages: CustomPage[] = [
	{
		twClassNameVariants: {
			'max-w': '100ch',
			mx: 'auto',
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16',
		},
		// slug: 'about',
		pageCategoryName: aboutPageCategory.name,
		title: 'About',
		description: '',
		pageStructure: [
			{
				order: 0,
				twClassNameVariants: { 'gap-y': '16' },
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

![](/images/custom-page/credibility.png?className=w-96)

## Compatibility

All MSXII kits, breaks, sample packs, and sounds are compatible with any DAW, software program, drum machine or iOS device that accepts the .wav format. This includes Native Instruments Maschine, All Akai MPC's, Logic Pro/X, Pro Tools, Ableton Live, Propellerhead Reason, Cubase, Nuendo, FL Studio, and more.

![](/images/custom-page/compatibility.png?className=w-96)

With any questions regarding our kits, breaks, or sample packs, contact us at msxaudio@gmail.com`,
					},
				],
			},
		],
	},
	{
		twClassNameVariants: {
			py: '8',
			'gap-x': '16',
			'gap-y': '16',
		},
		// image: {
		// 	src: 'https://www.msxaudio.com/cdn/shop/t/28/assets/pf-14628b40-cf9b-4aa0-bb27-4a9d4df56e9c--LoFly-Dirt-App-Banner.jpg?v=1580772023',
		// },
		// title: 'Lo-Fly Dirt',
		// slug: 'lo-fly-dirt',
		pageCategoryName: policiesPageCategory.name,
		title: 'Policies',
		description: null,
		pageStructure: [
			createStandardSection({
				order: 0,
				body: [
					{
						___type: 'header',
						title: 'Policies',
						description: null, // 'Explore our unique and practical iOS apps.',
					},
				],
			}),
		],
	},
	{
		twClassNameVariants: {
			'max-w': '100ch',
			mx: 'auto',
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16',
		},
		// slug: 'support',
		pageCategoryName: supportPageCategory.name,
		title: 'Support',
		description: '',
		pageStructure: [
			{
				order: 0,
				twClassNameVariants: { 'gap-y': '16' },
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

![](/images/support.png)

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
For all other questions and inquiries, feel free to email our support at support@msxaudio.com.`,
					},
				],
			},
		],
	},
	{
		twClassNameVariants: {
			'max-w': '100ch',
			mx: 'auto',
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16',
		},
		slug: 'license-agreement',
		pageCategoryName: policiesPageCategory.name,
		title: 'Policies',
		description: 'policies - license agreement',
		pageStructure: [
			{
				order: 0,
				twClassNameVariants: { 'gap-y': '16' },
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

(a) This license shall be governed by Texas law applicable to contracts fully negotiated, executed and performed therein. Only the Texas courts (state and federal) shall have jurisdiction over controversies regarding this license; any proceeding involving such a controversy shall be brought in those courts, and not elsewhere. In the event of any claim arising from the breach or alleged breach of the terms of this license, the prevailing party shall be entitled to reasonable attorneys' fees and court costs.

(b) You agree that this license contains the complete agreement between the parties hereto, and supersedes all other communication, relating to the subject matter of the license.

(c) You acknowledge that you have read this license and understand it and agree to be bound by its terms and conditions.`,
					},
				],
			},
		],
	},
	{
		twClassNameVariants: {
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16',
		},
		// slug: 'merch',
		pageCategoryName: 'merch',
		title: 'Merch',
		description: '',
		pageStructure: [
			{
				order: 0,
				twClassNameVariants: { 'gap-y': '16' },
				___type: 'standard-section',
				title: 'Merch',
				description: 'Explore our merch products',
				body: [],
			},
		],
	},
	{
		twClassNameVariants: {
			px: '12',
			py: '16',
			'gap-x': '16',
			'gap-y': '16',
		},
		// slug: 'blue-label',
		pageCategoryName: blueLabelPageCategory.name,
		title: 'Bue Label',
		description: 'Explore our merch products',
		pageStructure: [
			{
				order: 0,
				twClassNameVariants: { 'gap-y': '16' },
				___type: 'standard-section',
				title: 'Blue Label',
				body: [
					{
						twClassNameVariants: {
							w: 'full',
							rounded: '3xl',
							'max-w': '100ch',
							mx: 'auto',
						},
						___type: 'image-only',
						src: '/images/blue-label.png',
					},
					{
						___type: 'md',
						content: `Welcome to the MSXII Blue Label.  The MSXII Blue Label is a brand new segment of periodic releases that are completely royalty-free for use. No such follow up or clearance is required. While we have a very clear, concise license use case policy with our compositional based products such as Lofi Melodics, Synthesized Soul, 70's Soul Aesthetics etc, we understand that all end use cases are different. Here's a line & label that requires no questions asked. Use however, whenever, wherever you'd like & generate as much income in your endeavors as possible w/o having to contact our support. Each product will be marked with a "Blue Label" banner in the top left corner of it's product as well as include a .pdf inside its packaging. Most MSXII Blue Label compositional packs will include stems options at checkout or as included in the product. Trap Melodics Vol. 1 kicks this off!`,
					},
				],
			},
		],
	},
	{
		twClassNameVariants: {
			py: '8',
			'gap-x': '16',
			'gap-y': '16',
		},
		// image: {
		// 	src: 'https://www.msxaudio.com/cdn/shop/t/28/assets/pf-14628b40-cf9b-4aa0-bb27-4a9d4df56e9c--LoFly-Dirt-App-Banner.jpg?v=1580772023',
		// },
		// title: 'Lo-Fly Dirt',
		// slug: 'lo-fly-dirt',
		pageCategoryName: productsPageCategory.name,
		title: 'Products',
		description: null,
		pageStructure: [
			createStandardSection({
				order: 0,
				body: [
					{
						___type: 'header',
						title: 'Products',
						description: null, // 'Explore our unique and practical iOS apps.',
					},
				],
			}),
		],
	},
	// 	{
	// 		twClassNameVariants: {
	// 			'gap-x': '16',
	// 			'gap-y': '16',
	// 		},
	// 		slug: 'champion-hoodie',
	// 		pageCategoryName: 'merch',
	// 		pageStructure: [
	// 			{
	// 				order: 0,
	// 				twClassNameVariants: { 'gap-y': '16' },
	// 				___type: 'standard-section',
	// 				body: [
	// 					{
	// 						twClassNameVariants: { 'max-w': '125ch', mx: 'auto' },
	// 						customPageClassesKeys: ['blog-post'],
	// 						___type: 'md',
	// 						content: `## Details
	// Lorem ipsum dolor sit amet consectetur adipisicing elit.
	// Necessitatibus amet tempore delectus voluptatibus perspiciatis, et
	// tempora non, deserunt molestias sint unde at debitis obcaecati nobis
	// incidunt asperiores. Fugit, doloremque voluptates.

	// |                 |     S    |   M      |     L    |     X    |    2XL   |
	// | --------------- | -------- | -------- | -------- | -------- | -------- |
	// | Length (inches) |  27 1/2  |  28 1/2  |  29 1/2  |  30 1/2  |  31 1/2  |
	// | Width (inches)  |    21    |    23    | 	25 	 	 |    27  	|	 29      |

	// `,
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
];

export default otherCustomPages;
