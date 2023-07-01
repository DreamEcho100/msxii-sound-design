import { create } from 'zustand';
import { Customer } from '~/utils/shopify/types';

import { CheckoutLineItem } from 'shopify-buy';

interface GlobalStore {
	cart: {
		id?: string;
		lineItems: CheckoutLineItem[];

		isCartDropdownOpen: boolean;
		toggleCartDropdown(): void;
		addToCart(
			product: CheckoutLineItem, // | ShopifyProduct | ShopifyProductVariant,
			quantity: number | ((value: number) => number)
		): void;
		setCartLineItems(lineItems: CheckoutLineItem[]): void;
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
	customerSession: {
		utils: {
			set: (
				params:
					| { type: 'LOADING'; payload?: null }
					| { type: 'UNAUTHENTICATED'; payload?: null }
					| {
							type: 'AUTHENTICATED';
							payload: {
								customer: Customer;
								accessToken: string;
							};
					  }
			) => void;
		};
		attemptCounter: number;
	} & (
		| {
				isLoading: true;
				status: 'loading';
				data: null;
		  }
		| {
				isLoading: false;
				status: 'unauthenticated';
				data: null;
		  }
		| {
				isLoading: false;
				status: 'authenticated';
				data: {
					customer: Customer;
					accessToken: string;
				};
		  }
	);
}

const generateOppositeTheme = (theme?: 'dark' | 'light') =>
	theme === 'light' ? 'dark' : 'light';

export const useGlobalStore = create<GlobalStore>((set, get) => ({
	customerSession: {
		isLoading: true,
		attemptCounter: 0,
		status: 'loading',
		data: null,
		utils: {
			set: ({ type, payload }) => {
				switch (type) {
					case 'LOADING':
						return set((prev) => ({
							...prev,
							customerSession: {
								...prev.customerSession,
								data: null,
								isLoading: true,
								status: 'loading'
							}
						}));

					case 'UNAUTHENTICATED':
						return set((prev) => ({
							...prev,
							customerSession: {
								...prev.customerSession,
								data: null,
								isLoading: false,
								status: 'unauthenticated',
								attemptCounter: prev.customerSession.attemptCounter + 1
							}
						}));

					case 'AUTHENTICATED':
						return set((prev) => ({
							...prev,
							customerSession: {
								...prev.customerSession,
								data: payload,
								isLoading: false,
								status: 'authenticated',
								attemptCounter: prev.customerSession.attemptCounter + 1
							}
						}));
				}
			}
		}
	},
	cart: {
		lineItems: [],
		isCartDropdownOpen: false,
		toggleCartDropdown: () =>
			set(({ cart }) => ({
				cart: {
					...cart,
					isCartDropdownOpen: !cart.isCartDropdownOpen
				}
			})),
		setCartLineItems(lineItems) {
			// get().menus.closeAllMenus();
			set(({ cart, menus }) => {
				menus.closeAllMenus();
				return {
					cart: {
						...cart,
						lineItems,
						isCartDropdownOpen: true
					}
				};
			});
		},
		addToCart: (product, quantity) =>
			set(({ cart }) => {
				get().menus.closeAllMenus();
				const cartItemIndex = cart.lineItems.findIndex(
					(item) => item.id === product.id
				);

				let cartItems: typeof cart.lineItems = [];

				if (cartItemIndex === -1) {
					cartItems = [
						{
							...product,
							quantity: typeof quantity === 'function' ? quantity(0) : quantity
						},
						...cart.lineItems
					];
				} else {
					let cartItem: (typeof cart.lineItems)[number];
					let cartItemQuantity: number;

					for (let i = 0; i < cart.lineItems.length; i++) {
						cartItem = cart.lineItems[i]!;

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
						lineItems: cartItems,
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
