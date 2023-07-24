import { cx } from 'class-variance-authority';
import { createPortal } from 'react-dom';
import { type ReactNode } from 'react';

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
		<div
			className={cx(
				'fixed inset-0 z-50 bg-black/50 w-full h-full flex',
				props.isOpen ? 'block' : 'hidden',
			)}
		>
			<div className="flex-grow w-full h-full relative">
				<div
					className="absolute inset-0 bg-black/50 w-full h-full"
					onPointerDown={(event) => {
						event.stopPropagation();

						props.setIsOpen(false);
					}}
				/>
				<div className="flex-grow w-full h-full relative flex justify-between pointer-events-none">
					<div className="m-8 flex flex-grow w-full h-full justify-end pointer-events-auto overflow-y-auto">
						{/* <div className="flex-grow overflow-auto pointer-events-auto select-auto" /> */}
						<section className="flex-grow bg-white py-12 px-8">
							{props.ShowcaseBoxChildren}
						</section>
					</div>
					<div className="m-8 pointer-events-auto select-auto flex">
						<section className="w-[30rem] py-12 px-8 flex-grow bg-white flex flex-col gap-8 overflow-y-auto">
							{props.EditSideMenuChildren}
						</section>
					</div>
				</div>
			</div>
		</div>,
		bodyElem,
	);
}
