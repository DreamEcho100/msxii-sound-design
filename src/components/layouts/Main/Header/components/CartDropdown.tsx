import { cx } from 'class-variance-authority';
import React from 'react';
import CustomNextImage from '~/components/shared/CustomNextImage';
import Clickable from '~/components/shared/core/Clickable';
import ProductPrice from '~/components/shared/core/ProductPrice';
import { useGlobalStore } from '~/store';

const CartDropdown = () => {
	const isCartDropdownOpen = useGlobalStore(
		(store) => store.cart.isCartDropdownOpen
	);
	const cartItems = useGlobalStore((store) => store.cart.items);
	console.log('cartItems', cartItems);
	if (!isCartDropdownOpen) return <></>;

	return (
		<div
			className={cx(
				'absolute bottom-0 right-0 rounded-bl-md translate-y-full p-4',
				'bg-bg-primary-200 dark:bg-bg-primary-500',
				'w-full max-w-screen-xl-2-sm max-h-[90vh] overflow-hidden',
				'flex flex-col gap-8'
			)}
		>
			<header>
				<h3 className="text-h3 font-medium">Cart</h3>
			</header>
			<div className="flex flex-col gap-y-4 flex-grow overflow-y-auto overflow-x-hidden px-4">
				{cartItems.map((item) => (
					<article
						key={item.id}
						className="flex"
						// style={{
						// 	gridTemplateColumns: '1fr 3fr',
						// 	gridTemplateRows: '1fr'
						// }}
					>
						<div className="rounded-sm aspect-square w-24 h-24">
							<CustomNextImage
								src={item.featured_image}
								alt={item.title}
								width={100}
								height={100}
								className="duration-300 transition-all w-full h-full object-cover"
							/>
						</div>
						<div className="px-4">
							<h4
								className="text-base max-w-[90%] ellipse-text"
								title={item.title}
							>
								{item.title}
							</h4>
							<ProductPrice
								price={item.price}
								compare_at_price={item.compare_at_price}
							/>
						</div>
					</article>
				))}
			</div>
			<Clickable variants={{ w: 'full', rounded: 'md' }} className="mt-2">
				Proceed To Checkout
			</Clickable>
		</div>
	);
};

export default CartDropdown;
