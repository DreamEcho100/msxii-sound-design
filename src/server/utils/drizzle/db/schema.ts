import { pgTable, pgEnum, pgSchema, AnyPgColumn, uniqueIndex, foreignKey, text, timestamp, integer, index, serial, jsonb, primaryKey } from "drizzle-orm/pg-core"

export const headerBoxHtype = pgEnum("HeaderBoxHType", ['DYNAMIC', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'])
export const iframeBoxTypes = pgEnum("IframeBoxTypes", ['YOUTUBE', 'INSTAGRAM', 'SOUND_CLOUD'])
export const slidesPerViewType = pgEnum("SlidesPerViewType", ['DEFAULT', 'ONE_SLIDE', 'LARGE_SLIDES'])
export const boxTypes = pgEnum("BoxTypes", ['MD', 'IMAGE', 'IFRAME', 'QUOTE', 'HEADER', 'TABS_HOLDER', 'GRID', 'SLIDER'])

import { sql } from "drizzle-orm"

export const imageBox = pgTable("ImageBox", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('IMAGE').notNull(),
	src: text("src").notNull(),
	altText: text("altText"),
	width: integer("width"),
	height: integer("height"),
},
(table) => {
	return {
		imgBxBxIdBxTK: uniqueIndex("ImgBx_BxId_BxT_K").on(table.boxId, table.boxType),
		imhBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const grid = pgTable("Grid", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('GRID').notNull(),
},
(table) => {
	return {
		xBxIdBxTK: uniqueIndex("GridBx_BxId_BxT_K").on(table.boxId, table.boxType),
		gridBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const section = pgTable("Section", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	order: serial("order").notNull(),
	pageId: text("pageId").notNull().references(() => page.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	cssId: text("cssId").notNull().references(() => css.id, { onDelete: "restrict", onUpdate: "cascade" } ),
},
(table) => {
	return {
		cssIdIdx: index("Section_cssId_idx").on(table.cssId),
		orderIdx: index("Section_order_idx").on(table.order),
		pageIdIdx: index("Section_pageId_idx").on(table.pageId),
	}
});

export const image = pgTable("Image", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	src: text("src").notNull(),
	altText: text("altText"),
	width: integer("width"),
	height: integer("height"),
},
(table) => {
	return {
		srcKey: uniqueIndex("Image_src_key").on(table.src),
	}
});

export const tabs = pgTable("Tabs", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('TABS_HOLDER').notNull(),
},
(table) => {
	return {
		bxIdBxTK: uniqueIndex("Tabs_BxId_BxT_K").on(table.boxId, table.boxType),
		tabsBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const category = pgTable("Category", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	name: text("name").notNull(),
	counter: integer("counter").notNull(),
});

export const iframeBox = pgTable("IframeBox", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('IFRAME').notNull(),
	type: iframeBoxTypes("type").notNull(),
	src: text("src").notNull(),
	title: text("title"),
},
(table) => {
	return {
		iframeBxBxIdBxTK: uniqueIndex("IframeBx_BxId_BxT_K").on(table.boxId, table.boxType),
		iframeBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const slider = pgTable("Slider", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('SLIDER').notNull(),
	slidesPerViewType: slidesPerViewType("slidesPerViewType").default('DEFAULT').notNull(),
},
(table) => {
	return {
		xBxIdBxTK: uniqueIndex("SliderBx_BxId_BxT_K").on(table.boxId, table.boxType),
		sliderBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const css = pgTable("css", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	twVariants: jsonb("twVariants").default({}).notNull(),
	inlineStyles: jsonb("inlineStyles").default({}).notNull(),
	custom: text("custom").array(),
});

export const page = pgTable("Page", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	cssId: text("cssId").notNull().references(() => css.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	slug: text("slug"),
	categoryName: text("categoryName").notNull().references(() => category.name, { onDelete: "restrict", onUpdate: "cascade" } ),
	imageId: text("imageId").references(() => image.id, { onDelete: "set null", onUpdate: "cascade" } ),
},
(table) => {
	return {
		categoryNameSlugKey: uniqueIndex("Page_categoryName_slug_key").on(table.slug, table.categoryName),
		cssIdIdx: index("Page_cssId_idx").on(table.cssId),
	}
});

export const headerBox = pgTable("HeaderBox", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	title: text("title").notNull(),
	description: text("description"),
	hType: headerBoxHtype("hType").default('DYNAMIC').notNull(),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('HEADER').notNull(),
},
(table) => {
	return {
		headerBxBxIdBxTK: uniqueIndex("HeaderBx_BxId_BxT_K").on(table.boxId, table.boxType),
		headerBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const quoteBox = pgTable("QuoteBox", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('QUOTE').notNull(),
	cite: text("cite").notNull(),
	content: text("content").notNull(),
},
(table) => {
	return {
		quoteBxBxIdBxTK: uniqueIndex("QuoteBx_BxId_BxT_K").on(table.boxId, table.boxType),
		quoteBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const user = pgTable("User", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email"),
	emailVerified: timestamp("emailVerified", { precision: 3, mode: 'string' }),
	image: text("image"),
},
(table) => {
	return {
		emailKey: uniqueIndex("User_email_key").on(table.email),
	}
});

export const mdBox = pgTable("MdBox", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('MD').notNull(),
	content: text("content").notNull(),
},
(table) => {
	return {
		mdBxBxIdBxTK: uniqueIndex("MdBx_BxId_BxT_K").on(table.boxId, table.boxType),
		mdBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const session = pgTable("Session", {
	id: text("id").primaryKey().notNull(),
	sessionToken: text("sessionToken").notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionTokenKey: uniqueIndex("Session_sessionToken_key").on(table.sessionToken),
		userIdIdx: index("Session_userId_idx").on(table.userId),
	}
});

export const example = pgTable("Example", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
});

export const account = pgTable("Account", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		providerProviderAccountIdKey: uniqueIndex("Account_provider_providerAccountId_key").on(table.provider, table.providerAccountId),
		userIdIdx: index("Account_userId_idx").on(table.userId),
	}
});

export const verificationToken = pgTable("VerificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		identifierTokenKey: uniqueIndex("VerificationToken_identifier_token_key").on(table.identifier, table.token),
		tokenKey: uniqueIndex("VerificationToken_token_key").on(table.token),
	}
});

export const box = pgTable("Box", {
	id: text("id").notNull(),
	type: boxTypes("type").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	order: serial("order").notNull(),
	cssId: text("cssId").notNull().references(() => css.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	sectionId: text("sectionId").references(() => section.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		cssIdIdx: index("Box_cssId_idx").on(table.cssId),
		orderIdx: index("Box_order_idx").on(table.order),
		sectionIdIdx: index("Box_sectionId_idx").on(table.sectionId),
		boxPkey: primaryKey(table.id, table.type)
	}
});

export const boxToGrid = pgTable("BoxToGrid", {
	id: text("id").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	order: serial("order").notNull(),
	boxId: text("boxId").notNull().references(() => box.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	gridId: text("gridId").notNull().references(() => grid.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		btgBxIdIdx: index("BTG_BxId_idx").on(table.boxId),
		btgGridBxIdIdx: index("BTG_gridBxId_idx").on(table.gridId),
		btgIdK: uniqueIndex("BTG_id_K").on(table.id),
		btgOrderIdx: index("BTG_order_idx").on(table.order),
		btgPk: primaryKey(table.boxId, table.gridId)
	}
});

export const boxToSlider = pgTable("BoxToSlider", {
	id: text("id").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	title: text("title"),
	order: serial("order").notNull(),
	boxId: text("boxId").notNull().references(() => box.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	sliderId: text("sliderId").notNull().references(() => slider.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		btsBxIdIdx: index("BTS_BxId_idx").on(table.boxId),
		btsIdK: uniqueIndex("BTS_id_K").on(table.id),
		btsOrderIdx: index("BTS_order_idx").on(table.order),
		btsSliderBxIdIdx: index("BTS_sliderBxId_idx").on(table.sliderId),
		btsPk: primaryKey(table.boxId, table.sliderId)
	}
});

export const boxToTabs = pgTable("BoxToTabs", {
	id: text("id").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	title: text("title").notNull(),
	order: serial("order").notNull(),
	boxId: text("boxId").notNull().references(() => box.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	tabsId: text("tabsId").notNull().references(() => tabs.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		btTsBxIdIdx: index("BTTs_BxId_idx").on(table.boxId),
		btTsIdK: uniqueIndex("BTTs_id_K").on(table.id),
		btTsOrderIdx: index("BTTs_order_idx").on(table.order),
		btTsTabsBxIdIdx: index("BTTs_tabsBxId_idx").on(table.tabsId),
		btTsPk: primaryKey(table.boxId, table.tabsId)
	}
});