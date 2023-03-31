import React, { FunctionComponent, ReactNode, useRef } from 'react';

import { A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
// import { fakeProductsData } from '~/utils/appData';
import { ShopifyProduct } from '~/utils/types';
import { cx } from 'class-variance-authority';

import Image from 'next/image';

type SliderProps = {
	children: ReactNode;
	swiperProps?: Parameters<typeof Swiper>[0];
	nextSlideButtonClassName?: string;
	previousSlideButtonClassName?: string;
};

interface CardsSliderProps<CardElemProps extends Record<string, unknown>>
	extends Omit<SliderProps, 'children'> {
	products: ShopifyProduct[];
	CardElem: FunctionComponent<CardElemProps & { product: ShopifyProduct }>;
	cardsSharedProps?: CardElemProps;
}

export const CardsSlider = <CardElemProps extends Record<string, unknown>>({
	products,
	CardElem,
	cardsSharedProps = {} as CardElemProps,
	...props
}: CardsSliderProps<CardElemProps>) => {
	return (
		<Slider {...props}>
			{products.map((item) => (
				<SwiperSlide key={item.id} className="flex flex-col">
					{<CardElem product={item} {...cardsSharedProps} />}
				</SwiperSlide>
			))}
		</Slider>
	);
};

const Slider = ({
	children,
	swiperProps = {},
	nextSlideButtonClassName,
	previousSlideButtonClassName
}: SliderProps) => {
	const SwiperInstanceRef = useRef<
		Parameters<NonNullable<Parameters<typeof Swiper>[0]['onSwiper']>>[0] | null
	>(null);

	return (
		<div className="flex gap-4">
			<div className="flex items-center justify-center">
				<button
					title="Previous slide."
					onClick={() => SwiperInstanceRef.current?.slidePrev()}
					className={cx(
						'hover:scale-[1.25] focus:scale-[1.25] transition-all duration-150 w-4 h-8 aspect-[1.91/1]',
						'rtl:rotate-180',
						previousSlideButtonClassName
					)}
				>
					<Image
						src="/svgs/left-arrow 2.svg"
						alt=""
						width={50}
						height={100}
						className="w-full h-full object-contain object-center"
					/>
				</button>
			</div>

			<Swiper
				className="cards-container flex-grow"
				onSwiper={(swiperInstance) =>
					(SwiperInstanceRef.current = swiperInstance)
				}
				modules={[A11y, Autoplay]}
				// navigation
				autoplay={{ delay: 7500 }}
				slidesPerView={1}
				spaceBetween={20}
				breakpoints={{
					384: { slidesPerView: 2 },
					768: { slidesPerView: 3 },
					1024: { slidesPerView: 5 },
					1280: { slidesPerView: 6 }
				}}
				loop
				{...swiperProps}
			>
				{children}
			</Swiper>

			<div className="flex items-center justify-center">
				<button
					title="Next slide."
					onClick={() => SwiperInstanceRef.current?.slideNext()}
					className={cx(
						'hover:scale-[1.25] focus:scale-[1.25] transition-all duration-150 w-4 h-8 aspect-[1.91/1]',
						' rtl:rotate-180',
						nextSlideButtonClassName
					)}
				>
					<Image
						src="/svgs/right-arrow 2.svg"
						alt=""
						width={50}
						height={100}
						className="w-full h-full object-contain object-center"
					/>
				</button>
			</div>
		</div>
	);
};

export default Slider;
