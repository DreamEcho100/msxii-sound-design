import { FunctionComponent, useRef } from 'react';

import { A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
// import { fakeProductsData } from '~/utils/appData';
import { ShopifyProduct } from '~/utils/types';
import { cx } from 'class-variance-authority';

import Image from 'next/image';

type Props<CardElemProps extends Record<string, unknown>> = {
	products: ShopifyProduct[];
	CardElem: FunctionComponent<CardElemProps & { product: ShopifyProduct }>;
	cardsSharedProps?: CardElemProps;
	swiperProps?: Parameters<typeof Swiper>[0];
	nextSlideButtonClassName?: string;
	previousSlideButtonClassName?: string;
};

const ProductsSlider = <CardElemProps extends Record<string, unknown>>({
	products,
	CardElem,
	swiperProps = {},
	cardsSharedProps = {} as CardElemProps,
	nextSlideButtonClassName,
	previousSlideButtonClassName
}: Props<CardElemProps>) => {
	const SwiperInstanceRef = useRef<
		Parameters<NonNullable<Parameters<typeof Swiper>[0]['onSwiper']>>[0] | null
	>(null);
	return (
		<div className="relative">
			<button
				title="Next slide."
				style={{ zIndex: 2 }}
				onClick={() => SwiperInstanceRef.current?.slideNext()}
				className={cx(
					'hover:scale-[1.25] focus:scale-[1.25] transition-all duration-150 absolute top-1/2 -translate-y-1/2 w-4 h-8 aspect-[1.91/1]',
					'-right-4 rtl:-left-4 rtl:right-auto rtl:rotate-180',
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
			<button
				title="Previous slide."
				onClick={() => SwiperInstanceRef.current?.slidePrev()}
				className={cx(
					'z-[2] hover:scale-[1.25] focus:scale-[1.25] transition-all duration-150 absolute top-1/2 -translate-y-1/2 w-4 h-8 aspect-[1.91/1]',
					'-left-4 rtl:-right-4 rtl:left-aright-auto rtl:rotate-180',
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
			<Swiper
				className="cards-container"
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
				{products.map((item) => (
					<SwiperSlide key={item.id} className="flex flex-col">
						{<CardElem product={item} {...cardsSharedProps} />}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ProductsSlider;
