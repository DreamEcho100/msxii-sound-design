import {
	Dispatch,
	InputHTMLAttributes,
	SetStateAction,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { CardsSlider } from '~/components/shared/core/Shopify/Cards/Slider';
import Clickable from '~/components/shared/core/Clickable';
import { GiSettingsKnobs } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

import { useSearchParams } from 'next/navigation';
import { useBasicCollectionsHandleFilterManager } from '~/utils/hooks';
import { RouterOutputs } from '~/utils/api';
import { ProductCard } from '~/components/shared/core/Shopify/Cards/Card';

const CheckboxField = ({
	children,
	...props
}: InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<label className="capitalize flex items-center gap-1 sm:whitespace-nowrap cursor-pointer">
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
	selectedCategories,
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
								: prev.filter((category) => category !== event.target.value),
						)
					}
				>
					{category.replaceAll('-', ' ')}
				</CheckboxField>
			))}
		</div>
	);
};

const ProductsScreen = ({
	collectionsBasic,
}: {
	collectionsBasic: RouterOutputs['shopify']['collections']['getAllBasic'];
}) => {
	const filterMenuOnSMScreensCloseButtonRef = useRef<HTMLButtonElement>(null);
	const [isFiltersMenuActive, setIsFiltersMenuActive] = useState(true);
	const searchParams = useSearchParams();

	const {
		categories,
		collectionsByHandle,
		selectedHandles,
		setSelectedHandles,
		setProductTitleQuery,
	} = useBasicCollectionsHandleFilterManager({
		collectionsEdges: collectionsBasic,
		handleToCollectionToIgnoreMap: {
			'all-products': true,
			merch: true,
		},
	});

	useEffect(() => {
		const handles = searchParams.get('handles');
		const productTitleQuery = searchParams.get('productTitleQuery');

		if (handles) setSelectedHandles(handles.split(','));
		if (productTitleQuery) setProductTitleQuery(productTitleQuery);
	}, [searchParams, setProductTitleQuery, setSelectedHandles]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (!filterMenuOnSMScreensCloseButtonRef.current) return;
			filterMenuOnSMScreensCloseButtonRef.current.click();
		}, 0);

		return () => clearTimeout(timeoutId);
	}, []);

	const filteredCollectionsByHandle = useMemo(() => {
		if (selectedHandles.length === 0) return collectionsByHandle;

		const filteredCollectionsByHandle: typeof collectionsByHandle = [];

		collectionsByHandle.forEach((collection) => {
			if (selectedHandles.includes(collection[0])) {
				filteredCollectionsByHandle.push(collection);
			}
		});

		return filteredCollectionsByHandle;
	}, [collectionsByHandle, selectedHandles]);

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
									<button
										onClick={() => setIsFiltersMenuActive((prev) => !prev)}
										ref={filterMenuOnSMScreensCloseButtonRef}
										title={`${isFiltersMenuActive ? 'Hide' : 'Show'} filters`}
									>
										<GiSettingsKnobs className="text-xl font-bold scale-y-110 rotate-90" />
									</button>
								</header>
								<CategoriesMenu
									categories={categories}
									setSelectedCategories={setSelectedHandles}
									selectedCategories={selectedHandles}
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
									setSelectedCategories={setSelectedHandles}
									selectedCategories={selectedHandles}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
				<div className="px-8 lg:px-12 py-12 flex flex-col gap-12 max-w-full overflow-hidden bg-bg-primary-100 dark:bg-bg-primary-900 isolate flex-grow transition-all sm:rounded-2xl">
					<header className="flex justify-between">
						<h1 className="text-h1 font-semibold">
							{selectedHandles.length === categories.length ||
							selectedHandles.length === 0
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
					<div className="flex flex-col gap-8">
						{filteredCollectionsByHandle.map((collection) => (
							<article key={collection[0]} className="flex flex-col gap-4">
								<h2 className="capitalize text-h4 text-text-primary-300 font-normal">
									{collection[0].replaceAll('-', ' ')}
								</h2>
								<div className="">
									<CardsSlider
										isNavButtonsOutside
										collections={collection[1]}
										CardElem={ProductCard}
										nextSlideButtonClassName="scale-[50%] -translate-y-[200%] lg:-translate-y-[225%]"
										previousSlideButtonClassName="scale-[50%] -translate-y-[200%] lg:-translate-y-[225%]"
										swiperProps={{
											breakpoints: {
												384: { slidesPerView: 1 },
												768: { slidesPerView: 3 },
												1024: { slidesPerView: 4 },
												1280: { slidesPerView: 5 },
											},
										}}
										cardsSharedProps={{
											isPlayButtonActive: true,
											extraDetailsElemProps: {
												buttonProps: {
													variants: {
														btn: 'light:primary_dark:secondary',
														py: 'sm',
														px: 'lg',
														// eslint-disable-next-line @typescript-eslint/no-explicit-any
													} as any,
												},
											},
										}}
									/>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductsScreen;
