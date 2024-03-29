import { type GlobalStore } from "./types";

import { createStore } from "zustand";

export const globalStore = createStore<GlobalStore>((set, get) => ({
  authSession: {
    isLoading: true,
    attemptCounter: 0,
    status: "loading",
    data: null,
    utils: {
      set: ({ type, payload }) => {
        switch (type) {
          case "LOADING":
            return set((prev) => ({
              ...prev,
              authSession: {
                ...prev.authSession,
                data: null,
                isLoading: true,
                status: "loading",
              },
            }));

          case "UNAUTHENTICATED":
            return set((prev) => ({
              ...prev,
              authSession: {
                ...prev.authSession,
                data: null,
                isLoading: false,
                status: "unauthenticated",
                attemptCounter: prev.authSession.attemptCounter + 1,
              },
            }));

          case "AUTHENTICATED":
            return set((prev) => ({
              ...prev,
              authSession: {
                ...prev.authSession,
                data: payload,
                isLoading: false,
                status: "authenticated",
                attemptCounter: prev.authSession.attemptCounter + 1,
              },
            }));
        }
      },
      update(valueOrUpdater) {
        set((prev) => {
          return {
            authSession: {
              ...prev.authSession,
              data:
                prev.authSession.status === "authenticated"
                  ? typeof valueOrUpdater === "function"
                    ? valueOrUpdater(prev.authSession.data)
                    : valueOrUpdater
                  : prev.authSession.data,
            } as (typeof prev)["authSession"],
          };
        });
      },
    },
  },
  cart: {
    data: null,
    isLoading: true,
    isSuccess: false,
    status: "checking-stored",

    lineItems: [],
    isCartDropdownOpen: false,

    toggleCartDropdown: () =>
      set(({ cart }) => ({
        cart: {
          ...cart,
          isCartDropdownOpen: !cart.isCartDropdownOpen,
        },
      })),
    setId: ({ type, payload }) => {
      if (process.env.NODE_ENV === "development") {
        console.log(
          '%cCart Status: "' + type.replace(/-/g, " ") + '"',
          "font-weight: bold;",
        );
      }

      if (!["updating-cart"].includes(type) && type === get().cart.status)
        return;

      switch (type) {
        case "checking-stored":
        case "creating-checkout":
        case "checkout-found-in-cookies":
          type;
          return set((prev) => ({
            ...prev,
            cart: {
              ...prev.cart,
              data: null,
              isLoading: true,
              isSuccess: false,
              status: type,
            },
          }));

        case "not-found-in-cookies":
        case "failed-creating-checkout":
          type;
          return set((prev) => ({
            ...prev,
            cart: {
              ...prev.cart,
              data: null,
              isLoading: false,
              isSuccess: false,
              status: type,
            },
          }));

        case "checkout-created":
        case "updating-cart":
        case "line-items-fetched":
          type;
          return set((prev) => ({
            ...prev,
            cart: {
              ...prev.cart,
              data: payload.data,
              isLoading: false,
              isSuccess: true,
              status: type,
              isCartDropdownOpen:
                payload.toOpenCart ?? prev.cart.isCartDropdownOpen,
            },
          }));
      }
    },
  },
  soundCloudPlayer: {
    activeHandle: null,
    iframes: null,
    utils: {
      setData: (data) => {
        set((prev) => {
          const newData =
            typeof data === "function" ? data(prev.soundCloudPlayer) : data;

          return {
            ...prev,
            soundCloudPlayer: {
              ...prev.soundCloudPlayer,
              ...newData,
            },
          };
        });
      },
    },
  },
  menus: {
    isDropdownMenuOnLessThanLgOpen: false,
    toggleDropdownMenuOnLessThanLg: () =>
      set(({ menus, cart }) => ({
        menus: {
          ...menus,
          isDropdownMenuOnLessThanLgOpen: !menus.isDropdownMenuOnLessThanLgOpen,
        },
        cart: {
          ...cart,
          isCartDropdownOpen: false,
        },
      })),

    isSearchMenuDropdownOpen: false,
    toggleSearchMenuDropdown: () =>
      set(({ menus, cart }) => ({
        menus: {
          ...menus,
          isSearchMenuDropdownOpen: !menus.isSearchMenuDropdownOpen,
        },
        cart: {
          ...cart,
          isCartDropdownOpen: false,
        },
      })),

    closeAllMenus: () =>
      set(({ menus, cart }) => ({
        menus: {
          ...menus,
          isSearchMenuDropdownOpen: false,
          isDropdownMenuOnLessThanLgOpen: false,
        },
        cart: {
          ...cart,
          isCartDropdownOpen: false,
        },
      })),
  },
  dialogs: {
    auth: {
      isOpen: false,
      toggleOpen: () =>
        set(({ dialogs }) => ({
          dialogs: {
            ...dialogs,
            auth: { ...dialogs.auth, isOpen: !dialogs.auth.isOpen },
          },
        })),
      type: "login",
      setDialogType: (type) =>
        set(({ dialogs }) => ({
          dialogs: {
            ...dialogs,
            auth: { ...dialogs.auth, type },
          },
        })),
    },
  },
}));

// export const useGlobalStore = <U>(
// 	cb: (
// 		state: typeof globalStore extends { getState: () => infer T } ? T : never
// 	) => U
// ) => useStore(globalStore, cb);
