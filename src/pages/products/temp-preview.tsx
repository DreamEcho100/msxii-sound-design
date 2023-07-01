import CustomProductScreen from '~/components/shared/core/CustomProductScreen';
import { BiPlay } from 'react-icons/bi';
import Clickable from '~/components/shared/core/Clickable';
import CustomNextImage from '~/components/shared/CustomNextImage';
import { YouTubeIFrame } from '~/components/shared/Iframes';
import { Product } from '~/utils/shopify/types';

const productData = {
	id: 'gid://shopify/Product/6879014912066',
	title: 'Loops Go Crazy Vol. 5',
	availableForSale: true,
	description:
		"The worldwide conglomerate @MSXIISOUND continues to keep music producers worldwide inspired with the Loops Go Crazy Vol. 5 sample pack! Back with the vibes, fans of our Billboard #1, multiple Grammy Nominated Lofi Melodics series will find this goldmine game changing! 35 original loops ready to rock in various tempos, keys, and with numerous textures and colors. Processed tastefully to add warmth, depth, and a creative touch, Loops Go Crazy Vol. 5 boasts more creativity, better textures and the MSXII authentication you're looking for! When you need the best, tap in with MSXII. Purchase now & be a champ. Demo showcases a selection of these samples in the pack!",
	descriptionHtml:
		'<meta charset="UTF-8">\n<p data-mce-fragment="1">The worldwide conglomerate @MSXIISOUND continues to keep music producers worldwide inspired with the Loops Go Crazy Vol. 5 sample pack! Back with the vibes, fans of our Billboard #1, multiple Grammy Nominated <a data-mce-fragment="1" href="https://www.msxaudio.com/search?type=product&amp;q=lofi+melodics" target="_blank" data-mce-href="https://www.msxaudio.com/search?type=product&amp;q=lofi+melodics">Lofi Melodics</a> series will find this goldmine game changing!</p>\n<p data-mce-fragment="1">35 original loops ready to rock in various tempos, keys, and with numerous textures and colors. Processed tastefully to add warmth, depth, and a creative touch, Loops Go Crazy Vol. 5 boasts more creativity, better textures and the MSXII authentication you\'re looking for!</p>\n<p data-mce-fragment="1">When you need the best, tap in with MSXII. Purchase now &amp; be a champ.</p>\n<p data-mce-fragment="1"><em data-mce-fragment="1">Demo showcases a selection of these samples in the pack!</em></p>\n<iframe width="560" height="515" src="https://www.youtube.com/embed/TDI_97_Gu6c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
	vendor: 'MSXII Sound',
	publishedAt: '2023-06-03T18:47:28Z',
	onlineStoreUrl: 'https://www.msxaudio.com/products/loops-go-crazy-vol-5',
	productType: '',
	handle: 'loops-go-crazy-vol-5',
	createdAt: '2023-01-21T00:42:50Z',
	updatedAt: '2023-06-03T18:47:28Z',
	priceRange: {
		maxVariantPrice: {
			amount: '26.99',
			currencyCode: 'USD'
		},
		minVariantPrice: {
			amount: '26.99',
			currencyCode: 'USD'
		}
	},
	compareAtPriceRange: {
		maxVariantPrice: {
			amount: '0.0',
			currencyCode: 'USD'
		},
		minVariantPrice: {
			amount: '0.0',
			currencyCode: 'USD'
		}
	},
	featuredImage: {
		id: 'gid://shopify/ProductImage/30018715320386',
		src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazyVol.5Artwork.jpg?v=1674261773',
		url: 'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazyVol.5Artwork.jpg?v=1674261773',
		altText: null,
		width: 2000,
		height: 2000
	},
	images: {
		edges: [
			{
				node: {
					id: 'gid://shopify/ProductImage/30018715320386',
					src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazyVol.5Artwork.jpg?v=1674261773',
					url: 'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazyVol.5Artwork.jpg?v=1674261773',
					altText: null,
					width: 2000,
					height: 2000
				}
			}
		]
	},
	variants: {
		edges: [
			{
				node: {
					id: 'gid://shopify/ProductVariant/40172137873474',
					title: 'Default Title',
					image: {
						id: 'gid://shopify/ProductImage/30018715320386',
						src: 'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazyVol.5Artwork.jpg?v=1674261773',
						url: 'https://cdn.shopify.com/s/files/1/0345/7209/products/LoopsGoCrazyVol.5Artwork.jpg?v=1674261773',
						altText: null,
						width: 2000,
						height: 2000
					},
					price: {
						amount: '26.99',
						currencyCode: 'USD'
					},
					compareAtPrice: null
				}
			}
		]
	}
} as unknown as Product;

const media = productData.images.edges[0]!.node;

const medias = '_'
	.repeat(4)
	.split('_')
	.map(() => media);

const TempPreviewProductPage = () => {
	return (
		<CustomProductScreen
			productData={productData}
			products={'_'
				.repeat(32)
				.split('_')
				.map(() => productData)}
		>
			<section className="w-full mx-auto max-w-[140ch] flex flex-col py-16 gap-16">
				<div className="px-8 mx-auto max-w-[131ch] flex flex-col gap-4">
					<h2 className="font-normal text-text-primary-400 text-h3">Details</h2>
					<p>
						35 original loops ready to rock in various tempos, keys, and with
						numerous textures and colors. Processed tastefully to add warmth,
						depth, and a creative touch, Loops Go Crazy Vol. 5 boasts more
						creativity, better textures and the MSXII authentication you&apos;re
						looking for!
					</p>
					<p>
						When you need the best, tap in with MSXII. Purchase now & be a
						champ. Demo showcases a selection of these samples in the pack!
					</p>
				</div>
				<YouTubeIFrame
					containerProps={{
						className: 'w-full rounded-3xl overflow-hidden relative isolate'
					}}
					overlayImageProps={{
						src: productData.featuredImage,
						alt: productData.title
					}}
					width="550"
					height="550"
					src="https://www.youtube.com/embed/TDI_97_Gu6c"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				/>
			</section>
			<section className="w-full mx-auto max-w-[140ch] bg-initial-primary-0 text-initial-primary-500 flex flex-col gap-10 rounded-3xl py-12 px-16">
				<h2 className="font-normal text-initial-primary-500 text-h3">
					Preview Samples
				</h2>
				<div className="flex flex-col gap-8">
					{medias.map((media) => (
						<article key={productData.id} className="flex gap-8">
							<div className="w-24 h-24 aspect-square overflow-hidden rounded-sm relative">
								<CustomNextImage
									src={media.src}
									alt={media.altText || ''}
									width={800}
									height={800}
									className="w-full h-full object-cover"
								/>
								<Clickable
									className="hover:-translate-y-[60%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
									variants={{
										px: 'sm',
										py: 'sm',
										rounded: 'full',
										transform: null
									}}
								>
									<BiPlay className="text-2xl translate-x-[7.5%] scale-110 rtl:-translate-x-[5%] rtl:rotate-180" />
								</Clickable>
							</div>
							<div className="flex flex-col gap-2 flex-grow py-2">
								<div className="rounded-sm py-2 bg-special-primary-500" />
								<h3 className="font-normal text-initial-primary-400 text-[100%]">
									Lorem ipsum
								</h3>
							</div>
						</article>
					))}
				</div>
				<p>+ so many more high quality samples</p>
			</section>
		</CustomProductScreen>
	);
};

export default TempPreviewProductPage;
