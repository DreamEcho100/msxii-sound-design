import { cx } from 'class-variance-authority';

import { ReactNode, useEffect, useState } from 'react';

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
import { Switch } from '@headlessui/react';
import { SoundCloudIframe } from '../Iframes';
import TextTruncateManager from '../common/TextTruncater';

// Credit to: <https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7>
const ProductImageShowcase = ({
	productData,
	noCustomWith,
}: {
	productData: Product;
	noCustomWith?: boolean;
}) => {
	const [selectedImage, setSelectedImage] = useState(productData.featuredImage);
	const hasImagesVariations = productData.images.edges.length > 1;

	console.log(
		'productData.images.edges.length',
		productData.images.edges.length,
		productData.images.edges,
	);

	return (
		<div
			className={cx(
				'flex flex-col gap-2 lg:flex-row max-w-full',
				noCustomWith
					? undefined
					: hasImagesVariations
					? 'md:w-5/12 lg:w-6/12'
					: 'md:w-5/12',
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
						className:
							'max-w-full max-h-[24rem] lg:max-w-[6rem] w-full flex-grow',
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
						className: 'flex-grow min-w-[5rem]',
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
									'block transition-all duration-300 w-28 aspect-square max-w-full',
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
	const [newViewEnabled, setNewViewEnabled] = useState(false);
	const [newViewData, setNewViewData] = useState<{
		detailsHTML: string;
		iframes: {
			youtube: { src: string; allow: string; title: string }[];
			soundCloud: { src: string; allow: string; title: string }[];
		};
	}>({
		detailsHTML: '',
		iframes: { youtube: [], soundCloud: [] },
	});

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const container = document.createElement('div');
		container.innerHTML = productData.descriptionHtml;

		let hasIframes = false;
		const iframes: {
			youtube: { src: string; allow: string; title: string }[];
			soundCloud: { src: string; allow: string; title: string }[];
		} = {
			youtube: [],
			soundCloud: [],
		};

		container.querySelectorAll('iframe').forEach((iframe) => {
			const url = new URL(iframe.src);

			if (url.origin.startsWith('https://w.soundcloud.com')) {
				iframes.soundCloud.push({
					src: iframe.src,
					allow: iframe.allow,
					title: iframe.title,
				});
				iframe.parentElement?.removeChild(iframe);
				iframe.nextElementSibling?.parentElement?.removeChild(iframe);
				hasIframes = true;
			}

			if (url.origin.startsWith('https://www.youtube.com')) {
				iframes.youtube.push({
					src: iframe.src,
					allow: iframe.allow,
					title: iframe.title,
				});
				iframe.parentElement?.removeChild(iframe);
				hasIframes = true;
			}
		});

		container.querySelectorAll('div').forEach((div) => {
			if (div.innerText.trimStart().startsWith('MSXIISound · '))
				div.parentElement?.removeChild(div);
		});

		let i;
		for (i = container.children.length - 1; i > -1; i--) {
			const child = container.children[i];
			if (
				!child ||
				(child as unknown as { innerText: string }).innerText.trim()
			)
				break;

			child.parentElement?.removeChild(child);
		}

		if (!hasIframes) return;

		setNewViewData({
			detailsHTML: container.innerHTML,
			iframes,
		});
	}, [productData.descriptionHtml]);

	return (
		<div className="text-h6 leading-primary-3 p-16 text-text-primary-300 flex flex-col gap-16 max-w-[140ch] mx-auto">
			<section className="w-full flex flex-col-reverse md:flex-row-reverse justify-between items-center gap-12">
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
							disabled={!productData.availableForSale || selectedQuantity === 0}
							variants={{ btn: 'primary' }}
						/>
						{!productData.availableForSale && (
							<small className="text-red-500 text-[80%]">
								<em>
									<strong>Not available for sale</strong>
								</em>
							</small>
						)}
						<p className="max-w-[52ch]">
							<TextTruncateManager content={productData.description} />
						</p>
					</div>
				</div>
				<ProductImageShowcase productData={productData} />
			</section>
			{children || (
				<div>
					<div className="flex justify-end">
						<Switch
							checked={newViewEnabled}
							onChange={setNewViewEnabled}
							className={cx(
								newViewEnabled
									? 'bg-special-primary-500'
									: 'bg-special-primary-900',
								!newViewData.detailsHTML ? 'invisible' : undefined,
								'relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
							)}
						>
							<span className="sr-only">Use setting</span>
							<span
								aria-hidden="true"
								className={`${
									newViewEnabled ? 'translate-x-9' : 'translate-x-0'
								}
            pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
							/>
						</Switch>
					</div>
					<div className="flex flex-col gap-8">
						<div
							className="custom-prose p-4 no-custom-max-w"
							dangerouslySetInnerHTML={{
								__html: newViewEnabled
									? newViewData.detailsHTML
									: productData.descriptionHtml || productData.description,
							}}
						/>

						{newViewEnabled && newViewData.iframes.soundCloud.length !== 0 && (
							<section className="w-full mx-auto max-w-[140ch] bg-initial-primary-0 text-initial-primary-500 flex flex-col gap-10 rounded-3xl py-12 px-16">
								<h2 className="font-normal text-initial-primary-500 text-h3">
									Preview Samples
								</h2>
								<div className="flex flex-col gap-8">
									{newViewData.iframes.soundCloud.map((iframeData) => (
										<article key={productData.id} className="flex gap-8">
											<SoundCloudIframe {...iframeData} />
										</article>
									))}
								</div>
								<p>+ so many more high quality samples</p>
							</section>
						)}
					</div>
				</div>
			)}
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
