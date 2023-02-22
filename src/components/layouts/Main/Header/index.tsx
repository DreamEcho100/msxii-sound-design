import Image from "next/image";
import Clickable from "~/components/shared/core/Clickable";
import { BsPersonFill, BsCart3, BsChevronDown } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import Dropdown, {
  DropdownButton,
  DropdownItem,
  DropdownItems,
} from "~/components/shared/core/Dropdown";
import { useState } from "react";
import { cx } from "class-variance-authority";
import { Menu } from "@headlessui/react";

type Props = {};

const headersLinks = [
  {
    title: "New Releases",
    href: "/",
  },
  {
    title: "iOS Apps",
    href: "/",
  },
  {
    title: "Blue Label",
    href: "/",
  },
  {
    title: "Samples",
    links: [
      { title: "Item 1", href: "/" },
      { title: "Item 2", href: "/" },
      { title: "Item 3", href: "/" },
    ],
  },
  {
    title: "Bundles",
    href: "/",
  },
  {
    title: "Blog",
    href: "/",
  },
  {
    title: "Merch",
    href: "/",
  },
] as const;

const MainLayoutHeader = (props: Props) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const handleToggleSideNav = () => setIsSideNavOpen((prev) => !prev);

  return (
    <header
      className={cx(
        "fixed top-0 left-0 right-0 z-10 flex flex-col transition-all duration-300",
        isSideNavOpen
          ? "bg-basic-secondary-500"
          : "bg-basic-secondary-500/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-main-header-h w-full max-w-main flex-grow items-center justify-between gap-4 px-main-p-3 font-medium sm:px-main-p-1">
        <div className="">
          <Clickable href="/" isA="next-js">
            <Image src="/images/logo.png" alt="logo" width="60" height="48" />
          </Clickable>
        </div>
        <nav className="mx-16 hidden max-w-screen-sm flex-grow items-center justify-between gap-2 lg:flex">
          {headersLinks.map((item) =>
            "href" in item ? (
              <Clickable
                key={item.title}
                href="/"
                isA="next-js"
                className="whitespace-nowrap"
              >
                {item.title}
              </Clickable>
            ) : (
              <Dropdown key={item.title}>
                <DropdownButton shape="text" title="settings and other options">
                  <BsChevronDown /> {item.title}
                </DropdownButton>
                <DropdownItems>
                  {item.links.map(({ href, title }) => (
                    <DropdownItem key={title}>
                      {({ active }) => (
                        <DropdownButton href={href} active={active}>
                          {title}
                        </DropdownButton>
                      )}
                    </DropdownItem>
                  ))}
                </DropdownItems>
              </Dropdown>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Clickable title="search" variants={{ btn: null, p: null }}>
            <BiSearch />
          </Clickable>
          <Clickable href="/" isA="next-js" title="profile">
            <BsPersonFill className="text-special-primary-500" />
          </Clickable>
          <Clickable
            title="cart"
            variants={{ btn: null, p: null }}
            className="relative"
          >
            <BsCart3 />
            <span className="absolute flex items-end justify-end whitespace-nowrap">
              <small className="text-[50%]">
                <span className="font-sans">0</span> ITEMS
              </small>
            </span>
          </Clickable>
          <Clickable
            onClick={handleToggleSideNav}
            variants={{ btn: null, p: null }}
            className="block lg:hidden"
          >
            <GiHamburgerMenu />
          </Clickable>
        </div>
      </div>
      {isSideNavOpen && (
        <nav
          className="flex w-full flex-col
				lg:hidden"
        >
          <ul>
            {headersLinks.map((item) => (
              <li
                key={item.title}
                className={cx(
                  "flex flex-wrap border-b-[0.0625rem] border-solid border-b-special-primary-500 px-main-p-3  last:border-0 sm:px-main-p-1",
                  "hover:bg-gradient-to-br hover:from-basic-primary-200 hover:to-special-primary-400 hover:text-special-secondary-100 hover:transition-all hover:duration-150",
                  "focus-within:bg-gradient-to-br focus-within:from-basic-primary-300 focus-within:to-special-primary-500 focus-within:text-special-secondary-100 focus:transition-all focus:duration-150"
                )}
              >
                {"href" in item ? (
                  <Clickable
                    href="/"
                    isA="next-js"
                    className={cx(
                      "mx-auto w-full max-w-main whitespace-nowrap p-1"
                    )}
                    variants={{ rounded: null, p: null }}
                  >
                    {item.title}
                  </Clickable>
                ) : (
                  <Dropdown>
                    <DropdownButton
                      shape="text"
                      title="settings and other options"
                      defaultTextColor="text-inherit"
                    >
                      <BsChevronDown /> {item.title}
                    </DropdownButton>
                    <DropdownItems>
                      {item.links.map(({ href, title }) => (
                        <DropdownItem key={title}>
                          {({ active }) => (
                            <DropdownButton href={href} active={active}>
                              {title}
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
  );
};

export default MainLayoutHeader;
