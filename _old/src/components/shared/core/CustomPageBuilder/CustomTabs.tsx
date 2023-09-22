import {
  type Box,
  type BoxTypeTabs,
  type PageStoreApi,
  SectionBoxContainer,
  type TabsBox,
} from "./_";

import { type ReactNode } from "react";

import * as Tabs from "@radix-ui/react-tabs";
import { cx } from "class-variance-authority";
import BordersContainer from "./BordersContainer";
import { usePathname } from "next/navigation";
import { useCreateFormStore } from "@de100/form-echo";
import { z } from "zod";
import Form from "~/components/shared/common/@de100/form-echo/Forms";
import ContainedInputField from "~/components/shared/common/@de100/form-echo/Fields/Contained/Input";
import Dialog from "~/components/shared/common/Dialog";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { getValueByPathArray, newUpdatedByPathArray } from "~/utils/obj/update";
import { useStore } from "zustand";

const EditBoxModal = (props: {
  box: TabsBox;
  boxDeepLevel: number;
  path: (string | number)[];
  pageStore: PageStoreApi;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean | ((isOpen: boolean) => boolean)) => void;
  title: string;
  tabsBoxId: string;
  onSuccess: (
    // result: RouterOutputs['dashboard']['boxes']['types']['tabs']['updateOneName'],
    params: {
      validatedValues: { title: string };
    },
  ) => void;
}) => {
  const formStore = useCreateFormStore({
    initValues: { title: props.title },
    validationSchema: { title: z.string().min(3) },
    validationEvents: { change: true },
  });
  const updateOneRequest =
    api.dashboard.boxes.types.tabs.updateOneName.useMutation({
      onError(error) {
        toast(error.message, { type: "error" });
      },
      onSuccess() {
        toast("Successful submission!", { type: "success" });
      },
    });

  return (
    <Dialog setIsOpen={props.setIsOpen} isOpen={props.isOpen}>
      <Form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={async (event, params) => {
          event.preventDefault();
          await updateOneRequest.mutateAsync({
            tabsBoxId: props.tabsBoxId,
            ...params.validatedValues,
          });

          props.onSuccess(params);
        }}
        store={formStore}
      >
        <ContainedInputField
          store={formStore}
          name="title"
          labelProps={{ children: "title" }}
        />
        <button
          type="submit"
          disabled={updateOneRequest.isLoading}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          submit
        </button>
      </Form>
    </Dialog>
  );
};

export default function CustomTabs(props: {
  box: TabsBox;
  className: string;
  boxDeepLevel: number;
  childrenAfter?: ReactNode;
  path: (string | number)[];
  pageStore: PageStoreApi;
}) {
  const pathname = usePathname();
  const box = useStore(props.pageStore, (state) =>
    getValueByPathArray<BoxTypeTabs>(state.page, props.path),
  );

  const isTabsEditable = pathname.startsWith("/dashboard");

  const newBoxDeepLevel = props.boxDeepLevel + 1;

  return (
    <div>
      <Tabs.Root
        className={cx("flex w-full flex-col gap-5 leading-7", props.className)}
        defaultValue={box.tabs.tabsBoxes[0]?.title}
      >
        <Tabs.List
          className="box-container flex w-full items-center justify-center gap-4 md:items-start md:justify-start"
          aria-label="Manage your account"
        >
          {box.tabs.tabsBoxes.map((tabsBox, tabsBoxesIndex) => (
            <div
              key={tabsBox.id}
              className={cx(
                isTabsEditable || props.childrenAfter ? "relative" : undefined,
                "inline",
              )}
            >
              <Tabs.Trigger
                className={cx(
                  "border-[0.125rem] border-solid border-transparent text-h4 font-light",
                  "data-[state=active]:border-solid data-[state=active]:border-b-text-primary-400 data-[state=active]:pb-1 data-[state=active]:font-bold data-[state=active]:text-text-primary-600",
                  isTabsEditable || props.childrenAfter ? "z-[99]" : undefined,
                )}
                value={tabsBox.title}
              >
                {tabsBox.title}
              </Tabs.Trigger>
              {isTabsEditable && (
                <BordersContainer
                  borderAtTheEnd
                  // boundaryMultiType={props.boundaryMultiType}
                  Component={EditBoxModal}
                  // EditSideMenuChildren={props.EditSideMenuChildren}
                  // ShowcaseBoxChildren={props.ShowcaseBoxChildren}
                  // childrenAfter={props.childrenAfter}
                  onSuccess={(params: {
                    validatedValues: {
                      title: string;
                    };
                  }) => {
                    props.pageStore.getState().utils.setPage((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >(
                        [...props.path, "tabs", "tabsBoxes", tabsBoxesIndex],
                        page,
                        (prev: BoxTypeTabs["tabs"]["tabsBoxes"][number]) => ({
                          ...prev,
                          title: params.validatedValues.title,
                        }),
                      );
                    });
                  }}
                  box={box.tabs}
                  boxDeepLevel={props.boxDeepLevel}
                  path={[...props.path, "tabs", "tabsBoxes", tabsBoxesIndex]}
                  pageStore={props.pageStore}
                  // isOpen: boolean;
                  // setIsOpen: (isOpen: boolean | ((isOpen: boolean) => boolean)) => void;
                  title={tabsBox.title}
                  tabsBoxId={tabsBox.id}
                />
              )}
            </div>
          ))}
        </Tabs.List>

        {box.tabs.tabsBoxes.map((tabsBox, tabsBoxIndex) => (
          <Tabs.Content key={tabsBox.boxId} className="" value={tabsBox.title}>
            <SectionBoxContainer
              box={tabsBox.box as Box}
              boxDeepLevel={newBoxDeepLevel}
              path={[...props.path, "tabs", "tabsBoxes", tabsBoxIndex, "box"]}
              pageStore={props.pageStore}
            />
          </Tabs.Content>
        ))}
      </Tabs.Root>
      {props.childrenAfter}
    </div>
  );
}
