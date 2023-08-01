import { relations } from 'drizzle-orm';
import {
	boxToGrid,
	boxToSlider,
	boxToTabs,
	pageCategory,
	image,
	seo,
} from './schema';
import {
	mdBox,
	imageBox,
	iframeBox,
	quoteBox,
	tabs,
	slider,
	grid,
} from './schema';
import {
	user,
	account,
	session,
	page,
	section,
	css,
	box,
	headerBox,
} from './schema';

export const userRelations = relations(user, ({ many }) => ({
	// creativeWorks: many(creativeWork),
	account: many(account),
	session: many(session),
	// profile: one(userProfile, {
	// 	fields: [user.id],
	// 	references: [userProfile.userId]
	// })
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));
export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));

export const cssRelations = relations(css, ({ many }) => ({
	pages: many(page),
	sections: many(section),
}));
export const seoRelations = relations(seo, ({ one }) => ({
	pages: one(page),
}));
export const pageCategoryRelations = relations(pageCategory, ({ many }) => ({
	pages: many(page),
}));
export const imageRelations = relations(image, ({ many }) => ({
	pages: many(page),
}));

export const pageRelations = relations(page, ({ many, one }) => ({
	sections: many(section),
	css: one(css, {
		fields: [page.cssId],
		references: [css.id],
	}),
	seo: one(seo, {
		fields: [page.seoId],
		references: [seo.id],
	}),
	pageCategory: one(pageCategory, {
		fields: [page.pageCategoryName],
		references: [pageCategory.name],
	}),
	image: one(image, {
		fields: [page.imageId],
		references: [image.id],
	}),
}));
export const sectionRelations = relations(section, ({ many, one }) => ({
	body: many(box),
	page: one(page, {
		fields: [section.pageId],
		references: [page.id],
	}),
	css: one(css, {
		fields: [section.cssId],
		references: [css.id],
	}),
}));

export const boxRelations = relations(box, ({ many, one }) => ({
	css: one(css, {
		fields: [box.cssId],
		references: [css.id],
	}),
	section: one(section, {
		fields: [box.sectionId],
		references: [section.id],
	}),
	//
	headerBox: one(headerBox, {
		fields: [box.id],
		references: [headerBox.boxId],
	}),
	mdBox: one(mdBox, {
		fields: [box.id],
		references: [mdBox.boxId],
	}),
	imageBox: one(imageBox, {
		fields: [box.id],
		references: [imageBox.boxId],
	}),
	iframeBox: one(iframeBox, {
		fields: [box.id],
		references: [iframeBox.boxId],
	}),
	quoteBox: one(quoteBox, {
		fields: [box.id],
		references: [quoteBox.boxId],
	}),
	//

	tabs: one(tabs, {
		fields: [box.id],
		references: [tabs.boxId],
	}),
	slider: one(slider, {
		fields: [box.id],
		references: [slider.boxId],
	}),
	grid: one(grid, {
		fields: [box.id],
		references: [grid.boxId],
	}),

	//
	boxesToTabs: many(boxToTabs),
	boxesToSliders: many(slider),
	boxesToGrids: many(boxToGrid),
}));

export const boxToGridRelations = relations(boxToGrid, ({ one }) => ({
	box: one(box, {
		fields: [boxToGrid.boxId],
		references: [box.id],
	}),
	grid: one(grid, {
		fields: [boxToGrid.gridId],
		references: [grid.id],
	}),
}));
export const gridRelations = relations(grid, ({ many }) => ({
	boxesToGrids: many(boxToGrid),
}));

export const boxToSliderRelations = relations(boxToSlider, ({ one }) => ({
	box: one(box, {
		fields: [boxToSlider.boxId],
		references: [box.id],
	}),
	slider: one(slider, {
		fields: [boxToSlider.sliderId],
		references: [slider.id],
	}),
}));
export const sliderRelations = relations(slider, ({ many }) => ({
	boxesToSliders: many(boxToSlider),
}));

export const boxToTabsRelations = relations(boxToTabs, ({ one }) => ({
	box: one(box, {
		fields: [boxToTabs.boxId],
		references: [box.id],
	}),
	tabs: one(tabs, {
		fields: [boxToTabs.tabsId],
		references: [tabs.id],
	}),
}));
export const tabsRelations = relations(tabs, ({ many }) => ({
	boxesToTabs: many(boxToTabs),
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
export const headerBoxRelations = relations(headerBox, ({ one }) => ({
	// sections: many(section),
	box: one(box, {
		fields: [headerBox.boxId],
		references: [box.id],
	}),
	//
	// headerBox HeaderBox?
	// mdBox     MdBox?
	// imageBox  ImageBox?
	// IframeBox IframeBox?
	// quoteBox  QuoteBox?

	// tabs    Tabs?
	// slider Slider?
	// grid             Grid?

	// boxesToTabs    BoxToTabs[]
	// boxesToSliders BoxToSlider[]
	// boxToGrid             boxToGrid[]
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
