"use client";
import {
  type Bx,
  type BxTypeTabs,
  type TabsBx,
  type PgStoreApi,
} from "./types";
import { type ReactNode } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { cx } from "class-variance-authority";
import BordersContainer from "./BordersContainer";
import { usePathname } from "next/navigation";
import { useCreateFormStore } from "@de100/form-echo";
import { z } from "zod";
import { toast } from "react-toastify";
import { useStore } from "zustand";
import { trpcApi } from "~/app/libs/trpc/client";
import ContainedInputField from "../../common/@de100/form-echo/Fields/Contained/Input";
import Form from "../../common/@de100/form-echo/Forms";
import Dialog from "../../common/Dialog";
import { getValueByPathArray, newUpdatedByPathArray } from "~/libs/obj/update";
import { SectionBoxContainer } from "./SectionBoxContainer";

const EditBoxModal = (props: {
  bx: TabsBx;
  bxDeepLevel: number;
  path: (string | number)[];
  pageStore: PgStoreApi;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean | ((isOpen: boolean) => boolean)) => void;
  title: string;
  tabsBxId: string;
  onSuccess: (
    // result: RouterOutputs['dashboard']['bxes']['types']['tabs']['updateOneName'],
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
    trpcApi.dashboard.bxes.types.tabs.updateOneName.useMutation({
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
            tabsBxId: props.tabsBxId,
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
  bx: TabsBx;
  className: string;
  bxDeepLevel: number;
  childrenAfter?: ReactNode;
  path: (string | number)[];
  pageStore: PgStoreApi;
}) {
  const pathname = usePathname();
  const bx = useStore(props.pageStore, (state) =>
    getValueByPathArray<BxTypeTabs>(state.page, props.path),
  );

  const isTabsEditable = pathname.startsWith("/dashboard");

  const newBxDeepLevel = props.bxDeepLevel + 1;

  return (
    <div>
      <Tabs.Root
        className={cx("flex w-full flex-col gap-5 leading-7", props.className)}
        defaultValue={bx.tabs.tabsBxs[0]?.title}
      >
        <Tabs.List
          className="bx-container flex w-full items-center justify-center gap-4 md:items-start md:justify-start"
          aria-label="Manage your account"
        >
          {bx.tabs.tabsBxs.map((tabsBx, tabsBxsIndex) => (
            <div
              key={tabsBx.id}
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
                value={tabsBx.title}
              >
                {tabsBx.title}
              </Tabs.Trigger>
              {isTabsEditable && (
                <BordersContainer
                  borderAtTheEnd
                  // boundaryMultiType={props.boundaryMultiType}
                  Component={EditBoxModal}
                  // EditSideMenuChildren={props.EditSideMenuChildren}
                  // ShowcaseBxChildren={props.ShowcaseBxChildren}
                  // childrenAfter={props.childrenAfter}
                  onSuccess={(params: {
                    validatedValues: {
                      title: string;
                    };
                  }) => {
                    props.pageStore.getState().utils.setPg((page) => {
                      return newUpdatedByPathArray<
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        Exclude<typeof page, Function>
                      >(
                        [...props.path, "tabs", "tabsBxs", tabsBxsIndex],
                        page,
                        (prev: BxTypeTabs["tabs"]["tabsBxs"][number]) => ({
                          ...prev,
                          title: params.validatedValues.title,
                        }),
                      );
                    });
                  }}
                  bx={bx.tabs}
                  bxDeepLevel={props.bxDeepLevel}
                  path={[...props.path, "tabs", "tabsBxs", tabsBxsIndex]}
                  pageStore={props.pageStore}
                  // isOpen: boolean;
                  // setIsOpen: (isOpen: boolean | ((isOpen: boolean) => boolean)) => void;
                  title={tabsBx.title}
                  tabsBxId={tabsBx.id}
                />
              )}
            </div>
          ))}
        </Tabs.List>

        {bx.tabs.tabsBxs.map((tabsBx, tabsBxIndex) => (
          <Tabs.Content key={tabsBx.bxId} className="" value={tabsBx.title}>
            <SectionBoxContainer
              bx={tabsBx.bx as Bx}
              bxDeepLevel={newBxDeepLevel}
              path={[...props.path, "tabs", "tabsBxs", tabsBxIndex, "bx"]}
              pageStore={props.pageStore}
            />
          </Tabs.Content>
        ))}
      </Tabs.Root>
      {props.childrenAfter}
    </div>
  );
}
