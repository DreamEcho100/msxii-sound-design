import {
	ProductBundleCard,
	ProductCard
} from '~/components/shared/core/Cards/Card';
import { CardsSlider } from '~/components/shared/core/Cards/Slider';
import Clickable from '~/components/shared/core/Clickable';
import { cx } from 'class-variance-authority';
import { ShopifyProduct } from '~/utils/types';

const HomeShowcaseSection = ({ products }: { products: ShopifyProduct[] }) => {
	return (
		<section className="sm:p-main-p-3">
			<div className="flex flex-col gap-16 bg-bg-primary-100 py-main-p-2 px-main-p-4 dark:bg-bg-primary-900 sm:rounded-xl">
				<article className="px-4">
					<header className="flex flex-col gap-8 px-6">
						<h2 className="text-h1 leading-h2 font-semibold">New Releases</h2>
						<div className="flex flex-wrap gap-x-4 gap-y-3 text-base">
							{[
								{ title: 'NEW RELEASES', isActive: true },
								{ title: 'Bundles', isActive: false },
								{ title: 'Loops', isActive: false },
								{ title: 'One Shot Drums', isActive: false },
								{ title: 'Sample Packs', isActive: false },
								{ title: 'Drum Kits', isActive: false },
								{ title: 'Instrument Kits', isActive: false },
								{ title: 'Presets', isActive: false }
							].map((item) => (
								<Clickable
									key={item.title}
									variants={null}
									className={cx(
										'relative',
										item.isActive
											? 'text-text-primary-400/90 font-bold'
											: 'text-text-primary-400/70 duration-100 hover:text-text-primary-500 focus:text-text-primary-500 outline-none font-medium'
									)}
								>
									{item.title}
									<div className="absolute inset-0 flex items-end justify-start">
										<div
											className={cx(
												'h-1 translate-y-full bg-special-primary-500',
												item.isActive ? 'w-11/12' : 'w-0'
											)}
										/>
									</div>
								</Clickable>
							))}
						</div>
					</header>
					<CardsSlider
						products={products}
						CardElem={ProductCard}
						nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
						previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
					/>
				</article>
				<article className="flex flex-col gap-4 px-4">
					<header>
						<h2 className="text-h1 leading-h2 font-semibold">Bundles</h2>
					</header>
					<div className="flex flex-col gap-8">
						<CardsSlider
							products={products}
							CardElem={ProductCard}
							nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
							previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
						/>
						{/* <ProductsSlider
							swiperProps={{
								slidesPerView: 1,
								breakpoints: {
									384: { slidesPerView: 1 },
									768: { slidesPerView: 2 },
									1024: { slidesPerView: 4 },
									1280: { slidesPerView: 5 }
								}
							}}
							CardElem={ProductBundleCard}
						/> */}
						<div
							// style={{
							// 	display: 'grid',
							// 	gridTemplateColumns: 'repeat(auto-fill, minmax(20%, 1fr))',
							// 	gap: '1rem'
							// }}
							className={cx(
								'grid gap-8',
								'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
							)}
						>
							{products
								.filter(
									(product) =>
										product.title.toLowerCase().search('bundle') !== -1
								)
								.slice(0, 4)
								.map((item) => (
									<ProductBundleCard
										key={item.id}
										product={item}
										containerVariants={{ flex: 'grow', w: null }}
									/>
								))}
						</div>
					</div>
				</article>
			</div>
		</section>
	);
};

export default HomeShowcaseSection;
