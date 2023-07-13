import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';
// import cx from 'classnames'
import { Fragment } from 'react';
import { cx } from 'class-variance-authority';
import { createPortal } from 'react-dom';
import { BiX } from 'react-icons/bi';

interface Props {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	children: ReactNode;
}

const CustomDialog = ({ isOpen, setIsOpen, children }: Props) => {
	if (typeof document === 'undefined') return <></>;

	return createPortal(
		<DialogPrimitive.Root
			open={isOpen}
			onOpenChange={(open) => setIsOpen(open)}
		>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay
					className={cx(
						'bg-black/50 fixed inset-0 z-20',
						'duration-300 transition-all scale-0',
						'data-[state=open]:scale-100'
					)}
					onClick={() => setIsOpen(false)}
				/>
				<DialogPrimitive.Content
					className={cx(
						'z-20 fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-screen-xl-sm -translate-x-1/2 -translate-y-1/2 rounded-md bg-bg-primary-100 dark:bg-bg-primary-500 text-text-primary-400 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none',
						'duration-300 transition-all scale-0',
						'data-[state=open]:scale-100'
					)}
				>
					{children}
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>,
		document.body
	);
};

export default CustomDialog;
export const DialogContentHeader = ({
	titleProps = {},
	descriptionProps = {}
}: {
	titleProps: Parameters<typeof DialogPrimitive.Title>[0];
	descriptionProps?: Parameters<typeof DialogPrimitive.Description>[0];
}) => {
	return (
		<header className="flex flex-col gap-3">
			<DialogPrimitive.Close
				// onClick={() => setIsOpen(false)}
				asChild
			>
				<button
					type="button"
					className={cx(
						'absolute top-3 right-3 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full text-2xl',
						'text-special-primary-700 hover:text-special-primary-700/75',
						'dark:text-special-primary-500 dark:hover:text-special-primary-500/90',
						'focus:shadow-special-primary-500 focus:shadow-[0_0_0_0.125rem] focus:outline-none'
					)}
					aria-label="Close"
				>
					<BiX />
				</button>
			</DialogPrimitive.Close>
			<DialogPrimitive.Title
				className="text-text-primary-500 m-0 text-h3 font-medium"
				{...titleProps}
			/>
			<DialogPrimitive.Description
				className="text-text-primary-400 text-sm leading-normal"
				{...descriptionProps}
			/>
		</header>
	);
};

// export const CloseDialog = (
// 	props: Parameters<typeof DialogPrimitive.Close>[0]
// ) => {
// 	return (
// 		<DialogPrimitive.Close
// 			className={cx(
// 				'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
// 				'bg-purple-600 text-neutral-100 hover:bg-purple-600',
// 				'border border-transparent',
// 				'focus:outline-none focus-visible:ring-[0.125rem] focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
// 			)}
// 			{...props}
// 		/>
// 	);
// };
