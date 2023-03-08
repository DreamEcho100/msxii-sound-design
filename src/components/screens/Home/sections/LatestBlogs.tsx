import Image from 'next/image';
import React from 'react';
import CTAButton from '~/components/shared/core/Cards/CTAButton';
import Clickable from '~/components/shared/core/Clickable';

const blogs = [
	{
		id: '1',
		title: 'Tape Series Vol. 1 from MSXIISound and AKAI Pro',
		image: { src: '/images/Rectangle 14.png', alt: '' }
	},
	{
		id: '2',
		title: 'Holiday Jams By The WVGRD',
		image: { src: '/images/Rectangle 15.png', alt: '' }
	}
];

const HomeLatestBlogsSection = () => {
	return (
		<section className="sm:px-main-p-3 sm:py-main-p-2">
			<div className="bg-bg-primary-0 py-main-p-1 px-main-p-2 sm:rounded-xl md:p-main-p-1">
				<div className="mx-auto flex w-fit flex-col gap-4 sm:gap-12">
					<header className="text-initial-primary-900">
						<h2 className="text-h1 leading-h2 font-semibold">Latest Blogs</h2>
					</header>
					<div className="cards-container text-initial-primary-500 flex w-fit flex-col gap-8 lg:flex-row">
						{blogs.map((blog) => (
							<article
								key={blog.id}
								className="duration-300 transition-all flex aspect-video flex-col-reverse rounded-lg overflow-hidden bg-bg-primary-600 bg-opacity-20 dark:bg-opacity-100 text-text-primary-500 sm:flex-row md:max-w-[600px]"
							>
								<div className="group sm:text-align-initial flex flex-col items-center justify-between gap-2 p-8 text-center sm:w-1/2 sm:items-start sm:gap-0 lg:p-8">
									<Clickable
										className="rounded-[0.25rem] text-sm"
										variants={{
											btn: 'secondary',
											rounded: null,
											py: 'extra-sm',
											px: 'sm'
										}}
									>
										Blog post
									</Clickable>
									<h3 className="text-[1.125rem] font-normal">
										<Clickable href="/" isA="next-js">
											{blog.title}
										</Clickable>
									</h3>
									<CTAButton href="/" isA="next-js" text="Learn more" />
								</div>
								<div className="flex flex-col sm:w-1/2">
									<Clickable
										href="/"
										isA="next-js"
										className="block h-full w-full overflow-hidden"
										variants={null}
									>
										<Image
											src={blog.image.src}
											alt={blog.image.alt}
											width={900}
											height={500}
											className="h-full w-full object-cover object-right bg-fixed hover:scale-110 card-img-zoom-animation-1 duration-300 ease-in"
										/>
									</Clickable>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeLatestBlogsSection;
