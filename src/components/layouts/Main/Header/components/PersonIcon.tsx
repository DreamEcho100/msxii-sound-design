import { cx } from 'class-variance-authority';
import { BsPersonFill } from 'react-icons/bs';
import Clickable, { ClickableProps } from '~/components/shared/Clickable';
import { useGlobalStore } from '~/store';

const PersonIcon = () => {
	const toggleAuthDialogOpen = useGlobalStore(
		(store) => store.dialogs.auth.toggleOpen
	);
	const customerSession = useGlobalStore((store) => store.customerSession);


	const clickableProps: ClickableProps =
		customerSession.status === 'authenticated'
			? {
					href: `/profile/${customerSession.data.customer.id.replace(
						'gid://shopify/Customer/',
						''
					)}`,
					isA: 'next-js',
					title: 'profile',
					className: cx(
						'text-xl text-special-primary-500',
						'hover:text-special-primary-900 focus:text-special-primary-900',
						'hover:text-special-primary-600 focus:text-special-primary-600'
					)
			  }
			: {
					title: 'profile',
					className: cx(
						'text-xl text-special-primary-500',
						'hover:text-special-primary-900 focus:text-special-primary-900',
						'hover:text-special-primary-600 focus:text-special-primary-600'
					),
					onClick: toggleAuthDialogOpen
			  };

	return (
		<Clickable {...clickableProps}>
			<BsPersonFill />
		</Clickable>
	);
};

export default PersonIcon;
