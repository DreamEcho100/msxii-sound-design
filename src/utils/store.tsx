import { create } from 'zustand';

interface GlobalStore {
	closeAllMenus: () => void;

	isDropdownMenuOnLessThanLGOpen: boolean;
	toggleDropdownMenuOnLessThanLG: () => void;

	isSearchMenuOpen: boolean;
	toggleSearchMenu: () => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
	isDropdownMenuOnLessThanLGOpen: false,
	toggleDropdownMenuOnLessThanLG: () =>
		set(({ isDropdownMenuOnLessThanLGOpen }) => ({
			isDropdownMenuOnLessThanLGOpen: !isDropdownMenuOnLessThanLGOpen
		})),

	isSearchMenuOpen: false,
	toggleSearchMenu: () =>
		set(({ isSearchMenuOpen }) => ({ isSearchMenuOpen: !isSearchMenuOpen })),

	closeAllMenus: () =>
		set(({ isSearchMenuOpen }) => ({
			isSearchMenuOpen: false,
			isDropdownMenuOnLessThanLGOpen: false
		}))
}));
