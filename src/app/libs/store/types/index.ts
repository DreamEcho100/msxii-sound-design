import { type Checkout } from "shopify-buy";
import { type ShopifyCustomer } from "~/libs/shopify/types";

type AuthSession = {
  utils: {
    set: (
      params:
        | { type: "LOADING"; payload?: null }
        | { type: "UNAUTHENTICATED"; payload?: null }
        | {
            type: "AUTHENTICATED";
            payload: ShopifyCustomer;
          },
    ) => void;
  };
  attemptCounter: number;
} & (
  | {
      isLoading: true;
      status: "loading";
      data: null;
    }
  | {
      isLoading: false;
      status: "unauthenticated";
      data: null;
    }
  | {
      isLoading: false;
      status: "authenticated";
      data: ShopifyCustomer;
    }
);

type Cart = {
  isCartDropdownOpen: boolean;
  toggleCartDropdown: () => void;

  setId: (
    params:
      | {
          type:
            | "init"
            | "checking-stored"
            | "creating-checkout"
            | "checkout-found-in-cookies";
          payload?: null;
        }
      | {
          type: "not-found-in-cookies" | "failed-creating-checkout";
          payload?: null;
        }
      | {
          type: "checkout-created" | "line-items-fetched" | "updating-cart";
          payload: {
            data: Checkout;
            toOpenCart?: boolean;
          };
        },
  ) => void;
} & (
  | {
      isLoading: true;
      isSuccess: false;
      status:
        | "checking-stored"
        | "creating-checkout"
        | "checkout-found-in-cookies";
      data: null;
    }
  | {
      isLoading: false;
      isSuccess: false;
      status: "not-found-in-cookies" | "failed-creating-checkout";
      data: null;
    }
  | {
      isLoading: false;
      isSuccess: true;
      status: "checkout-created" | "line-items-fetched" | "updating-cart";
      data: Checkout;
    }
);

type ValueOrUpdater<Value> = Value | ((value: Value) => Value);

type SoundCloudPlayerData =
  | {
      activeHandle: null;
      iframes: null;
    }
  | {
      activeHandle: string;
      iframes: {
        src: string;
        allow: string;
        title: string;
        width?: string | undefined;
        height?: string | undefined;
      }[];
    };
type SoundCloudPlayer = {
  utils: {
    setData: (data: ValueOrUpdater<SoundCloudPlayerData>) => void;
  };
} & SoundCloudPlayerData;

export interface GlobalStore {
  authSession: AuthSession;
  cart: Cart;
  soundCloudPlayer: SoundCloudPlayer;
  menus: {
    closeAllMenus: () => void;

    isDropdownMenuOnLessThanLGOpen: boolean;
    toggleDropdownMenuOnLessThanLG: () => void;

    isSearchMenuDropdownOpen: boolean;
    toggleSearchMenuDropdown: () => void;
  };
  dialogs: {
    auth: {
      isOpen: boolean;
      toggleOpen: () => void;
      type: "register" | "login";
      setDialogType: (state: "register" | "login") => void;
    };
  };
}
