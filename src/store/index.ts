import { create } from 'zustand';

import { ShopifyProduct } from '~/utils/types';

interface GlobalStore {
	cart: {
		items: (ShopifyProduct & { quantity: number })[];

		isCartDropdownOpen: boolean;
		toggleCartDropdown(): void;
		addToCart(
			product: ShopifyProduct,
			quantity: number | ((value: number) => number)
		): void;
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
				const cartItemIndex = cart.items.findIndex(
					(item) => item.id === product.id
				);

				let cartItems: typeof cart.items = [];

				if (cartItemIndex === -1) {
					cartItems = [
						{
							...product,
							quantity: typeof quantity === 'function' ? quantity(0) : quantity
						},
						...cart.items
					];
				} else {
					let cartItem: (typeof cart.items)[number];
					let cartItemQuantity: number;

					for (let i = 0; i < cart.items.length; i++) {
						cartItem = cart.items[i]!;

						if (i === cartItemIndex) {
							cartItemQuantity =
								typeof quantity === 'function'
									? quantity(cartItem.quantity)
									: cartItem.quantity + quantity;

							if (cartItemQuantity <= 0) continue;
							cartItems.push({
								...cartItem,
								quantity: cartItemQuantity
							});
							continue;
						}

						cartItems.push(cartItem);
					}
				}

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
