import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";

type ImageProps = Parameters<typeof Image>[0];

export const websiteBasePath = `https://${process.env.NEXT_PUBLIC_APP_DOMAINE}`;

export interface ICustomNextImageProps extends Omit<ImageProps, "alt"> {
  className?: string;
  placeholder?: "blur" | "empty";
  role?: string;
  alt?: string;
  weservNlOptimized?: boolean;
  isAnimated?: boolean;
}

forwardRef;

const CustomNextImage = forwardRef<HTMLImageElement, ICustomNextImageProps>(
  (
    {
      className = "",
      unoptimized = false,
      weservNlOptimized = false,
      src,
      alt = "",
      placeholder = "empty",
      blurDataURL,
      isAnimated = true,
      ...props
    },
    ref,
  ) => {
    const [isWeservNlOptimized, setIsWeservNlOptimized] = useState(
      // process.env.NODE_ENV === 'production' ? weservNlOptimized : false,
      weservNlOptimized,
    );
    const [_src, setSrc] = useState(src);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      if (src !== _src) {
        setSrc(src);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src]);

    function handleImageProps() {
      const imageProps: Omit<ICustomNextImageProps, "alt"> & { alt: string } = {
        onError: () => {
          if (isWeservNlOptimized) {
            setIsLoaded(true);
            setIsWeservNlOptimized(false);
            return;
          }

          setIsLoaded(true);
          setSrc(
            // '/images/image-error.png'
            "/svgs/bbblurry.svg",
          );
        },
        src:
          isWeservNlOptimized && typeof _src === "string"
            ? `//images.weserv.nl/?url=${encodeURIComponent(
                _src.startsWith("/") ? `${websiteBasePath}${_src}` : _src,
              )}&w=${props.width}${props.height ? `&h=${props.height}` : ""}${
                isAnimated ? "&n=-1" : ""
              }&q=${props.quality ? props.quality : 95}&&output=webp`
            : _src,
        unoptimized,
        placeholder,
        className: `${className} ${isLoaded ? "" : "no-content"}`,
        alt,
        onLoadingComplete: () => {
          setIsLoaded(true);
        },
        ...props,
      };

      if (placeholder !== "empty") {
        if (blurDataURL) imageProps.blurDataURL = blurDataURL;
        else if (src && typeof src === "string") imageProps.blurDataURL = src;
      }

      return imageProps;
    }

    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image ref={ref} {...handleImageProps()} />;
  },
);

CustomNextImage.displayName = "CustomNextImage";

export default CustomNextImage;
