import { create } from 'zustand';

interface GlobalStore {
	menus: {
		closeAllMenus: () => void;

		isDropdownMenuOnLessThanLGOpen: boolean;
		toggleDropdownMenuOnLessThanLG: () => void;

		isSearchMenuOpen: boolean;
		toggleSearchMenu: () => void;
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
	}
}));
