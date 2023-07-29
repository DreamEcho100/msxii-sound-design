import {
	BoxTypes,
	IframeBoxTypes,
	PrismaClient,
	SlidesPerViewType,
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
import categories from './data/categories';
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

const seedCategories = async () => {
	console.log('Starting seeding categories');

	await prisma.category.createMany({
		data: categories,
	});

	console.log('Ending seeding categories');
	console.log('\n\n');
};

const seedPage = async (page: CustomPage) => {
	console.log(
		`Starting seeding page: ${page.categoryName}${
			page.slug ? `/${page.slug}` : ''
		}`,
	);

	const createdCustomPage = await prisma.page.create({
		data: {
			slug: page.slug,
			updatedAt: null,
			css: {
				create: {
					twVariants: page.twClassNameVariants,
					custom: page.customPageClassesKeys,
				},
			},
			category: { connect: { name: page.categoryName } },
			image: page.image && {
				connectOrCreate: {
					create: page.image,
					where: { src: page.image.src },
				},
			},
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
				| (Omit<
						Parameters<PrismaClient['box']['create']>[0]['data'],
						'id' | 'section' | 'css' | 'sectionId' | 'cssId' | 'order'
				  > &
						Partial<
							Pick<Parameters<PrismaClient['box']['create']>[0]['data'], 'css'>
						>)
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
							grid: {
								create: {
									boxesToGrids: {
										createMany: { data: itemsData },
									},
								},
							},
							css: {
								create: {
									twVariants: box.twClassNameVariants,
									custom: box.customPageClassesKeys,
									inlineStyles: {
										gridTemplateColumns: box.gridTemplateColumns,
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
							type: BoxTypes.TABS_HOLDER,
							tabs: {
								create: {
									boxesToTabs: {
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
							slider: {
								create: {
									slidesPerViewType:
										box.slidesPerViewType === 'one-slide'
											? SlidesPerViewType.ONE_SLIDE
											: box.slidesPerViewType === 'large-slides'
											? SlidesPerViewType.LARGE_SLIDES
											: SlidesPerViewType.DEFAULT,
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

	console.log(
		`Ending seeding page: ${page.categoryName}${
			page.slug ? `/${page.slug}` : ''
		}`,
	);
	console.log('\n');
};

const seedPages = async () => {
	console.log('Starting seeding pages');
	console.log('\n');

	const pages = [
		loFlyDirtPageData,
		flyTapePageData,
		flyTape2PageData,
		chomplrPageData,
	];

	for await (const page of pages) {
		await seedPage(page);
	}

	console.log('\n');
	console.log('Ending seeding pages');
	console.log('\n\n');
};

const seedAll = async () => {
	await seedCategories();
	await seedPages();
};

await seedAll();

// export type TPrisma = typeof prisma;
