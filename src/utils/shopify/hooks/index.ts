import { useCallback } from 'react';
import { type CheckoutLineItem } from 'shopify-buy';
import { useGlobalStore } from '~/store';
import { RouterInputs, api } from '~/utils/api';

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

export const useMutateCart = () => {
	const setCartLineItems = useGlobalStore(
		(store) => store.cart.setCartLineItems
	);
	const lineItems = useGlobalStore((store) => store.cart.lineItems);

	const addManyLineItemCheckouts =
		api.shopify.checkouts.lineItems.addMany.useMutation();
	const updateManyLineItemCheckouts =
		api.shopify.checkouts.lineItems.updateMany.useMutation();
	const removeManyLineItemCheckouts =
		api.shopify.checkouts.lineItems.removeMany.useMutation();

	const isAddToCartLoading =
		addManyLineItemCheckouts.isLoading || updateManyLineItemCheckouts.isLoading;
	const isUpdateCartLoading =
		updateManyLineItemCheckouts.isLoading ||
		removeManyLineItemCheckouts.isLoading;
	const isRemoveToCartLoading = removeManyLineItemCheckouts.isLoading;

	const addToCartAsync = useCallback(
		async (
			input: RouterInputs['shopify']['checkouts']['lineItems']['addMany']
		) => {
			if (input.lineItems.length < 0) return;

			const originalLineItemsIfMap = Object.fromEntries(
				lineItems.reduce((acc, curr) => {
					if (curr.variant?.id) acc.push([curr.variant.id, curr.id]);

					return acc;
				}, [] as [string, string][])
			);

			const lineItemsToAdd: RouterInputs['shopify']['checkouts']['lineItems']['addMany']['lineItems'] =
				[];
			const lineItemsToUpdate: RouterInputs['shopify']['checkouts']['lineItems']['updateMany']['lineItems'] =
				[];

			input.lineItems.forEach((lineItem) => {
				if (originalLineItemsIfMap[lineItem.variantId])
					lineItemsToUpdate.push({
						...lineItem,
						id: originalLineItemsIfMap[lineItem.variantId]!
					});

				lineItemsToAdd.push(lineItem);
			});

			let lineItemsResult: CheckoutLineItem[] = [];

			if (lineItemsToAdd.length > 0)
				await addManyLineItemCheckouts
					.mutateAsync({
						checkoutId: input.checkoutId,
						lineItems: lineItemsToAdd
					})
					.then((result) => {
						lineItemsResult = result.lineItems;
					});

			if (lineItemsToUpdate.length > 0)
				await updateManyLineItemCheckouts
					.mutateAsync({
						checkoutId: input.checkoutId,
						lineItems: lineItemsToUpdate
					})
					.then((result) => {
						lineItemsResult = result.lineItems;
					});

			if (lineItemsResult.length > 0) setCartLineItems(lineItemsResult);
		},
		[
			addManyLineItemCheckouts,
			lineItems,
			setCartLineItems,
			updateManyLineItemCheckouts
		]
	);

	const updateCartAsync = useCallback(
		async (
			input: RouterInputs['shopify']['checkouts']['lineItems']['updateMany']
		) => {
			const lineItemsToUpdate: typeof input.lineItems = [];

			const lineItemIdsToRemove: string[] = [];

			input.lineItems.forEach((lineItem) => {
				if (lineItem.quantity === 0) lineItemIdsToRemove.push(lineItem.id);

				lineItemsToUpdate.push(lineItem);
			});

			let lineItemsResult: CheckoutLineItem[] = [];

			if (lineItemsToUpdate.length > 0)
				await updateManyLineItemCheckouts
					.mutateAsync({
						checkoutId: input.checkoutId,
						lineItems: lineItemsToUpdate
					})
					.then((result) => {
						lineItemsResult = result.lineItems;
					});

			if (lineItemIdsToRemove.length > 0)
				await removeManyLineItemCheckouts
					.mutateAsync({
						checkoutId: input.checkoutId,
						lineItemIds: lineItemIdsToRemove
					})
					.then((result) => {
						lineItemsResult = result.lineItems;
					});

			if (lineItemsResult.length > 0) setCartLineItems(lineItemsResult);
		},
		[removeManyLineItemCheckouts, setCartLineItems, updateManyLineItemCheckouts]
	);

	const removeToCartAsync = useCallback(
		async (
			input: RouterInputs['shopify']['checkouts']['lineItems']['removeMany']
		) => {
			if (input.lineItemIds.length > 0)
				await removeManyLineItemCheckouts
					.mutateAsync({
						checkoutId: input.checkoutId,
						lineItemIds: input.lineItemIds
					})
					.then((result) => setCartLineItems(result.lineItems));
		},
		[removeManyLineItemCheckouts, setCartLineItems]
	);

	return {
		addToCart: {
			mutateAsync: addToCartAsync,
			isLoading: isAddToCartLoading
		},
		updateCart: {
			mutateAsync: updateCartAsync,
			isLoading: isUpdateCartLoading
		},
		removeToCart: {
			mutateAsync: removeToCartAsync,
			isLoading: isRemoveToCartLoading
		}
	};
};
