"use client";
import { type Key, type ReactNode } from "react";

import { Disclosure } from "@headlessui/react";
// import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { BiChevronUp } from "react-icons/bi";

type Props<TKey extends Key> = {
  disclosures: (Parameters<typeof Disclosure>[0] & {
    triggerProps?: Parameters<(typeof Disclosure)["Button"]>[0];
    titleElem?: ReactNode;
    contentProps?: Parameters<(typeof Disclosure)["Panel"]>[0];
    contentChildren: ReactNode;
    ___key: TKey;
    isHidden?: boolean;
  })[];
  activeDisclosure?: TKey;
};

function CustomDisclosure<TKey extends Key>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ___key,
  triggerProps: buttonProps = {},
  contentProps: panelProps = {},
  titleElem,
  contentChildren,
  isHidden,
  ...props
}: Props<TKey>["disclosures"][number]) {
  if (isHidden) return <></>;

  return (
    <Disclosure {...props}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className="group flex w-full justify-between bg-neutral-900 px-4 py-2 text-left text-sm font-medium text-neutral-100 hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-neutral-700 focus-visible:ring-opacity-75"
            {...buttonProps}
          >
            {buttonProps.children ? (
              buttonProps.children
            ) : (
              <>
                <span>{titleElem}</span>
                <div className="flex h-full items-center justify-center">
                  <BiChevronUp
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-neutral-700 group-hover:text-neutral-100 group-focus:text-neutral-100`}
                  />
                </div>
              </>
            )}
          </Disclosure.Button>
          <Disclosure.Panel {...panelProps}>{contentChildren}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default function Accordion<TKey extends Key>(props: Props<TKey>) {
  return (
    <div className="flex flex-col gap-4">
      {props.disclosures.map(({ ___key, ...disclosure }) => (
        <CustomDisclosure {...disclosure} key={___key} ___key={___key} />
      ))}
    </div>
  );
}
