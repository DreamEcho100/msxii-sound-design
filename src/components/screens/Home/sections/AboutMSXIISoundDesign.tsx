import Image from "next/image";
import React from "react";

type Props = {};

const AboutMSXIISoundDesign = (props: Props) => {
  return (
    <section className="bg-basic-secondary-500 text-basic-primary-500 sm:px-main-p-3 sm:py-main-p-2">
      <div className="flex flex-col-reverse justify-center gap-4 bg-special-secondary-500 px-main-p-2 sm:gap-12 sm:rounded-xl lg:flex-row lg:px-main-p-1">
        <div
          className="lg:text-align-initial flex flex-col 
gap-8 pb-main-p-2 text-center text-lg font-medium lg:w-1/2 lg:max-w-screen-sm lg:pt-main-p-1"
        >
          <header>
            <h2 className="text-h1 font-black">About MSXII Sound Design</h2>
          </header>

          <p>
            MSXII is committed to providing the audio community with quality,
            well-thought out, relevant & vintage sounds in the form of sample
            packs, drum kits, apps and sound design. These are sounds that are
            ready to use in your projects upon download. All material released
            is recorded through state-of-the-art equipment such as the SSL
            Duality, SSL Fusion, UA, & Neve preamps. Tracked into high quality
            converters before landing in Protools, Logic, or Live for print.
            Some projects also receive processing into vintage tape machines and
            other analog boards for added character.
          </p>
          <p>
            In addition to our own line of products on msxaudio.com and what
            you've seen on social media, we offer the iOS Apps Fly Tape and
            Lo-Fly Dirt. We've also done countless work/partnerships with
            companies such as Native Instruments (Sierra Grove/Elastic
            Thump/Aquarius Earth), Akai (Soul Provider 1, 2, & Vintage
            Provider), Ableton (Beat Tools & Live 10 factory content), Novation,
            Intua, Serato, Our niche is in creative sound design solutions for
            music producers and we're pretty knowledgeable on just about any
            platform, DAW, instrument, device, and more!
          </p>
        </div>
        <div className="flex items-start justify-center lg:w-1/2">
          <Image
            src="/images/image 8.png"
            alt=""
            width={600}
            height={500}
            className="w-[70%] max-w-[512px]"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMSXIISoundDesign;
