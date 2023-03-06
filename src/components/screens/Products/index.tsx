import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { ProductCard } from '~/components/shared/core/Cards/Card';
import ProductsSlider from '~/components/shared/core/Cards/Slider';
import Clickable from '~/components/shared/core/Clickable';
import { ShopifyProduct } from '~/utils/types';

const CategoriesMenu = ({
	categories,
	setSelectedCategories,
	selectedCategories
}: {
	categories: string[];
	setSelectedCategories: Dispatch<SetStateAction<string[]>>;
	selectedCategories: string[];
}) => {
	return (
		<>
			{categories.map((category) => (
				<label key={category} className="flex gap-1 sm:whitespace-nowrap">
					<input
						type="checkbox"
						checked={selectedCategories.includes(category)}
						value={category}
						onChange={(event) =>
							setSelectedCategories((prev) =>
								event.target.checked
									? [...prev, event.target.value]
									: prev.filter((category) => category !== event.target.value)
							)
						}
					/>
					{category}
				</label>
			))}
		</>
	);
};

const ProductsScreen = ({ products }: { products: ShopifyProduct[] }) => {
	const [isFiltersMenuOnSmallScreens, setIsFiltersMenuOnSmallScreens] =
		useState(false);
	const { productsByCategory, categories } = useMemo(() => {
		const productsCategoryMap: Record<string, typeof products> = {};

		products.forEach((product) => {
			product.tags.forEach((tag) => {
				if (
					productsCategoryMap[tag] &&
					Array.isArray(productsCategoryMap[tag])
				) {
					productsCategoryMap[tag]?.push(product);
				} else {
					productsCategoryMap[tag] = [product];
				}
			});
		});

		const productsByCategory = Object.entries(productsCategoryMap);
		const categories = productsByCategory.map(
			(productByCategory) => productByCategory[0]
		);
		return {
			productsByCategory,
			categories
		};
	}, [products]);

	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const filteredProductsByCategory = useMemo(() => {
		let filteredProductsByCategory: typeof productsByCategory = [];

		if (selectedCategories.length === 0) {
			filteredProductsByCategory = productsByCategory;
		} else {
			productsByCategory.forEach((productByCategory) => {
				if (selectedCategories.includes(productByCategory[0])) {
					filteredProductsByCategory.push(productByCategory);
				}
			});
		}

		return filteredProductsByCategory;
	}, [productsByCategory, selectedCategories]);

	return (
		<section>
			<div className="">
				<div className="flex relative sm:p-main-p-3">
					{isFiltersMenuOnSmallScreens && (
						<div className="absolute top-0 left-0 bg-bg-primary bg-bg-primary-500 p-8 h-full z-[2] sm:hidden">
							<CategoriesMenu
								categories={categories}
								setSelectedCategories={setSelectedCategories}
								selectedCategories={selectedCategories}
							/>
						</div>
					)}
					<div className="bg-bg-primary-500 p-main-p-3 max-w-[90%] h-full z-[2] hidden sm:block">
						<CategoriesMenu
							categories={categories}
							setSelectedCategories={setSelectedCategories}
							selectedCategories={selectedCategories}
						/>
					</div>
					<div className="max-w-full overflow-hidden bg-bg-primary-100 dark:bg-bg-primary-900 isolate flex-grow">
						<header className="flex justify-between pt-8 pb-4 px-8">
							<h1 className="text-h1">All Products</h1>
							<Clickable
								variants={null}
								onClick={() => setIsFiltersMenuOnSmallScreens((prev) => !prev)}
								className=" sm:hidden"
							>
								|||
							</Clickable>
						</header>
						{filteredProductsByCategory.map((productByCategory) => (
							<div className="px-8" key={productByCategory[0]}>
								<h2 className="text-h2">{productByCategory[0]}</h2>
								<div className="">
									<ProductsSlider
										products={productByCategory[1]}
										CardElem={ProductCard}
										nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[225%]"
										previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[225%]"
										swiperProps={{
											breakpoints: {
												384: { slidesPerView: 1 },
												768: { slidesPerView: 3 },
												1024: { slidesPerView: 5 },
												1280: { slidesPerView: 6 }
											}
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductsScreen;
