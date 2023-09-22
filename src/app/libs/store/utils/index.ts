import { z } from 'zod';

export const getCurrentThemeFromLocalStorage = () => {
	let lsCurrentTheme: 'light' | 'dark';

	try {
		lsCurrentTheme = z
			.enum(['light', 'dark'])
			.parse(localStorage.getItem('currentTheme'));
	} catch (error) {
		lsCurrentTheme = 'light';
	}

	return lsCurrentTheme;
};
