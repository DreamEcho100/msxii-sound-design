import { type Key, type ReactNode } from 'react';

import { Disclosure } from '@headlessui/react';
// import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { BiChevronUp } from 'react-icons/bi';

type Props = {
	disclosures: (Parameters<typeof Disclosure>[0] & {
		triggerProps?: Parameters<(typeof Disclosure)['Button']>[0];
		titleElem?: ReactNode;
		contentProps?: Parameters<(typeof Disclosure)['Panel']>[0];
		contentChildren: ReactNode;
		key: Key;
	})[];
};

export default function Accordion(props: Props) {
	return (
		<div className="flex flex-col gap-4">
			{props.disclosures.map(
				({
					triggerProps: buttonProps = {},
					contentProps: panelProps = {},
					key,
					titleElem,
					contentChildren: contentElem,
					...disclosure
				}) => (
					<Disclosure {...disclosure} key={key}>
						{({ open }) => (
							<>
								<Disclosure.Button
									className="flex w-full justify-between bg-neutral-900 px-4 py-2 text-left text-sm font-medium text-neutral-100 hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-neutral-700 focus-visible:ring-opacity-75 group"
									{...buttonProps}
								>
									{buttonProps.children ? (
										buttonProps.children
									) : (
										<>
											<span>{titleElem}</span>
											<div className="flex items-center justify-center h-full">
												<BiChevronUp
													className={`${
														open ? 'rotate-180 transform' : ''
													} h-5 w-5 text-neutral-700 group-hover:text-neutral-100 group-focus:text-neutral-100`}
												/>
											</div>
										</>
									)}
								</Disclosure.Button>
								<Disclosure.Panel {...panelProps}>
									{contentElem}
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				),
			)}
		</div>
	);
}
