import { useRouter } from 'next/router';
import { z } from 'zod';
import DashboardCustomPageProfileScreen from '~/components/screens/Dashboard/CustomPages/Profile';

const DashboardCustomPageProfilePage = () => {
	const router = useRouter();

	const categoryName = router.isReady
		? z.object({ categoryName: z.string() }).parse(router.query).categoryName
		: null;

	if (!categoryName) return <>Loading...</>;

	return <DashboardCustomPageProfileScreen categoryName={categoryName} />;
};

export default DashboardCustomPageProfilePage;
