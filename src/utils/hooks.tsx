import { useMemo, useState } from 'react';
import { ShopifyProduct } from './types';
import { HomeScreenProps } from '~/components/screens/Home';
import { BasicCollection, Collection, Edges } from './shopify/types';

export const useGetEdgeNodes = <Data,>(item: Edges<Data>) =>
	item.edges.map(({ node }) => node);

const filterBasicCollectionProductsByTitle = (
	collection: BasicCollection,
	productTitleQuery: string
) => {
	return {
		...collection,
		products: {
			edges: collection.products.edges.filter(
				(node) =>
					node.node.title
						.toLowerCase()
						.search(productTitleQuery.toLowerCase()) !== -1
			)
		}
	};
};
export const useBasicCollectionsHandleFilterManager = ({
	collectionsEdges,
	handleToCollectionToIgnoreMap
}: {
	collectionsEdges: NonNullable<HomeScreenProps['collectionsBasic']>;
	handleToCollectionToIgnoreMap?: Record<string, true>;
}) => {
	const [selectedHandles, setSelectedHandles] = useState<string[]>([]);
	const [productTitleQuery, setProductTitleQuery] = useState<
		string | undefined
	>(undefined);

	const flattenedCollectionsEdges =
		useGetEdgeNodes<BasicCollection>(collectionsEdges);
	const { collectionsByHandle, categories } = useMemo(() => {
		const collectionsHandleMap: Record<
			string,
			Collection[] | BasicCollection[]
		> = {};

		flattenedCollectionsEdges.forEach((collection) => {
			if (handleToCollectionToIgnoreMap?.[collection.handle]) return;
			const _collection = productTitleQuery
				? filterBasicCollectionProductsByTitle(collection, productTitleQuery)
				: collection;

			if (_collection.products.edges.length === 0) return;

			if (
				collectionsHandleMap[collection.handle] &&
				Array.isArray(collectionsHandleMap[collection.handle])
			) {
				collectionsHandleMap[collection.handle]?.push(_collection);
			} else {
				collectionsHandleMap[collection.handle] = [_collection];
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
	}, [
		flattenedCollectionsEdges,
		handleToCollectionToIgnoreMap,
		productTitleQuery
	]);

	return {
		collectionsByHandle,
		categories,
		selectedHandles,
		setSelectedHandles,
		flattenedCollectionsEdges,
		productTitleQuery,
		setProductTitleQuery
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
