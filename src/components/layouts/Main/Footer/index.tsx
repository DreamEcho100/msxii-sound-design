import CustomNextImage from '~/components/shared/CustomNextImage';
import { useEffect, useRef } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Clickable from '~/components/shared/core/Clickable';
import { motion } from 'framer-motion';
import { cx } from 'class-variance-authority';
import { useGlobalStore } from '~/store';
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';

const footerLinks = [
	{
		text: 'Collections',
		links: [
			{
				text: 'New Releases',
				href: `/products/?tags=New Releases`,
				icon: null
			},
			{ text: 'Loops', href: `/products/?tags=Loops`, icon: null },
			{ text: 'One shot drums', href: `/`, icon: null },
			{ text: 'Sample Packs', href: `/products/?tags=Samples`, icon: null },
			{ text: 'Drum Kits', href: `/products/?tags=Drum Kits`, icon: null },
			{ text: 'Construction Kits', href: `/`, icon: null },
			{ text: 'Presets', href: `/`, icon: null },
			{ text: 'Bundles', href: '/products/?tags=Bundles', icon: null }
		]
	},
	{
		text: 'Navigation',
		links: [
			{ text: 'Search', href: '/products', icon: null },
			{ text: 'Creative Space', href: '/creative-space', icon: null },
			{ text: 'About Us', href: '/about', icon: null },
			{ text: 'Support', href: '/support', icon: null },
			{ text: 'License Agreement', href: '/license-agreement', icon: null }
		]
	},
	{
		text: 'Contact Us',
		links: [
			{
				text: 'support@msxaudio.com',
				href: 'mailto:support@msxaudio.com',
				icon: <MdEmail />
			}
		]
	}
];

const MainLayoutFooter = () => {
	const mainFooterRef = useRef<HTMLElement>(null);
	const { changeCurrentTheme, currentTheme } = useGlobalStore(
		(store) => store.themeConfig
	);
	const isDarkTheme = currentTheme === 'dark';

	useEffect(() => {
		const mainFooterResizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const heightInRem = `${(entry.contentRect.height / 16).toFixed(2)}rem`;
				process.env.NODE_ENV === 'development' &&
					console.log('heightInRem', heightInRem);
			});
		});

		if (!mainFooterRef.current) return;

		mainFooterResizeObserver.observe(mainFooterRef.current);

		return () => mainFooterResizeObserver.disconnect();
	}, []);

	return (
		<footer id="main-footer" ref={mainFooterRef}>
			<div className="mx-auto flex flex-col gap-4 max-w-main py-main-p-4 px-main-p-3 sm:px-main-p-2 text-text-primary-400 dark:text-text-primary-600">
				<div className="flex flex-wrap justify-between gap-4">
					{footerLinks.map((item) => (
						<ul key={item.text} className="flex flex-col gap-2">
							<li>
								<h3 className="text-h6 font-medium dark:text-text-primary-500">
									{item.text}
								</h3>
							</li>
							{item.links.map((link) => (
								<li key={link.text}>
									<Link
										href={link.href}
										className={cx(
											'flex flex-wrap sm:flex-nowrap items-center gap-1 w-fit border-b-[0.125rem] border-solid border-b-transparent outline-none',
											'duration-150 transition-all',
											'focus:border-b-text-primary-200 focus:text-text-primary-300',
											'hover:text-text-primary-500 hover:border-b-text-primary-500'
										)}
									>
										{link.icon}
										{link.text}
									</Link>
								</li>
							))}
						</ul>
					))}
					<div className="flex flex-col gap-4 flex-grow max-w-sm">
						<header className="flex flex-col gap-2">
							<h3 className="text-h4 font-medium dark:text-text-primary-500">
								Join our newsletter
							</h3>
							<p>New Subscribers get our Site Sampler Free!</p>
						</header>
						<form className="flex flex-col gap-6">
							<input
								type="text"
								placeholder="Enter your email address"
								className="bg-transparent border-b-[0.125rem] border-solid border-b-text-primary-200 py-2 outline-none"
							/>
							<Clickable
								variants={{
									rounded: 'md',
									w: 'full',
									py: 'sm',
									'font-weight': null
								}}
								className="text-h4 font-normal uppercase"
							>
								Subscribe
							</Clickable>
						</form>
					</div>
				</div>
				<div className="mx-auto flex max-w-main w-full flex-grow flex-wrap items-center justify-around gap-x-8 gap-y-4 text-center font-normal sm:justify-between">
					<div className="">
						<small>
							&copy;&nbsp;2023&nbsp;
							<Link
								href="/"
								className="border-b-[0.0625rem] border-solid border-b-text-primary-200"
							>
								MSXII Sound
							</Link>
						</small>
					</div>
					<div className="md:ml-16 rtl:md:mr-16">
						<Clickable href="/" isA="next-js">
							<CustomNextImage
								src="/images/logo.png"
								alt="logo"
								width="60"
								height="48"
							/>
						</Clickable>
					</div>
					<div className="flex flex-wrap items-center justify-center gap-2">
						<div className="flex">
							<p className="text-[90%]">
								{isDarkTheme ? 'Dark' : 'Light'} mode
							</p>
							&nbsp;
							<Clickable
								variants={null}
								className={cx(
									'w-12 h-6 flex justify-start items-center px-1 cursor-pointer rounded-[2.5rem] bg-text-primary-300/40',
									isDarkTheme ? 'justify-end bg-text-primary-500/40' : undefined
								)}
								onClick={() => changeCurrentTheme()}
								title={`Set theme to ${isDarkTheme ? 'light' : 'dark'} mode.`}
							>
								<motion.div
									className={cx(
										'w-4 h-4 bg-text-primary-0 rounded-[50%]',
										isDarkTheme ? 'bg-text-primary-1000/50' : ''
									)}
									layout
									transition={{
										type: 'spring',
										stiffness: 700,
										damping: 30
									}}
								/>
							</Clickable>
						</div>
						<ul className="flex flex-wrap gap-2">
							<li>
								<Clickable
									isA="basic-link"
									href="/"
									className=""
									title="facebook"
								>
									<FaFacebookF />
								</Clickable>
							</li>
							<li>
								<Clickable
									isA="basic-link"
									href="/"
									className=""
									title="twitter"
								>
									<FaTwitter />
								</Clickable>
							</li>
							<li>
								<Clickable
									isA="basic-link"
									href="/"
									className=""
									title="youtube"
								>
									<FaYoutube />
								</Clickable>
							</li>
							<li>
								<Clickable
									isA="basic-link"
									href="/"
									className=""
									title="instagram"
								>
									<FaInstagram />
								</Clickable>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default MainLayoutFooter;
