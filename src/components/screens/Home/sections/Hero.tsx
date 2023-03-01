import Image from 'next/image';
import { motion } from 'framer-motion';
import Clickable from '~/components/shared/core/Clickable';

const heroImagesPathNumberTransformer = (num: number) =>
	`/images/hero-section/${num}.png`;

const heroImages: (Parameters<typeof motion.div>[0] & { path: string })[] = [
	{ path: heroImagesPathNumberTransformer(7) },
	{ path: heroImagesPathNumberTransformer(6) },
	{ path: heroImagesPathNumberTransformer(5) },
	{ path: heroImagesPathNumberTransformer(4) },
	{ path: heroImagesPathNumberTransformer(3) },
	{ path: heroImagesPathNumberTransformer(2) },
	{ path: heroImagesPathNumberTransformer(1) }
];

const HeroHomeSection = () => {
	return (
		<section className="flex flex-col gap-4 justify-center p-main-p-3 sm:p-main-p-1 md:flex-row ">
			<div className="md:text-align-initial flex flex-col items-center justify-center gap-8 text-center text-[1.5rem] md:w-1/2 md:items-start md:justify-start min-[1350px]:w-auto">
				<motion.h1
					initial={{ opacity: 0, y: '2rem' }}
					animate={{ opacity: 1, y: '0%' }}
					transition={{ duration: 0.3, delay: 0 }}
					className="text-h1 leading-h1"
				>
					Unlock Limitless Possibilities with <br /> MSXAudio Sample Packs
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: '2rem' }}
					animate={{ opacity: 1, y: '0%' }}
					transition={{ duration: 0.3, delay: 0.2 }}
					className="max-w-[41.25rem] leading-primary-1"
				>
					MSXAudio sample packs offer a wide range of high-quality audio and
					MIDI samples for music producers and creators of all skill levels.
					Each pack contains a carefully curated selection of sounds, loops, and
					one-shots, covering a variety of styles and genres.
				</motion.p>

				<span className="duration-150 transition-all hover:-translate-y-[7.5%]">
					<motion.span
						initial={{ opacity: 0, y: '2rem' }}
						animate={{ opacity: 1, y: '0%' }}
						transition={{ duration: 0.3, delay: 0.4 }}
						// whileHover={{ y: '-7.5%', dur: 0.1 }}
					>
						<Clickable
							href="/"
							isA="next-js"
							variants={{ btn: 'primary', p: 'v2-xl', rounded: '3xl.2' }}
							className="mt-6"
						>
							SHOP NOW
						</Clickable>
					</motion.span>
				</span>
			</div>
			<div className="relative flex-grow flex items-center justify-center">
				{/* <div className="absolute inset-0 flex items-center justify-start">
					<Image
						src="/images/audio-player.png"
						alt=""
						width={390}
						height={285}
						className="max-h-full scale-[0.6] object-contain"
						priority
					/>
				</div> */}
				{/* isolate h-96 max-w-[512px] md:h-auto */}
				<div className="relative w-96 h-96">
					{heroImages.map(({ path, ...props }) => (
						<motion.div
							key={path}
							{...props}
							initial={{ y: '10%' }}
							className="w-full h-full aspect-square absolute inset-0"
						>
							<Image
								src={path}
								alt=""
								width={390}
								height={285}
								className="w-full h-full object-cover scale-50"
								priority
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HeroHomeSection;
