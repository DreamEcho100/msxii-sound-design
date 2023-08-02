import { type InfiniteData } from '@tanstack/react-query';
import { cx } from 'class-variance-authority';
import { useMemo } from 'react';
import CustomNextImage from '~/components/shared/CustomNextImage';
import Clickable from '~/components/shared/core/Clickable';
import { CustomPageBuilder_ } from '~/components/shared/core/CustomPageBuilder';
import { RouterOutputs } from '~/utils/api';
import {
	GetCustomPageDataProps,
	useGetCustomPageData,
} from '~/utils/custom-pages';
import Merch from './components/Merch';
import BlueLabel from './components/BlueLabel';

type Props = GetCustomPageDataProps;

const PageCategoryItems = (props: {
	data: InfiniteData<
		RouterOutputs['customPages']['pagesCategories']['getManyItems']
	>;
}) => {
	const data = useMemo(
		() =>
			props.data.pages
				.map((page) => page.items.filter((item) => !!item.slug))
				.flat(),
		[props.data.pages],
	);

	if (data.length === 0) return <></>;

	return (
		<div
			className={cx(
				'pb-8 px-12',
				'grid gap-8 lg:flex-nowrap',
				'grid gap-8 lg:justify-between lg:flex-nowrap',
				data.length < 4
					? 'grid-cols-[repeat(auto-fit,_24.5rem)]'
					: 'grid-cols-[repeat(auto-fit,_minmax(12rem,_1fr))]',
			)}
		>
			{data.map((item) => (
				<div key={item.id} className="flex flex-col gap-4">
					<Clickable
						href={
							item.slug
								? `/${item.pageCategoryName}/${item.slug}`
								: `/${item.pageCategoryName}`
						}
						isA="next-js"
						className="w-full aspect-square overflow-hidden rounded-lg"
					>
						<CustomNextImage
							priority
							src={
								item?.image?.src ||
								`https://api.dicebear.com/6.x/shapes/svg?seed=${item.pageCategoryName}/${item.slug}`
							}
							alt={item?.image?.altText || undefined}
							width={item?.image?.width || 500}
							height={item?.image?.height || 500}
							className="w-full h-full object-cover"
						/>
					</Clickable>
					{item.slug && (
						<p>
							<Clickable
								isA="next-js"
								href={`/${item.pageCategoryName}/${item.slug}`}
								target="_blank"
								className="capitalize"
							>
								{item.slug.replace('-', ' ')}
							</Clickable>
						</p>
					)}
				</div>
			))}
		</div>
	);
};

const CustomPageScreen = (props: Props) => {
	const {
		isAShowcasePage,
		getManyPagesCategoriesItemsQuery,
		isACustomPage,
		customPageStructureQuery,
		pageParams,
	} = useGetCustomPageData(props);

	const pageCategoryItemsData = useMemo(() => {
		if (!isAShowcasePage)
			return {
				status: 'not-available' as const,
			};

		if (!getManyPagesCategoriesItemsQuery.data) {
			if (getManyPagesCategoriesItemsQuery.isLoading)
				return {
					status: 'loading' as const,
				};

			if (getManyPagesCategoriesItemsQuery.isError)
				return {
					status: 'error' as const,
					message: getManyPagesCategoriesItemsQuery.error.message,
				};

			throw new Error('!');
		}

		return {
			status: 'success' as const,
			data: getManyPagesCategoriesItemsQuery.data,
		};
	}, [
		isAShowcasePage,
		getManyPagesCategoriesItemsQuery.data,
		getManyPagesCategoriesItemsQuery.isLoading,
		getManyPagesCategoriesItemsQuery.isError,
		getManyPagesCategoriesItemsQuery.error?.message,
	]);

	const customPageStructureData = useMemo(() => {
		if (!isACustomPage)
			return {
				status: 'not-available' as const,
			};

		if (!customPageStructureQuery.data) {
			if (customPageStructureQuery.isLoading)
				return {
					status: 'loading' as const,
				};

			if (customPageStructureQuery.isError)
				return {
					status: 'error' as const,
					message: customPageStructureQuery.error.message,
				};

			throw new Error('!');
		}

		return {
			status: 'success' as const,
			data: customPageStructureQuery.data,
		};
	}, [
		isACustomPage,
		customPageStructureQuery.data,
		customPageStructureQuery.isLoading,
		customPageStructureQuery.isError,
		customPageStructureQuery.error?.message,
	]);

	if (
		pageCategoryItemsData.status === 'loading' ||
		customPageStructureData.status === 'loading'
	)
		return <>Loading...</>;

	if (
		pageCategoryItemsData.status === 'error' ||
		customPageStructureData.status === 'error'
	)
		return (
			<>{pageCategoryItemsData?.message || customPageStructureData?.message}</>
		);

	return (
		<section className="flex flex-col gap-8">
			{customPageStructureData.status === 'success' && (
				<CustomPageBuilder_ page={customPageStructureData.data}>
					{pageParams.pageCategoryName === 'merch' ? (
						<Merch />
					) : pageParams.pageCategoryName === 'blue-label' ? (
						<BlueLabel />
					) : (
						<></>
					)}
				</CustomPageBuilder_>
			)}
			{pageCategoryItemsData.status === 'success' && (
				<PageCategoryItems data={pageCategoryItemsData.data} />
			)}
		</section>
	);
};

export default CustomPageScreen;
