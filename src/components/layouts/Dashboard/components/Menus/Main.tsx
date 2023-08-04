import Link from "next/link";
import { BiX } from "react-icons/bi";
import { api } from "~/utils/api";
import { dashboardStore } from "../../utils";
import { useStore } from "zustand";
import { Dialog as HUDialog } from "@headlessui/react";
import { cx } from "class-variance-authority";

export default function MainSideMenu() {
  const pagesCategoriesQuery = api.dashboard.pagesCategories.getAll.useQuery();

  const isSideMainOpen = useStore(
    dashboardStore,
    (store) => store.menu.sideMain.isOpen
  );
  const setMenuIsOpen = useStore(
    dashboardStore,
    (store) => store.utils.setMenuIsOpen
  );

  return (
    <HUDialog
      as="div"
      onClose={() => {
        console.log("___");
      }}
      className={cx(
        "absolute inset-0 z-10 flex h-full w-full items-center justify-center",
        "block" // props.isOpen ? 'block' : 'hidden',
      )}
      open={isSideMainOpen}
    >
      <HUDialog.Overlay
        onClick={() => setMenuIsOpen("sideMain", false)}
        className="absolute inset-0 h-full w-full cursor-pointer bg-black/50"
      />
      <div className="pointer-events-none relative flex h-full w-full flex-grow justify-start">
        <HUDialog.Panel className="pointer-events-auto h-full bg-initial-primary-500 py-8 text-initial-secondary-0">
          <nav className="flex flex-col items-center gap-2">
            <ul>
              <li className="flex flex-col capitalize">
                <p className="px-12">custom pages</p>
                {pagesCategoriesQuery.isLoading ? (
                  <p className="px-12">
                    <span className="px-2" />
                    <span>Loading...</span>
                  </p>
                ) : pagesCategoriesQuery.isError ? (
                  <p className="px-12">
                    <span className="px-2" />
                    <span>
                      <BiX className="bg-red-500" />
                    </span>
                  </p>
                ) : (
                  <ul className="flex flex-col">
                    {pagesCategoriesQuery.data.map((pageCategory) => (
                      <li key={pageCategory.id}>
                        <Link
                          className="flex px-12 py-1 capitalize hover:bg-initial-primary-400/70"
                          href={`/dashboard/custom-pages/${pageCategory.name}?isAPage=${pageCategory.isAPage}`}
                          onClick={() => setMenuIsOpen("sideMain", false)}
                        >
                          <span className="px-2" />
                          <span>
                            {pageCategory.name.replaceAll("-", " ")}&nbsp;(
                            {pageCategory.counter})
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </HUDialog.Panel>
      </div>
    </HUDialog>
  );
}
