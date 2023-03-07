import { cx } from 'class-variance-authority';
import Image from 'next/image';
import React from 'react';
import Clickable from '~/components/shared/core/Clickable';

const anchorClasses = cx(
	'border-b-[0.0625rem] border-solid border-b-black',
	'duration-150 transition-all',
	'hover:text-text-primary-200 hover:border-b-text-primary-300'
);

const AboutMSXIISoundDesign = () => {
	return (
		<section className="sm:px-main-p-3 sm:py-main-p-2">
			<div className="flex flex-col-reverse justify-center gap-4 bg-initial-secondary-500 dark:bg-bg-primary-900 text-initial-primary-0 px-main-p-2 sm:gap-12 sm:rounded-xl lg:flex-row lg:px-main-p-1">
				<div
					className="lg:text-align-initial flex flex-col 
gap-8 pb-main-p-2 text-center text-base font-medium lg:w-3/4 lg:max-w-screen-md lg:pt-main-p-1"
				>
					<header>
						<h2 className="text-h1 leading-h2 font-semibold">
							About MSXII Sound Design
						</h2>
					</header>

					<p>
						MSXII is committed to providing the audio community with quality,
						well-thought out, relevant & vintage sounds in the form of sample
						packs, drum kits, apps and sound design. These are sounds that are
						ready to use in your projects upon download. All material released
						is recorded through state-of-the-art equipment such as the SSL
						Duality, SSL Fusion, UA, & Neve preamps. Tracked into high quality
						converters before landing in Protools, Logic, or Live for print.
						Some projects also receive processing into vintage tape machines and
						other analog boards for added character.
					</p>
					<p>
						In addition to our own line of products on
						<Clickable
							target="_blank"
							className={anchorClasses}
							href="https//msxaudio.com"
						>
							msxaudio.com
						</Clickable>
						and what you&apos;ve seen on social media, we offer the iOS Apps{' '}
						<Clickable
							target="_blank"
							className={anchorClasses}
							href="https://apps.apple.com/us/app/fly-tape/id1343651192"
						>
							Fly Tape
						</Clickable>{' '}
						and
						<Clickable
							target="_blank"
							className={anchorClasses}
							href="https://apps.apple.com/us/app/lo-fly-dirt/id1292776927"
						>
							Lo-Fly Dirt
						</Clickable>
						. We&apos;ve also done countless work/partnerships with companies
						such as Native Instruments (
						<Clickable
							target="_blank"
							className={anchorClasses}
							href="https://www.native-instruments.com/en/products/komplete/expansions/sierra-grove/"
						>
							Sierra Grove
						</Clickable>
						/
						<Clickable
							target="_blank"
							className={anchorClasses}
							href="https://www.native-instruments.com/en/products/komplete/expansions/elastic-thump/"
						>
							Elastic Thump
						</Clickable>
						/
						<Clickable
							target="_blank"
							className={anchorClasses}
							href="https://www.native-instruments.com/en/products/komplete/expansions/aquarius-earth/"
						>
							Aquarius Earth
						</Clickable>
						), Akai (
						<Clickable
							target="_blank"
							className={anchorClasses}
							href="https://www.thempcstore.com/#cbp=assets/ajax-meet-the-team/soul-provider.html"
						>
							Soul Provider
						</Clickable>{' '}
						1, 2, &{' '}
						<Clickable
							target="_blank"
							className={anchorClasses}
							href="https://www.thempcstore.com/#cbp=assets/ajax-meet-the-team/vintage-provider.html"
						>
							Vintage Provider
						</Clickable>
						), Ableton (
						<Clickable
							target="_blank"
							className={anchorClasses}
							href="https://www.ableton.com/en/packs/beat-tools/"
						>
							Beat Tools
						</Clickable>{' '}
						& Live 10 factory content), Novation,{' '}
						<Clickable
							target="_blank"
							className={anchorClasses}
							href="https://intua.net/packs/msxii-the-constituents/"
						>
							Intua
						</Clickable>
						, Serato, Our niche is in creative sound design solutions for music
						producers and we&apos;re pretty knowledgeable on just about any
						platform, DAW, instrument, device, and more!
					</p>
				</div>
				<div className="flex items-start justify-center lg:flex-grow">
					<Image
						src="/images/image 8.png"
						alt=""
						width={600}
						height={500}
						className="w-3/4 md:w-1/2 lg:w-11/12"
					/>
				</div>
			</div>
		</section>
	);
};

export default AboutMSXIISoundDesign;
