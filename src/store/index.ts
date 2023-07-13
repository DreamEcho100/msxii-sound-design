import { createStore, useStore } from 'zustand';
import { ShopifyCustomer } from '~/utils/shopify/types';

import { Checkout, CheckoutLineItem } from 'shopify-buy';

interface GlobalStore {
	cart: {
		// id?: string;
		lineItems: CheckoutLineItem[];

		isCartDropdownOpen: boolean;
		toggleCartDropdown(): void;
		addToCart(
			product: CheckoutLineItem, // | ShopifyProduct | ShopifyProductVariant,
			quantity: number | ((value: number) => number)
		): void;
		setCartLineItems(lineItems: CheckoutLineItem[], toOpenCart?: boolean): void;

		setId: (
			params:
				| {
						type:
							| 'init'
							| 'checking-stored'
							| 'creating-checkout'
							| 'checkout-found-in-cookies';
						payload?: null;
				  }
				| {
						type: 'not-found-in-cookies' | 'failed-creating-checkout';
						payload?: null;
				  }
				| {
						type: 'checkout-created' | 'line-items-fetched';
						payload: Checkout;
				  }
		) => void;
	} & (
		| {
				isLoading: true;
				isSuccess: false;
				status:
					| 'checking-stored'
					| 'creating-checkout'
					| 'checkout-found-in-cookies';
				data: null;
		  }
		| {
				isLoading: false;
				isSuccess: false;
				status: 'not-found-in-cookies' | 'failed-creating-checkout';
				data: null;
		  }
		| {
				isLoading: false;
				isSuccess: true;
				status: 'checkout-created' | 'line-items-fetched';
				data: Checkout;
		  }
	);
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
								customer: ShopifyCustomer;
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
					customer: ShopifyCustomer;
					accessToken: string;
				};
		  }
	);
}

const generateOppositeTheme = (theme?: 'dark' | 'light') =>
	theme === 'light' ? 'dark' : 'light';

export const globalStore = createStore<GlobalStore>((set, get) => ({
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
		data: null,
		isLoading: true,
		isSuccess: false,
		status: 'checking-stored',

		lineItems: [],
		isCartDropdownOpen: false,

		toggleCartDropdown: () =>
			set(({ cart }) => ({
				cart: {
					...cart,
					isCartDropdownOpen: !cart.isCartDropdownOpen
				}
			})),
		setCartLineItems(lineItems, toOpenCart = false) {
			// get().menus.closeAllMenus();
			set(({ cart, menus }) => {
				if (toOpenCart) menus.closeAllMenus();

				return {
					cart: {
						...cart,
						lineItems,
						isCartDropdownOpen: toOpenCart
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
			}),

		setId: ({ type, payload }) => {
			if (process.env.NODE_ENV === 'development') {
				console.log(
					'%cCart Status: "' + type.replace(/-/g, ' ') + '"',
					'font-weight: bold;'
				);
			}

			if (type === get().cart.status) return;

			switch (type) {
				case 'checking-stored':
				case 'creating-checkout':
				case 'checkout-found-in-cookies':
					type;
					return set((prev) => ({
						...prev,
						cart: {
							...prev.cart,
							data: null,
							isLoading: true,
							isSuccess: false,
							status: type
						}
					}));

				case 'not-found-in-cookies':
				case 'failed-creating-checkout':
					type;
					return set((prev) => ({
						...prev,
						cart: {
							...prev.cart,
							data: null,
							isLoading: false,
							isSuccess: false,
							status: type
						}
					}));

				case 'checkout-created':
				case 'line-items-fetched':
					type;
					return set((prev) => ({
						...prev,
						cart: {
							...prev.cart,
							data: payload,
							isLoading: false,
							isSuccess: true,
							status: type
						}
					}));
			}
		}
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

// export const useGlobalStore = <U>(
// 	cb: (
// 		state: typeof globalStore extends { getState: () => infer T } ? T : never
// 	) => U
// ) => useStore(globalStore, cb);
