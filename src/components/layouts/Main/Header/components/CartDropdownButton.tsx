import { BsCart3 } from 'react-icons/bs';
import Clickable from '~/components/shared/core/Clickable';
import { useGlobalStore } from '~/store';

const CartDropdownButton = () => {
	const toggleCartDropdown = useGlobalStore(
		(store) => store.cart.toggleCartDropdown
	);
	const cartItemsSize = useGlobalStore((store) =>
		store.cart.items.reduce((acc, item) => acc + item.quantity, 0)
	);

	return (
		<Clickable
			title="cart"
			variants={null}
			className="relative flex items-start gap-1 whitespace-nowrap translate-y-[0.25ch]"
			onClick={toggleCartDropdown}
		>
			<BsCart3 className="text-xl" /> {cartItemsSize} ITEMS
		</Clickable>
	);
};

export default CartDropdownButton;
