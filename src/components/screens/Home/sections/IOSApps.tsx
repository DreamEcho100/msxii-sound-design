import CustomNextImage from '~/components/shared/CustomNextImage';

import CTAButton from '~/components/shared/core/Shopify/Cards/CTAButton';
import Clickable from '~/components/shared/core/Clickable';

const loFlyDirtBasicData = {
	slug: 'lo-fly-dirt',
	title: 'lo-fly dirt',
};
const flyTape2BasicData = {
	slug: 'fly-tape2',
	title: 'fly tape2',
};
const chomplrBasicData = {
	slug: 'chomplr',
	title: 'chomplr',
};

const products = [
	{
		id: '1',
		...flyTape2BasicData,
		image: { src: '/images/Rectangle 9.png', alt: '' },
	},
	{
		id: '2',
		...chomplrBasicData,
		image: { src: '/images/Mask group.png', alt: '' },
	},
	{
		id: '3',
		...loFlyDirtBasicData,
		image: { src: '/images/Mask group-1.png', alt: '' },
	},
];

const HomeIOSAppsSection = () => {
	return (
		<section className="p-main-p-3">
			<div className="flex flex-col gap-8">
				<header>
					<h2 className="text-h1 font-semibold leading-h2 uppercase md:px-4">
						iOS Apps
					</h2>
				</header>
				<div className="cards-container flex flex-wrap justify-around gap-6 lg:flex-nowrap">
					{products.map((item) => (
						<article
							key={item.id}
							className="flex gap-4 w-full flex-col md:w-[46%] lg:w-[33%]"
						>
							<Clickable
								className="overflow-hidden rounded-xl"
								href={`/ios-apps/${item.slug}`}
								isA="next-js"
							>
								<CustomNextImage
									src={item.image.src}
									alt={item.image.alt}
									width={1000}
									height={1000}
									className="card-img-zoom-animation-1 duration-300 ease-in"
								/>
							</Clickable>
							<div className="group flex flex-col gap-2">
								<h3 className="capitalize font-normal leading-4">
									<Clickable href={`/ios-apps/${item.slug}`} isA="next-js">
										{item.title}
									</Clickable>
								</h3>
								<CTAButton
									href={`/ios-apps/${item.slug}`}
									isA="next-js"
									text="Discover more"
								/>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default HomeIOSAppsSection;
