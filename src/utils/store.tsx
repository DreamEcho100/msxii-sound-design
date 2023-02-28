import { create } from 'zustand';

interface GlobalStore {
	menus: {
		closeAllMenus: () => void;

		isDropdownMenuOnLessThanLGOpen: boolean;
		toggleDropdownMenuOnLessThanLG: () => void;

		isSearchMenuOpen: boolean;
		toggleSearchMenu: () => void;
	};
	themeConfig: {
		currentTheme: 'dark' | 'light';
		changeCurrentTheme: (passedTheme?: 'dark' | 'light') => void;
	};
}

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

		isSearchMenuOpen: false,
		toggleSearchMenu: () =>
			set(({ menus }) => ({
				menus: {
					...menus,
					isSearchMenuOpen: !menus.isSearchMenuOpen
				}
			})),
		closeAllMenus: () =>
			set(({ menus }) => ({
				menus: {
					...menus,
					isSearchMenuOpen: false,
					isDropdownMenuOnLessThanLGOpen: false
				}
			}))
	},
	themeConfig: {
		currentTheme: 'light',
		changeCurrentTheme(passedTheme) {
			set(({ themeConfig }) => {
				const currentTheme = passedTheme || themeConfig.currentTheme;
				const newTheme = currentTheme === 'light' ? 'dark' : 'light';

				document.body.classList.remove(currentTheme);
				document.body.classList.add(newTheme);

				localStorage.setItem('theme', newTheme);

				return { themeConfig: { ...themeConfig, currentTheme: newTheme } };
			});
		}
	}
}));
