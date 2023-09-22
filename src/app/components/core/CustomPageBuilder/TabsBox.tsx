"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { cx } from "class-variance-authority";
import { type TabsBox } from "~/libs/utils/types/custom-page";
import { SectionBodyBox } from "./SectionBodyBox";

export default function TabsBoxComp({
  box,
  className,
}: {
  box: TabsBox;
  className: string;
}) {
  return (
    <Tabs.Root
      className={cx("flex w-full flex-col gap-5 leading-7", className)}
      defaultValue={box.tabs[0]?.title}
    >
      <Tabs.List
        className="flex w-full items-center justify-center gap-4 md:items-start md:justify-start"
        aria-label="Manage your account"
      >
        {box.tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.title}
            className={cx(
              "border-[0.125rem] border-solid border-transparent text-h4 font-light",
              "data-[state=active]:border-solid data-[state=active]:border-b-text-primary-400 data-[state=active]:pb-1 data-[state=active]:font-bold data-[state=active]:text-text-primary-600",
            )}
            value={tab.title}
          >
            {tab.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {box.tabs.map((tab) => (
        <Tabs.Content key={tab.title} className="" value={tab.title}>
          <SectionBodyBox box={tab.data} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}