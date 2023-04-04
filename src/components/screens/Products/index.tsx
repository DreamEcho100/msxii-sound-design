import {
	Dispatch,
	InputHTMLAttributes,
	SetStateAction,
	useEffect,
	useMemo,
	useState
} from 'react';
import { ProductCard } from '~/components/shared/core/Cards/Card';
import { CardsSlider } from '~/components/shared/core/Cards/Slider';
import Clickable from '~/components/shared/core/Clickable';
import { ShopifyProduct } from '~/utils/types';
import { GiSettingsKnobs } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

import { useSearchParams } from 'next/navigation';

const CheckboxField = ({
	children,
	...props
}: InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<label className="flex items-center gap-1 sm:whitespace-nowrap cursor-pointer">
			<input
				type="checkbox"
				className="accent-special-primary-500 w-5 h-5 aspect-square"
				{...props}
			/>
			{children}
		</label>
	);
};

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
		<div className="flex flex-col gap-1">
			{categories.map((category) => (
				<CheckboxField
					key={category}
					checked={selectedCategories.includes(category)}
					value={category}
					onChange={(event) =>
						setSelectedCategories((prev) =>
							event.target.checked
								? [...prev, event.target.value]
								: prev.filter((category) => category !== event.target.value)
						)
					}
				>
					{category}
				</CheckboxField>
			))}
		</div>
	);
};

const ProductsScreen = ({ products }: { products: ShopifyProduct[] }) => {
	const [isFiltersMenuActive, setIsFiltersMenuActive] = useState(true);
	const searchParams = useSearchParams();
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

	useEffect(() => {
		if (typeof window !== 'undefined') window.searchParams = searchParams;
		console.log('searchParams', searchParams);
		console.log('productsByCategory', productsByCategory);
		const tags = searchParams.get('tags');
		if (tags) setSelectedCategories(tags.split(','));
	}, [searchParams]);

	const filteredProductsByCategory = useMemo(() => {
		if (selectedCategories.length === 0) return productsByCategory;

		const filteredProductsByCategory: typeof productsByCategory = [];

		productsByCategory.forEach((productByCategory) => {
			if (selectedCategories.includes(productByCategory[0])) {
				filteredProductsByCategory.push(productByCategory);
			}
		});

		return filteredProductsByCategory;
	}, [productsByCategory, selectedCategories]);

	return (
		<section>
			<div className="flex relative sm:p-main-p-3 py-main-p-1 sm:gap-main-p-3">
				{isFiltersMenuActive && (
					<AnimatePresence>
						<motion.div
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							exit={{ scaleX: 0 }}
							transition={{ duration: 0.3 }}
							className="origin-left rtl:origin-right max-w-[90%] absolute top-0 left-0 bg-bg-primary bg-bg-primary-500 p-8 h-full z-[2] sm:hidden sm:opacity-0 sm:pointer-events-none"
						>
							<div className="flex flex-col gap-1">
								<header className="flex gap-2 justify-between">
									<h3 className="text-h4 text-text-primary-300 sm:whitespace-nowrap">
										Shop all
									</h3>
									<Clickable
										variants={null}
										onClick={() => setIsFiltersMenuActive((prev) => !prev)}
										title={`${isFiltersMenuActive ? 'Hide' : 'Show'} filters`}
									>
										<GiSettingsKnobs className="text-xl font-bold scale-y-110 rotate-90" />
									</Clickable>
								</header>
								<CategoriesMenu
									categories={categories}
									setSelectedCategories={setSelectedCategories}
									selectedCategories={selectedCategories}
								/>
							</div>
						</motion.div>
					</AnimatePresence>
				)}
				<div className="hidden sm:flex">
					<AnimatePresence>
						{isFiltersMenuActive && (
							<motion.div
								initial={{ scaleX: 0, width: 0 }}
								animate={{ scaleX: 1, width: 'auto' }}
								exit={{ scaleX: 0, width: 0 }}
								transition={{ duration: 0.3 }}
								className="origin-left rtl:origin-right flex-col gap-1 bg-bg-primary-500 py-main-p-3 h-full z-[2] sm:flex"
							>
								<header className="flex gap-2 justify-between">
									<h3 className="text-h4 text-text-primary-300 sm:whitespace-nowrap">
										Shop all
									</h3>
									<Clickable
										variants={null}
										onClick={() => setIsFiltersMenuActive((prev) => !prev)}
										title={`${isFiltersMenuActive ? 'Hide' : 'Show'} filters`}
									>
										<GiSettingsKnobs className="text-xl font-bold scale-y-110 rotate-90" />
									</Clickable>
								</header>
								<CategoriesMenu
									categories={categories}
									setSelectedCategories={setSelectedCategories}
									selectedCategories={selectedCategories}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
				<div className="px-12 max-w-full overflow-hidden bg-bg-primary-100 dark:bg-bg-primary-900 isolate flex-grow transition-all sm:rounded-2xl">
					<header className="flex justify-between pt-8 pb-4 px-2">
						<h1 className="text-h1 font-semibold">
							{selectedCategories.length === categories.length ||
							selectedCategories.length === 0
								? 'All Packs'
								: 'Filtered Lists'}
						</h1>
						<Clickable
							variants={null}
							onClick={() => setIsFiltersMenuActive((prev) => !prev)}
							title={`${isFiltersMenuActive ? 'Hide' : 'Show'} filters`}
							className="flex items-center gap-1"
						>
							<span className="text-text-primary-300 font-medium">
								{isFiltersMenuActive ? 'Hide' : 'Show'} filters
							</span>
							<GiSettingsKnobs className="text-xl font-bold scale-y-110 rotate-90" />
						</Clickable>
					</header>
					{filteredProductsByCategory.map((productByCategory) => (
						<article key={productByCategory[0]}>
							<h2 className="text-h4 text-text-primary-300 px-4 font-normal">
								{productByCategory[0]}
							</h2>
							<div className="">
								<CardsSlider
									products={productByCategory[1]}
									CardElem={ProductCard}
									nextSlideButtonClassName="scale-[50%] -translate-y-[200%] lg:-translate-y-[225%]"
									previousSlideButtonClassName="scale-[50%] -translate-y-[200%] lg:-translate-y-[225%]"
									swiperProps={{
										breakpoints: {
											384: { slidesPerView: 1 },
											768: { slidesPerView: 3 },
											1024: { slidesPerView: 4 },
											1280: { slidesPerView: 5 }
										}
									}}
									cardsSharedProps={{
										isPlayButtonActive: true,
										extraDetailsElemProps: {
											buttonProps: {
												variants: {
													btn: 'light:primary_dark:secondary',
													py: 'sm',
													px: 'lg'
												} as any
											}
										}
									}}
								/>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default ProductsScreen;
