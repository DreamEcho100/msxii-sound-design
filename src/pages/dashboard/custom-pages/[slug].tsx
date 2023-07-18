import { useRouter } from 'next/router';
import React from 'react';
import { z } from 'zod';
import DashboardCustomPageProfileScreen from '~/components/screens/Dashboard/CustomPages/Profile';

const DashboardCustomPageProfilePage = () => {
	const router = useRouter();

	const slug = router.isReady
		? z.object({ slug: z.string() }).parse(router.query).slug
		: null;

	if (!slug) return <>Loading...</>;

	return <DashboardCustomPageProfileScreen slug={slug} />;
};

export default DashboardCustomPageProfilePage;
