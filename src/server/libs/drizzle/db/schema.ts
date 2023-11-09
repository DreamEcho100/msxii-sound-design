import {
  pgTable,
  uniqueIndex,
  foreignKey,
  pgEnum,
  text,
  timestamp,
  integer,
  jsonb,
  index,
  boolean,
  serial,
  primaryKey,
} from "drizzle-orm/pg-core";

// import { sql } from "drizzle-orm";
export const headerBxHtype = pgEnum("HeaderBxHType", [
  "H6",
  "H5",
  "H4",
  "H3",
  "H2",
  "H1",
  "DYNAMIC",
]);
export const iframeBxTypes = pgEnum("IframeBxTypes", [
  "SOUND_CLOUD",
  "INSTAGRAM",
  "YOUTUBE",
]);
export const slidesPerViewType = pgEnum("SlidesPerViewType", [
  "LARGE_SLIDES",
  "ONE_SLIDE",
  "DEFAULT",
]);
export const bxTypes = pgEnum("BxTypes", [
  "SLIDER",
  "GRID",
  "TABS_HOLDER",
  "HEADER",
  "QUOTE",
  "IFRAME",
  "IMAGE",
  "MD",
]);

export const imgBx = pgTable(
  "ImgBx",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    bxId: text("bxId").notNull(),
    bxType: bxTypes("bxType").default("IMAGE").notNull(),
    src: text("src").notNull(),
    altText: text("altText"),
    width: integer("width"),
    height: integer("height"),
  },
  (table) => {
    return {
      bxIdBxTK: uniqueIndex("ImgBx_BxId_BxT_K").on(table.bxId, table.bxType),
      imhBxBxIdBtFk: foreignKey({
        columns: [table.bxId, table.bxType],
        foreignColumns: [bx.id, bx.type],
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  },
);

export const iframeBx = pgTable(
  "IframeBx",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    bxId: text("bxId").notNull(),
    bxType: bxTypes("bxType").default("IFRAME").notNull(),
    type: iframeBxTypes("type").notNull(),
    src: text("src").notNull(),
    title: text("title"),
  },
  (table) => {
    return {
      bxIdBxTK: uniqueIndex("IframeBx_BxId_BxT_K").on(table.bxId, table.bxType),
      iframeBxBxIdBtFk: foreignKey({
        columns: [table.bxId, table.bxType],
        foreignColumns: [bx.id, bx.type],
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  },
);

export const quoteBx = pgTable(
  "QuoteBx",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    bxId: text("bxId").notNull(),
    bxType: bxTypes("bxType").default("QUOTE").notNull(),
    cite: text("cite").notNull(),
    content: text("content").notNull(),
  },
  (table) => {
    return {
      bxIdBxTK: uniqueIndex("QuoteBx_BxId_BxT_K").on(table.bxId, table.bxType),
      quoteBxBxIdBtFk: foreignKey({
        columns: [table.bxId, table.bxType],
        foreignColumns: [bx.id, bx.type],
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  },
);

export const headerBx = pgTable(
  "HeaderBx",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    title: text("title").notNull(),
    description: text("description"),
    hType: headerBxHtype("hType").default("DYNAMIC").notNull(),
    bxId: text("bxId").notNull(),
    bxType: bxTypes("bxType").default("HEADER").notNull(),
  },
  (table) => {
    return {
      bxIdBxTK: uniqueIndex("HeaderBx_BxId_BxT_K").on(table.bxId, table.bxType),
      headerBxBxIdBtFk: foreignKey({
        columns: [table.bxId, table.bxType],
        foreignColumns: [bx.id, bx.type],
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  },
);

export const tabs = pgTable(
  "Tabs",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    bxId: text("bxId").notNull(),
    bxType: bxTypes("bxType").default("TABS_HOLDER").notNull(),
  },
  (table) => {
    return {
      bxIdBxTK: uniqueIndex("Tabs_BxId_BxT_K").on(table.bxId, table.bxType),
      tabsBxBxIdBtFk: foreignKey({
        columns: [table.bxId, table.bxType],
        foreignColumns: [bx.id, bx.type],
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  },
);

export const slider = pgTable(
  "Slider",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    bxId: text("bxId").notNull(),
    bxType: bxTypes("bxType").default("SLIDER").notNull(),
    slidesPerViewType: slidesPerViewType("slidesPerViewType")
      .default("DEFAULT")
      .notNull(),
  },
  (table) => {
    return {
      slideBxBxIdBxTK: uniqueIndex("SlideBx_BxId_BxT_K").on(
        table.bxId,
        table.bxType,
      ),
      slideBxBxIdBtFk: foreignKey({
        columns: [table.bxId, table.bxType],
        foreignColumns: [bx.id, bx.type],
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  },
);

export const css = pgTable("css", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
  twVariants: jsonb("twVariants").default({}).notNull(),
  inlineStyles: jsonb("inlineStyles").default({}).notNull(),
  customClasses: text("customClasses").default("RRAY[").array(),
});

export const mdBx = pgTable(
  "MdBx",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    bxId: text("bxId").notNull(),
    bxType: bxTypes("bxType").default("MD").notNull(),
    content: text("content").notNull(),
  },
  (table) => {
    return {
      bxIdBxTK: uniqueIndex("MdBx_BxId_BxT_K").on(table.bxId, table.bxType),
      mdBxBxIdBtFk: foreignKey({
        columns: [table.bxId, table.bxType],
        foreignColumns: [bx.id, bx.type],
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  },
);

export const grid = pgTable(
  "Grid",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    bxId: text("bxId").notNull(),
    bxType: bxTypes("bxType").default("GRID").notNull(),
  },
  (table) => {
    return {
      xBxIdBxTK: uniqueIndex("GridBx_BxId_BxT_K").on(table.bxId, table.bxType),
      gridBxBxIdBtFk: foreignKey({
        columns: [table.bxId, table.bxType],
        foreignColumns: [bx.id, bx.type],
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  },
);

export const seo = pgTable("seo", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
  title: text("title").notNull(),
  description: text("description"),
});

export const img = pgTable(
  "Img",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    src: text("src").notNull(),
    altText: text("altText"),
    width: integer("width"),
    height: integer("height"),
  },
  (table) => {
    return {
      srcKey: uniqueIndex("Img_src_key").on(table.src),
    };
  },
);

export const pg = pgTable(
  "Pg",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    cssId: text("cssId")
      .notNull()
      .references(() => css.id, { onDelete: "restrict", onUpdate: "cascade" }),
    slug: text("slug"),
    imgId: text("imgId").references(() => img.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    isActive: boolean("isActive").default(false).notNull(),
    seoId: text("seoId").references(() => seo.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    pgCategoryName: text("pgCategoryName")
      .notNull()
      .references(() => pgCategory.name, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      seoIdKey: uniqueIndex("Pg_seoId_key").on(table.seoId),
      cssIdIdx: index("Pg_cssId_idx").on(table.cssId),
      pgCategoryNameSlugKey: uniqueIndex("Pg_pgCategoryName_slug_key").on(
        table.slug,
        table.pgCategoryName,
      ),
    };
  },
);

export const pgCategory = pgTable("PgCategory", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
  name: text("name").notNull(),
  counter: integer("counter").default(0).notNull(),
  hasSubPgs: boolean("hasSubPgs").default(false).notNull(),
  isPg: boolean("isPg").default(false).notNull(),
});

export const sect = pgTable(
  "Sect",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    order: serial("order").notNull(),
    cssId: text("cssId")
      .notNull()
      .references(() => css.id, { onDelete: "restrict", onUpdate: "cascade" }),
    pgId: text("pgId")
      .notNull()
      .references(() => pg.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      orderIdx: index("Sect_order_idx").on(table.order),
      cssIdIdx: index("Sect_cssId_idx").on(table.cssId),
      pgIdIdx: index("Sect_pgId_idx").on(table.pgId),
    };
  },
);

export const gridBx = pgTable(
  "GridBx",
  {
    id: text("id").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    order: serial("order").notNull(),
    bxId: text("bxId")
      .notNull()
      .references(() => bx.id, { onDelete: "cascade", onUpdate: "cascade" }),
    gridId: text("gridId")
      .notNull()
      .references(() => grid.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      btgIdK: uniqueIndex("BTG_id_K").on(table.id),
      btgBxIdIdx: index("BTG_BxId_idx").on(table.bxId),
      btgGridBxIdIdx: index("BTG_gridBxId_idx").on(table.gridId),
      btgOrderIdx: index("BTG_order_idx").on(table.order),
      btgPk: primaryKey(table.bxId, table.gridId),
    };
  },
);

export const bx = pgTable(
  "Bx",
  {
    id: text("id").notNull(),
    type: bxTypes("type").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    order: serial("order").notNull(),
    cssId: text("cssId")
      .notNull()
      .references(() => css.id, { onDelete: "restrict", onUpdate: "cascade" }),
    sectId: text("sectId").references(() => sect.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  },
  (table) => {
    return {
      orderIdx: index("Bx_order_idx").on(table.order),
      cssIdIdx: index("Bx_cssId_idx").on(table.cssId),
      sectIdIdx: index("Bx_sectId_idx").on(table.sectId),
      bxPkey: primaryKey(table.id, table.type),
    };
  },
);

export const tabsBx = pgTable(
  "TabsBx",
  {
    id: text("id").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    title: text("title").notNull(),
    order: serial("order").notNull(),
    bxId: text("bxId")
      .notNull()
      .references(() => bx.id, { onDelete: "cascade", onUpdate: "cascade" }),
    tabsId: text("tabsId")
      .notNull()
      .references(() => tabs.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      btTsIdK: uniqueIndex("BTTs_id_K").on(table.id),
      btTsBxIdIdx: index("BTTs_BxId_idx").on(table.bxId),
      btTsOrderIdx: index("BTTs_order_idx").on(table.order),
      btTsTabsBxIdIdx: index("BTTs_tabsBxId_idx").on(table.tabsId),
      btTsPk: primaryKey(table.bxId, table.tabsId),
    };
  },
);

export const slideBx = pgTable(
  "SlideBx",
  {
    id: text("id").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
    title: text("title"),
    order: serial("order").notNull(),
    bxId: text("bxId")
      .notNull()
      .references(() => bx.id, { onDelete: "cascade", onUpdate: "cascade" }),
    sliderId: text("sliderId")
      .notNull()
      .references(() => slider.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      btsIdK: uniqueIndex("BTS_id_K").on(table.id),
      btsBxIdIdx: index("BTS_BxId_idx").on(table.bxId),
      btsOrderIdx: index("BTS_order_idx").on(table.order),
      btsSlideBxIdIdx: index("BTS_slideBxId_idx").on(table.sliderId),
      btsPk: primaryKey(table.bxId, table.sliderId),
    };
  },
);
