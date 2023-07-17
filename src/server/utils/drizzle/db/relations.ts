import { relations } from 'drizzle-orm';
import { boxToGrid, boxToSlider, boxToTabsHolder, category } from './schema';
import {
	mdBox,
	imageBox,
	iframeBox,
	quoteBox,
	tabsHolder,
	sliderBox,
	gridBox,
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
export const categoryRelations = relations(category, ({ many }) => ({
	pages: many(page),
}));

export const pageRelations = relations(page, ({ many, one }) => ({
	sections: many(section),
	css: one(css, {
		fields: [page.cssId],
		references: [css.id],
	}),
	category: one(category, {
		fields: [page.categoryName],
		references: [category.name],
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

	tabsHolder: one(tabsHolder, {
		fields: [box.id],
		references: [tabsHolder.boxId],
	}),
	sliderBox: one(sliderBox, {
		fields: [box.id],
		references: [sliderBox.boxId],
	}),
	gridBox: one(gridBox, {
		fields: [box.id],
		references: [gridBox.boxId],
	}),

	//
	boxesToTabsHolders: many(boxToTabsHolder),
	boxesToSliders: many(sliderBox),
	boxesToGrids: many(boxToGrid),
}));

export const boxToGridRelations = relations(boxToGrid, ({ one }) => ({
	box: one(box, {
		fields: [boxToGrid.boxId],
		references: [box.id],
	}),
	gridBox: one(gridBox, {
		fields: [boxToGrid.gridBoxId],
		references: [gridBox.id],
	}),
}));
export const gridBoxRelations = relations(gridBox, ({ many }) => ({
	boxesToGrids: many(boxToGrid),
}));

export const boxToSliderRelations = relations(boxToSlider, ({ one }) => ({
	box: one(box, {
		fields: [boxToSlider.boxId],
		references: [box.id],
	}),
	sliderBox: one(sliderBox, {
		fields: [boxToSlider.sliderBoxId],
		references: [sliderBox.id],
	}),
}));
export const sliderBoxRelations = relations(sliderBox, ({ many }) => ({
	boxesToSliders: many(boxToSlider),
}));

export const boxToTabsHolderRelations = relations(
	boxToTabsHolder,
	({ one }) => ({
		box: one(box, {
			fields: [boxToTabsHolder.boxId],
			references: [box.id],
		}),
		tabsHolder: one(tabsHolder, {
			fields: [boxToTabsHolder.tabsHolderId],
			references: [tabsHolder.id],
		}),
	}),
);
export const tabsHolderRelations = relations(tabsHolder, ({ many }) => ({
	boxesToTabsHolders: many(boxToTabsHolder),
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
	// mdBox     MDBox?
	// imageBox  ImageBox?
	// IframeBox IframeBox?
	// quoteBox  QuoteBox?

	// tabsHolder    TabsHolder?
	// sliderBox SliderBox?
	// gridBox             GridBox?

	// boxesToTabsHolders    BoxToTabsHolder[]
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
