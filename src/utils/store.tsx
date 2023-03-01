import { create } from 'zustand';

interface GlobalStore {
	menus: {
		closeAllMenus: () => void;

		isDropdownMenuOnLessThanLGOpen: boolean;
		toggleDropdownMenuOnLessThanLG: () => void;

		isSearchMenuDropdownOpen: boolean;
		toggleSearchMenuDropdown: () => void;
	};
	themeConfig: {
		currentTheme: 'dark' | 'light';
		changeCurrentTheme: (passedTheme?: 'dark' | 'light') => void;
	};
}

const generateOppositeTheme = (theme?: 'dark' | 'light') =>
	theme === 'light' ? 'dark' : 'light';

export const useGlobalStore = create<GlobalStore>((set) => ({
	menus: {
		isDropdownMenuOnLessThanLGOpen: false,
		toggleDropdownMenuOnLessThanLG: () =>
			set(({ menus }) => ({
				menus: {
					...menus,
					isDropdownMenuOnLessThanLGOpen: !menus.isDropdownMenuOnLessThanLGOpen
				}
			})),

		isSearchMenuDropdownOpen: false,
		toggleSearchMenuDropdown: () =>
			set(({ menus }) => ({
				menus: {
					...menus,
					isSearchMenuDropdownOpen: !menus.isSearchMenuDropdownOpen
				}
			})),
		closeAllMenus: () =>
			set(({ menus }) => ({
				menus: {
					...menus,
					isSearchMenuDropdownOpen: false,
					isDropdownMenuOnLessThanLGOpen: false
				}
			}))
	},
	themeConfig: {
		currentTheme: 'light',
		changeCurrentTheme(passedTheme) {
			set(({ themeConfig }) => {
				const currentTheme = passedTheme
					? generateOppositeTheme(passedTheme)
					: themeConfig.currentTheme;
				const newTheme = generateOppositeTheme(currentTheme);

				document.body.classList.remove(currentTheme);
				document.body.classList.add(newTheme);

				localStorage.setItem('currentTheme', newTheme);

				return { themeConfig: { ...themeConfig, currentTheme: newTheme } };
			});
		}
	}
}));
