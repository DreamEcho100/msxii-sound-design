import { type PropsWithChildren } from 'react';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCheckIsAdmin } from '~/utils/hooks';
import { api } from '~/utils/api';
import { BiX } from 'react-icons/bi';
import Link from 'next/link';

const SideNav = () => {
	const categoriesQuery = api.dashboard.categories.getAll.useQuery();

	return (
		<div className="py-8 bg-initial-primary-500 text-initial-secondary-0 h-full">
			<nav className="flex flex-col gap-2 items-center">
				<ul>
					<li className="flex flex-col capitalize">
						<p className="px-12">custom pages</p>
						{categoriesQuery.isLoading ? (
							<p className="px-12">
								<span className="px-2" />
								<span>Loading...</span>
							</p>
						) : categoriesQuery.isError ? (
							<p className="px-12">
								<span className="px-2" />
								<span>
									<BiX className="bg-red-500" />
								</span>
							</p>
						) : (
							<ul className="flex flex-col">
								{categoriesQuery.data.map((category) => (
									<li key={category.id}>
										<Link
											className="py-1 px-12 capitalize flex hover:bg-initial-primary-400/70"
											href={`/dashboard/custom-pages/${category.name}`}
										>
											<span className="px-2" />
											<span>
												{category.name.replaceAll('-', ' ')}&nbsp;(
												{category.counter})
											</span>
										</Link>
									</li>
								))}
							</ul>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
};

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
			<SideNav />
			<div className="flex flex-col flex-grow">
				<header className="px-4 sm:px-8 py-4 border-b"> main header </header>
				<main className="px-4 sm:px-8 py-8 flex-grow overflow-y-auto overflow-x-hidden flex flex-col">
					{props.children}
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
