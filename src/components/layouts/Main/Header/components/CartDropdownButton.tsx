import { BsCart3 } from 'react-icons/bs';
import Clickable from '~/components/shared/core/Clickable';
import { useGlobalStore } from '~/store';

const CartDropdownButton = () => {
	const toggleCartDropdown = useGlobalStore(
		(store) => store.cart.toggleCartDropdown
	);
	const cartItemsSize = useGlobalStore((store) =>
		store.cart.lineItems.reduce((acc, item) => acc + item.quantity, 0)
	);

	return (
		<Clickable
			title="cart"
			variants={null}
			className="relative flex whitespace-nowrap translate-y-[0.5ch]"
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
