import { type PropsWithChildren } from 'react';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCheckIsAdmin } from '~/utils/hooks';
import EditSideMenu from './components/Menus/Edit';
import MainSideMenu from './components/Menus/Main';

const DashboardLayout = (props: PropsWithChildren) => {
	const router = useRouter();
	const { customerStatus, isAdmin } = useCheckIsAdmin();

	useEffect(() => {
		if (customerStatus !== 'loading' && !isAdmin) router.push('/');
	}, [customerStatus, isAdmin, router]);

	if (customerStatus === 'loading') return <>Loading...</>;

	if (!isAdmin) return <>Not Authorized</>;

	return (
		<div className="flex flex-grow">
			<MainSideMenu />
			<div className="flex flex-col flex-grow relative">
				<header className="px-4 sm:px-8 py-4 border-b">main header</header>
				<main className="px-4 sm:px-8 py-8 flex-grow overflow-y-auto overflow-x-hidden flex flex-col">
					{props.children}
				</main>
				<EditSideMenu />
			</div>
		</div>
	);
};

export default DashboardLayout;
