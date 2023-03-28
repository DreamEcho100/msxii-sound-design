import Image from 'next/image';
import { motion } from 'framer-motion';
import Clickable from '~/components/shared/core/Clickable';

const heroImagesPathNumberTransformer = (num: number) =>
	`/images/hero-section/${num}.png`;

type MotionProps = Parameters<typeof motion.div>[0];
type CustomMotionProps = MotionProps;

const heroImages: (CustomMotionProps & { path: string })[] = [
	{
		path: heroImagesPathNumberTransformer(6)
		// animate: { scale: 0.4, x: '30%', rotateZ: '12deg' }
	},
	{
		path: heroImagesPathNumberTransformer(5)
		// animate: { scale: 0.5, x: '0%', rotateZ: '8deg' }
	},
	{
		path: heroImagesPathNumberTransformer(4)
		// animate: { scale: 0.6, x: '30%' }
	},
	{
		path: heroImagesPathNumberTransformer(3)
		// animate: { scale: 0.6, x: '-15%', rotateZ: '-1.5deg' }
	},
	{
		path: heroImagesPathNumberTransformer(2)
		// animate: { scale: 0.6, x: '-5%', rotateZ: '-1.5deg' }
	},
	{
		path: heroImagesPathNumberTransformer(1)
		// animate: { scale: 0.6, x: '5%', rotateZ: '-1.5deg' }
	}
	// {
	// 	path: heroImagesPathNumberTransformer(1),
	// 	animate: { scale: 0.6, x: '15%', rotateZ: '-1.5deg' }
	// }
];

const HeroHomeSection = () => {
	return (
		<section className="py-8 flex flex-col gap-2 justify-center px-main-p-3 sm:px-main-p-1 lg:flex-row overflow-hidden">
			<div
				className="py-main-p-3 
sm:py-main-p-1 lg:text-align-initial font-normal flex flex-col items-center justify-center gap-8 text-center text-[1.125rem] lg:w-1/2 lg:items-start lg:justify-start min-[1350px]:w-auto"
			>
				<motion.h1
					initial={{ opacity: 0, y: '2rem' }}
					animate={{ opacity: 1, y: '0%' }}
					transition={{ duration: 0.3, delay: 0 }}
					className="text-h1 font-medium leading-h1"
				>
					Unlock Limitless Possibilities with <br /> MSXAudio Sample Packs
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: '2rem' }}
					animate={{ opacity: 1, y: '0%' }}
					transition={{ duration: 0.3, delay: 0.2 }}
					className="max-w-[55ch]"
				>
					MSXAudio sample packs offer a wide range of high-quality audio and
					MIDI samples for music producers and creators of all skill levels.
					Each pack contains a carefully curated selection of sounds, loops, and
					one-shots, covering a variety of styles and genres.
				</motion.p>

				<span className="mt-6 duration-150 transition-all hover:-translate-y-[7.5%]">
					<motion.span
						initial={{ opacity: 0, y: '2rem' }}
						animate={{ opacity: 1, y: '0%' }}
						transition={{ duration: 0.3, delay: 0.4 }}
						// whileHover={{ y: '-7.5%', dur: 0.1 }}
					>
						<Clickable
							href="/"
							isA="next-js"
							variants={{
								btn: 'primary',
								py: 'semi-sm',
								px: '3xl',
								rounded: 'md'
							}}
							className="mt-6"
						>
							SHOP NOW
						</Clickable>
					</motion.span>
				</span>
			</div>
			<div className="relative flex-grow flex items-center justify-center p-8 sm:p-16 pb-10 lg:p-0">
				<div className="relative aspect-square max-w-full w-96 h-96 pb-main-p-3 sm:pb-main-p-1">
					{heroImages.map(({ path, ...props }, index, arr) => (
						<motion.div
							key={path}
							{...props}
							animate={{
								scale: 0.75,
								x: ((index + 1) / arr.length) * 170 - 100,
								y: ((index + 1) / arr.length) * 100 - 50
							}}
							transition={{
								// type: 'spring',
								damping: 10,
								stiffness: 100,
								delay: 0.8,
								duration: 0.5
							}}
							className="w-full h-full aspect-square absolute inset-0"
						>
							<Image
								src={path}
								alt=""
								width={500}
								height={500}
								className="w-full h-full object-contain rounded-xl"
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
