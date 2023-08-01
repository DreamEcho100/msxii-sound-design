import { cx } from 'class-variance-authority';
import CustomNextImage from '~/components/shared/CustomNextImage';
import Clickable from '~/components/shared/core/Clickable';
import { api } from '~/utils/api';

type Props = {
	pageCategoryName: string;
};

const DashboardCustomPageProfileScreen = (props: Props) => {
	const getManyPagesCategoriesItemsQuery =
		api.dashboard.pagesCategories.getManyItems.useInfiniteQuery({
			pageCategoryName: props.pageCategoryName,
		});

	if (getManyPagesCategoriesItemsQuery.isLoading) return <>Loading...</>;

	if (getManyPagesCategoriesItemsQuery.isError)
		return <>{getManyPagesCategoriesItemsQuery.error.message}</>;

	const data = getManyPagesCategoriesItemsQuery.data.pages
		.map((page) => page.items)
		.flat();

	return (
		<section
			className={cx(
				'px-main-p-4 sm:px-main-p-2 py-main-p-1 text-h6',
				'flex flex-col gap-10',
			)}
		>
			<header className="flex flex-col gap-6 text-center lg:text-align-initial">
				<h1 className="text-h3 font-semibold">iOS Apps</h1>
				<p className="text-text-primary-400 font-light">
					Explore our unique and practical iOS apps.
				</p>
			</header>
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(12rem,_1fr))] gap-8 lg:justify-between lg:flex-nowrap">
				{data.map((item) => (
					<div key={item.id} className="flex flex-col gap-4">
						<Clickable
							href={
								item.slug
									? `/dashboard/custom-pages/ios-apps/${item.slug}`
									: `/dashboard/custom-pages/ios-apps`
							}
							isA="next-js"
							className="w-full aspect-square overflow-hidden rounded-lg"
						>
							{item.image && (
								<CustomNextImage
									priority
									src={item.image.src || ''}
									alt={item.image.altText || undefined}
									width={item.image.width || 500}
									height={item.image.height || 500}
									className="w-full h-full object-cover"
								/>
							)}
						</Clickable>
						{item.slug && (
							<p>
								<Clickable
									isA="next-js"
									href={`/dashboard/custom-pages/ios-apps/${item.slug}`}
									target="_blank"
									className="capitalize"
								>
									{item.slug.replace('-', ' ')}
								</Clickable>
							</p>
						)}
					</div>
				))}
			</div>
		</section>
	);
};

export default DashboardCustomPageProfileScreen;
