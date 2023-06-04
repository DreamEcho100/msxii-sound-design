import { useGlobalStore } from '~/store';
import { api } from '~/utils/api';

export const useLoginMutation = ({
	onError,
	onSuccess
}: {
	onSuccess: () => void;
	onError: (err: { message: string }) => void;
}) => {
	const setCustomerSession = useGlobalStore(
		(store) => store.customerSession.utils.set
	);

	const loginMutation = api.shopify.auth.login.useMutation({
		onMutate: () => setCustomerSession({ type: 'LOADING' }),
		onSuccess: (result) => {
			setCustomerSession({ type: 'AUTHENTICATED', payload: result });
			onSuccess();
		},
		onError: (err) => {
			setCustomerSession({ type: 'UNAUTHENTICATED' });
			onError({ message: err.message });
		}
	});

	return loginMutation;
};

export const useCheckAccessToken = ({
	onError,
	onSuccess
}: {
	onSuccess?: () => void;
	onError?: (err: { message: string }) => void;
} = {}) => {
	const setCustomerSession = useGlobalStore(
		(store) => store.customerSession.utils.set
	);

	const checkAccessTokenQuery = api.shopify.auth.checkAccessToken.useQuery(
		undefined,
		{
			// on: () => setCustomerSession({ type: 'LOADING' }),
			onSuccess: (result) => {
				setCustomerSession({ type: 'AUTHENTICATED', payload: result });
				onSuccess?.();
			},
			onError: (err) => {
				setCustomerSession({ type: 'UNAUTHENTICATED' });
				onError?.({ message: err.message });
			},
			refetchOnMount: true,
			refetchOnWindowFocus: true,
			refetchOnReconnect: true
		}
	);

	// useEffect(() => {
	// 	if (customerStatus !== 'loading') setCustomerSession({ type: 'LOADING' });
	// }, [checkAccessTokenQuery.isInitialLoading]);

	return checkAccessTokenQuery;
};

export const useSignOutMutation = ({
	onError,
	onSuccess
}: {
	onSuccess?: () => void;
	onError?: (err: { message: string }) => void;
}) => {
	return api.shopify.auth.signOut.useMutation({
		onSuccess: () => window.location.reload()
	});
};