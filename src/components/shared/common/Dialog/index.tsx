import { cx } from 'class-variance-authority';
import { type PropsWithChildren } from 'react';
import { Dialog as HUDialog } from '@headlessui/react';

type DialogProps = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean | ((isOpen: boolean) => boolean)) => void;
};

const Dialog = (props: PropsWithChildren<DialogProps>) => {
	return (
		<HUDialog
			as="div"
			onClose={() => {
				console.log('___');
			}}
			className={cx(
				'fixed inset-0 z-10 w-full h-full flex items-center justify-center',
				'block', // props.isOpen ? 'block' : 'hidden',
			)}
			open={props.isOpen}
		>
			<HUDialog.Overlay
				onClick={() => {
					console.log('___ onClick');
					props.setIsOpen(false);
				}}
				className="cursor-pointer absolute inset-0 bg-black/50 w-full h-full"
			/>
			<div className="flex-grow w-full h-full relative flex items-center justify-center pointer-events-none">
				<HUDialog.Panel className="relative w-full max-w-screen-sm bg-white p-8 rounded-md pointer-events-auto max-h-[75vh] overflow-y-auto">
					{props.children}
				</HUDialog.Panel>
			</div>
		</HUDialog>
	);
};

export default Dialog;
