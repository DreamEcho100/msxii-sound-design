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
			<header className="flex flex-col gap-6 lg:text-align-initial">
				<h1 className="text-h3 font-semibold">iOS Apps</h1>
				<p className="text-text-primary-400 font-light">
					Explore our unique and practical iOS apps.
				</p>
			</header>
			<div
				className={cx(
					'grid gap-8 lg:flex-nowrap',
					'justify-center lg:justify-between',
					'grid-cols-[repeat(auto-fit,_minmax(12rem,1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(12rem,30rem))] ',
				)}
			>
				{data.map((item) => (
					<div key={item.id} className="flex flex-col gap-4">
						<Clickable
							href={
								item.slug
									? `/${item.pageCategoryName}/${item.slug}`
									: `/${item.pageCategoryName}`
							}
							isA="next-js"
							className="w-full aspect-square overflow-hidden rounded-lg"
						>
							<CustomNextImage
								priority
								src={
									item?.image?.src ||
									`https://api.dicebear.com/6.x/shapes/svg?seed=${item.pageCategoryName}/${item.slug}`
								}
								alt={item?.image?.altText || undefined}
								width={item?.image?.width || 500}
								height={item?.image?.height || 500}
								className="w-full h-full object-cover"
							/>
						</Clickable>
						{item.slug && (
							<p>
								<Clickable
									isA="next-js"
									href={`/${item.pageCategoryName}/${item.slug}`}
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
