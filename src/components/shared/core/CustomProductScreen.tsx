import { cx } from 'class-variance-authority';

import { HTMLAttributes, ReactNode, useState } from 'react';

import { SwiperSlide } from 'swiper/react';

import CustomNextImage from '../CustomNextImage';

import Clickable from './Clickable';
import ProductPrice from './ProductPrice';
import ProductQuantityControllers from './ProductQuantityControllers';

import CTAButton from './Cards/CTAButton';
import { ProductCard } from './Cards/Card';
import Slider, { CardsSlider } from './Cards/Slider';
import { ShopifyProduct } from '~/utils/types';

function ImageMagnifier({
	src,
	width,
	height,
	className,
	priority,
	containerProps = {},
	magnifierHeight = 100,
	magnifieWidth = 100,
	zoomLevel = 1.5
}: {
	containerProps?: HTMLAttributes<HTMLDivElement>;
	src: string;
	className?: string;
	width: number;
	height: number;
	priority?: boolean;
	magnifierHeight?: number;
	magnifieWidth?: number;
	zoomLevel?: number;
}) {
	const [[x, y], setXY] = useState([0, 0]);
	const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
	const [showMagnifier, setShowMagnifier] = useState(false);
	return (
		<div
			style={{
				position: 'relative'
			}}
			{...containerProps}
		>
			<CustomNextImage
				src={src}
				className={className}
				// style={{ height: height, width: width }}
				width={width}
				height={height}
				priority={priority}
				onMouseEnter={(e) => {
					// update image size and turn-on magnifier
					const elem = e.currentTarget;
					const { width, height } = elem.getBoundingClientRect();
					setSize([width, height]);
					setShowMagnifier(true);
				}}
				onMouseMove={(e) => {
					// update cursor position
					const elem = e.currentTarget;
					const { top, left } = elem.getBoundingClientRect();

					// calculate cursor position on the image
					const x = e.pageX - left - window.pageXOffset;
					const y = e.pageY - top - window.pageYOffset;
					setXY([x, y]);
				}}
				onMouseLeave={() => {
					// close magnifier
					setShowMagnifier(false);
				}}
				alt={'img'}
			/>

			<div
				style={{
					display: showMagnifier ? '' : 'none',
					position: 'absolute',

					// prevent magnifier blocks the mousemove event of img
					pointerEvents: 'none',
					// set size of magnifier
					height: `${magnifierHeight}px`,
					width: `${magnifieWidth}px`,
					// move element center to cursor pos
					top: `${y - magnifierHeight / 2}px`,
					left: `${x - magnifieWidth / 2}px`,
					opacity: '1', // reduce opacity so you can verify position
					border: '1px solid lightgray',
					backgroundColor: 'white',
					backgroundImage: `url('${src}')`,
					backgroundRepeat: 'no-repeat',

					//calculate zoomed image size
					backgroundSize: `${imgWidth * zoomLevel}px ${
						imgHeight * zoomLevel
					}px`,

					//calculate position of zoomed image.
					backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
					backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
				}}
			></div>
		</div>
	);
}

// Credit to: <https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7>
const ProductImageShowcase = ({
	productData
}: {
	productData: ShopifyProduct;
}) => {
	const hasImagesVariations = productData.images.length > 1;

	const [selectedImage, setSelectedImage] = useState(
		productData.featured_image
	);

	return (
		<div
			className={cx(
				'flex flex-col gap-2 lg:flex-row max-w-full',
				hasImagesVariations ? 'md:w-5/12 lg:w-6/12' : 'md:w-5/12'
			)}
		>
			<ImageMagnifier
				src={selectedImage}
				width={800}
				height={800}
				className="w-full h-full object-cover rounded-xl"
				containerProps={{ className: 'aspect-square w-full' }}
				priority
			/>
			{hasImagesVariations && (
				<Slider
					verticalOnLG
					swiperProps={{
						className: 'max-w-full max-h-[24rem]',
						breakpoints: {
							1024: {
								direction: 'vertical'
							}
						},
						slidesPerView: 4,
						spaceBetween: 4,
						autoplay: false
					}}
					isNavButtonsOutside
					containerProps={{
						className: 'h-fit'
					}}
				>
					{productData.images.map((image) => (
						<SwiperSlide
							key={image}
							className="aspect-square items-center justify-center"
							style={{ display: 'flex' }}
						>
							<button
								className={cx(
									'block w-full transition-all duration-300',
									selectedImage === image ? 'p-2' : ''
								)}
								onClick={() => setSelectedImage(image)}
							>
								<CustomNextImage
									src={image}
									width={112}
									height={112}
									className={cx(
										'aspect-square w-full h-full object-cover transition-all duration-300',
										selectedImage === image
											? 'ring-4 ring-special-primary-500 rounded-lg'
											: ''
									)}
								/>
							</button>
						</SwiperSlide>
					))}
				</Slider>
			)}
		</div>
	);
};

const CustomProductScreen = ({
	productData,
	children,
	products
}: {
	children?: ReactNode;
	productData: ShopifyProduct;
	products: ShopifyProduct[];
}) => {
	const [selectedQuantity, setSelectedQuantity] = useState(1);

	return (
		<div className="text-h6 leading-primary-3 p-16 text-text-primary-300 flex flex-col gap-12">
			<section className="w-full flex flex-col-reverse md:flex-row-reverse items-center gap-12 mx-auto max-w-[140ch]">
				<div className="flex-grow my-4 flex flex-col gap-2 text-center md:text-align-initial">
					<div className="flex flex-col gap-6 items-center md:items-start">
						<div className="flex flex-col gap-4 items-center md:items-start">
							<h1 className="text-text-primary-500 text-h3">
								{productData.title}
							</h1>
							<div className="w-fit flex flex-wrap gap-8 mx-auto sm:mx-0">
								<p className="whitespace-nowrap text-text-primary-500/60">
									<ProductPrice
										price={productData.price}
										compare_at_price={productData.compare_at_price}
									/>
								</p>
								<ProductQuantityControllers
									handleIncreaseByOne={() =>
										setSelectedQuantity((prev) => prev + 1)
									}
									handleDecreaseByOne={() =>
										setSelectedQuantity((prev) => prev - 1)
									}
									handleSetSelectedQuantity={setSelectedQuantity}
									quantity={selectedQuantity}
								/>
							</div>
						</div>
						<Clickable
							className="uppercase mt-4 text-[85%]"
							variants={{ py: 'extra-sm', px: 'xl', 'font-weight': 'medium' }}
							disabled={selectedQuantity === 0}
						>
							Add To Cart
						</Clickable>
						<p className="max-w-[52ch]">
							The worldwide conglomerate @MSXIISOUND continues to keep music
							producers worldwide inspired with the Loops Go Crazy Vol. 5 sample
							pack! Back with the vibes, fans of our Billboard #1, multiple
							Grammy Nominated Lofi Melodics series will find this goldmine game
							changing!
						</p>
					</div>
				</div>
				<ProductImageShowcase productData={productData} />
			</section>
			{children}
			<article>
				<CTAButton
					text="Explore more high quality packs"
					isA="next-js"
					href="/products"
					className="mb-8"
				/>
				<header>
					<h2 className="font-normal text-text-primary-400 text-h3">
						Related products
					</h2>
				</header>
				<CardsSlider
					products={products}
					CardElem={ProductCard}
					nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[225%]"
					previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[225%]"
				/>
			</article>
		</div>
	);
};

export default CustomProductScreen;
