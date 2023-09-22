import { useRouter } from "next/router";
import { z } from "zod";

import { type RouterInputs, api } from "~/utils/api";
import { CustomPageBuilder_ } from "~/components/shared/core/CustomPageBuilder";
import SectionLoaderContainer from "~/components/shared/LoadersContainers/Section";
import SectionPrimaryLoader from "~/components/shared/Loaders/SectionPrimary";

const CustomSectionScreen = (props: RouterInputs["customPages"]["_getOne"]) => {
  const customPageStructureQuery = api.customPages._getOne.useQuery(props);

  if (customPageStructureQuery.isLoading)
    return (
      <SectionLoaderContainer>
        <SectionPrimaryLoader />
      </SectionLoaderContainer>
    );

  if (customPageStructureQuery.isError)
    return <>{customPageStructureQuery.error.message}</>;

  const page = customPageStructureQuery.data;

  return <CustomPageBuilder_ page={page} />;
};

const CustomSectionPage = () => {
  const router = useRouter();

  const query = router.isReady
    ? z
        .object({ slug: z.string(), pageCategoryName: z.string() })
        .parse(router.query)
    : null;

  if (!query)
    return (
      <SectionLoaderContainer>
        <SectionPrimaryLoader />
      </SectionLoaderContainer>
    );

  return (
    <CustomSectionScreen
      pageCategoryName={query.pageCategoryName}
      slug={query.slug}
    />
  );
};

export default CustomSectionPage;
