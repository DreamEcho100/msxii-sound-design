import {
	pgTable,
	pgEnum,
	// pgSchema,
	// AnyPgColumn,
	text,
	timestamp,
	uniqueIndex,
	foreignKey,
	integer,
	serial,
	jsonb,
	primaryKey,
} from 'drizzle-orm/pg-core';

export const iframeBoxTypes = pgEnum('IframeBoxTypes', [
	'SOUND_CLOUD',
	'INSTAGRAM',
	'YOUTUBE',
]);
export const slidersContainerSlidePerViewType = pgEnum(
	'SlidersContainerSlidePerViewType',
	['LARGE_SLIDES', 'ONE_SLIDE', 'DEFAULT'],
);
export const boxTypes = pgEnum('BoxTypes', [
	'SLIDER',
	'GRID',
	'TABS_CONTAINER',
	'HEADER',
	'QUOTE',
	'IFRAME',
	'IMAGE',
	'MD',
]);

// import { sql } from 'drizzle-orm';

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
		boxId: text('boxId')
			.notNull()
			.references(() => box.id),
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
				.onDelete('restrict'),
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
		boxId: text('boxId')
			.notNull()
			.references(() => box.id),
		boxType: boxTypes('boxType').default('HEADER').notNull(),
		title: text('title').notNull(),
		description: text('description'),
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
				.onDelete('restrict'),
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
		};
	},
);

export const section = pgTable('Section', {
	id: text('id').primaryKey().notNull(),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
		.defaultNow()
		.notNull(),
	order: serial('order').notNull(),
	customPageId: text('customPageId')
		.notNull()
		.references(() => customPage.id, {
			onDelete: 'restrict',
			onUpdate: 'cascade',
		}),
	cssId: text('cssId')
		.notNull()
		.references(() => css.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
});

export const tabsContainerBox = pgTable(
	'TabsContainerBox',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		boxId: text('boxId')
			.notNull()
			.references(() => box.id),
		boxType: boxTypes('boxType').default('TABS_CONTAINER').notNull(),
	},
	(table) => {
		return {
			boxIdBoxTypeKey: uniqueIndex('TabsContainerBox_boxId_boxType_key').on(
				table.boxId,
				table.boxType,
			),
			tabsContainerBoxBoxIdBoxTypeFkey: foreignKey({
				columns: [table.boxId, table.boxType],
				foreignColumns: [box.id, box.type],
			})
				.onUpdate('cascade')
				.onDelete('restrict'),
		};
	},
);

export const customPage = pgTable('CustomPage', {
	id: text('id').primaryKey().notNull(),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
	slug: text('slug').notNull(),
	category: text('category'),
	cssId: text('cssId')
		.notNull()
		.references(() => css.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
});

export const css = pgTable('css', {
	id: text('id').primaryKey().notNull(),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
	twVariants: jsonb('twVariants').default({}).notNull(),
	custom: text('custom').array(),
});

export const slidersContainerBox = pgTable(
	'SlidersContainerBox',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		boxId: text('boxId')
			.notNull()
			.references(() => box.id),
		boxType: boxTypes('boxType').default('SLIDER').notNull(),
		slidesPerViewType: slidersContainerSlidePerViewType('slidesPerViewType')
			.default('DEFAULT')
			.notNull(),
	},
	(table) => {
		return {
			boxIdBoxTypeKey: uniqueIndex('SlidersContainerBox_boxId_boxType_key').on(
				table.boxId,
				table.boxType,
			),
			slidersContainerBoxBoxIdBoxTypeFkey: foreignKey({
				columns: [table.boxId, table.boxType],
				foreignColumns: [box.id, box.type],
			})
				.onUpdate('cascade')
				.onDelete('restrict'),
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

export const mdBox = pgTable(
	'MDBox',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		boxId: text('boxId')
			.notNull()
			.references(() => box.id),
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
				.onDelete('restrict'),
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

export const imageBox = pgTable(
	'ImageBox',
	{
		id: text('id').primaryKey().notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		boxId: text('boxId')
			.notNull()
			.references(() => box.id),
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
				.onDelete('restrict'),
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
		boxId: text('boxId')
			.notNull()
			.references(() => box.id),
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
				.onDelete('restrict'),
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
		boxId: text('boxId')
			.notNull()
			.references(() => box.id),
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
				.onDelete('restrict'),
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
		};
	},
);

export const gridItemOnGridBox = pgTable(
	'GridItemOnGridBox',
	{
		id: text('id').notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		gridBoxParentId: text('GridBoxParentId')
			.notNull()
			.references(() => gridBox.id, {
				onDelete: 'restrict',
				onUpdate: 'cascade',
			}),
		itemId: text('itemId')
			.notNull()
			.references(() => box.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
		order: serial('order').notNull(),
	},
	(table) => {
		return {
			idKey: uniqueIndex('GridItemOnGridBox_id_key').on(table.id),
			gridItemOnGridBoxPkey: primaryKey(table.gridBoxParentId, table.itemId),
		};
	},
);

export const sliderItemOnSlidersContainerBox = pgTable(
	'SliderItemOnSlidersContainerBox',
	{
		id: text('id').notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		slidersContainerBoxId: text('slidersContainerBoxId')
			.notNull()
			.references(() => slidersContainerBox.id, {
				onDelete: 'restrict',
				onUpdate: 'cascade',
			}),
		slideId: text('slideId')
			.notNull()
			.references(() => box.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
		title: text('title'),
	},
	(table) => {
		return {
			idKey: uniqueIndex('SliderItemOnSlidersContainerBox_id_key').on(table.id),
			sliderItemOnSlidersContainerBoxPkey: primaryKey(
				table.slidersContainerBoxId,
				table.slideId,
			),
		};
	},
);

export const tabItemOnTabsContainerBox = pgTable(
	'TabItemOnTabsContainerBox',
	{
		id: text('id').notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' }),
		tabsContainerBoxId: text('tabsContainerBoxId')
			.notNull()
			.references(() => tabsContainerBox.id, {
				onDelete: 'restrict',
				onUpdate: 'cascade',
			}),
		tabItemId: text('tabItemId')
			.notNull()
			.references(() => box.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
		title: text('title').notNull(),
	},
	(table) => {
		return {
			idKey: uniqueIndex('TabItemOnTabsContainerBox_id_key').on(table.id),
			tabItemOnTabsContainerBoxPkey: primaryKey(
				table.tabsContainerBoxId,
				table.tabItemId,
			),
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
		sectionId: text('sectionId').references(() => section.id, {
			onDelete: 'set null',
			onUpdate: 'cascade',
		}),
		cssId: text('cssId')
			.notNull()
			.references(() => css.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
	},
	(table) => {
		return {
			boxPkey: primaryKey(table.id, table.type),
		};
	},
);
