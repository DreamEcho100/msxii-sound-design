import { dashboardStore } from '~/components/layouts/Dashboard/utils';
import { PageStoreApi, type Box } from './_';
import { useStore } from 'zustand';
import { EditSideMenuPortal } from '~/components/layouts/Dashboard/components/Menus/Edit';
import { useEffect, useState } from 'react';

export default function BoxEditOverlay(props: {
	boxDeepLevel: number;
	box: Box;
	path: (string | number)[];
	pageStore: PageStoreApi;
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

						console.log('\n\n\n');
						console.group('BoxEditOverlay');
						console.log('___ box', props.box);
						console.log('___ path', props.path);
						console.groupEnd();
						console.log('\n\n\n');
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
				<EditSideMenuPortal>{props.path.toString()}</EditSideMenuPortal>
			)}
		</>
	);
}
