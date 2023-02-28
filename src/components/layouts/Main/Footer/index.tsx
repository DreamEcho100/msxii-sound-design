import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Clickable from '~/components/shared/core/Clickable';

const MainLayoutFooter = () => {
	const mainFooterRef = useRef<HTMLElement>(null);
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
					<Clickable isA="basic-link" href="/" className="" title="facebook">
						<FaFacebookF />
					</Clickable>
					<Clickable isA="basic-link" href="/" className="" title="twitter">
						<FaTwitter />
					</Clickable>
					<Clickable isA="basic-link" href="/" className="" title="youtube">
						<FaYoutube />
					</Clickable>
					<Clickable isA="basic-link" href="/" className="" title="instagram">
						<FaInstagram />
					</Clickable>
				</div>
			</div>
		</footer>
	);
};

export default MainLayoutFooter;
