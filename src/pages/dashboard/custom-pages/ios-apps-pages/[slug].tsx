import { useRouter } from 'next/router';
import { z } from 'zod';

import { type RouterInputs, api } from '~/utils/api';
import { CustomPageBuilder_ } from '~/components/shared/core/CustomPageBuilder';

const IOSAppSection = (props: RouterInputs['customPages']['_getOne']) => {
	const customPageStructureQuery = api.customPages._getOne.useQuery(props);

	if (customPageStructureQuery.isLoading) return <>Loading...</>;

	if (customPageStructureQuery.isError)
		return <>{customPageStructureQuery.error.message}</>;

	const page = customPageStructureQuery.data;

	return <CustomPageBuilder_ page={page} />;
};

const IOSAppPage = () => {
	const router = useRouter();

	const query = router.isReady
		? z.object({ slug: z.string() }).parse(router.query)
		: null;

	if (!query) return <>Loading...</>;

	return <IOSAppSection categoryName="ios-apps-pages" slug={query.slug} />;
};

export default IOSAppPage;
