import { GoSignOut } from 'react-icons/go';
import Clickable from '~/components/shared/Clickable';
import { useGlobalStore } from '~/store';
import { useSignOutMutation } from '~/utils/shopify/hooks';

const SignOutButton = () => {
	const customerSessionStatus = useGlobalStore(
		(store) => store.customerSession.status
	);

	const signOutMutation = useSignOutMutation({
		onError: (err) => console.log('err', err)
	});

	if (customerSessionStatus !== 'authenticated') return <></>;

	return (
		<Clickable onClick={() => signOutMutation.mutate()}>
			<GoSignOut />
		</Clickable>
	);
};

export default SignOutButton;
