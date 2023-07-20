import { cx } from 'class-variance-authority';
import { dashboardStore, sideEditMenuId } from '../../utils';
import { createPortal } from 'react-dom';
import { PropsWithChildren } from 'react';
import { useStore } from 'zustand';

export default function EditSideMenu() {
	const isOpen = useStore(
		dashboardStore,
		(state) => state.menu.sideEdit.isOpen,
	);
	const setMenuIsOpen = useStore(
		dashboardStore,
		(state) => state.utils.setMenuIsOpen,
	);

	if (typeof window === 'undefined') return <></>;

	const bodyElem = document.body;

	if (!bodyElem) return <></>;

	return createPortal(
		<div
			className={cx(
				'fixed inset-0 z-50 bg-black/50 w-full h-full flex',
				isOpen ? 'block' : 'hidden',
			)}
			onPointerDown={(event) => {
				event.stopPropagation();

				setMenuIsOpen('sideEdit', false);
			}}
		>
			<div className="flex flex-grow w-full h-full justify-end">
				<div id={sideEditMenuId} className="bg-slate-400 z-50" />
			</div>
		</div>,
		bodyElem,
	);
}

export function EditSideMenuPortal(props: PropsWithChildren) {
	if (typeof window === 'undefined') return <></>;

	const sideEditMenuElem = document.getElementById(sideEditMenuId);

	if (!sideEditMenuElem) return <></>;

	return createPortal(props.children, sideEditMenuElem);
}
