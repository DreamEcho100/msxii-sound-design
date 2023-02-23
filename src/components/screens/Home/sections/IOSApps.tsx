import Image from 'next/image';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Clickable from '~/components/shared/core/Clickable';

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
		<section className="bg-basic-secondary-500 p-main-p-3">
			<div className="flex flex-col gap-8">
				<header>
					<h2 className="text-h1 leading-h2 text-basic-primary-500">
						iOS Apps
					</h2>
				</header>
				<div className="flex flex-wrap justify-center gap-4 lg:flex-nowrap">
					{products.map((item) => (
						<article
							key={item.id}
							className="flex w-full flex-col gap-1 md:w-[46%] lg:w-[33%]"
						>
							<Image
								src={item.image.src}
								alt={item.image.alt}
								width={900}
								height={500}
							/>
							<h3 className="text-h5 font-medium">{item.title}</h3>

							<Clickable
								href="/"
								isA="next-js"
								className="flex flex-wrap items-center gap-2 text-xl"
							>
								Discover more{' '}
								<BsArrowRight className="scale-x-125 scale-y-110 text-special-primary-500 rtl:rotate-180" />
							</Clickable>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default HomeIOSAppsSection;
