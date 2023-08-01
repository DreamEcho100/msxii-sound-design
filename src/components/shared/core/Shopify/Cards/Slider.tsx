import type { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

import { useRef } from 'react';
import { A11y, Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { cx } from 'class-variance-authority';

import CustomNextImage from '~/components/shared/CustomNextImage';
import type {
	Collection,
	Product,
	BasicCollection,
	BasicProduct,
} from '~/utils/shopify/types';

type SliderProps = {
	children: ReactNode;
	swiperProps?: Parameters<typeof Swiper>[0];
	nextSlideButtonClassName?: string;
	previousSlideButtonClassName?: string;
	containerProps?: HTMLAttributes<HTMLDivElement>;
	verticalOnLG?: boolean;
	isNavButtonsOutside?: boolean;
};

interface CardsSliderProps<CardElemProps extends Record<string, unknown>>
	extends Omit<SliderProps, 'children'> {
	collections: Collection[] | BasicCollection[];
	CardElem: FunctionComponent<
		CardElemProps & { product: Product | BasicProduct }
	>;
	cardsSharedProps?: CardElemProps;
}

export const CardsSlider = <CardElemProps extends Record<string, unknown>>({
	collections,
	CardElem,
	cardsSharedProps = {} as CardElemProps,
	...props
}: CardsSliderProps<CardElemProps>) => {
	return (
		<Slider {...props}>
			{collections.map((collection) =>
				collection.products.edges.map(({ node }) => (
					<SwiperSlide key={node.id} className="flex flex-col">
						<CardElem key={node.id} product={node} {...cardsSharedProps} />
					</SwiperSlide>
				)),
			)}
		</Slider>
	);
};

const Slider = ({
	children,
	swiperProps = {},
	nextSlideButtonClassName,
	previousSlideButtonClassName,
	verticalOnLG,
	isNavButtonsOutside,
	containerProps,
}: SliderProps) => {
	const navigationPrevRef = useRef<HTMLButtonElement>(null);
	const navigationNextRef = useRef<HTMLButtonElement>(null);

	return (
		<div
			{...containerProps}
			className={cx(
				'relative flex gap-4',
				verticalOnLG ? 'verticalOnLG lg:flex-col' : '',
				containerProps?.className,
			)}
		>
			<div
				className={cx(
					'flex items-center justify-center',
					// verticalOnLG ? 'lg:rotate-90 scale-75' : '',
					!isNavButtonsOutside ? '' : 'absolute',
					verticalOnLG && isNavButtonsOutside
						? 'lg:right-auto lg:rtl:right-auto lg:top-0 lg:left-1/2 lg:rtl:left-1/2 lg:-translate-x-1/2 lg:-translate-y-full'
						: '',

					isNavButtonsOutside
						? 'top-1/2 -translate-x-[150%] left-0 rtl:left-auto rtl:right-0 rtl:translate-x-[150%]'
						: '',
				)}
			>
				<button
					type="button"
					title="Previous slide."
					// onClick={() => SwiperInstanceRef.current?.slidePrev()}
					ref={navigationPrevRef}
					className={cx(
						'hover:scale-[1.25] focus:scale-[1.25] transition-all duration-150 w-4 h-8 aspect-[1.91/1] rtl:rotate-180',
						verticalOnLG
							? 'lg:rotate-90 rtl:lg:rotate-90 scale-75'
							: 'rtl:rotate-180',
						previousSlideButtonClassName,
					)}
				>
					<CustomNextImage
						src="/svgs/left-arrow 2.svg"
						width={50}
						height={100}
						className="w-full h-full object-contain object-center"
					/>
				</button>
			</div>

			<Swiper
				className="cards-container"
				navigation={{
					prevEl: navigationPrevRef.current,
					nextEl: navigationNextRef.current,
				}}
				modules={[A11y, Autoplay, Navigation]}
				autoplay={{ delay: 7500 }}
				slidesPerView={1}
				spaceBetween={20}
				breakpoints={{
					384: { slidesPerView: 2 },
					768: { slidesPerView: 3 },
					1024: { slidesPerView: 5 },
					1280: { slidesPerView: 6 },
				}}
				loop
				{...swiperProps}
			>
				{children}
			</Swiper>

			<div
				className={cx(
					'flex items-center justify-center',
					// verticalOnLG ? 'lg:rotate-90 scale-75' : '',
					!isNavButtonsOutside ? '' : 'absolute',
					verticalOnLG && isNavButtonsOutside
						? 'lg:right-auto lg:rtl:right-auto lg:top-full lg:left-1/2 lg:rtl:left-1/2 lg:-translate-x-1/2 lg:translate-y-0'
						: '',

					isNavButtonsOutside
						? 'top-1/2 translate-x-[150%] right-0 rtl:right-auto rtl:left-0 rtl:-translate-x-[150%]'
						: '',
				)}
			>
				<button
					type="button"title="Next slide."
					// onClick={() => SwiperInstanceRef.current?.slideNext()}
					ref={navigationNextRef}
					className={cx(
						'hover:scale-[1.25] focus:scale-[1.25] transition-all duration-150 w-4 h-8 aspect-[1.91/1]',
						verticalOnLG
							? 'lg:rotate-90 rtl:lg:rotate-90 scale-75'
							: 'rtl:rotate-180',
						nextSlideButtonClassName,
					)}
				>
					<CustomNextImage
						src="/svgs/right-arrow 2.svg"
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
