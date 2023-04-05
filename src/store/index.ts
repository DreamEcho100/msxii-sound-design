import { create } from 'zustand';

import { ShopifyProduct } from '~/utils/types';

interface GlobalStore {
	cart: {
		items: (ShopifyProduct & { quantity: number })[];

		isCartDropdownOpen: boolean;
		toggleCartDropdown(): void;
		addToCart(product: ShopifyProduct, quantity: number): void;
	};
	menus: {
		closeAllMenus(): void;

		isDropdownMenuOnLessThanLGOpen: boolean;
		toggleDropdownMenuOnLessThanLG(): void;

		isSearchMenuDropdownOpen: boolean;
		toggleSearchMenuDropdown(): void;
	};
	dialogs: {
		auth: {
			isOpen: boolean;
			toggleOpen(): void;
			type: 'register' | 'login';
			setDialogType(state: 'register' | 'login'): void;
		};
	};
	themeConfig: {
		currentTheme: 'dark' | 'light';
		changeCurrentTheme: (passedTheme?: 'dark' | 'light') => void;
	};
}

const generateOppositeTheme = (theme?: 'dark' | 'light') =>
	theme === 'light' ? 'dark' : 'light';

export const useGlobalStore = create<GlobalStore>((set, get) => ({
	cart: {
		items: [],
		isCartDropdownOpen: false,
		toggleCartDropdown: () =>
			set(({ cart }) => ({
				cart: {
					...cart,
					isCartDropdownOpen: !cart.isCartDropdownOpen
				}
			})),
		addToCart: (product, quantity) =>
			set(({ cart }) => {
				get().menus.closeAllMenus();
				// const cartItems = {
				// 	...cart.items,
				// 	[title]: title in cart.items && cart.items[title] ? { ...cart.items[title] }: { ...product }
				// };
				const cartItemIndex = cart.items.findIndex(
					(item) => item.id === product.id
				);

				const cartItems =
					cartItemIndex === -1
						? [{ ...product, quantity }, ...cart.items]
						: cart.items.map((cartItem, index) => {
								if (index === cartItemIndex) {
									return {
										...cartItem,
										quantity: cartItem.quantity + quantity
									};
								}
								return cartItem;
						  });

				return {
					cart: {
						...cart,
						items: cartItems,
						isCartDropdownOpen: true
					}
				};
			})
	},
	menus: {
		isDropdownMenuOnLessThanLGOpen: false,
		toggleDropdownMenuOnLessThanLG: () =>
			set(({ menus, cart }) => ({
				menus: {
					...menus,
					isDropdownMenuOnLessThanLGOpen: !menus.isDropdownMenuOnLessThanLGOpen
				},
				cart: {
					...cart,
					isCartDropdownOpen: false
				}
			})),

		isSearchMenuDropdownOpen: false,
		toggleSearchMenuDropdown: () =>
			set(({ menus, cart }) => ({
				menus: {
					...menus,
					isSearchMenuDropdownOpen: !menus.isSearchMenuDropdownOpen
				},
				cart: {
					...cart,
					isCartDropdownOpen: false
				}
			})),

		closeAllMenus: () =>
			set(({ menus, cart }) => ({
				menus: {
					...menus,
					isSearchMenuDropdownOpen: false,
					isDropdownMenuOnLessThanLGOpen: false
				},
				cart: {
					...cart,
					isCartDropdownOpen: false
				}
			}))
	},
	dialogs: {
		auth: {
			isOpen: false,
			toggleOpen: () =>
				set(({ dialogs }) => ({
					dialogs: {
						...dialogs,
						auth: { ...dialogs.auth, isOpen: !dialogs.auth.isOpen }
					}
				})),
			type: 'login',
			setDialogType: (type) =>
				set(({ dialogs }) => ({
					dialogs: {
						...dialogs,
						auth: { ...dialogs.auth, type }
					}
				}))
		}
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
