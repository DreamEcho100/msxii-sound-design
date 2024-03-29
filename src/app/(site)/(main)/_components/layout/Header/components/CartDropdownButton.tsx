"use client";
import { BsCart3 } from "react-icons/bs";
import { useStore } from "zustand";
import Clickable from "~/app/components/core/Clickable";
import { globalStore } from "~/app/libs/store";

const CartDropdownButton = () => {
  const toggleCartDropdown = useStore(
    globalStore,
    (store) => store.cart.toggleCartDropdown,
  );
  const cartItemsSize = useStore(
    globalStore,
    (store) =>
      store.cart.data?.lineItems.reduce(
        (acc, item) => acc + item.quantity,
        0,
      ) ?? 0,
  );

  return (
    <Clickable
      title="cart"
      variants={null}
      className="relative flex translate-y-[0.5ch] whitespace-nowrap"
      onClick={toggleCartDropdown}
    >
      <BsCart3 className="text-xl" />
      <small className="text-[60%]">
        <strong className="font-bold leading-[3]">{cartItemsSize} ITEMS</strong>
      </small>
    </Clickable>
  );
};

export default CartDropdownButton;
