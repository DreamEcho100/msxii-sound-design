import { useMemo, useState } from 'react';
import { ShopifyProduct } from './types';

export const useProductsTagsFilterManager = ({
	products
}: {
	products: ShopifyProduct[];
}) => {
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

	return {
		productsByCategory,
		categories,
		selectedCategories,
		setSelectedCategories
	};
};
