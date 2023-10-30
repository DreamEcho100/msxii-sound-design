"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiSearchAlt2, BiX } from "react-icons/bi";
import { useStore } from "zustand";
import Clickable from "~/app/components/core/Clickable";
import { globalStore } from "~/app/libs/store";

const SearchMenuDropdown = () => {
  const searchParams = useSearchParams();

  const productTitleQuery = useMemo(() => {
    const productTitleQuery = searchParams.get("productTitleQuery");

    return productTitleQuery && productTitleQuery.length >= 3
      ? productTitleQuery
      : undefined;
  }, [searchParams]);

  const configRef = useRef<{
    timeoutId?: NodeJS.Timeout;
  }>({ timeoutId: undefined });

  const toggleSearchMenuDropdown = useStore(
    globalStore,
    (store) => store.menus.toggleSearchMenuDropdown,
  );

  const setProductTitleQuery = (query: unknown) => {
    if (typeof query !== "string" || query.length < 3) return;

    configRef.current.timeoutId = setTimeout(() => {
      const searchParamsProductTitleQuery =
        new URL(window.location.href).searchParams.get("productTitleQuery") ??
        "";

      if (searchParamsProductTitleQuery !== query)
        router.replace(`/products?productTitleQuery=${query}`);
      toggleSearchMenuDropdown();
    }, 500);
  };

  const productTitleQueryInputRef = useRef<HTMLInputElement>(null);
  // useSearchParams()
  // const [formValues, setFormValues] = useState({
  //   productTitleQuery: "",
  // });
  const isSearchMenuDropdownOpen = useStore(
    globalStore,
    (store) => store.menus.isSearchMenuDropdownOpen,
  );

  const router = useRouter();

  useEffect(() => {
    if (isSearchMenuDropdownOpen) {
      productTitleQueryInputRef.current?.focus();
    }
  }, [isSearchMenuDropdownOpen]);

  return (
    <AnimatePresence>
      {isSearchMenuDropdownOpen && (
        <motion.div
          initial={{ opacity: 0.75, y: "-100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.3 }}
          className="flex justify-end"
        >
          <div className="w-full max-w-screen-md overflow-hidden bg-bg-primary-0 md:mx-auto md:rounded-b-lg lg:mx-8">
            <form
              className="flex items-center gap-4  bg-bg-primary-600/75 px-4 text-text-primary-600 dark:bg-bg-primary-400"
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                setProductTitleQuery(formData.get("productTitleQuery"));
              }}
            >
              <Clickable
                variants={null}
                className="transition-all duration-100 focus:bg-black/25"
                type="submit"
              >
                <BiSearchAlt2 className="text-[125%]" />
              </Clickable>
              <div className="my-2 flex flex-grow overflow-hidden rounded-3xl bg-bg-primary-0">
                <input
                  ref={productTitleQueryInputRef}
                  type="search"
                  className="flex-grow bg-transparent px-3 outline-none"
                  placeholder="What are you looking for? (min of 3 characters)"
                  name="productTitleQuery"
                  min={3}
                  defaultValue={productTitleQuery}
                />
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchMenuDropdown;
