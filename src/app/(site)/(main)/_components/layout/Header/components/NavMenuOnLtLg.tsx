"use client";
import { IoMdArrowDropdown } from "react-icons/io";
import Dropdown, {
  DropdownButton,
  DropdownItem,
  DropdownItems,
} from "~/app/components/core/Dropdown";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import { globalStore } from "~/app/libs/store";
// import Clickable from "~/app/components/core/Clickable";
import { headersLinks } from "../utils";
import Link from "next/link";

export default function NavMenuOnLtLg() {
  const isDropdownMenuOnLessThanLgOpen = useStore(
    globalStore,
    (store) => store.menus.isDropdownMenuOnLessThanLgOpen,
  );

  return (
    <AnimatePresence>
      {isDropdownMenuOnLessThanLgOpen && (
        <motion.nav
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.3 }}
          className={cx(
            "flex w-full flex-col uppercase lg:hidden",
            "bg-bg-primary-500",
          )}
        >
          <ul className="text-center text-xl">
            {headersLinks.map((item) => (
              <li
                key={item.title}
                className={cx(
                  "flex flex-wrap",
                  "hover:bg-bg-primary-600 hover:text-white",
                  "hover:text-black hover:dark:bg-bg-primary-400",
                )}
              >
                <HeadersLink item={item} />
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function HeadersLink(props: { item: (typeof headersLinks)[number] }) {
  const router = useRouter();
  const toggleDropdownMenuOnLessThanLg = useStore(
    globalStore,
    (store) => store.menus.toggleDropdownMenuOnLessThanLg,
  );

  if (props.item.onLtLg === "hide") return <></>;

  if (
    "href" in props.item ||
    (props.item.onLtLg && typeof props.item.onLtLg === "object")
  ) {
    const item = (props.item.onLtLg ?? props.item) as {
      title: string;
      href: string;
    };

    return (
      <Link
        href={item.href}
        // isA="next-js"
        className={cx(
          "mx-auto w-full max-w-main whitespace-nowrap",
          "px-main-p-3 py-2 sm:px-main-p-2",
          // "bg-clip-text",
          // "bg-text-primary-500",
          // "hover:bg-gradient-to-br hover:from-text-primary-200 hover:to-special-primary-700 hover:text-special-secondary-100 hover:transition-all hover:duration-150",
          // "focus:bg-gradient-to-br focus:from-text-primary-300 focus:to-special-primary-500 focus:text-special-secondary-100 focus:transition-all focus:duration-150",
        )}
        // variants={null}
        // style={{
        //   WebkitTextFillColor: "transparent",
        // }}
        onClick={toggleDropdownMenuOnLessThanLg}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <Dropdown>
      <DropdownButton
        title="Settings and other options."
        className="duration-150 hover:text-special-primary-700"
      >
        <IoMdArrowDropdown className="text-xl" /> {props.item.title}
        <span className="pl-1" />
      </DropdownButton>
      <DropdownItems>
        {props.item.links.map(({ href, title, isA }) => (
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
  );
}
