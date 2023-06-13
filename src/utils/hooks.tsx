import { useMemo, useState } from 'react';
import { ShopifyProduct } from './types';
import { HomeScreenProps } from '~/components/screens/Home';
import { BasicCollection, Collection, Edges } from './shopify/types';

export const useGetFlattenedDataEdge = <Data,>(item: Edges<Data>) =>
	item.edges.map(({ node }) => node);

export const useBasicCollectionsHandleFilterManager = ({
	collectionsEdges
}: {
	collectionsEdges: HomeScreenProps['collectionsBasic']['collections'];
}) => {
	const flattenedCollectionsEdges =
		useGetFlattenedDataEdge<BasicCollection>(collectionsEdges);
	const { collectionsByHandle, categories } = useMemo(() => {
		const collectionsHandleMap: Record<
			string,
			Collection[] | BasicCollection[]
		> = {};

		flattenedCollectionsEdges.forEach((collection) => {
			if (
				collectionsHandleMap[collection.handle] &&
				Array.isArray(collectionsHandleMap[collection.handle])
			) {
				collectionsHandleMap[collection.handle]?.push(collection);
			} else {
				collectionsHandleMap[collection.handle] = [collection];
			}
		});

		const collectionsByHandle = Object.entries(collectionsHandleMap);
		const categories = collectionsByHandle
			.map((collectionByHandle) => collectionByHandle[0])
			.sort((a, b) => (a < b ? -1 : 1));
		return {
			collectionsByHandle,
			categories
		};
	}, [flattenedCollectionsEdges]);

	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	return {
		collectionsByHandle,
		categories,
		selectedCategories,
		setSelectedCategories,
		flattenedCollectionsEdges
	};
};

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
