import { useGlobalStore } from '~/store';
import { api } from '~/utils/api';

export const useRegisterMutation = ({
	onError,
	onSuccess
}: {
	onSuccess: () => void;
	onError: (err: { message: string }) => void;
}) => {
	const setCustomerSession = useGlobalStore(
		(store) => store.customerSession.utils.set
	);

	const registerMutation = api.shopify.auth.register.useMutation({
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

	return registerMutation;
};

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
			onSuccess: (result) => {
				setCustomerSession({ type: 'AUTHENTICATED', payload: result });
				onSuccess?.();
			},
			onError: (err) => {
				setCustomerSession({ type: 'UNAUTHENTICATED' });
				onError?.({ message: err.message });
			},
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			retry: 7
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
