import { cx } from 'class-variance-authority';
import { createPortal } from 'react-dom';
import { type ReactNode } from 'react';
import { Dialog } from '@headlessui/react';

export default function EditBoxModal(props: {
	EditSideMenuChildren: ReactNode;
	ShowcaseBoxChildren: ReactNode;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean | ((isOpen: boolean) => boolean)) => void;
}) {
	if (typeof window === 'undefined') return <></>;

	const bodyElem = document.body;

	if (!bodyElem) return <></>;

	return createPortal(
		<Dialog
			as="div"
			onClose={() => props.setIsOpen(false)}
			className={cx(
				'fixed inset-0 z-10 bg-black/50 w-full h-full flex',
				'block', // props.isOpen ? 'block' : 'hidden',
			)}
			open={props.isOpen}
		>
			<div className="flex-grow w-full h-full relative">
				<Dialog.Overlay
					onClick={() => props.setIsOpen(false)}
					className="cursor-pointer absolute inset-0 bg-black/50 w-full h-full"
				/>
				<Dialog.Panel className="flex-grow w-full h-full relative flex justify-between gap-16 p-8 pointer-events-none">
					<div className="bg-white py-12 px-8 overflow-y-auto flex flex-col flex-grow w-full h-full pointer-events-auto">
						{props.ShowcaseBoxChildren}
					</div>
					<div className="w-[40rem] py-12 px-8 bg-white pointer-events-auto select-auto flex flex-col gap-8 overflow-y-auto">
						{props.EditSideMenuChildren}
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>,
		bodyElem,
	);
}
