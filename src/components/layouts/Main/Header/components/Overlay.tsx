import { cx } from 'class-variance-authority';
import { useGlobalStore } from '~/store';

const Overlay = () => {
	const closeAllMenus = useGlobalStore((store) => store.menus.closeAllMenus);

	const isDropdownMenuOnLessThanLGOpen = useGlobalStore(
		(store) => store.menus.isDropdownMenuOnLessThanLGOpen
	);
	const isSearchMenuDropdownOpen = useGlobalStore(
		(store) => store.menus.isSearchMenuDropdownOpen
	);
	const isCartDropdownOpen = useGlobalStore(
		(store) => store.cart.isCartDropdownOpen
	);

	const isAnyMenuOpen =
		isDropdownMenuOnLessThanLGOpen ||
		isSearchMenuDropdownOpen ||
		isCartDropdownOpen;

	if (!isAnyMenuOpen) return <></>;

	return (
		<button
			className={cx(
				'fixed inset-0 z-[9] block w-full h-full',
				isDropdownMenuOnLessThanLGOpen && !isSearchMenuDropdownOpen
					? 'lg:hidden'
					: '',
				isCartDropdownOpen
					? 'bg-initial-primary-900/10 dark:bg-initial-primary-900/25'
					: 'bg-initial-primary-900/60 backdrop-blur-[0.0625rem]'
			)}
			onClick={closeAllMenus}
			title="Close all opened menus."
		/>
	);
};

export default Overlay;
