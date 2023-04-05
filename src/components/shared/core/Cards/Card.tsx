import { ReactNode } from 'react';
import Clickable from '../Clickable';
import CustomNextImage from '~/components/shared/CustomNextImage';
import { VariantProps, cva } from 'class-variance-authority';
import { ShopifyProduct } from '~/utils/types';
import { BiPlay } from 'react-icons/bi';
import Link from 'next/link';
import ProductPrice from '../ProductPrice';
import { useGlobalStore } from '~/store';

const handleBasicProductCardContainerVariants = cva(
	'max-w-full card flex flex-col px-1 group duration-300 delay-75 transition-all',
	{
		variants: {
			'aspect-ratio': { video: 'aspect-video', card: 'aspect-[1.91/1]' },
			flex: { grow: 'flex-grow' },
			w: { '64': 'w-64', '72': 'w-72' }
		},
		defaultVariants: { w: '64' }
	}
);
const handleBasicProductCardImageContainerVariants = cva(
	'aspect-square rounded-lg relative overflow-hidden max-w-full',
	{
		variants: {
			'aspect-ratio': { video: 'aspect-video', square: 'aspect-square' },
			'object-fit': { contain: 'object-contain', cover: 'object-cover' }
		},
		defaultVariants: { 'aspect-ratio': 'square', 'object-fit': 'contain' }
	}
);
const handleBasicProductCardImageVariants = cva(
	'w-full h-full duration-150 transition-all object-contain',
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
				sm: 'text-[0.0.875rem]',
				md: 'text-[1rem] leading-primary-5',
				lg: 'text-[1.125rem]'
			}
		},
		defaultVariants: { 'text-size': 'md' }
	}
);

export const BasicProductCard = (props: {
	product: ShopifyProduct;
	extraDetailsElem?: ReactNode;
	containerVariants?: VariantProps<
		typeof handleBasicProductCardContainerVariants
	>;
	containerClassName?: string;
	imageContainerVariants?: VariantProps<
		typeof handleBasicProductCardImageContainerVariants
	>;
	imageVariants?: VariantProps<typeof handleBasicProductCardImageVariants>;
	titleVariants?: VariantProps<typeof handleBasicProductCardTitleVariants>;
	isPlayButtonActive?: boolean;
	routeBase?: string;
}) => {
	const routeBase = props.routeBase ?? '/products';

	return (
		<article
			className={handleBasicProductCardContainerVariants({
				...(props.containerVariants || {}),
				className: props.containerClassName
			})}
		>
			<div
				className={handleBasicProductCardImageContainerVariants(
					props.imageContainerVariants
				)}
			>
				<Link href={`${routeBase}/${props.product.handle}`}>
					<CustomNextImage
						src={props.product.featured_image}
						alt={props.product.title}
						width={800}
						height={800}
						className={handleBasicProductCardImageVariants(props.imageVariants)}
					/>
				</Link>
				{props.isPlayButtonActive && (
					<Clickable
						className="absolute bottom-0 right-0 my-3 mx-4 flex items-center justify-center"
						variants={{ px: 'sm', py: 'sm', rounded: 'full' }}
					>
						<BiPlay className="text-3xl translate-x-[7.5%] scale-110 rtl:-translate-x-[5%] rtl:rotate-180" />
					</Clickable>
				)}
			</div>
			<div className="text-align-initial flex flex-grow flex-col justify-between gap-2 px-2 py-3 leading-primary-5">
				<h3
					className={handleBasicProductCardTitleVariants(props.titleVariants)}
					title={props.product.title}
				>
					<Link href={`${routeBase}/${props.product.handle}`}>
						{props.product.title}
					</Link>
				</h3>
				{props.extraDetailsElem}
			</div>
		</article>
	);
};

export const ProductExtraDetails = ({
	product,
	buttonProps = {}
}: {
	product: ShopifyProduct;
	buttonProps?: Partial<Parameters<typeof Clickable>[0]>;
}) => {
	const addToCart = useGlobalStore((store) => store.cart.addToCart);

	return (
		<>
			<p className="-translate-y-[20%] text-[90%] whitespace-nowrap font-normal text-text-primary-500/60">
				<ProductPrice
					price={product.price}
					compare_at_price={product.compare_at_price}
				/>
			</p>
			<Clickable
				variants={{
					btn: 'secondary',
					py: 'sm',
					px: 'lg'
				}}
				className="lg:whitespace-nowrap text-sm uppercase"
				onClick={() => addToCart(product, 1)}
				{...(buttonProps as any)}
			>
				Add To Cart
			</Clickable>
		</>
	);
};

export const ProductCard = ({
	product,
	extraDetailsElemProps,
	...props
}: {
	product: ShopifyProduct;
	extraDetailsElemProps?: Partial<Parameters<typeof ProductExtraDetails>[0]>;
} & Partial<Parameters<typeof BasicProductCard>[0]>) => {
	return (
		<BasicProductCard
			product={product}
			extraDetailsElem={
				<ProductExtraDetails {...extraDetailsElemProps} product={product} />
			}
			containerVariants={{ 'aspect-ratio': 'card' }}
			{...props}
		/>
	);
};

export const ProductBundleCard = ({
	product,
	...props
}: Pick<Parameters<typeof BasicProductCard>[0], 'product'> &
	Omit<Partial<Parameters<typeof BasicProductCard>[0]>, 'product'>) => {
	return (
		<BasicProductCard
			product={product}
			containerVariants={{ 'aspect-ratio': 'video' }}
			imageContainerVariants={{ 'object-fit': 'cover' }}
			titleVariants={{ 'text-align': 'center', 'text-size': 'md' }}
			{...props}
		/>
	);
};
