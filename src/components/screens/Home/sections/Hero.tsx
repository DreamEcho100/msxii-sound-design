import Image from "next/image";
import React from "react";
import Clickable from "~/components/shared/core/Clickable";

type Props = {};

const HeroHomeSection = (props: Props) => {
  return (
    <section className="flex flex-col justify-center bg-basic-secondary-500 p-main-p-1 text-basic-primary-500 md:flex-row ">
      <div className="md:text-align-initial flex flex-col items-center justify-center gap-5 text-center text-lg md:w-1/2 md:items-start md:justify-start min-[1350px]:w-auto">
        <h1 className="text-h1 leading-h1">
          Unlock Limitless Possibilities with <br /> MSXAudio Sample Packs
        </h1>
        <p className="max-w-[41.25rem] leading-primary-1">
          MSXAudio sample packs offer a wide range of high-quality audio and
          MIDI samples for music producers and creators of all skill levels.
          Each pack contains a carefully curated selection of sounds, loops, and
          one-shots, covering a variety of styles and genres.
        </p>

        <Clickable
          href="/"
          isA="next-js"
          variants={{ btn: "primary", p: "v2-xl" }}
          // className="text-2xl"
        >
          SHOP NOW
        </Clickable>
      </div>
      <div className="relative isolate h-96 max-w-[512px] flex-grow md:h-auto">
        <div className="absolute inset-0 flex items-center justify-start">
          <Image
            src="/images/audio-player.png"
            alt=""
            width={390}
            height={285}
            className="max-h-full scale-[0.6] object-contain"
          />
        </div>
        <div className="absolute inset-0 flex items-end justify-end">
          <Image
            src="/images/camera.png"
            alt=""
            width={390}
            height={285}
            className="max-h-full scale-[0.6] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroHomeSection;
