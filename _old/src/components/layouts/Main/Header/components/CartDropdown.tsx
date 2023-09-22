import { cx } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import CustomNextImage from "~/components/shared/CustomNextImage";
import Clickable from "~/components/shared/core/Clickable";
import ProductPrice from "~/components/shared/core/Shopify/ProductPrice";
import ShopifyProductPrice from "~/components/shared/core/Shopify/ProductPrice";
import ProductQuantityControllers from "~/components/shared/core/ProductQuantityControllers";
import { type CheckoutLineItem } from "shopify-buy";
import { useMutateCart } from "~/utils/shopify/hooks";
import { useStore } from "zustand";
import { globalStore } from "~/store";

const CartDropdown = () => {
  const isCartDropdownOpen = useStore(
    globalStore,
    (store) => store.cart.isCartDropdownOpen
  );
  const cartLineItems = useStore(
    globalStore,
    (store) => store.cart.data?.lineItems ?? []
  );

  return (
    <AnimatePresence>
      {isCartDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: "0%" }}
          animate={{ opacity: 1, y: "100%" }}
          exit={{ opacity: 0, y: "0%" }}
          transition={{ duration: 0.5 }}
          className={cx(
            "absolute bottom-0 right-0 -z-10 origin-top rounded-bl-md p-4",
            "bg-bg-primary-200 dark:bg-bg-primary-500",
            "max-h-[75vh] w-full max-w-screen-xl-2-sm overflow-x-hidden",
            "flex flex-col gap-8"
          )}
        >
          <header>
            <h3 className="text-h3 font-medium capitalize">cart</h3>
          </header>
          <div
            className={cx(
              "flex flex-grow flex-col gap-y-4 overflow-y-auto overflow-x-hidden",
              cartLineItems.length >= 3 ? "min-h-[5rem]" : ""
            )}
          >
            {cartLineItems.length === 0 ? (
              <article className="bg-bg-primary-600/50 p-8 text-center dark:bg-bg-primary-700">
                <p>
                  <strong className="font-bold capitalize">empty</strong>
                </p>
              </article>
            ) : (
              cartLineItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))
            )}
          </div>
          <CartDetails />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const getInitDefaultCartDetails = () => ({
  totalPrice: 0,
  quantity: 0,
  currencyCode: "USD",
});

const CartDetails = () => {
  const cartTotalPrice = useStore(
    globalStore,
    (store) => store.cart.data?.totalPrice
  );
  const cartCurrencyCode = useStore(
    globalStore,
    (store) => store.cart.data?.currencyCode
  );
  const webUrl = useStore(globalStore, (store) => store.cart.data?.webUrl);
  const { quantity, totalPrice } = useStore(
    globalStore,
    (store) =>
      store.cart.data?.lineItems.reduce((acc, item) => {
        acc.totalPrice +=
          Number(item.unitPrice?.amount ?? item.variant?.price.amount ?? 0) *
          item.quantity;
        acc.quantity += item.quantity;
        acc.currencyCode = item.unitPrice?.currencyCode ?? acc.currencyCode;
        return acc;
      }, getInitDefaultCartDetails()) ?? getInitDefaultCartDetails()
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap justify-between gap-4 bg-bg-primary-600/50 p-4 dark:bg-bg-primary-700">
        <p className="capitalize">
          total price:&nbsp;
          <ProductPrice
            price={{
              amount: cartTotalPrice?.amount ?? totalPrice,
              currencyCode: cartCurrencyCode ?? "USD",
            }}
          />
        </p>
        <p className="capitalize">quantity: {quantity}</p>
      </div>
      {quantity !== 0 && webUrl && (
        <Clickable
          href={webUrl}
          variants={{
            w: "full",
            rounded: "md",
            btn: "primary",
            px: "2xl",
            py: "md",
          }}
          className="mt-2 flex justify-center capitalize"
        >
          proceed to checkout
        </Clickable>
      )}
    </div>
  );
};

const CartItem = ({ item }: { item: CheckoutLineItem }) => {
  const { updateCart } = useMutateCart();

  const variant = item.variant;

  return (
    <article key={item.id} className="flex">
      <div className="aspect-square h-24 w-24 rounded-sm">
        {variant && (
          <div className="overflow-hidden">
            <CustomNextImage
              src={variant.image.src}
              alt={variant.image.altText ?? ""}
              width={100}
              height={100}
              className="h-full w-full object-cover transition-all duration-300 hover:scale-110"
            />
          </div>
        )}
      </div>
      <div className="flex flex-grow flex-col gap-2 overflow-hidden px-4">
        <div className="flex flex-col">
          <h4 className="ellipse-text max-w-[90%] text-base" title={item.title}>
            {item.title}
          </h4>
          {item.variant?.title && item.variant.title.toLowerCase() !== 'default title' && (
            <p
              className="ellipse-text max-w-[90%] text-base"
              title={item.title}
            >
              <small>
                <strong>{item.variant.title}</strong>
              </small>
            </p>
          )}
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          {variant && (
            <ShopifyProductPrice
              price={variant.price}
              compareAtPrice={variant.compareAtPrice}
            />
          )}
          <ProductQuantityControllers
            handleIncreaseByOne={async () => {
              await updateCart.mutateAsync({
                lineItems: [
                  {
                    id: item.id,
                    quantity: item.quantity + 1,
                    variantId: item.variant?.id,
                  },
                ],
              });
            }}
            handleDecreaseByOne={async () => {
              await updateCart.mutateAsync({
                lineItems: [
                  {
                    id: item.id,
                    quantity: item.quantity - 1,
                    variantId: item.variant?.id,
                  },
                ],
              });
            }}
            handleSetSelectedQuantity={async (value) => {
              await updateCart.mutateAsync({
                lineItems: [
                  {
                    id: item.id,
                    quantity: value,
                    variantId: item.variant?.id,
                  },
                ],
              });
            }}
            quantity={item.quantity}
            isLoading={updateCart.isLoading}
          />
        </div>
      </div>
    </article>
  );
};

export default CartDropdown;
