import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { type Checkout } from "shopify-buy";
import { useStore } from "zustand";
import { globalStore } from "~/app/libs/store";
import { trpcApi } from "~/app/libs/trpc/client";
import { type RouterInputs } from "~/server/api/root";

export const useRegisterMutation = ({
  onError,
  onSuccess,
}: {
  onSuccess: () => void;
  onError: (err: { message: string }) => void;
}) => {
  const setCustomerSession = useStore(
    globalStore,
    (store) => store.authSession.utils.set,
  );

  const registerMutation = trpcApi.shopify.auth.register.useMutation({
    onMutate: () => setCustomerSession({ type: "LOADING" }),
    onSuccess: (result) => {
      setCustomerSession({ type: "AUTHENTICATED", payload: result });
      onSuccess();
    },
    onError: (err) => {
      setCustomerSession({ type: "UNAUTHENTICATED" });
      onError({ message: err.message });
      toast(err.message, { type: "error" });
    },
  });

  return registerMutation;
};

export const useLoginMutation = ({
  onError,
  onSuccess,
}: {
  onSuccess: () => void;
  onError: (err: { message: string }) => void;
}) => {
  const setCustomerSession = useStore(
    globalStore,
    (store) => store.authSession.utils.set,
  );

  const loginMutation = trpcApi.shopify.auth.login.useMutation({
    onMutate: () => setCustomerSession({ type: "LOADING" }),
    onSuccess: (result) => {
      setCustomerSession({ type: "AUTHENTICATED", payload: result });
      onSuccess();
    },
    onError: (err) => {
      setCustomerSession({ type: "UNAUTHENTICATED" });
      onError({ message: err.message });
      toast(err.message, { type: "error" });
    },
  });

  return loginMutation;
};

export const useCheckAccessToken = ({
  onError,
  onSuccess,
}: {
  onSuccess?: () => void;
  onError?: (err: { message: string }) => void;
} = {}) => {
  const setCustomerSession = useStore(
    globalStore,
    (store) => store.authSession.utils.set,
  );

  const checkAccessTokenQuery = trpcApi.shopify.auth.checkAccessToken.useQuery(
    undefined,
    {
      onSuccess: (result) => {
        setCustomerSession({ type: "AUTHENTICATED", payload: result });
        onSuccess?.();
      },
      onError: (err) => {
        setCustomerSession({ type: "UNAUTHENTICATED" });
        onError?.({ message: err.message });
      },
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 3,
    },
  );

  // useEffect(() => {
  // 	if (customerStatus !== 'loading') setCustomerSession({ type: 'LOADING' });
  // }, [checkAccessTokenQuery.isInitialLoading]);

  return checkAccessTokenQuery;
};

export const useSignOutMutation = ({
  onError,
  onSuccess,
}: {
  onSuccess?: () => void;
  onError?: (err: { message: string }) => void;
}) => {
  return trpcApi.shopify.auth.signOut.useMutation({
    onSuccess: () => {
      onSuccess?.();
      window.location.reload();
    },
    onError,
  });
};

export const useMutateCart = () => {
  const checkoutId = useStore(globalStore, (store) => store.cart.data?.id);
  const lineItems = useStore(
    globalStore,
    (store) => store.cart.data?.lineItems ?? [],
  );

  const addManyLineItemCheckouts =
    trpcApi.shopify.checkouts.lineItems.addMany.useMutation();
  const updateManyLineItemCheckouts =
    trpcApi.shopify.checkouts.lineItems.updateMany.useMutation();
  const removeManyLineItemCheckouts =
    trpcApi.shopify.checkouts.lineItems.removeMany.useMutation();

  const isAddToCartLoading =
    addManyLineItemCheckouts.isLoading || updateManyLineItemCheckouts.isLoading;
  const isUpdateCartLoading =
    updateManyLineItemCheckouts.isLoading ||
    removeManyLineItemCheckouts.isLoading;
  const isRemoveToCartLoading = removeManyLineItemCheckouts.isLoading;

  const addToCartAsync = useCallback(
    async (
      input: Omit<
        RouterInputs["shopify"]["checkouts"]["lineItems"]["addMany"],
        "checkoutId"
      >,
      toOpenCart = true,
    ) => {
      if (!checkoutId || input.lineItems.length < 0) return;

      const originalLineItemsIfMap = Object.fromEntries(
        lineItems.reduce(
          (acc, curr) => {
            if (curr.variant?.id) acc.push([curr.variant.id, curr.id]);

            return acc;
          },
          [] as [string, string][],
        ),
      );

      const lineItemsToAdd: RouterInputs["shopify"]["checkouts"]["lineItems"]["addMany"]["lineItems"] =
        [];
      const lineItemsToUpdate: RouterInputs["shopify"]["checkouts"]["lineItems"]["updateMany"]["lineItems"] =
        [];

      input.lineItems.forEach((lineItem) => {
        if (originalLineItemsIfMap[lineItem.variantId])
          return lineItemsToUpdate.push({
            ...lineItem,
            id: originalLineItemsIfMap[lineItem.variantId]!,
          });

        lineItemsToAdd.push(lineItem);
      });

      let checkout: Checkout | null = null;

      if (lineItemsToAdd.length > 0)
        await addManyLineItemCheckouts
          .mutateAsync({
            checkoutId,
            lineItems: lineItemsToAdd,
          })
          .then((result) => {
            checkout = result;
          });

      if (lineItemsToUpdate.length > 0)
        await updateManyLineItemCheckouts
          .mutateAsync({
            checkoutId,
            lineItems: lineItemsToUpdate,
          })
          .then((result) => {
            checkout = result;
          });

      if (checkout)
        globalStore.getState().cart.setId({
          type: "updating-cart",
          payload: { data: checkout, toOpenCart },
        });
    },
    [
      checkoutId,
      addManyLineItemCheckouts,
      lineItems,
      updateManyLineItemCheckouts,
    ],
  );

  const updateCartAsync = useCallback(
    async (
      input: Omit<
        RouterInputs["shopify"]["checkouts"]["lineItems"]["updateMany"],
        "checkoutId"
      >,
      toOpenCart = true,
    ) => {
      if (!checkoutId) return;
      const lineItemsToUpdate: typeof input.lineItems = [];

      const lineItemIdsToRemove: string[] = [];

      input.lineItems.forEach((lineItem) => {
        if (lineItem.quantity <= 0)
          return lineItemIdsToRemove.push(lineItem.id);

        lineItemsToUpdate.push(lineItem);
      });

      let checkout: Checkout | null = null;

      if (lineItemsToUpdate.length > 0)
        await updateManyLineItemCheckouts
          .mutateAsync({
            checkoutId,
            lineItems: lineItemsToUpdate,
          })
          .then((result) => {
            checkout = result;
          });

      if (lineItemIdsToRemove.length > 0)
        await removeManyLineItemCheckouts
          .mutateAsync({
            checkoutId,
            lineItemIds: lineItemIdsToRemove,
          })
          .then((result) => {
            checkout = result;
          });

      if (checkout)
        globalStore.getState().cart.setId({
          type: "updating-cart",
          payload: { data: checkout, toOpenCart },
        });
    },
    [checkoutId, removeManyLineItemCheckouts, updateManyLineItemCheckouts],
  );

  const removeToCartAsync = useCallback(
    async (
      input: RouterInputs["shopify"]["checkouts"]["lineItems"]["removeMany"],
      toOpenCart = true,
    ) => {
      if (!checkoutId || input.lineItemIds.length === 0) return;

      await removeManyLineItemCheckouts
        .mutateAsync({
          checkoutId,
          lineItemIds: input.lineItemIds,
        })
        .then((result) =>
          globalStore.getState().cart.setId({
            type: "updating-cart",
            payload: { data: result, toOpenCart },
          }),
        );
    },
    [checkoutId, removeManyLineItemCheckouts],
  );

  return {
    addToCart: {
      mutateAsync: addToCartAsync,
      isLoading: isAddToCartLoading,
    },
    updateCart: {
      mutateAsync: updateCartAsync,
      isLoading: isUpdateCartLoading,
    },
    removeToCart: {
      mutateAsync: removeToCartAsync,
      isLoading: isRemoveToCartLoading,
    },
  };
};

export const useExtractDataFromHTMLDescription = (htmlDescription?: string) => {
  const [extractDataFromHTMLDescription, setExtractDataFromHTMLDescription] =
    useState<{
      detailsHTML: string;
      detailsText: string;
      iframes: {
        youtube: {
          src: string;
          allow: string;
          title: string;
          width?: string;
          height?: string;
        }[];
        soundCloud: {
          src: string;
          allow: string;
          title: string;
          width?: string;
          height?: string;
        }[];
      };
    }>({
      detailsHTML: "",
      detailsText: "",
      iframes: { youtube: [], soundCloud: [] },
    });

  useEffect(() => {
    if (typeof window === "undefined" || !htmlDescription) return;

    const container = document.createElement("div");
    container.innerHTML = htmlDescription;

    let hasIframes = false;
    const iframes: {
      youtube: {
        src: string;
        allow: string;
        title: string;
        width?: string;
        height?: string;
      }[];
      soundCloud: {
        src: string;
        allow: string;
        title: string;
        width?: string;
        height?: string;
      }[];
    } = {
      youtube: [],
      soundCloud: [],
    };

    container.querySelectorAll("iframe").forEach((iframe) => {
      const url = new URL(iframe.src);

      if (url.origin.startsWith("https://w.soundcloud.com")) {
        iframes.soundCloud.push({
          src: iframe.src,
          allow: iframe.allow,
          title: iframe.title,
          width: iframe.width,
          height: iframe.height,
        });
        iframe.parentElement?.removeChild(iframe);
        iframe.nextElementSibling?.parentElement?.removeChild(iframe);
        hasIframes = true;
      }

      if (url.origin.startsWith("https://www.youtube.com")) {
        iframes.youtube.push({
          src: iframe.src,
          allow: iframe.allow,
          title: iframe.title,
          width: iframe.width,
          height: iframe.height,
        });
        iframe.parentElement?.removeChild(iframe);
        hasIframes = true;
      }
    });

    container.querySelectorAll("div").forEach((div) => {
      if (div.innerText.trimStart().startsWith("MSXIISound · "))
        div.parentElement?.removeChild(div);
    });

    let i;
    for (i = container.children.length - 1; i > -1; i--) {
      const child = container.children[i];
      if (
        !child ||
        (child as unknown as { innerText: string }).innerText.trim()
      )
        break;

      child.parentElement?.removeChild(child);
    }

    if (!hasIframes) return;

    setExtractDataFromHTMLDescription({
      detailsHTML: container.innerHTML,
      detailsText: container.innerText,
      iframes,
    });
  }, [htmlDescription]);

  return {
    extractDataFromHTMLDescription,
    setExtractDataFromHTMLDescription,
  };
};
