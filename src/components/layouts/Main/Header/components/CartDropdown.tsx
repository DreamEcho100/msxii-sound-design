import { cx } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import CustomNextImage from '~/components/shared/CustomNextImage';
import Clickable from '~/components/shared/core/Clickable';
import ProductPrice from '~/components/shared/core/Shopify/ProductPrice';
import ShopifyProductPrice from '~/components/shared/core/Shopify/ProductPrice';
import ProductQuantityControllers from '~/components/shared/core/ProductQuantityControllers';
import { type CheckoutLineItem } from 'shopify-buy';
import { useMutateCart } from '~/utils/shopify/hooks';
import { useStore } from 'zustand';
import { globalStore } from '~/store';

const CartDropdown = () => {
	const isCartDropdownOpen = useStore(
		globalStore,
		(store) => store.cart.isCartDropdownOpen
	);
	const cartLineItems = useStore(globalStore, (store) => store.cart.lineItems);

	return (
		<AnimatePresence>
			{isCartDropdownOpen && (
				<motion.div
					initial={{ opacity: 0, y: '0%' }}
					animate={{ opacity: 1, y: '100%' }}
					exit={{ opacity: 0, y: '0%' }}
					transition={{ duration: 0.5 }}
					className={cx(
						'absolute bottom-0 right-0 rounded-bl-md origin-top p-4 -z-10',
						'bg-bg-primary-200 dark:bg-bg-primary-500',
						'w-full max-w-screen-xl-2-sm max-h-[75vh] overflow-x-hidden',
						'flex flex-col gap-8'
					)}
				>
					<header>
						<h3 className="text-h3 font-medium">Cart</h3>
					</header>
					<div
						className={cx(
							'flex flex-col gap-y-4 flex-grow overflow-y-auto overflow-x-hidden',
							cartLineItems.length >= 3 ? 'min-h-[5rem]' : ''
						)}
					>
						{cartLineItems.length === 0 ? (
							<article className="bg-bg-primary-600/50 dark:bg-bg-primary-700 p-8 text-center">
								<p>
									<strong className="font-bold">Empty</strong>
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
	const { quantity, totalPrice } = useStore(globalStore, (store) =>
		store.cart.lineItems.reduce(
			(acc, item) => {
				acc.totalPrice +=
					Number(item.unitPrice?.amount || item.variant?.price.amount || 0) *
					item.quantity;
				acc.quantity += item.quantity;
				acc.currencyCode = item.unitPrice?.currencyCode || acc.currencyCode;
				return acc;
			},
			{ totalPrice: 0, quantity: 0, currencyCode: 'USD' }
		)
	);

	return (
		<div className="flex flex-col gap-2">
			<div className="bg-bg-primary-600/50 dark:bg-bg-primary-700 p-4 flex flex-wrap gap-4 justify-between">
				<p>
					Total Price:&nbsp;
					<ProductPrice
						price={{
							amount: cartTotalPrice?.amount || totalPrice,
							currencyCode: cartCurrencyCode || 'USD'
						}}
					/>
				</p>
				<p>Quantity: {quantity}</p>
			</div>
			{quantity !== 0 && webUrl && (
				<Clickable
					href={webUrl}
					variants={{
						w: 'full',
						rounded: 'md',
						btn: 'primary',
						px: '2xl',
						py: 'md'
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
			<div className="rounded-sm aspect-square w-24 h-24">
				{variant && (
					<div className="overflow-hidden">
						<CustomNextImage
							src={variant.image.src}
							alt={variant.image.altText || ''}
							width={100}
							height={100}
							className="hover:scale-110 duration-300 transition-all w-full h-full object-cover"
						/>
					</div>
				)}
			</div>
			<div className="px-4 flex flex-col gap-2 overflow-hidden flex-grow">
				<h4 className="text-base max-w-[90%] ellipse-text" title={item.title}>
					{item.title}
				</h4>
				<div className="flex flex-wrap gap-2 justify-between">
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
										variantId: item.variant?.id
									}
								]
							});
						}}
						handleDecreaseByOne={async () => {
							await updateCart.mutateAsync({
								lineItems: [
									{
										id: item.id,
										quantity: item.quantity - 1,
										variantId: item.variant?.id
									}
								]
							});
						}}
						handleSetSelectedQuantity={async (value) => {
							await updateCart.mutateAsync({
								lineItems: [
									{
										id: item.id,
										quantity: value,
										variantId: item.variant?.id
									}
								]
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
