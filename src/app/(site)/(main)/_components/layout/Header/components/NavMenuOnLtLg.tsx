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
import Clickable from "~/app/components/core/Clickable";
import { headersLinks } from "../utils";

export default function NavMenuOnLtLg() {
  const router = useRouter();

  const toggleDropdownMenuOnLessThanLG = useStore(
    globalStore,
    (store) => store.menus.toggleDropdownMenuOnLessThanLG,
  );

  const isDropdownMenuOnLessThanLGOpen = useStore(
    globalStore,
    (store) => store.menus.isDropdownMenuOnLessThanLGOpen,
  );

  return (
    <AnimatePresence>
      {isDropdownMenuOnLessThanLGOpen && (
        <motion.nav
          initial={{ opacity: 0.75, y: "-100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.3 }}
          className="flex w-full flex-col bg-bg-primary-500 uppercase
					lg:hidden"
        >
          <ul>
            {headersLinks.map((item) => (
              <li
                key={item.title}
                className={cx(
                  "flex flex-wrap border-b-[0.0625rem] border-solid border-b-special-primary-500 px-main-p-3 sm:px-main-p-2",
                )}
              >
                {"href" in item ? (
                  <Clickable
                    href={item.href}
                    isA="next-js"
                    className={cx(
                      "mx-auto w-full max-w-main whitespace-nowrap bg-clip-text p-1",
                      "bg-text-primary-500",
                      "hover:bg-gradient-to-br hover:from-text-primary-200 hover:to-special-primary-700 hover:text-special-secondary-100 hover:transition-all hover:duration-150",
                      "focus:bg-gradient-to-br focus:from-text-primary-300 focus:to-special-primary-500 focus:text-special-secondary-100 focus:transition-all focus:duration-150",
                    )}
                    variants={null}
                    style={{
                      WebkitTextFillColor: "transparent",
                    }}
                    onClick={toggleDropdownMenuOnLessThanLG}
                  >
                    {item.title}
                  </Clickable>
                ) : (
                  <Dropdown>
                    <DropdownButton
                      title="Settings and other options."
                      className="duration-150 hover:text-special-primary-700"
                    >
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
  );
}
