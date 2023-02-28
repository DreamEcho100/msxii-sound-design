import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Clickable from '~/components/shared/core/Clickable';
import { motion } from 'framer-motion';
import { cx } from 'class-variance-authority';
import { useGlobalStore } from '~/utils/store';

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
			<div className="mx-auto flex max-w-main flex-grow flex-wrap items-center justify-around gap-x-8 gap-y-4 py-main-p-4 px-main-p-3 sm:px-main-p-2 text-center font-normal sm:justify-between">
				<div className="">
					<small>&copy; 2023 MSXII Sound</small>
				</div>
				<div className="">
					<Clickable href="/" isA="next-js">
						<Image src="/images/logo.png" alt="logo" width="60" height="48" />
					</Clickable>
				</div>
				<div className="flex flex-wrap items-center justify-center gap-2">
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
							<Clickable isA="basic-link" href="/" className="" title="twitter">
								<FaTwitter />
							</Clickable>
						</li>
						<li>
							<Clickable isA="basic-link" href="/" className="" title="youtube">
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
		</footer>
	);
};

export default MainLayoutFooter;
