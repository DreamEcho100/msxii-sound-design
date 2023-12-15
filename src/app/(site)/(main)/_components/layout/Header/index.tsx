"use client";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiSearchAlt2 } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import Dropdown, {
  DropdownButton,
  DropdownItem,
  DropdownItems,
} from "~/app/components/core/Dropdown";
import { cx } from "class-variance-authority";
import { useRouter } from "next/navigation";
import SearchMenuDropdown from "./components/SearchMenuDropdown";
import dynamic from "next/dynamic";
import CartDropdown from "./components/CartDropdown";
import CartDropdownButton from "./components/CartDropdownButton";
import Overlay from "./components/Overlay";
import PersonIcon from "./components/PersonIcon";
import SignOutButton from "./components/SignOutButton";
import { useStore } from "zustand";
import { globalStore } from "~/app/libs/store";
import { useCheckIsAdmin } from "~/app/libs/hooks";
import { MdDashboard } from "react-icons/md";
import CustomNextImage from "~/app/components/common/CustomNextImage";
import Clickable from "~/app/components/core/Clickable";
import NavMenuOnLtLg from "./components/NavMenuOnLtLg";
import { headersLinks } from "./utils";
import { Suspense } from "react";

const DynamicAuthDialog = dynamic(() => import("./components/AuthDialog"), {
  ssr: false,
});

const MainLayoutHeader = () => {
  const router = useRouter();

  const { isAdmin } = useCheckIsAdmin();

  const toggleDropdownMenuOnLessThanLg = useStore(
    globalStore,
    (store) => store.menus.toggleDropdownMenuOnLessThanLg,
  );
  const toggleSearchMenuDropdown = useStore(
    globalStore,
    (store) => store.menus.toggleSearchMenuDropdown,
  );

  const isDropdownMenuOnLessThanLgOpen = useStore(
    globalStore,
    (store) => store.menus.isDropdownMenuOnLessThanLgOpen,
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
    isDropdownMenuOnLessThanLgOpen ||
    isSearchMenuDropdownOpen ||
    isCartDropdownOpen;

  return (
    <>
      <header
        className={cx(
          "fixed left-0 right-0 top-0 isolate z-[3] flex flex-col transition-all duration-300",
        )}
      >
        <div className="mx-auto flex w-full max-w-main flex-col">
          <div
            className={cx(
              "flex h-main-header-h w-full items-center justify-between gap-4 px-main-p-3 sm:px-main-p-2",
              "relative isolate",
              isAnyMenuOpen
                ? "bg-bg-primary-500"
                : "bg-bg-primary-500/80 backdrop-blur-sm dark:bg-bg-primary-500/90",
            )}
          >
            <Clickable href="/" isA="next-js">
              <CustomNextImage
                src="/images/logo.png"
                alt="logo"
                width="240"
                height="192"
                className="h-10 w-14 object-contain"
                priority
              />
            </Clickable>
            <nav className="relative hidden max-w-screen-md flex-grow items-center justify-between uppercase lg:flex">
              {headersLinks.map((item) =>
                "href" in item ? (
                  <Clickable
                    key={item.title}
                    href={item.href}
                    isA="next-js"
                    className="whitespace-nowrap duration-150 hover:text-special-primary-700"
                  >
                    {item.title}
                  </Clickable>
                ) : (
                  <Dropdown key={item.title}>
                    <DropdownButton className="duration-150 hover:text-special-primary-700">
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
                                if (isA === "normal-link") open(href, "_blank");
                                else router.push(href);

                                toggleDropdownMenuOnLessThanLg();
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
                "flex items-center py-2",
                isAdmin ? "gap-2" : "gap-3",
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
                    "text-xl text-special-primary-500",
                    "hover:text-special-primary-900 focus:text-special-primary-900",
                    "hover:text-special-primary-600 focus:text-special-primary-600",
                  )}
                >
                  <MdDashboard className="text-xl" />
                </Clickable>
              )}
              <Clickable
                title={`${
                  isSearchMenuDropdownOpen ? "Close" : "Open"
                } search menu.`}
                variants={null}
                onClick={toggleSearchMenuDropdown}
              >
                <BiSearchAlt2 className="text-xl" />
              </Clickable>
              <PersonIcon />
              <CartDropdownButton />
              <Clickable
                onClick={toggleDropdownMenuOnLessThanLg}
                variants={null}
                className="block lg:hidden"
                title={`${
                  isDropdownMenuOnLessThanLgOpen ? "Open" : "Close"
                } the navigation menu.`}
              >
                <GiHamburgerMenu className="text-xl" />
              </Clickable>
              <CartDropdown />
            </div>
          </div>
          <Suspense>
            <SearchMenuDropdown />
          </Suspense>
          <NavMenuOnLtLg />
        </div>
      </header>
      <Overlay />
      <Suspense>
        <DynamicAuthDialog />
      </Suspense>
    </>
  );
};

export default MainLayoutHeader;
