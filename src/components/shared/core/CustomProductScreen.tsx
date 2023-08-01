import { cx } from 'class-variance-authority';

import { ReactNode, useState } from 'react';

import { SwiperSlide } from 'swiper/react';

import CustomNextImage from '../CustomNextImage';

import ProductQuantityControllers from './ProductQuantityControllers';

import { NextJsLinkProps } from '../Clickable';
import ImageMagnifier from '../ImageMagnifier';
import { Product } from '~/utils/shopify/types';
import CTAButton from './Shopify/Cards/CTAButton';
import Slider, { CardsSlider } from './Shopify/Cards/Slider';
import ProductPrice from './Shopify/ProductPrice';
import AddToCartButton from './Shopify/Buttons/AddToCart';

// Credit to: <https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7>
const ProductImageShowcase = ({ productData }: { productData: Product }) => {
	const hasImagesVariations = productData.images.edges.length > 1;

	const [selectedImage, setSelectedImage] = useState(productData.featuredImage);

	return (
		<div
			className={cx(
				'flex flex-col gap-2 lg:flex-row max-w-full',
				hasImagesVariations ? 'md:w-5/12 lg:w-6/12' : 'md:w-5/12',
			)}
		>
			<ImageMagnifier
				src={selectedImage.src}
				// alt={selectedImage.altText ?? ''}
				width={selectedImage.width || 800}
				height={selectedImage.height || 800}
				className="w-full h-full object-cover rounded-xl"
				containerProps={{ className: 'aspect-square w-full' }}
				priority
			/>
			{hasImagesVariations && (
				<Slider
					verticalOnLG
					swiperProps={{
						className: 'max-w-full max-h-[24rem] lg:max-w-[6rem]',
						breakpoints: {
							1024: {
								direction: 'vertical',
							},
						},
						slidesPerView: 4,
						spaceBetween: 8,
						autoplay: false,
					}}
					isNavButtonsOutside
					containerProps={{
						className: 'h-fit',
					}}
				>
					{productData.images.edges.map(({ node }) => (
						<SwiperSlide
							key={node.id}
							className="aspect-square items-center justify-center"
							style={{ display: 'flex' }}
						>
							<button
								className={cx(
									'block w-full transition-all duration-300',
									selectedImage === node ? 'p-2' : '',
								)}
								type="button"
								onClick={() => setSelectedImage(node)}
							>
								<CustomNextImage
									src={node}
									width={112}
									height={112}
									className={cx(
										'aspect-square w-full h-full object-cover transition-all duration-300',
										selectedImage === node
											? 'ring-4 ring-special-primary-500 rounded-lg'
											: 'rounded-md',
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
	ctaButtonProps = {},
}: {
	children?: ReactNode;
	productData: Product;
	products: Product[];
	cardsSliderProps?: Partial<Parameters<typeof CardsSlider>[0]>;
	ctaButtonProps?: Partial<NextJsLinkProps>;
}) => {
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const mainVariant = productData.variants.edges[0]?.node;

	if (!children) {
		return (
			<section className="px-main-p-4 sm:px-main-p-2 py-main-p-1 flex flex-wrap justify-center md:flex-nowrap gap-8">
				<header className="flex flex-col-reverse items-center sm:items-start sm:flex-row-reverse md:flex-col-reverse gap-4 justify-center p-4">
					<div className="text-center sm:text-align-initial flex-grow flex flex-col items-center sm:items-start gap-4 p-4">
						<div className="flex flex-col gap-3">
							<h1 className="text-h3">{productData.title}</h1>
							<div className="w-fit flex flex-wrap gap-8 mx-auto sm:mx-0">
								{mainVariant && (
									<p className="whitespace-nowrap text-text-primary-500/60">
										<ProductPrice
											price={{
												amount: Number(mainVariant.price.amount),
												currencyCode: mainVariant.price.currencyCode,
											}}
											compareAtPrice={
												mainVariant.compareAtPrice && {
													amount: Number(mainVariant.compareAtPrice.amount),
													currencyCode: mainVariant.compareAtPrice.currencyCode,
												}
											}
										/>
									</p>
								)}
								<ProductQuantityControllers
									handleIncreaseByOne={() =>
										setSelectedQuantity((prev) => prev + 1)
									}
									handleDecreaseByOne={() =>
										setSelectedQuantity((prev) => prev - 1)
									}
									handleSetSelectedQuantity={setSelectedQuantity}
									quantity={selectedQuantity}
									// range={{
									// 	min: productData.?.minVariant,
									// 	max: productData.?.maxVariant,
									// }}
								/>
							</div>
						</div>
						<AddToCartButton
							productVariant={mainVariant}
							selectedQuantity={selectedQuantity}
							className="uppercase"
							disabled={!productData.availableForSale || selectedQuantity === 0}
							variants={{ btn: 'primary' }}
							title={
								!productData.availableForSale
									? 'Not available for sale'
									: undefined
							}
						/>
						{!productData.availableForSale && (
							<small className="text-red-500 text-[80%]">
								<em>
									<strong>Not available for sale</strong>
								</em>
							</small>
						)}
					</div>
					<div className="aspect-square max-w-full w-60 lg:w-96 rounded-lg overflow-hidden">
						<CustomNextImage
							src={productData.featuredImage.url}
							alt={productData.featuredImage.altText}
							width={800}
							height={800}
							className="w-full h-full object-cover"
						/>
					</div>
				</header>
				<div
					className="custom-prose p-4"
					dangerouslySetInnerHTML={{
						__html: productData.descriptionHtml || productData.description,
					}}
				/>
			</section>
		);
	}

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
								{mainVariant && (
									<p className="whitespace-nowrap text-text-primary-500/60">
										<ProductPrice
											price={{
												amount: Number(mainVariant.price.amount),
												currencyCode: mainVariant.price.currencyCode,
											}}
											compareAtPrice={
												mainVariant.compareAtPrice && {
													amount: Number(mainVariant.compareAtPrice.amount),
													currencyCode: mainVariant.compareAtPrice.currencyCode,
												}
											}
										/>
									</p>
								)}
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
						{/* className="uppercase mt-4 text-[85%]" */}
						<AddToCartButton
							productVariant={mainVariant}
							selectedQuantity={selectedQuantity}
							className="uppercase"
							disabled={productData.availableForSale || selectedQuantity === 0}
							variants={{ btn: 'primary' }}
						/>
						<p className="max-w-[52ch]">{productData.description}</p>
					</div>
				</div>
				<ProductImageShowcase productData={productData} />
			</section>
			{children}
			<article>
				<CTAButton
					text="Explore more high quality packs"
					isA="next-js"
					href="/collections"
					{...ctaButtonProps}
					className="mt-4 mb-16"
				/>
				<header>
					<h2 className="font-normal text-text-primary-400 text-h3">
						Related products
					</h2>
				</header>
				{/* <CardsSlider
					products={products}
					CardElem={ProductCard}
					nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[225%]"
					previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[225%]"
					{...cardsSliderProps}
				/> */}
			</article>
		</div>
	);
};

export default CustomProductScreen;
