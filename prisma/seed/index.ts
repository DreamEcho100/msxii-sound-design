import {
	BoxTypes,
	IframeBoxTypes,
	PrismaClient,
	SlidersHolderSlidePerViewType,
	Box as BoxModel,
} from '@prisma/client';
// import page from './data/lo-fly-dirt';
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

const seedPage = async (page: CustomPage) => {
	const createdCustomPage = await prisma.page.create({
		data: {
			category: page.category,
			slug: page.slug,
			updatedAt: null,
			css: {
				create: {
					twVariants: page.twClassNameVariants,
					custom: page.customPageClassesKeys,
				},
			},
			// sections: page.pageStructure.map(section => ({}))
		},
	});

	const sectionToOrderMap = Object.fromEntries(
		page.pageStructure.map((section) => [section.order, section]),
	);

	const createSections = async () =>
		await prisma.$transaction(
			page.pageStructure.map((section) =>
				prisma.section.create({
					data: {
						page: { connect: { id: createdCustomPage.id } },
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

						return {
							type: BoxTypes.GRID,
							gridBox: {
								create: {
									boxesToGrids: {
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
							tabsHolder: {
								create: {
									boxesToTabsHolders: {
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
											? SlidersHolderSlidePerViewType.ONE_SLIDE
											: box.slidesPerViewType === 'large-slides'
											? SlidersHolderSlidePerViewType.LARGE_SLIDES
											: SlidersHolderSlidePerViewType.DEFAULT,
									boxesToSliders: {
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
	const pages = [
		loFlyDirtPageData,
		flyTapePageData,
		flyTape2PageData,
		chomplrPageData,
	];

	for await (const page of pages) {
		await seedPage(page);
	}
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const changeConstraintsNames = async () => {
	{
		await prisma.$queryRaw`ALTER TABLE "BoxToTabsHolder"
	RENAME CONSTRAINT "BoxToTabsHolder_tabsHolderId_fkey" TO "_BTCB_tabsHolderId_fkey"`.catch(
			(error) => console.error(error),
		);
		await prisma.$queryRaw`ALTER TABLE "BoxToTabsHolder"
	RENAME CONSTRAINT "BoxToTabsHolder_boxId_fkey" TO "_BTCB_boxId_fkey"`.catch(
			(error) => console.error(error),
		);
		await prisma.$queryRaw`ALTER TABLE "BoxToTabsHolder"
	RENAME CONSTRAINT "BoxToTabsHolder_pkey" TO "_BTCB_pkey"`.catch((error) =>
			console.error(error),
		);
	}

	{
		await prisma.$queryRaw`ALTER TABLE "BoxToSlider"
	RENAME CONSTRAINT "BoxToSlider_boxId_fkey" TO "_BTSB_boxId_fkey"`.catch(
			(error) => console.error(error),
		);
		await prisma.$queryRaw`ALTER TABLE "BoxToSlider"
	RENAME CONSTRAINT "BoxToSlider_pkey" TO "_BTSB_pkey"`.catch((error) =>
			console.error(error),
		);
		await prisma.$queryRaw`ALTER TABLE "BoxToSlider"
	RENAME CONSTRAINT "BoxToSlider_sliderBoxId_fkey" TO "_BTSB_sliderBoxId_fkey"`.catch(
			(error) => console.error(error),
		);
	}

	{
		await prisma.$queryRaw`ALTER TABLE "BoxToGrid"
	RENAME CONSTRAINT "BoxToGrid_boxId_fkey" TO "_BTGB_boxId_fkey"`.catch((error) =>
			console.error(error),
		);
		await prisma.$queryRaw`ALTER TABLE "BoxToGrid"
	RENAME CONSTRAINT "BoxToGrid_pkey" TO "_BTGB_pkey"`.catch((error) =>
			console.error(error),
		);
		await prisma.$queryRaw`ALTER TABLE "BoxToGrid"
	RENAME CONSTRAINT "BoxToGrid_gridBoxId_fkey" TO "_BTGB_gridBoxId_fkey"`.catch(
			(error) => console.error(error),
		);
	}
};

const seedAll = async () => {
	await seedPages();
	// await changeConstraintsNames();
};

await seedAll();

export type TPrisma = typeof prisma;
