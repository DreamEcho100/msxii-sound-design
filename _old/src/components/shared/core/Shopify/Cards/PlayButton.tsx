import { useEffect, useState } from "react";
import { BiPlay, BiStop } from "react-icons/bi";
import Clickable from "../../Clickable";
import { type BasicProduct, type Product } from "~/utils/shopify/types";
import { api } from "~/utils/api";
import { useExtractDataFromHTMLDescription } from "~/utils/shopify/hooks";
import { globalStore } from "~/store";
import { useStore } from "zustand";

type Props = { product: Product | BasicProduct };

const PlayButton = (props: Props) => {
  const [isQueryingEnabled, setIsQueryingEnabled] = useState(false);
  const [hasData, setHasData] = useState(false);
  const getProductOneHTMLDescriptionByHandle =
    api.shopify.products.getOneHTMLDescriptionByHandle.useQuery(
      { handle: props.product.handle },
      { enabled: isQueryingEnabled, keepPreviousData: true },
    );
  const currentActiveHandle = useStore(
    globalStore,
    (store) => store.soundCloudPlayer.activeHandle,
  );

  const { extractDataFromHTMLDescription } = useExtractDataFromHTMLDescription(
    getProductOneHTMLDescriptionByHandle.data?.descriptionHtml,
  );

  const hasSoundCloudData =
    extractDataFromHTMLDescription.iframes.soundCloud.length > 0;

  const state: "loading" | "error" | "empty" | "playing" | "not-playing" =
    currentActiveHandle
      ? currentActiveHandle === props.product.handle
        ? getProductOneHTMLDescriptionByHandle.isLoading
          ? "loading"
          : getProductOneHTMLDescriptionByHandle.isError
          ? "error"
          : !hasSoundCloudData
          ? "empty"
          : "playing"
        : "not-playing"
      : "not-playing";

  useEffect(() => {
    if (hasSoundCloudData && !hasData) {
      globalStore.getState().soundCloudPlayer.utils.setData({
        activeHandle: props.product.handle,
        iframes: extractDataFromHTMLDescription.iframes.soundCloud,
      });
      setHasData(true);
    }
  }, [
    extractDataFromHTMLDescription.iframes.soundCloud,
    hasSoundCloudData,
    props.product.handle,
    hasData,
  ]);

  if (state === "empty") return <></>;

  return (
    <Clickable
      className="absolute bottom-0 right-0 mx-4 my-3 flex items-center justify-center"
      variants={{ px: "sm", py: "sm", rounded: "full" }}
      onClick={() => {
        if (state === "playing")
          return globalStore.getState().soundCloudPlayer.utils.setData({
            activeHandle: null,
            iframes: null,
          });

        if (isQueryingEnabled) {
          if (hasSoundCloudData) {
            globalStore.getState().soundCloudPlayer.utils.setData({
              activeHandle: props.product.handle,
              iframes: extractDataFromHTMLDescription.iframes.soundCloud,
            });
          }

          return;
        }

        setIsQueryingEnabled(true);
      }}
    >
      {state === "playing" ? (
        <BiStop className="scale-110 text-3xl rtl:-translate-x-[5%] rtl:rotate-180" />
      ) : (
        <BiPlay className="translate-x-[7.5%] scale-110 text-3xl rtl:-translate-x-[5%] rtl:rotate-180" />
      )}
    </Clickable>
  );
};

export default PlayButton;
