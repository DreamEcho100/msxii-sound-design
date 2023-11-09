import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import { api, type RouterOutputs } from "../../../_old/src/utils/api";
import { z } from "zod";
import { useRouter } from "next/router";
import { useMemo } from "react";

export type CustomPgProps = {
  pageParams: {
    pgCategoryName: string;
    slug?: string | null;
  };
  // getOnePgCategoryQuery: UseTRPCQueryResult<
  // 	RouterOutputs['dashboard']['pagesCategories']['getOne'],
  // 	unknown // TRPCClientErrorLike<TProcedure>
  // >;
  customPgStructureQuery: UseTRPCQueryResult<
    RouterOutputs["customPgs"]["getOne"],
    unknown // TRPCClientErrorLike<TProcedure>
  >;
  getManyPgsCategoriesItemsQuery: UseTRPCQueryResult<
    RouterOutputs["customPgs"]["pagesCategories"]["getManyItems"],
    unknown // TRPCClientErrorLike<TProcedure>
  >;
};

export type GetCustomPgDataProps = {
  pageParams?: {
    pgCategoryName: string;
    slug?: string | null;
  };
  isAShowcasePg?: boolean;
  isACustomPg?: boolean;
};

export const useGetCustomPgData = (props?: {
  pageParams?: {
    pgCategoryName: string;
    slug?: string | null;
  } | null;
  isAShowcasePg?: boolean;
  isACustomPg?: boolean;
}) => {
  const router = useRouter();
  const isRouterReady = router.isReady;

  const isInAdminPg = !!router.pathname?.startsWith("/dashboard");

  const pageParams: {
    pgCategoryName?: string;
    slug?: string | null;
  } = useMemo(() => {
    return typeof props?.pageParams === "object"
      ? props.pageParams
        ? props.pageParams
        : {}
      : router.isReady
      ? z
          .object({
            pgCategoryName: z.string(),
            slug: z.string().optional().nullable(),
          })
          .parse(router.query)
      : {};
  }, [props?.pageParams, router.isReady, router.query]);

  const isAShowcasePg = useMemo(
    () =>
      !pageParams.slug &&
      (typeof props?.isAShowcasePg === "boolean" ||
        !!pageParams.pgCategoryName),
    [pageParams?.slug, pageParams.pgCategoryName, props?.isAShowcasePg],
  );

  // const getOnePgCategoryQuery = api.dashboard.pagesCategories.getOne.useQuery(
  // 	{ pgCategoryName: pageParams.pgCategoryName! },
  // 	{ enabled: isAShowcasePg },
  // );

  const isACustomPg = useMemo(
    () =>
      typeof props?.isACustomPg === "boolean" ||
      typeof pageParams.pgCategoryName === "string",
    // !!getOnePgCategoryQuery.data?.isPg ||
    // !!(
    // 	pageParams.pgCategoryName &&
    // 	['ios-apps'].includes(pageParams.pgCategoryName)
    // )
    [
      props?.isACustomPg,
      pageParams.pgCategoryName,
      // getOnePgCategoryQuery.data?.isPg,
    ],
  );

  const customPgStructureQuery = api.customPgs.getOne.useQuery(
    {
      pgCategoryName: pageParams.pgCategoryName!,
      slug: pageParams.slug,
    },
    { enabled: isACustomPg },
  );

  const getManyPgsCategoriesItemsQuery =
    api.customPgs.pagesCategories.getManyItems.useInfiniteQuery(
      { pgCategoryName: pageParams.pgCategoryName! },
      { enabled: isAShowcasePg },
    );

  return {
    pageParams,
    isACustomPg,
    isAShowcasePg,
    isInAdminPg,
    isRouterReady,
    // getOnePgCategoryQuery,
    customPgStructureQuery,
    getManyPgsCategoriesItemsQuery,
  };
};
