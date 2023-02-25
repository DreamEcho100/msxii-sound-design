import { FunctionComponent, useRef } from 'react';

import { A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { fakeProductsData } from '~/utils/appData';
import { Product } from '~/utils/types';
import { cx } from 'class-variance-authority';

import classes from './index.module.css';
import Image from 'next/image';

type Props<CardElemProps extends Record<string, unknown>> = {
	CardElem: FunctionComponent<CardElemProps & { product: Product }>;
	cardsSharedProps?: CardElemProps;
	swiperProps?: Parameters<typeof Swiper>[0];
};

const ProductsSlider = <CardElemProps extends Record<string, unknown>>({
	CardElem,
	swiperProps = {},
	cardsSharedProps = {} as CardElemProps
}: Props<CardElemProps>) => {
	const SwiperInstanceRef = useRef<
		Parameters<NonNullable<Parameters<typeof Swiper>[0]['onSwiper']>>[0] | null
	>(null);
	return (
		<div className="relative">
			<button
				title="next slide"
				style={{ zIndex: 2 }}
				onClick={() => SwiperInstanceRef.current?.slideNext()}
				className={cx(
					'hover:scale-[1.25] transition-all duration-150 absolute top-1/2 -translate-y-1/2 w-4 h-8 aspect-[1.91/1]',
					'-right-4 rtl:-left-4 rtl:right-auto rtl:rotate-180'
				)}
			>
				{/* backgroundImage: 'url("/svgs/right-arrow 2.svg")',
					backgroundPosition: 'center',
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat', */}
				<Image
					src="/svgs/right-arrow 2.svg"
					alt=""
					width={50}
					height={100}
					className="w-full h-full object-contain object-center"
				/>
			</button>
			<button
				title="previous slide"
				onClick={() => SwiperInstanceRef.current?.slidePrev()}
				className={cx(
					'z-[2] hover:scale-[1.25] transition-all duration-150 absolute top-1/2 -translate-y-1/2 w-4 h-8 aspect-[1.91/1]',
					'-left-4 rtl:-right-4 rtl:left-aright-auto rtl:rotate-180'
				)}
			>
				{/* backgroundImage: 'url("/svgs/left-arrow 2.svg")',
					backgroundPosition: 'center',
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat', */}
				<Image
					src="/svgs/left-arrow 2.svg"
					alt=""
					width={50}
					height={100}
					className="w-full h-full object-contain object-center"
				/>
			</button>
			<Swiper
				className="cardsContainer"
				onSwiper={(swiperInstance) =>
					(SwiperInstanceRef.current = swiperInstance)
				}
				modules={[A11y, Autoplay]}
				// navigation
				autoplay={{ delay: 7500 }}
				slidesPerView={1}
				spaceBetween={20}
				breakpoints={{
					500: { slidesPerView: 2 },
					768: { slidesPerView: 3 },
					1150: { slidesPerView: 5 },
					1400: { slidesPerView: 6 }
				}}
				loop
				{...swiperProps}
			>
				{fakeProductsData.map((item) => (
					<SwiperSlide key={item.key} className="flex flex-col">
						{<CardElem product={item} {...cardsSharedProps} />}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ProductsSlider;
