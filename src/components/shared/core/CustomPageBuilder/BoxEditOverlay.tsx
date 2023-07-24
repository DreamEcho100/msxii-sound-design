import { dashboardStore } from '~/components/layouts/Dashboard/utils';
import { PageStoreApi, type Box } from './_';
import { useStore } from 'zustand';
import {
	EditSideMenuPortal,
	ShowcaseBoxPortal,
} from '~/components/layouts/Dashboard/components/Menus/Edit';
import { useEffect, useState } from 'react';
import { type ReactNode } from 'react';

export default function BoxEditOverlay(props: {
	boxDeepLevel: number;
	box: Box;
	path: (string | number)[];
	pageStore: PageStoreApi;
	EditSideMenuChild: ReactNode;
	ShowcaseBoxChild: ReactNode;
}) {
	const [isActive, setIsActive] = useState(false);
	const isSideEditMenuOpen = useStore(
		dashboardStore,
		(state) => state.menu.sideEdit.isOpen,
	);
	const setMenuIsOpen = useStore(
		dashboardStore,
		(state) => state.utils.setMenuIsOpen,
	);

	useEffect(() => {
		if (!isSideEditMenuOpen) setIsActive(false);
	}, [isSideEditMenuOpen]);

	return (
		<>
			<div
				className="box-edit-overlay"
				style={{
					zIndex: props.boxDeepLevel.toString(),
				}}
			>
				<div
					className="borders-container"
					onPointerDown={(event) => {
						event.stopPropagation();

						setMenuIsOpen('sideEdit', true);
						setIsActive(true);
					}}
				>
					<div className="top"></div>
					<div className="right"></div>
					<div className="bottom"></div>
					<div className="left"></div>
				</div>
			</div>
			{isActive && isSideEditMenuOpen && (
				<>
					<EditSideMenuPortal>{props.EditSideMenuChild}</EditSideMenuPortal>
					<ShowcaseBoxPortal>{props.ShowcaseBoxChild}</ShowcaseBoxPortal>
				</>
			)}
		</>
	);
}
