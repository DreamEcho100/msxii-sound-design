import { cx } from 'class-variance-authority';
import CustomNextImage from '~/components/shared/CustomNextImage';
import Clickable from '~/components/shared/core/Clickable';
import { IOSProductsBasicData } from '~/utils/appData';

const IOSAppsPage = () => {
	return (
		<section
			className={cx(
				'px-main-p-4 sm:px-main-p-2 py-main-p-1',
				'flex flex-col gap-10'
			)}
		>
			<header className="flex flex-col gap-6 text-center lg:text-align-initial">
				<h1 className="text-h3 font-semibold">iOS Apps</h1>
				<p className="text-text-primary-400 font-light">
					Explore our unique and practical iOS apps.
				</p>
			</header>
			<div className="grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-8 lg:justify-between lg:flex-nowrap">
				{IOSProductsBasicData.map((item) => (
					<div key={item.title} className="flex flex-col gap-4">
						<Clickable
							href={`/ios-apps/${item.slug}`}
							isA="next-js"
							className="w-full aspect-square overflow-hidden rounded-lg"
						>
							<CustomNextImage
								priority
								src={`/images/ios-apps/${item.title}.png`}
								alt={item.title}
								width={500}
								height={500}
								className="w-full h-full object-cover"
							/>
						</Clickable>
						<p>
							<Clickable
								isA="next-js"
								href={`/ios-apps/${item.slug}`}
								target="_blank"
							>
								{item.title}
							</Clickable>
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default IOSAppsPage;
