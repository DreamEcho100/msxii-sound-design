"use client"
import { createPortal } from "react-dom";
import { useStore } from "zustand";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { BiX } from "react-icons/bi";
import { globalStore } from "~/app/libs/store";
const ReactSoundCloudPlayer = dynamic(() => import("react-player/soundcloud"));

export default function SoundCloudPlayerMenu() {
  const containerRef = useRef<HTMLDivElement>(null);
  const soundCloudPlayer = useStore(
    globalStore,
    (store) => store.soundCloudPlayer,
  );
  const temp = soundCloudPlayer.iframes?.[0];
  const [minHeight, setMinHeight] = useState("0rem");

  if (!soundCloudPlayer.activeHandle || !temp || typeof window === "undefined")
    return;

  const url = new URL(temp.src);
  const urlSearch = url.search.slice(1);

  return createPortal(
    <>
      <div style={{ height: minHeight }} />
      <div
        className="fixed inset-x-0 bottom-0 w-full bg-black"
        id="SoundCloudPlayerMenu"
        ref={containerRef}
      >
        <div className="relative">
          <div className="absolute right-8 top-0">
            <button
              type="button"
              className="bg-special-primary-500 -translate-y-full rounded-t-3xl p-1 opacity-75 hover:opacity-100 focus:opacity-100"
              onClick={() => {
                globalStore.getState().soundCloudPlayer.utils.setData({
                  activeHandle: null,
                  iframes: null,
                });
              }}
            >
              <BiX className="text-3xl" />
            </button>
          </div>
          <ReactSoundCloudPlayer
            url={urlSearch}
            width={temp.width}
            height={temp.height}
            onReady={() => {
              if (!containerRef.current) return;

              const minHeight = `${(
                0.1 +
                containerRef.current.offsetHeight / 12
              ).toFixed(2)}rem`;

              setMinHeight(minHeight);
            }}
            config={{
              options: {
                color: "#8cdbfa",
                // auto_play: true,
                // auto_play	true/false	Start playing the item automatically
                // color	hex code	Color play button and other controls. e.g. '#0066CC'
                // buying	true/false	Show/Hide buy buttons
                // sharing	true/false	Show/Hide share buttons
                // download	true/false	Show/Hide download buttons
                // show_artwork	true/false	Show/Hide the item’s artwork
                // show_playcount	true/false	Show/Hide number of track plays
                // show_user	true/false	Show/Hide the uploader name
                // start_track	number	A number from 0 to the playlist length which reselects the track in a playlist
                // single_active	true/false	If set to false the multiple players on the page won’t toggle each other off when playing
              },
            }}
          />
        </div>
      </div>
    </>,
    document.body,
  );
}
