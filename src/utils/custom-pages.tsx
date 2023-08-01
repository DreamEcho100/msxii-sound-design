import { type UseTRPCQueryResult } from '@trpc/react-query/shared';
import { api, type RouterOutputs } from './api';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export type CustomPageProps = {
	pageParams: {
		pageCategoryName: string;
		slug?: string | null;
	};
	// getOnePageCategoryQuery: UseTRPCQueryResult<
	// 	RouterOutputs['dashboard']['pagesCategories']['getOne'],
	// 	unknown // TRPCClientErrorLike<TProcedure>
	// >;
	customPageStructureQuery: UseTRPCQueryResult<
		RouterOutputs['customPages']['_getOne'],
		unknown // TRPCClientErrorLike<TProcedure>
	>;
	getManyPagesCategoriesItemsQuery: UseTRPCQueryResult<
		RouterOutputs['customPages']['pagesCategories']['getManyItems'],
		unknown // TRPCClientErrorLike<TProcedure>
	>;
};

export type GetCustomPageDataProps = {
	pageParams?: {
		pageCategoryName: string;
		slug?: string | null;
	};
	isAShowcasePage?: boolean;
	isACustomPage?: boolean;
};

export const useGetCustomPageData = (props?: {
	pageParams?: {
		pageCategoryName: string;
		slug?: string | null;
	} | null;
	isAShowcasePage?: boolean;
	isACustomPage?: boolean;
}) => {
	const router = useRouter();

	const isInAdminPage = !!router.pathname?.startsWith('/dashboard');

	const pageParams: {
		pageCategoryName?: string;
		slug?: string | null;
	} = useMemo(() => {
		return typeof props?.pageParams === 'object'
			? props.pageParams
				? props.pageParams
				: {}
			: router.isReady
			? z
					.object({
						pageCategoryName: z.string(),
						slug: z.string().optional().nullable(),
					})
					.parse(router.query)
			: {};
	}, [props?.pageParams, router.isReady, router.query]);

	const isAShowcasePage = useMemo(
		() =>
			!pageParams.slug &&
			(typeof props?.isAShowcasePage === 'boolean' ||
				!!pageParams.pageCategoryName),
		[pageParams?.slug, pageParams.pageCategoryName, props?.isAShowcasePage],
	);

	// const getOnePageCategoryQuery = api.dashboard.pagesCategories.getOne.useQuery(
	// 	{ pageCategoryName: pageParams.pageCategoryName! },
	// 	{ enabled: isAShowcasePage },
	// );

	const isACustomPage = useMemo(
		() =>
			typeof props?.isACustomPage === 'boolean' ||
			typeof pageParams.pageCategoryName === 'string',
		// !!getOnePageCategoryQuery.data?.isAPage ||
		// !!(
		// 	pageParams.pageCategoryName &&
		// 	['ios-apps'].includes(pageParams.pageCategoryName)
		// )
		[
			props?.isACustomPage,
			pageParams.pageCategoryName,
			// getOnePageCategoryQuery.data?.isAPage,
		],
	);

	const customPageStructureQuery = api.customPages._getOne.useQuery(
		{
			pageCategoryName: pageParams.pageCategoryName!,
			slug: pageParams.slug,
		},
		{ enabled: isACustomPage },
	);

	const getManyPagesCategoriesItemsQuery =
		api.customPages.pagesCategories.getManyItems.useInfiniteQuery(
			{ pageCategoryName: pageParams.pageCategoryName! },
			{ enabled: isAShowcasePage },
		);

	return {
		pageParams,
		isACustomPage,
		isAShowcasePage,
		isInAdminPage,
		// getOnePageCategoryQuery,
		customPageStructureQuery,
		getManyPagesCategoriesItemsQuery,
	};
};
