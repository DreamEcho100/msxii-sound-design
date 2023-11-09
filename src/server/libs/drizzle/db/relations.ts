import { relations } from "drizzle-orm";
import { gridBx, slideBx, tabsBx, pgCategory, img, seo } from "./schema";
import { mdBx, imgBx, iframeBx, quoteBx, tabs, slider, grid } from "./schema";
import { pg, sect, css, bx, headerBx } from "./schema";

export const cssRelations = relations(css, ({ many }) => ({
  pgs: many(pg),
  sects: many(sect),
}));
export const seoRelations = relations(seo, ({ one }) => ({
  pgs: one(pg),
}));
export const pgCategoryRelations = relations(pgCategory, ({ many }) => ({
  pgs: many(pg),
}));
export const imgRelations = relations(img, ({ many }) => ({
  pgs: many(pg),
}));

export const pgRelations = relations(pg, ({ many, one }) => ({
  sects: many(sect),
  css: one(css, {
    fields: [pg.cssId],
    references: [css.id],
  }),
  seo: one(seo, {
    fields: [pg.seoId],
    references: [seo.id],
  }),
  pgCategory: one(pgCategory, {
    fields: [pg.pgCategoryName],
    references: [pgCategory.name],
  }),
  img: one(img, {
    fields: [pg.imgId],
    references: [img.id],
  }),
}));
export const sectRelations = relations(sect, ({ many, one }) => ({
  body: many(bx),
  pg: one(pg, {
    fields: [sect.pgId],
    references: [pg.id],
  }),
  css: one(css, {
    fields: [sect.cssId],
    references: [css.id],
  }),
}));

export const bxRelations = relations(bx, ({ many, one }) => ({
  css: one(css, {
    fields: [bx.cssId],
    references: [css.id],
  }),
  sect: one(sect, {
    fields: [bx.sectId],
    references: [sect.id],
  }),
  //
  headerBx: one(headerBx, {
    fields: [bx.id],
    references: [headerBx.bxId],
  }),
  mdBx: one(mdBx, {
    fields: [bx.id],
    references: [mdBx.bxId],
  }),
  imgBx: one(imgBx, {
    fields: [bx.id],
    references: [imgBx.bxId],
  }),
  iframeBx: one(iframeBx, {
    fields: [bx.id],
    references: [iframeBx.bxId],
  }),
  quoteBx: one(quoteBx, {
    fields: [bx.id],
    references: [quoteBx.bxId],
  }),
  //

  tabs: one(tabs, {
    fields: [bx.id],
    references: [tabs.bxId],
  }),
  slider: one(slider, {
    fields: [bx.id],
    references: [slider.bxId],
  }),
  grid: one(grid, {
    fields: [bx.id],
    references: [grid.bxId],
  }),

  //
  tabsBxs: many(tabsBx),
  slidesBxs: many(slider),
  gridsBxs: many(gridBx),
}));

export const gridBxRelations = relations(gridBx, ({ one }) => ({
  bx: one(bx, {
    fields: [gridBx.bxId],
    references: [bx.id],
  }),
  grid: one(grid, {
    fields: [gridBx.gridId],
    references: [grid.id],
  }),
}));
export const gridRelations = relations(grid, ({ many }) => ({
  gridsBxs: many(gridBx),
}));

export const slideBxRelations = relations(slideBx, ({ one }) => ({
  bx: one(bx, {
    fields: [slideBx.bxId],
    references: [bx.id],
  }),
  slider: one(slider, {
    fields: [slideBx.sliderId],
    references: [slider.id],
  }),
}));
export const sliderRelations = relations(slider, ({ many }) => ({
  slidesBxs: many(slideBx),
}));

export const tabsBxRelations = relations(tabsBx, ({ one }) => ({
  bx: one(bx, {
    fields: [tabsBx.bxId],
    references: [bx.id],
  }),
  tabs: one(tabs, {
    fields: [tabsBx.tabsId],
    references: [tabs.id],
  }),
}));
export const tabsRelations = relations(tabs, ({ many }) => ({
  tabsBxs: many(tabsBx),
}));

/*
export const creativeWorkToTagRelations = relations(
	creativeWorkToTag,
	({ one }) => ({
		// creativeWorks: many(creativeWork)
		creativeWork: one(creativeWork, {
			fields: [creativeWorkToTag.creativeWorkId],
			references: [creativeWork.id]
		}),
		tag: one(tag, {
			fields: [creativeWorkToTag.tagName],
			references: [tag.name]
		})
	})
);
*/

/*
export const headerBxRelations = relations(headerBx, ({ one }) => ({
	// sects: many(sect),
	bx: one(bx, {
		fields: [headerBx.bxId],
		references: [bx.id],
	}),
	//
	// headerBx HeaderBx?
	// mdBx     MdBx?
	// imgBx  ImageBx?
	// IframeBx IframeBx?
	// quoteBx  QuoteBx?

	// tabs    Tabs?
	// slider Slider?
	// grid             Grid?

	// tabsBxs    TabsBx[]
	// slidesBxs SliderBx[]
	// gridBx             gridBx[]
}));
*/

/*
export const userProfileRelations = relations(userProfile, ({ one }) => ({
	user: one(user, {
		fields: [userProfile.userId],
		references: [user.id]
	})
}));

export const creativeWorkRelations = relations(
	creativeWork,
	({ many, one }) => ({
		author: one(user, {
			fields: [creativeWork.authorId],
			references: [user.id]
		}),
		tagsToBlogPosts: many(creativeWorkToTag),
		blogPost: one(blogPost, {
			fields: [creativeWork.id],
			references: [blogPost.creativeWorkId]
		}),
		post: one(post, {
			fields: [creativeWork.id],
			references: [post.creativeWorkId]
		}),
		discussionForum: one(discussionForum, {
			fields: [creativeWork.id],
			references: [discussionForum.creativeWorkId]
		}),
		discussionForumPost: one(discussionForumPost, {
			fields: [creativeWork.id],
			references: [discussionForumPost.creativeWorkId]
		})
	})
);

export const postRelations = relations(post, ({ one }) => ({
	creativeWork: one(creativeWork, {
		fields: [post.creativeWorkId],
		references: [creativeWork.id]
	})
}));
export const blogPostRelations = relations(blogPost, ({ one }) => ({
	creativeWork: one(creativeWork, {
		fields: [blogPost.creativeWorkId],
		references: [creativeWork.id]
	}),
	languageTag: one(languageTag, {
		fields: [blogPost.languageTagId],
		references: [languageTag.id]
	})
}));
export const discussionForumRelations = relations(
	discussionForum,
	({ one }) => ({
		creativeWork: one(creativeWork, {
			fields: [discussionForum.creativeWorkId],
			references: [creativeWork.id]
		})
	})
);
export const discussionForumPostRelations = relations(
	discussionForumPost,
	({ one }) => ({
		creativeWork: one(creativeWork, {
			fields: [discussionForumPost.creativeWorkId],
			references: [creativeWork.id]
		})
	})
);

export const languageTagRelations = relations(languageTag, ({ many }) => ({
	creativeWorks: many(creativeWork)
}));

export const tagRelations = relations(tag, ({ many }) => ({
	tagsToBlogPosts: many(creativeWorkToTag)
}));

export const creativeWorkToTagRelations = relations(
	creativeWorkToTag,
	({ one }) => ({
		// creativeWorks: many(creativeWork)
		creativeWork: one(creativeWork, {
			fields: [creativeWorkToTag.creativeWorkId],
			references: [creativeWork.id]
		}),
		tag: one(tag, {
			fields: [creativeWorkToTag.tagName],
			references: [tag.name]
		})
	})
);

*/
