import Image from 'next/image';
import Clickable from '~/components/shared/core/Clickable';
import { BsPersonFill, BsCart3 } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BiSearch, BiSearchAlt, BiX } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import Dropdown, {
	DropdownButton,
	DropdownItem,
	DropdownItems
} from '~/components/shared/core/Dropdown';
import { AnimatePresence, motion } from 'framer-motion';
import { cx } from 'class-variance-authority';
import { useGlobalStore } from '~/utils/store';
import { useMemo } from 'react';

const headersLinks = [
	{
		title: 'New Releases',
		href: '/'
	},
	{
		title: 'iOS Apps',
		href: '/'
	},
	{
		title: 'Blue Label',
		href: '/'
	},
	{
		title: 'Samples',
		links: [
			{ title: 'Item 1', href: '/' },
			{ title: 'Item 2', href: '/' },
			{ title: 'Item 3', href: '/' }
		]
	},
	{
		title: 'Bundles',
		href: '/'
	},
	{
		title: 'Blog',
		href: '/'
	},
	{
		title: 'Merch',
		href: '/'
	}
] as const;

const MainLayoutHeader = () => {
	// const [isSideNavOpen, setIsSideNavOpen] = useState(false);
	// const handleToggleSideNav = () => setIsSideNavOpen((prev) => !prev);
	const {
		closeAllMenus,

		isDropdownMenuOnLessThanLGOpen,
		toggleDropdownMenuOnLessThanLG,

		isSearchMenuOpen,
		toggleSearchMenu
	} = useGlobalStore();

	const isAnyMenuOpen = useMemo(
		() => isDropdownMenuOnLessThanLGOpen || isSearchMenuOpen,
		[isDropdownMenuOnLessThanLGOpen, isSearchMenuOpen]
	);

	return (
		<>
			<header
				className={cx(
					'fixed top-0 left-0 right-0 z-10 flex flex-col transition-all duration-300 isolate'
				)}
			>
				<div
					className={cx(
						'mx-auto flex h-main-header-h w-full max-w-main flex-grow items-center justify-between gap-4 px-main-p-3 font-normal sm:px-main-p-2',
						isAnyMenuOpen
							? 'bg-basic-secondary-500'
							: 'bg-basic-secondary-500/80 backdrop-blur-sm'
					)}
				>
					<Clickable href="/" isA="next-js" className="w-16 h-12 aspect-video">
						<Image
							src="/images/logo.png"
							alt="logo"
							width="60"
							height="48"
							priority
						/>
					</Clickable>
					<nav className="hidden max-w-screen-md flex-grow items-center justify-between gap-2 uppercase lg:flex">
						{headersLinks.map((item) =>
							'href' in item ? (
								<Clickable
									key={item.title}
									href="/"
									isA="next-js"
									className="whitespace-nowrap hover:text-special-primary-400 duration-150"
								>
									{item.title}
								</Clickable>
							) : (
								<Dropdown key={item.title}>
									<DropdownButton
										shape="text"
										title="settings and other options"
										className="hover:text-special-primary-400 duration-150"
									>
										<IoMdArrowDropdown className="text-xl" /> {item.title}
										<span className="pl-1" />
									</DropdownButton>
									<DropdownItems>
										{item.links.map(({ href, title }) => (
											<DropdownItem key={title}>
												{({ active }) => (
													<DropdownButton href={href} active={active}>
														<span className="p-2">{title}</span>
													</DropdownButton>
												)}
											</DropdownItem>
										))}
									</DropdownItems>
								</Dropdown>
							)
						)}
					</nav>
					<div className="flex items-center gap-4">
						<Clickable
							title={`${isSearchMenuOpen ? 'Close' : 'Open'} search menu`}
							variants={null}
							onClick={toggleSearchMenu}
						>
							<BiSearch className="text-xl" />
						</Clickable>
						<Clickable href="/" isA="next-js" title="profile">
							<BsPersonFill className="text-xl text-special-primary-500" />
						</Clickable>
						<Clickable
							title="cart"
							variants={null}
							className="relative flex items-start gap-1 whitespace-nowrap translate-y-[0.25ch]"
						>
							<BsCart3 className="text-xl" /> 0 ITEMS
							{/* <span className="absolute flex items-end justify-end whitespace-nowrap">
              <small className="text-[50%]">
                <span className="font-sans">0</span> ITEMS
              </small>
            </span> */}
						</Clickable>
						<Clickable
							onClick={toggleDropdownMenuOnLessThanLG}
							variants={null}
							className="block lg:hidden"
							title={`${
								isDropdownMenuOnLessThanLGOpen ? 'Open' : 'Close'
							} the navigation menu`}
						>
							<GiHamburgerMenu className="text-xl" />
						</Clickable>
					</div>
				</div>
				<AnimatePresence>
					{isSearchMenuOpen && (
						<motion.div
							initial={{ opacity: 0, y: '-100%' }}
							animate={{ opacity: 1, y: '0%' }}
							exit={{ opacity: 0, y: '-100%' }}
							transition={{
								type: 'spring',
								damping: 20,
								stiffness: 125,
								bounce: 0.1,
								duration: 0.3
							}}
							className="px-main-p-3 sm:px-main-p-2 pb-4 bg-basic-secondary-500 -z-[1]"
						>
							<form className="bg-white flex items-center h-8">
								<Clickable
									variants={null}
									className="px-2 bg-black/10 focus:bg-black/25 duration-100 transition-all h-full"
									onClick={toggleSearchMenu}
								>
									<BiX />
								</Clickable>
								<input
									type="search"
									className="h-full bg-transparent flex-grow outline-none px-3 py-2"
								/>
								<Clickable
									variants={null}
									className="px-2 bg-black/10 focus:bg-black/25 duration-100 transition-all h-full"
									type="submit"
								>
									<BiSearchAlt />
								</Clickable>
							</form>
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{isDropdownMenuOnLessThanLGOpen && (
						<motion.nav
							initial={{ opacity: 0, y: '-100%' }}
							animate={{ opacity: 1, y: '0%' }}
							exit={{ opacity: 0, y: '-100%' }}
							transition={{
								type: 'spring',
								damping: 20,
								stiffness: 125,
								bounce: 0.1,
								duration: 0.3
							}}
							className="flex w-full flex-col bg-basic-secondary-500 -z-[2] uppercase
					lg:hidden"
						>
							<ul className="font-normal">
								{headersLinks.map((item) => (
									<li
										key={item.title}
										className={cx(
											'flex flex-wrap border-b-[0.0625rem] border-solid border-b-special-primary-500 px-main-p-3 sm:px-main-p-2'
										)}
									>
										{'href' in item ? (
											<Clickable
												href="/"
												isA="next-js"
												className={cx(
													'mx-auto w-full max-w-main whitespace-nowrap bg-clip-text p-1',
													'bg-black',
													'hover:bg-gradient-to-br hover:from-basic-primary-200 hover:to-special-primary-400 hover:text-special-secondary-100 hover:transition-all hover:duration-150',
													'focus:bg-gradient-to-br focus:from-basic-primary-300 focus:to-special-primary-500 focus:text-special-secondary-100 focus:transition-all focus:duration-150'
												)}
												variants={null}
												style={{
													WebkitTextFillColor: 'transparent'
												}}
												onClick={toggleDropdownMenuOnLessThanLG}
												onKeyDown={(event) => {
													if (event.key === 'Enter' || event.keyCode === 13) {
														event.currentTarget.click();
														toggleDropdownMenuOnLessThanLG();
													}
												}}
											>
												{item.title}
											</Clickable>
										) : (
											<Dropdown>
												<DropdownButton
													shape="text"
													title="settings and other options"
													className="hover:text-special-primary-400 duration-150"
												>
													<IoMdArrowDropdown className="text-xl" /> {item.title}
													<span className="pl-1" />
												</DropdownButton>
												<DropdownItems>
													{item.links.map(({ href, title }) => (
														<DropdownItem key={title}>
															{({ active }) => (
																<DropdownButton href={href} active={active}>
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
			</header>
			{isAnyMenuOpen && (
				<button
					className="fixed inset-0 z-[9] block w-full h-full bg-basic-primary-900/50 backdrop-blur-[0.0625rem]"
					onClick={closeAllMenus}
					title="Close all opened menus"
				/>
			)}
		</>
	);
};

export default MainLayoutHeader;
