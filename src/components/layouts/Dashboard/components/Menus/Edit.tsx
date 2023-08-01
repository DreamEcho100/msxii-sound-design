import { cx } from 'class-variance-authority';
import { dashboardStore, showcaseBoxId, sideEditMenuId } from '../../utils';
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
		>
			<div className="flex-grow w-full h-full relative">
				<button
					className="cursor-pointer absolute inset-0 bg-black/50 w-full h-full"
					type="button"
					onClick={() => setMenuIsOpen('sideEdit', false)}
				/>
				<div className="flex-grow w-full h-full relative flex pointer-events-none">
					<div className="m-8 flex flex-grow w-full h-full justify-end pointer-events-auto">
						<div className="flex-grow overflow-auto pointer-events-auto select-auto" />
						<div id={showcaseBoxId} className="flex"></div>
					</div>
					<div
						className="m-8 pointer-events-auto select-auto flex"
						id={sideEditMenuId}
					/>
				</div>
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

export function ShowcaseBoxPortal(props: PropsWithChildren) {
	if (typeof window === 'undefined') return <></>;

	const sideEditMenuElem = document.getElementById(showcaseBoxId);

	if (!sideEditMenuElem) return <></>;

	return createPortal(props.children, sideEditMenuElem);
}
