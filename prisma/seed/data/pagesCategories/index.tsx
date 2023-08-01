import { createId } from '@paralleldrive/cuid2';

export const iosAppPagesPageCategory = {
	id: createId(),
	name: 'ios-apps' as const,
	// NOTICE: The counter is set manually.
	counter: 4,
	hasSubPages: true,
};
export const aboutPageCategory = {
	id: createId(),
	name: 'about' as const,
	// NOTICE: The counter is set manually.
	counter: 1,
	hasSubPages: false,
};
export const supportPageCategory = {
	id: createId(),
	name: 'support' as const,
	// NOTICE: The counter is set manually.
	counter: 1,
	hasSubPages: false,
};
export const policiesPageCategory = {
	id: createId(),
	name: 'policies' as const,
	// NOTICE: The counter is set manually.
	counter: 1,
	hasSubPages: true,
};
export const merchPageCategory = {
	id: createId(),
	name: 'merch' as const,
	// NOTICE: The counter is set manually.
	counter: 1,
	hasSubPages: false,
};
export const blueLabelPageCategory = {
	id: createId(),
	name: 'blue-label' as const,
	// NOTICE: The counter is set manually.
	counter: 1,
	hasSubPages: false,
};

const pagesCategories = [
	iosAppPagesPageCategory,
	aboutPageCategory,
	supportPageCategory,
	policiesPageCategory,
	merchPageCategory,
	blueLabelPageCategory,
];

export default pagesCategories;

// ('merch-page');
// ('merch-page');
