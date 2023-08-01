import { useRouter } from 'next/router';
import { z } from 'zod';
import DashboardCustomPageProfileScreen from '~/components/screens/Dashboard/CustomPages/Profile';

const DashboardCustomPageProfilePage = () => {
	const router = useRouter();

	const pageCategoryName = router.isReady
		? z.object({ pageCategoryName: z.string() }).parse(router.query)
				.pageCategoryName
		: null;

	if (!pageCategoryName) return <>Loading...</>;

	return (
		<DashboardCustomPageProfileScreen pageCategoryName={pageCategoryName} />
	);
};

export default DashboardCustomPageProfilePage;
