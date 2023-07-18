import {
	pgTable,
	pgEnum,
	// pgSchema,
	// AnyPgColumn,
	text,
	timestamp,
	integer,
	index,
	foreignKey,
	serial,
	uniqueIndex,
	boolean,
	jsonb,
	primaryKey,
} from 'drizzle-orm/pg-core';

export const iframeBoxTypes = pgEnum('IframeBoxTypes', [
	'YOUTUBE',
	'INSTAGRAM',
	'SOUND_CLOUD',
]);
export const slidersHolderSlidePerViewType = pgEnum(
	'SlidersHolderSlidePerViewType',
	['DEFAULT', 'ONE_SLIDE', 'LARGE_SLIDES'],
);
export const boxTypes = pgEnum('BoxTypes', [
	'MD',
	'IMAGE',
	'IFRAME',
	'QUOTE',
	'HEADER',
	'TABS_HOLDER',
	'GRID',
	'SLIDER',
]);

// import { sql } from 'drizzle-orm';

export const category = pgTable('Category', {
	id: text('id').primaryKey().notNull(),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
	name: text('name').notNull(),
	counter: integer('counter').notNull(),
});

export const section = pgTable(
	'Section',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		order: serial('order').notNull(),
		pageId: text('pageId')
			.notNull()
			.references(() => page.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		cssId: text('cssId')
			.notNull()
			.references(() => css.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
	},
	(table) => {
		return {
			cssIdIdx: index('Section_cssId_idx').on(table.cssId),
			orderIdx: index('Section_order_idx').on(table.order),
			pageIdIdx: index('Section_pageId_idx').on(table.pageId),
		};
	},
);

export const imageBox = pgTable(
	'ImageBox',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		boxId: text('boxId').notNull(),
		boxType: boxTypes('boxType').default('IMAGE').notNull(),
		src: text('src').notNull(),
		altText: text('altText'),
		width: integer('width'),
		height: integer('height'),
	},
	(table) => {
		return {
			boxIdBoxTypeKey: uniqueIndex('ImageBox_boxId_boxType_key').on(
				table.boxId,
				table.boxType,
			),
			imageBoxBoxIdBoxTypeFkey: foreignKey({
				columns: [table.boxId, table.boxType],
				foreignColumns: [box.id, box.type],
			})
				.onUpdate('cascade')
				.onDelete('cascade'),
		};
	},
);

export const iframeBox = pgTable(
	'IframeBox',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		boxId: text('boxId').notNull(),
		boxType: boxTypes('boxType').default('IFRAME').notNull(),
		type: iframeBoxTypes('type').notNull(),
		src: text('src').notNull(),
		title: text('title'),
	},
	(table) => {
		return {
			boxIdBoxTypeKey: uniqueIndex('IframeBox_boxId_boxType_key').on(
				table.boxId,
				table.boxType,
			),
			iframeBoxBoxIdBoxTypeFkey: foreignKey({
				columns: [table.boxId, table.boxType],
				foreignColumns: [box.id, box.type],
			})
				.onUpdate('cascade')
				.onDelete('cascade'),
		};
	},
);

export const user = pgTable(
	'User',
	{
		id: text('id').primaryKey().notNull(),
		name: text('name'),
		email: text('email'),
		emailVerified: timestamp('emailVerified', { precision: 3, mode: 'date' }),
		image: text('image'),
	},
	(table) => {
		return {
			emailKey: uniqueIndex('User_email_key').on(table.email),
		};
	},
);

export const account = pgTable(
	'Account',
	{
		id: text('id').primaryKey().notNull(),
		userId: text('userId')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		type: text('type').notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refreshToken: text('refresh_token'),
		accessToken: text('access_token'),
		expiresAt: integer('expires_at'),
		tokenType: text('token_type'),
		scope: text('scope'),
		idToken: text('id_token'),
		sessionState: text('session_state'),
	},
	(table) => {
		return {
			providerProviderAccountIdKey: uniqueIndex(
				'Account_provider_providerAccountId_key',
			).on(table.provider, table.providerAccountId),
			userIdIdx: index('Account_userId_idx').on(table.userId),
		};
	},
);

export const sliderBox = pgTable(
	'SliderBox',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		boxId: text('boxId').notNull(),
		boxType: boxTypes('boxType').default('SLIDER').notNull(),
		slidesPerViewType: slidersHolderSlidePerViewType('slidesPerViewType')
			.default('DEFAULT')
			.notNull(),
	},
	(table) => {
		return {
			boxIdBoxTypeKey: uniqueIndex('SliderBox_boxId_boxType_key').on(
				table.boxId,
				table.boxType,
			),
			sliderBoxBoxIdBoxTypeFkey: foreignKey({
				columns: [table.boxId, table.boxType],
				foreignColumns: [box.id, box.type],
			})
				.onUpdate('cascade')
				.onDelete('cascade'),
		};
	},
);

export const quoteBox = pgTable(
	'QuoteBox',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		boxId: text('boxId').notNull(),
		boxType: boxTypes('boxType').default('QUOTE').notNull(),
		cite: text('cite').notNull(),
		content: text('content').notNull(),
	},
	(table) => {
		return {
			boxIdBoxTypeKey: uniqueIndex('QuoteBox_boxId_boxType_key').on(
				table.boxId,
				table.boxType,
			),
			quoteBoxBoxIdBoxTypeFkey: foreignKey({
				columns: [table.boxId, table.boxType],
				foreignColumns: [box.id, box.type],
			})
				.onUpdate('cascade')
				.onDelete('cascade'),
		};
	},
);

export const tabsHolder = pgTable(
	'TabsHolder',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		boxId: text('boxId').notNull(),
		boxType: boxTypes('boxType').default('TABS_HOLDER').notNull(),
	},
	(table) => {
		return {
			boxIdBoxTypeKey: uniqueIndex('TabsHolder_boxId_boxType_key').on(
				table.boxId,
				table.boxType,
			),
			tabsHolderBoxIdBoxTypeFkey: foreignKey({
				columns: [table.boxId, table.boxType],
				foreignColumns: [box.id, box.type],
			})
				.onUpdate('cascade')
				.onDelete('cascade'),
		};
	},
);

export const image = pgTable(
	'Image',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		src: text('src').notNull(),
		altText: text('altText'),
		width: integer('width'),
		height: integer('height'),
	},
	(table) => {
		return {
			srcKey: uniqueIndex('Image_src_key').on(table.src),
		};
	},
);

export const example = pgTable('Example', {
	id: text('id').primaryKey().notNull(),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }).notNull(),
});

export const gridBox = pgTable(
	'GridBox',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		boxId: text('boxId').notNull(),
		boxType: boxTypes('boxType').default('GRID').notNull(),
	},
	(table) => {
		return {
			boxIdBoxTypeKey: uniqueIndex('GridBox_boxId_boxType_key').on(
				table.boxId,
				table.boxType,
			),
			gridBoxBoxIdBoxTypeFkey: foreignKey({
				columns: [table.boxId, table.boxType],
				foreignColumns: [box.id, box.type],
			})
				.onUpdate('cascade')
				.onDelete('cascade'),
		};
	},
);

export const page = pgTable(
	'Page',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		cssId: text('cssId')
			.notNull()
			.references(() => css.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
		slug: text('slug'),
		categoryName: text('categoryName')
			.notNull()
			.references(() => category.name, {
				onDelete: 'restrict',
				onUpdate: 'cascade',
			}),
		imageId: text('imageId').references(() => image.id, {
			onDelete: 'set null',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			categoryNameSlugKey: uniqueIndex('Page_categoryName_slug_key').on(
				table.slug,
				table.categoryName,
			),
			cssIdIdx: index('Page_cssId_idx').on(table.cssId),
		};
	},
);

export const headerBox = pgTable(
	'HeaderBox',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		title: text('title').notNull(),
		description: text('description'),
		isMainPageTitle: boolean('isMainPageTitle').notNull(),
		boxId: text('boxId').notNull(),
		boxType: boxTypes('boxType').default('HEADER').notNull(),
	},
	(table) => {
		return {
			boxIdBoxTypeKey: uniqueIndex('HeaderBox_boxId_boxType_key').on(
				table.boxId,
				table.boxType,
			),
			headerBoxBoxIdBoxTypeFkey: foreignKey({
				columns: [table.boxId, table.boxType],
				foreignColumns: [box.id, box.type],
			})
				.onUpdate('cascade')
				.onDelete('cascade'),
		};
	},
);

export const session = pgTable(
	'Session',
	{
		id: text('id').primaryKey().notNull(),
		sessionToken: text('sessionToken').notNull(),
		userId: text('userId')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		expires: timestamp('expires', { precision: 3, mode: 'date' }).notNull(),
	},
	(table) => {
		return {
			sessionTokenKey: uniqueIndex('Session_sessionToken_key').on(
				table.sessionToken,
			),
			userIdIdx: index('Session_userId_idx').on(table.userId),
		};
	},
);

export const css = pgTable('css', {
	id: text('id').primaryKey().notNull(),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
	twVariants: jsonb('twVariants').default({}).notNull(),
	inlineStyles: jsonb('inlineStyles').default({}).notNull(),
	custom: text('custom').array(),
});

export const mdBox = pgTable(
	'MDBox',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		boxId: text('boxId').notNull(),
		boxType: boxTypes('boxType').default('MD').notNull(),
		content: text('content').notNull(),
	},
	(table) => {
		return {
			boxIdBoxTypeKey: uniqueIndex('MDBox_boxId_boxType_key').on(
				table.boxId,
				table.boxType,
			),
			mdBoxBoxIdBoxTypeFkey: foreignKey({
				columns: [table.boxId, table.boxType],
				foreignColumns: [box.id, box.type],
			})
				.onUpdate('cascade')
				.onDelete('cascade'),
		};
	},
);

export const verificationToken = pgTable(
	'VerificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { precision: 3, mode: 'date' }).notNull(),
	},
	(table) => {
		return {
			identifierTokenKey: uniqueIndex(
				'VerificationToken_identifier_token_key',
			).on(table.identifier, table.token),
			tokenKey: uniqueIndex('VerificationToken_token_key').on(table.token),
		};
	},
);

export const boxToGrid = pgTable(
	'BoxToGrid',
	{
		id: text('id').notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		order: serial('order').notNull(),
		boxId: text('boxId')
			.notNull()
			.references(() => box.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		gridBoxId: text('gridBoxId')
			.notNull()
			.references(() => gridBox.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
	},
	(table) => {
		return {
			boxIdIdx: index('BoxToGrid_boxId_idx').on(table.boxId),
			gridBoxIdIdx: index('BoxToGrid_gridBoxId_idx').on(table.gridBoxId),
			idKey: uniqueIndex('BoxToGrid_id_key').on(table.id),
			orderIdx: index('BoxToGrid_order_idx').on(table.order),
			btgbPkey: primaryKey(table.boxId, table.gridBoxId),
		};
	},
);

export const boxToSlider = pgTable(
	'BoxToSlider',
	{
		id: text('id').notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		title: text('title'),
		order: serial('order').notNull(),
		boxId: text('boxId')
			.notNull()
			.references(() => box.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		sliderBoxId: text('sliderBoxId')
			.notNull()
			.references(() => sliderBox.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
	},
	(table) => {
		return {
			boxIdIdx: index('BoxToSlider_boxId_idx').on(table.boxId),
			idKey: uniqueIndex('BoxToSlider_id_key').on(table.id),
			orderIdx: index('BoxToSlider_order_idx').on(table.order),
			sliderBoxIdIdx: index('BoxToSlider_sliderBoxId_idx').on(
				table.sliderBoxId,
			),
			btsbPkey: primaryKey(table.boxId, table.sliderBoxId),
		};
	},
);

export const box = pgTable(
	'Box',
	{
		id: text('id').notNull(),
		type: boxTypes('type').notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		order: serial('order').notNull(),
		cssId: text('cssId')
			.notNull()
			.references(() => css.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
		sectionId: text('sectionId').references(() => section.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			cssIdIdx: index('Box_cssId_idx').on(table.cssId),
			orderIdx: index('Box_order_idx').on(table.order),
			sectionIdIdx: index('Box_sectionId_idx').on(table.sectionId),
			boxPkey: primaryKey(table.id, table.type),
		};
	},
);

export const boxToTabsHolder = pgTable(
	'BoxToTabsHolder',
	{
		id: text('id').notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		title: text('title').notNull(),
		order: serial('order').notNull(),
		boxId: text('boxId')
			.notNull()
			.references(() => box.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		tabsHolderId: text('tabsHolderId')
			.notNull()
			.references(() => tabsHolder.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
	},
	(table) => {
		return {
			boxIdIdx: index('BoxToTabsHolder_boxId_idx').on(table.boxId),
			idKey: uniqueIndex('BoxToTabsHolder_id_key').on(table.id),
			orderIdx: index('BoxToTabsHolder_order_idx').on(table.order),
			tabsHolderIdIdx: index('BoxToTabsHolder_tabsHolderId_idx').on(
				table.tabsHolderId,
			),
			btcbPkey: primaryKey(table.boxId, table.tabsHolderId),
		};
	},
);
