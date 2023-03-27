import { cx } from 'class-variance-authority';
import Image from 'next/image';
import Clickable from '~/components/shared/core/Clickable';

const IOSAppsData = [
	{
		title: 'Lo-Fly Dirt',
		href: 'https://apps.apple.com/us/app/lo-fly-dirt/id1292776927?ign-mpt=uo%3D4'
	},
	{
		title: 'Fly Tape 2',
		href: 'https://apps.apple.com/us/app/fly-tape-2/id1552463664'
	},
	{
		title: 'Fly Tape',
		href: 'https://apps.apple.com/us/app/fly-tape/id1343651192'
	},
	{
		title: 'Chomplr',
		href: 'https://apps.apple.com/us/app/chomplr/id1470553213'
	}
];

const IOSAppsPage = () => {
	return (
		<section
			className={cx(
				'px-main-p-4 sm:px-main-p-2 py-main-p-1',
				'flex flex-col gap-10'
			)}
		>
			<header className="flex flex-col gap-6 text-center lg:text-align-initial">
				<h1 className="text-h3 font-extrabold">iOS Apps</h1>
				<p className="text-text-primary-400 font-light">
					Explore our unique and practical iOS apps.
				</p>
			</header>
			<div className="flex flex-wrap items-center justify-center gap-8 lg:flex-nowrap">
				{IOSAppsData.map((IOSApp) => (
					<div key={IOSApp.title} className="w-80 flex flex-col gap-4">
						<Clickable
							href="/ios-apps/loflydirt"
							isA="next-js"
							className="w-full aspect-square overflow-hidden rounded-lg"
						>
							<Image
								priority
								src={`/images/ios-apps/${IOSApp.title}.png`}
								alt={IOSApp.title}
								width={500}
								height={500}
								className="w-full h-full object-cover"
							/>
						</Clickable>
						<p className="font-light">
							<Clickable href={IOSApp.href} target="_blank">
								{IOSApp.title}
							</Clickable>
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default IOSAppsPage;
