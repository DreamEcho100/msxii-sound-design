import Image from 'next/image';
import Clickable from '~/components/shared/core/Clickable';
import { BsPersonFill, BsCart3 } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import Dropdown, {
	DropdownButton,
	DropdownItem,
	DropdownItems
} from '~/components/shared/core/Dropdown';
import { useState } from 'react';
import { cx } from 'class-variance-authority';

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
	const [isSideNavOpen, setIsSideNavOpen] = useState(false);
	const handleToggleSideNav = () => setIsSideNavOpen((prev) => !prev);

	return (
		<>
			<header
				className={cx(
					'fixed top-0 left-0 right-0 z-10 flex flex-col transition-all duration-300',
					isSideNavOpen
						? 'bg-basic-secondary-500'
						: 'bg-basic-secondary-500/80 backdrop-blur-sm'
				)}
			>
				<div className="mx-auto flex h-main-header-h w-full max-w-main flex-grow items-center justify-between gap-4 px-main-p-3 font-medium sm:px-main-p-2">
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
										defaultTextColor=""
									>
										<IoMdArrowDropdown className="text-xl hover:text-special-primary-400 duration-150" />{' '}
										{item.title}
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
						<Clickable title="search" variants={null}>
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
							onClick={handleToggleSideNav}
							variants={null}
							className="block lg:hidden"
							title={`${isSideNavOpen ? 'Open' : 'Close'} the navigation menu`}
						>
							<GiHamburgerMenu className="text-xl" />
						</Clickable>
					</div>
				</div>
				{isSideNavOpen && (
					<nav
						className="flex w-full flex-col uppercase
				lg:hidden"
					>
						<ul className="font-medium">
							{headersLinks.map((item) => (
								<li
									key={item.title}
									className={cx(
										'flex flex-wrap border-b-[0.0625rem] border-solid border-b-special-primary-500 px-main-p-3 sm:px-main-p-1' // last:border-0
										// "hover:bg-gradient-to-br hover:from-basic-primary-200 hover:to-special-primary-400 hover:text-special-secondary-100 hover:transition-all hover:duration-150",
										// "focus-within:bg-gradient-to-br focus-within:from-basic-primary-300 focus-within:to-special-primary-500 focus-within:text-special-secondary-100 focus:transition-all focus:duration-150"
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
											onClick={handleToggleSideNav}
											onKeyDown={(event) => {
												if (event.key === 'Enter' || event.keyCode === 13) {
													event.currentTarget.click();
													handleToggleSideNav();
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
												defaultTextColor=""
											>
												<IoMdArrowDropdown className="text-xl" /> {item.title}
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
					</nav>
				)}
			</header>
			{isSideNavOpen && (
				<button
					className="fixed inset-0 z-[9] block h-full w-full bg-basic-primary-900/50 backdrop-blur-[0.0625rem]"
					onClick={handleToggleSideNav}
					title="Close the navigation menu"
				/>
			)}
		</>
	);
};

export default MainLayoutHeader;
