import {
	BoxTypes,
	IframeBoxTypes,
	PrismaClient,
	SlidersContainerSlidePerViewType,
	Box as BoxModel,
} from '@prisma/client';
// import customPage from './data/lo-fly-dirt';
import {
	Box,
	CustomPage,
	RowsOnlyBox,
	TwoColumnsBox,
} from '../../src/utils/types/custom-page';
import {
	chomplrPageData,
	flyTape2PageData,
	flyTapePageData,
	loFlyDirtPageData,
} from './data/ios-apps';
// import loFlyDirtPageData from './data/lo-fly-dirt';

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

const prisma =
	global.prisma ||
	new PrismaClient({
		log:
			process.env.NODE_ENV === 'development'
				? ['query', 'error', 'warn', 'info']
				: ['error'],
		errorFormat: 'minimal',
	});

if (process.env.NODE_ENV !== 'production') {
	global.prisma = prisma;
}

const seedPage = async (customPage: CustomPage) => {
	const createdCustomPage = await prisma.customPage.create({
		data: {
			category: customPage.category,
			slug: customPage.slug,
			updatedAt: null,
			css: {
				create: {
					twVariants: customPage.twClassNameVariants,
					custom: customPage.customPageClassesKeys,
				},
			},
			// sections: customPage.pageStructure.map(section => ({}))
		},
	});

	const sectionToOrderMap = Object.fromEntries(
		customPage.pageStructure.map((section) => [section.order, section]),
	);

	const createSections = async () =>
		await prisma.$transaction(
			customPage.pageStructure.map((section) =>
				prisma.section.create({
					data: {
						customPage: { connect: { id: createdCustomPage.id } },
						css: {
							create: {
								twVariants: section.twClassNameVariants,
								custom: section.customPageClassesKeys,
							},
						},
						order: section.order,
					},
				}),
			),
		);

	for await (const createdSection of await createSections()) {
		const section = sectionToOrderMap[createdSection.order]!;

		const sectionBoxes: (Exclude<Box, RowsOnlyBox | TwoColumnsBox> & {
			order: number;
		})[] = [];

		type SectionBoxes = typeof sectionBoxes;

		let sizePreBodyLoop = 0;

		if (section.title) {
			sizePreBodyLoop++;
			sectionBoxes.push({
				___type: 'header',
				title: section.title,
				description: section.description,
				order: 0,
			});
		}

		section.body.forEach((box, boxIndex) => {
			if (box.___type === 'rows-only' || box.___type === 'two-columns') return;

			sectionBoxes.push({ ...box, order: sizePreBodyLoop + boxIndex });
		});

		const createBoxes = async <Meta = undefined>(
			sectionBoxes: SectionBoxes,
			params: {
				sectionId?: string;
				meta?: Meta;
			},
		): Promise<
			Meta extends undefined ? BoxModel[] : { meta: Meta; boxes: BoxModel[] }
		> => {
			const boxes: BoxModel[] = [];

			const createTypeBoxData = async (
				box: SectionBoxes[number],
			): Promise<
				| false
				| Omit<
						Parameters<PrismaClient['box']['create']>[0]['data'],
						'id' | 'section' | 'css' | 'sectionId' | 'cssId' | 'order'
				  >
			> => {
				switch (box.___type) {
					case 'header':
						return {
							type: BoxTypes.HEADER,
							headerBox: {
								create: {
									title: box.title,
									description: box.description,
								},
							},
						};

					case 'md':
						return {
							type: BoxTypes.MD,
							mdBox: {
								create: { content: box.content },
							},
						};

					case 'image-only':
						return {
							type: BoxTypes.IMAGE,
							imageBox: {
								create: {
									src: box.src,
									altText: box.altText,
									width: box.width,
									height: box.height,
								},
							},
						};

					case 'iframe':
						return {
							type: BoxTypes.IFRAME,
							iframeBox: {
								create: {
									src: box.src,
									title: box.title,
									type:
										box.___subType === 'instagram'
											? IframeBoxTypes.INSTAGRAM
											: box.___subType === 'soundcloud'
											? IframeBoxTypes.SOUND_CLOUD
											: IframeBoxTypes.YOUTUBE,
								},
							},
						};

					case 'quote':
						return {
							type: BoxTypes.QUOTE,
							quoteBox: {
								create: {
									cite: box.cite,
									content: box.content,
								},
							},
						};

					case 'grid': {
						const itemsData = await createBoxes(
							box.items.map((item, itemIndex) => ({
								...item,
								order: itemIndex,
							})),
							{},
						).then((boxes) => boxes.map((box) => ({ boxId: box.id })));

						console.log('itemsData', itemsData);

						return {
							type: BoxTypes.GRID,
							gridBox: {
								create: {
									boxesToGridBoxes: {
										createMany: { data: itemsData },
									},
								},
							},
						};
					}

					case 'tabs': {
						const itemsData = await createBoxes(
							box.tabs.map((item, itemIndex) => ({
								...item.data,
								order: itemIndex,
							})),
							{},
						).then((boxes) =>
							boxes.map((_box, _boxIndex) => ({
								boxId: _box.id,
								title: box.tabs[_boxIndex]?.title || '',
							})),
						);

						return {
							type: BoxTypes.TABS_CONTAINER,
							tabsContainerBox: {
								create: {
									boxesToTabsContainerBoxes: {
										createMany: { data: itemsData },
									},
								},
							},
						};
					}

					case 'slider': {
						const slidesData = await createBoxes(
							box.slides.map((item, itemIndex) => ({
								...item,
								order: itemIndex,
							})),
							{},
						).then((boxes) =>
							boxes.map((_box, _boxIndex) => ({
								boxId: _box.id,
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								title: box.slides[_boxIndex]?.title,
							})),
						);

						return {
							type: BoxTypes.SLIDER,
							sliderBox: {
								create: {
									slidesPerViewType:
										box.slidesPerViewType === 'one-slide'
											? SlidersContainerSlidePerViewType.ONE_SLIDE
											: box.slidesPerViewType === 'large-slides'
											? SlidersContainerSlidePerViewType.LARGE_SLIDES
											: SlidersContainerSlidePerViewType.DEFAULT,
									boxesToSliderBoxes: {
										createMany: { data: slidesData },
									},
								},
							},
						};
					}

					default:
						return false;
				}
			};

			for await (const box of sectionBoxes) {
				const boxTypeData = await createTypeBoxData(box);

				if (!boxTypeData) continue;

				boxes.push(
					await prisma.box.create({
						data: {
							section: !params.sectionId
								? undefined
								: { connect: { id: params.sectionId } },
							css: {
								create: {
									twVariants: box.twClassNameVariants,
									custom: box.customPageClassesKeys,
								},
							},
							order: box.order,
							...boxTypeData,
						},
					}),
				);
			}

			if (!params.meta) {
				return boxes as unknown as Promise<
					Meta extends undefined
						? BoxModel[]
						: { meta: Meta; boxes: BoxModel[] }
				>;
			}

			return {
				meta: params.meta,
				boxes,
			} as unknown as Promise<
				Meta extends undefined ? BoxModel[] : { meta: Meta; boxes: BoxModel[] }
			>;
		};

		await createBoxes(sectionBoxes, {
			sectionId: createdSection.id,
		});

		// break; // Closes iterator, triggers return
	}
};

const seedPages = async () => {
	const customPages = [
		loFlyDirtPageData,
		flyTapePageData,
		flyTape2PageData,
		chomplrPageData,
	];

	for await (const customPage of customPages) {
		await seedPage(customPage);
	}
};

const seedAll = async () => {
	await seedPages();
};

await seedAll();

export type TPrisma = typeof prisma;
