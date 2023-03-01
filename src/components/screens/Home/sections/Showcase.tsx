import React from 'react';
import {
	ProductBundleCard,
	ProductCard
} from '~/components/shared/core/Cards/Card';
import ProductsSlider from '~/components/shared/core/Cards/Slider';
import Clickable from '~/components/shared/core/Clickable';
import { cx } from 'class-variance-authority';

const HomeShowcaseSection = () => {
	return (
		<section className="sm:p-main-p-3">
			<div className="flex flex-col gap-16 bg-bg-primary-600/25 p-main-p-3 sm:rounded-xl">
				<section>
					<header className="flex flex-col gap-8 pl-8 rtl:pr-8 rtl:pl-0">
						<h2 className="text-h1 leading-h2 font-bold">New Releases</h2>
						<div className="flex flex-wrap gap-x-4 gap-y-3">
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
											? 'text-text-primary-600'
											: 'text-text-primary-600/50 duration-100 hover:text-text-primary-500 focus:text-text-primary-500 outline-none'
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
					<ProductsSlider CardElem={ProductCard} />
				</section>
				<section className="flex flex-col gap-4">
					<header className="pl-8 rtl:pr-8 rtl:pl-0">
						<h2 className="text-h1 leading-h2 font-bold">Bundles</h2>
					</header>
					<div className="flex flex-col gap-8">
						<ProductsSlider CardElem={ProductCard} />
						<ProductsSlider
							swiperProps={{
								slidesPerView: 1,
								breakpoints: {
									768: { slidesPerView: 2 },
									1150: { slidesPerView: 4 }
								}
							}}
							CardElem={ProductBundleCard}
						/>
					</div>
				</section>
			</div>
		</section>
	);
};

export default HomeShowcaseSection;
