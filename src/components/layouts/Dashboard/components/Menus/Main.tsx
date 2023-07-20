import Link from 'next/link';
import { BiX } from 'react-icons/bi';
import { api } from '~/utils/api';

export default function MainSideMenu() {
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
}
