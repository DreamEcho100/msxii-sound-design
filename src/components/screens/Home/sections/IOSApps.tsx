import Image from 'next/image';
import React from 'react';
import CTAButton from '~/components/shared/core/Cards/CTAButton';

const products = [
	{
		id: '1',
		title: 'Loops Go Crazy Vol. 5',
		image: { src: '/images/Rectangle 9.png', alt: '' }
	},
	{
		id: '2',
		title: 'CHOMPLR',
		image: { src: '/images/Mask group.png', alt: '' }
	},
	{
		id: '3',
		title: 'LO-FLY DIRT',
		image: { src: '/images/Mask group-1.png', alt: '' }
	}
];

const HomeIOSAppsSection = () => {
	return (
		<section className="p-main-p-3">
			<div className="flex flex-col gap-8">
				<header>
					<h2 className="text-h1 font-black leading-h2 uppercase md:px-4">
						iOS Apps
					</h2>
				</header>
				<div className="cards-container flex flex-wrap justify-around gap-6 lg:flex-nowrap">
					{products.map((item) => (
						<article
							key={item.id}
							className="flex gap-4 w-full flex-col md:w-[46%] lg:w-[33%]"
						>
							<div className="overflow-hidden rounded-xl">
								<Image
									src={item.image.src}
									alt={item.image.alt}
									width={900}
									height={500}
									className="card-img-zoom-animation-1 duration-300 ease-in"
								/>
							</div>
							<div className="group flex flex-col">
								<h3 className="font-normal leading-4">{item.title}</h3>
								<CTAButton href="/" isA="next-js" text="Discover more" />
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default HomeIOSAppsSection;
