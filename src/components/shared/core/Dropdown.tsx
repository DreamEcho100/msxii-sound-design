import { Menu, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import Clickable from '../core/Clickable';
import type { ButtonProps } from '../Clickable';

const Dropdown = (props: Partial<Parameters<typeof Menu>[0]>) => {
	return <Menu as="div" className="relative inline-block" {...props} />;
};

export default Dropdown;

export const DropdownItems = ({
	children,
	...props
}: Partial<Parameters<typeof Menu.Items>[0]> & {
	children: ReactNode;
}) => (
	<Transition
		as={Fragment}
		enter="transition ease-out duration-100"
		enterFrom="transform opacity-0 scale-95"
		enterTo="transform opacity-100 scale-100"
		leave="transition ease-in duration-75"
		leaveFrom="transform opacity-100 scale-100"
		leaveTo="transform opacity-0 scale-95"
	>
		<Menu.Items
			className="bg-bg-primary-600/50 backdrop absolute right-0 mt-2 flex w-full origin-top-right flex-col divide-y divide-gray-100 overflow-hidden whitespace-nowrap rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			{...props}
		>
			<div className="relative isolate">
				<div className="absolute inset-0 -z-10 bg-bg-primary-400" />
				{children}
			</div>
		</Menu.Items>
	</Transition>
);

export const DropdownItem = (
	props: Partial<Parameters<typeof Menu.Item>[0]>
) => <Menu.Item className="p-2" {...props} />;

export const DropdownButton = ({
	active,
	...props
}: Partial<ButtonProps> & {
	active?: boolean;
}) => {
	return (
		<Menu.Button
			{...props}
			as={Clickable}
			variants={null}
			className={`${
				active
					? 'bg-gradient-to-br from-initial-primary-300 to-initial-primary-500 text-special-secondary-100 transition-all duration-150'
					: ''
			} group flex w-full items-center gap-1 whitespace-nowrap`}
		/>
	);
};
