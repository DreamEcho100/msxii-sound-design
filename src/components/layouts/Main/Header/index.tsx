import CustomNextImage from '~/components/shared/CustomNextImage';
import Clickable from '~/components/shared/core/Clickable';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BiSearchAlt2 } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import Dropdown, {
	DropdownButton,
	DropdownItem,
	DropdownItems,
} from '~/components/shared/core/Dropdown';
import { AnimatePresence, motion } from 'framer-motion';
import { cx } from 'class-variance-authority';
import { useRouter } from 'next/router';
import SearchMenuDropdown from './components/SearchMenuDropdown';
import dynamic from 'next/dynamic';
import CartDropdown from './components/CartDropdown';
import CartDropdownButton from './components/CartDropdownButton';
import Overlay from './components/Overlay';
import PersonIcon from './components/PersonIcon';
import SignOutButton from './components/SignOutButton';
import { useStore } from 'zustand';
import { globalStore } from '~/store';
import { useCheckIsAdmin } from '~/utils/hooks';
import { MdDashboard } from 'react-icons/md';

const DynamicAuthDialog = dynamic(() => import('./components/AuthDialog'), {
	ssr: false,
});

const headersLinks = [
	{
		title: 'New Releases',
		href: '/collections/?handles=new-releases',
	},
	{
		title: 'iOS Apps',
		href: '/ios-apps',
	},
	{
		title: 'Blue Label',
		href: '/blue-label',
	},
	{
		title: 'Samples',
		links: [
			{ title: 'Drum Kits', href: '/collections/?handles=drum-kits' },
			{
				title: 'Ableton Racks',
				href: 'https://racksforlive.com/',
				isA: 'normal-link',
			},
			{ title: 'Vinyl', href: '/vinyl' },
		] as {
			readonly title: 'Ableton Racks';
			readonly href: 'https://racksforlive.com/';
			readonly isA?: 'normal-link';
		}[],
	},
	{
		title: 'Bundles',
		href: '/collections/?handles=bundles',
	},
	{
		title: 'Blog',
		href: '/blog',
	},
	{
		title: 'Merch',
		href: '/merch',
	},
] as const;

const MainLayoutHeader = () => {
	const router = useRouter();

	const { isAdmin } = useCheckIsAdmin();

	const toggleDropdownMenuOnLessThanLG = useStore(
		globalStore,
		(store) => store.menus.toggleDropdownMenuOnLessThanLG,
	);
	const toggleSearchMenuDropdown = useStore(
		globalStore,
		(store) => store.menus.toggleSearchMenuDropdown,
	);

	const isDropdownMenuOnLessThanLGOpen = useStore(
		globalStore,
		(store) => store.menus.isDropdownMenuOnLessThanLGOpen,
	);
	const isSearchMenuDropdownOpen = useStore(
		globalStore,
		(store) => store.menus.isSearchMenuDropdownOpen,
	);
	const isCartDropdownOpen = useStore(
		globalStore,
		(store) => store.cart.isCartDropdownOpen,
	);

	const isAnyMenuOpen =
		isDropdownMenuOnLessThanLGOpen ||
		isSearchMenuDropdownOpen ||
		isCartDropdownOpen;

	return (
		<>
			<header
				className={cx(
					'fixed top-0 left-0 right-0 z-10 flex flex-col transition-all duration-300 isolate',
				)}
			>
				<div className="mx-auto w-full max-w-main flex flex-col">
					<div
						className={cx(
							'flex w-full h-main-header-h items-center justify-between gap-4 px-main-p-3 sm:px-main-p-2',
							'relative z-[2] isolate',
							isAnyMenuOpen
								? 'bg-bg-primary-500'
								: 'bg-bg-primary-500/80 dark:bg-bg-primary-500/90 backdrop-blur-sm',
						)}
					>
						<Clickable
							href="/"
							isA="next-js"
							className="w-16 h-12 aspect-video"
						>
							<CustomNextImage
								src="/images/logo.png"
								alt="logo"
								width="60"
								height="48"
								priority
							/>
						</Clickable>
						<nav className="relative hidden max-w-screen-md flex-grow items-center justify-between uppercase lg:flex">
							{headersLinks.map((item) =>
								'href' in item ? (
									<Clickable
										key={item.title}
										href={item.href}
										isA="next-js"
										className="whitespace-nowrap hover:text-special-primary-700 duration-150"
									>
										{item.title}
									</Clickable>
								) : (
									<Dropdown key={item.title}>
										<DropdownButton className="hover:text-special-primary-700 duration-150">
											<IoMdArrowDropdown className="text-xl" /> {item.title}
											<span className="pl-1" />
										</DropdownButton>
										<DropdownItems>
											{item.links.map(({ href, title, isA }) => (
												<DropdownItem key={title}>
													{({ active }) => (
														<DropdownButton
															active={active}
															onClick={() => {
																if (isA === 'normal-link') open(href, '_blank');
																else router.push(href);

																toggleDropdownMenuOnLessThanLG();
															}}
														>
															<span className="p-2">{title}</span>
														</DropdownButton>
													)}
												</DropdownItem>
											))}
										</DropdownItems>
									</Dropdown>
								),
							)}
						</nav>
						<div
							className={cx(
								'flex items-center py-2',
								isAdmin ? 'gap-2' : 'gap-3',
							)}
						>
							<SignOutButton />
							{isAdmin && (
								<Clickable
									title="dashboard"
									variants={null}
									href="/dashboard"
									isA="next-js"
									className={cx(
										'text-xl text-special-primary-500',
										'hover:text-special-primary-900 focus:text-special-primary-900',
										'hover:text-special-primary-600 focus:text-special-primary-600',
									)}
								>
									<MdDashboard className="text-xl" />
								</Clickable>
							)}
							<Clickable
								title={`${
									isSearchMenuDropdownOpen ? 'Close' : 'Open'
								} search menu.`}
								variants={null}
								onClick={toggleSearchMenuDropdown}
							>
								<BiSearchAlt2 className="text-xl" />
							</Clickable>
							<PersonIcon />
							<CartDropdownButton />
							<Clickable
								onClick={toggleDropdownMenuOnLessThanLG}
								variants={null}
								className="block lg:hidden"
								title={`${
									isDropdownMenuOnLessThanLGOpen ? 'Open' : 'Close'
								} the navigation menu.`}
							>
								<GiHamburgerMenu className="text-xl" />
							</Clickable>
							<CartDropdown />
						</div>
					</div>
					<SearchMenuDropdown />
					<AnimatePresence>
						{isDropdownMenuOnLessThanLGOpen && (
							<motion.nav
								initial={{ opacity: 0.75, y: '-100%' }}
								animate={{ opacity: 1, y: '0%' }}
								exit={{ opacity: 0, y: '-100%' }}
								transition={{ duration: 0.3 }}
								className="flex w-full flex-col bg-bg-primary-500 uppercase
					lg:hidden"
							>
								<ul>
									{headersLinks.map((item) => (
										<li
											key={item.title}
											className={cx(
												'flex flex-wrap border-b-[0.0625rem] border-solid border-b-special-primary-500 px-main-p-3 sm:px-main-p-2',
											)}
										>
											{'href' in item ? (
												<Clickable
													href={item.href}
													isA="next-js"
													className={cx(
														'mx-auto w-full max-w-main whitespace-nowrap bg-clip-text p-1',
														'bg-text-primary-500',
														'hover:bg-gradient-to-br hover:from-text-primary-200 hover:to-special-primary-700 hover:text-special-secondary-100 hover:transition-all hover:duration-150',
														'focus:bg-gradient-to-br focus:from-text-primary-300 focus:to-special-primary-500 focus:text-special-secondary-100 focus:transition-all focus:duration-150',
													)}
													variants={null}
													style={{
														WebkitTextFillColor: 'transparent',
													}}
													onClick={toggleDropdownMenuOnLessThanLG}
												>
													{item.title}
												</Clickable>
											) : (
												<Dropdown>
													<DropdownButton
														title="Settings and other options."
														className="hover:text-special-primary-700 duration-150"
													>
														<IoMdArrowDropdown className="text-xl" />{' '}
														{item.title}
														<span className="pl-1" />
													</DropdownButton>
													<DropdownItems>
														{item.links.map(({ href, title, isA }) => (
															<DropdownItem key={title}>
																{({ active }) => (
																	<DropdownButton
																		active={active}
																		onClick={() => {
																			if (isA === 'normal-link')
																				open(href, '_blank');
																			else router.push(href);

																			toggleDropdownMenuOnLessThanLG();
																		}}
																	>
																		<span className="p-2">{title}</span>
																	</DropdownButton>
																)}
															</DropdownItem>
														))}
													</DropdownItems>
												</Dropdown>
											)}
										</li>
									))}
								</ul>
							</motion.nav>
						)}
					</AnimatePresence>
				</div>
			</header>
			<Overlay />
			<DynamicAuthDialog />
		</>
	);
};

export default MainLayoutHeader;
