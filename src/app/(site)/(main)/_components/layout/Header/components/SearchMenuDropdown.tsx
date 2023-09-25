"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiSearchAlt2, BiX } from "react-icons/bi";
import { useStore } from "zustand";
import Clickable from "~/app/components/core/Clickable";
import { globalStore } from "~/app/libs/store";

const SearchMenuDropdown = () => {
  const productTitleQueryInputRef = useRef<HTMLInputElement>(null);
  // useSearchParams()
  const [formValues, setFormValues] = useState({
    productTitleQuery: "",
  });
  const isSearchMenuDropdownOpen = useStore(
    globalStore,
    (store) => store.menus.isSearchMenuDropdownOpen,
  );

  const router = useRouter();

  useEffect(() => {
    if (isSearchMenuDropdownOpen) productTitleQueryInputRef.current?.focus();
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

                if (
                  formValues.productTitleQuery.length !== 0 &&
                  formValues.productTitleQuery.length < 3
                )
                  return;

                router.push(
                  `/products?productTitleQuery=${formValues.productTitleQuery}`,
                );
              }}
            >
              <Clickable
                variants={null}
                className=" transition-all duration-100 focus:bg-black/25"
                type="submit"
              >
                <BiSearchAlt2 className="text-[125%]" />
              </Clickable>
              <div className="my-2 flex flex-grow overflow-hidden rounded-3xl bg-bg-primary-0">
                <input
                  ref={productTitleQueryInputRef}
                  type="search"
                  className="flex-grow bg-transparent px-3 outline-none"
                  placeholder="What are you looking for?"
                  name="productTitleQuery"
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  value={formValues.productTitleQuery}
                />
                <Clickable
                  variants={null}
                  className="px-2 py-1 text-text-primary-300"
                  onClick={() => {
                    setFormValues(() => ({ productTitleQuery: "" }));
                    productTitleQueryInputRef.current?.focus();
                  }}
                >
                  <BiX className="text-[125%]" />
                </Clickable>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchMenuDropdown;
