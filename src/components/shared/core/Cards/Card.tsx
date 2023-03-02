import { ReactNode } from 'react';
import { fakeProductsData } from '~/utils/appData';
import Clickable from '../Clickable';
import Image from 'next/image';
import { VariantProps, cva } from 'class-variance-authority';
import { Product } from '~/utils/types';

const handleBasicProductCardContainerVariants = cva(
	'card flex flex-col flex-grow px-1 group duration-300 delay-75 transition-all',
	{
		variants: {
			'aspect-ratio': { video: 'aspect-video', card: 'aspect-[1.91/1]' }
		}
	}
);
const handleBasicProductCardImageContainerVariants = cva(
	'aspect-square rounded-lg relative overflow-hidden',
	{
		variants: {
			'aspect-ratio': { video: 'aspect-video', square: 'aspect-square' },
			'object-fit': { contain: 'object-contain', cover: 'object-cover' }
		},
		defaultVariants: { 'aspect-ratio': 'square', 'object-fit': 'contain' }
	}
);
const handleBasicProductCardImageVariants = cva(
	'w-full h-full duration-150 transition-all',
	{
		variants: {
			animation: {
				'zoom-1': 'card-img-zoom-animation-1',
				'zoom-1-1': 'card-img-zoom-animation-1-1'
			},
			'animation-duration': { '300ms': 'duration-300 ease-in' }
		},
		defaultVariants: { animation: 'zoom-1-1', 'animation-duration': '300ms' }
	}
);
const handleBasicProductCardTitleVariants = cva(
	'font-medium leading-4 ellipse-text',
	{
		variants: {
			'text-align': { center: 'text-center' },
			'text-size': {
				sm: 'text-sm',
				md: 'text-[1rem] leading-primary-5',
				lg: 'text-lg'
			}
		},
		defaultVariants: { 'text-size': 'md' }
	}
);

export const BasicProductCard = (props: {
	product: (typeof fakeProductsData)[0];
	extraDetailsElem?: ReactNode;
	containerVariants?: VariantProps<
		typeof handleBasicProductCardContainerVariants
	>;
	imageContainerVariants?: VariantProps<
		typeof handleBasicProductCardImageContainerVariants
	>;
	imageVariants?: VariantProps<typeof handleBasicProductCardImageVariants>;
	titleVariants?: VariantProps<typeof handleBasicProductCardTitleVariants>;
}) => {
	return (
		<article
			className={handleBasicProductCardContainerVariants(
				props.containerVariants
			)}
		>
			<div
				className={handleBasicProductCardImageContainerVariants(
					props.imageContainerVariants
				)}
			>
				<Image
					src={props.product.image.src}
					alt={props.product.image.alt}
					width={800}
					height={800}
					className={handleBasicProductCardImageVariants(props.imageVariants)}
				/>
			</div>
			<div className="text-align-initial flex flex-grow flex-col justify-between gap-2 px-2 py-3 leading-primary-5">
				<h3
					className={handleBasicProductCardTitleVariants(props.titleVariants)}
					title={props.product.title}
				>
					{props.product.title}
				</h3>
				{props.extraDetailsElem}
			</div>
		</article>
	);
};

export const ProductExtraDetails = (props: {
	product: (typeof fakeProductsData)[0];
}) => {
	return (
		<>
			<p className="-translate-y-[20%] font-light text-text-primary-500/60">
				$ {props.product.price}
			</p>
			<Clickable
				variants={{
					btn: 'secondary',
					py: 'sm',
					px: 'lg'
				}}
				className="whitespace-nowrap text-sm uppercase"
			>
				Add To Cart
			</Clickable>
		</>
	);
};

export const ProductCard = ({
	product,
	...props
}: { product: Product } & Partial<Parameters<typeof BasicProductCard>[0]>) => {
	return (
		<BasicProductCard
			product={product}
			extraDetailsElem={<ProductExtraDetails product={product} />}
			containerVariants={{ 'aspect-ratio': 'card' }}
			{...props}
		/>
	);
};

export const ProductBundleCard = (
	props: Pick<Parameters<typeof BasicProductCard>[0], 'product'>
) => {
	return (
		<BasicProductCard
			product={props.product}
			containerVariants={{ 'aspect-ratio': 'video' }}
			imageContainerVariants={{ 'object-fit': 'cover' }}
			titleVariants={{ 'text-align': 'center', 'text-size': 'md' }}
		/>
	);
};
