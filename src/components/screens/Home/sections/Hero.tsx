import CustomNextImage from "~/components/shared/CustomNextImage";
import Clickable from "~/components/shared/core/Clickable";
import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";

const heroImages: { path: string }[] = [
  {
    path: "https://res.cloudinary.com/dpjuamt6q/image/upload/v1690933160/6_yz2rnw.png",
    // animate: { scale: 0.4, x: '30%', rotateZ: '12deg' }
  },
  {
    path: "https://res.cloudinary.com/dpjuamt6q/image/upload/v1690933155/5_qgre7m.png",
    // animate: { scale: 0.5, x: '0%', rotateZ: '8deg' }
  },
  {
    path: "https://res.cloudinary.com/dpjuamt6q/image/upload/v1690933151/4_grv8js.png",
    // animate: { scale: 0.6, x: '30%' }
  },
  {
    path: "https://res.cloudinary.com/dpjuamt6q/image/upload/v1690933147/3_fdxiym.png",
    // animate: { scale: 0.6, x: '-15%', rotateZ: '-1.5deg' }
  },
  {
    path: "https://res.cloudinary.com/dpjuamt6q/image/upload/v1690933139/2_jtvunh.png",
    // animate: { scale: 0.6, x: '-5%', rotateZ: '-1.5deg' }
  },
  {
    path: "https://res.cloudinary.com/dpjuamt6q/image/upload/v1690933134/1_otnqyt.png",
    // animate: { scale: 0.6, x: '5%', rotateZ: '-1.5deg' }
  },
  // {
  // 	path: heroImagesPathNumberTransformer(1),
  // 	animate: { scale: 0.6, x: '15%', rotateZ: '-1.5deg' }
  // }
];

const HeroHomeSection = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsActive(true), 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="flex flex-col justify-center gap-2 overflow-hidden px-main-p-3 py-8 sm:px-main-p-1 lg:flex-row">
      <div
        className="lg:text-align-initial 
flex flex-col items-center justify-center gap-8 py-main-p-3 text-center text-[1.125rem] sm:py-main-p-1 lg:w-1/2 lg:items-start lg:justify-start min-[1350px]:w-auto"
      >
        <h1
          className={cx("text-h1 font-medium leading-h1", "item-to-animate-up")}
        >
          Unlock Limitless Possibilities with <br /> MSXAudio Sample Packs
        </h1>
        <p className={cx("max-w-[55ch]", "item-to-animate-up")}>
          MSXAudio sample packs offer a wide range of high-quality audio and
          MIDI samples for music producers and creators of all skill levels.
          Each pack contains a carefully curated selection of sounds, loops, and
          one-shots, covering a variety of styles and genres.
        </p>

        <span className="item-to-animate-up mt-6">
          <Clickable
            href="collections"
            isA="next-js"
            variants={{
              btn: "primary",
              py: "semi-md",
              px: "3xl",
              rounded: "md",
            }}
          >
            SHOP NOW
          </Clickable>
        </span>
      </div>
      <style global jsx>{`
        .item-to-animate-up {
          opacity: 0;
          transform: translateY(2rem);
          animation: animate-up 0.5s ease-in 0.1s forwards;
        }
        @keyframes animate-up {
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="relative flex flex-grow items-center justify-center p-8 pb-10 sm:p-16 lg:p-0">
        <div className="relative aspect-square h-96 w-96 max-w-full pb-main-p-3 sm:pb-main-p-1">
          {heroImages.map(({ path }, index, arr) => (
            <div
              key={path}
              style={{
                transform: isActive
                  ? `translate(${(
                      ((index + 1) / arr.length) * 170 -
                      100
                    ).toFixed(2)}px, ${(
                      ((index + 1) / arr.length) * 100 -
                      50
                    ).toFixed(2)}px) scale(0.75)`
                  : undefined,
              }}
              className={cx(
                "absolute inset-0 aspect-square h-full w-full",
                "transition-transform delay-500 duration-1000",
              )}
            >
              <CustomNextImage
                src={path}
                width={325}
                height={325}
                className="h-full w-full rounded-xl object-contain"
                priority={index > Math.floor((arr.length - 1) * 75)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroHomeSection;
