import Image from "next/image";
import React from "react";
import Clickable from "~/components/shared/core/Clickable";
import { BsPersonFill, BsSearch, BsCart3 } from "react-icons/bs";

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
  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center">
      <div className="m-auto flex h-main-header-h max-w-main flex-grow items-center justify-between gap-4 bg-basic-secondary-500/80 px-main-p-1 font-medium backdrop-blur-sm">
        <div className="">
          <Clickable href="/" isA="next-js">
            <Image src="/images/logo.png" alt="logo" width="60" height="48" />
          </Clickable>
        </div>
        <div className="mx-16 hidden max-w-screen-sm flex-grow items-center justify-between gap-2 lg:flex">
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
              <div key={item.title} className="">
                <Clickable
                  className="whitespace-nowrap"
                  variants={{ btn: null }}
                >
                  {item.title}
                </Clickable>
                <div className="hidden">
                  {item.links.map((subItem) => (
                    <Clickable
                      key={subItem.title}
                      className="whitespace-nowrap"
                      isA="next-js"
                      href={subItem.href}
                    >
                      {subItem.title}
                    </Clickable>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
        <div className="flex items-center gap-2">
          <Clickable title="search" variants={{ btn: null, p: null }}>
            <BsSearch />
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
              <small>0 ITEMS</small>
            </span>
          </Clickable>
        </div>
      </div>
    </header>
  );
};

export default MainLayoutHeader;
