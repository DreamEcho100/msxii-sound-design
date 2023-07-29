import { PageStoreApi, type Box } from './_';
import { useState } from 'react';
import { type ReactNode } from 'react';
import EditBoxModal from '~/components/layouts/Dashboard/components/Modals/EditBox';
import { useRouter } from 'next/router';

export default function BoxEditOverlay(props: {
	boxDeepLevel: number;
	box: Box;
	path: (string | number)[];
	pageStore: PageStoreApi;
	EditSideMenuChildren: ReactNode;
	ShowcaseBoxChildren: ReactNode;
}) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	// const isSideEditMenuOpen = useStore(
	// 	dashboardStore,
	// 	(state) => state.menu.sideEdit.isOpen,
	// );
	// const setMenuIsOpen = useStore(
	// 	dashboardStore,
	// 	(state) => state.utils.setMenuIsOpen,
	// );

	// useEffect(() => {
	// 	if (!isSideEditMenuOpen) setIsOpen(false);
	// }, [isSideEditMenuOpen]);

	if (!router.pathname.startsWith('/dashboard')) return <></>;

	return (
		<>
			<div
				className="box-edit-overlay"
				style={{
					zIndex: props.boxDeepLevel.toString(),
					top: `${(props.boxDeepLevel - 1) * 5}%`,
					right: `${(props.boxDeepLevel - 1) * 5}%`,
					bottom: `${(props.boxDeepLevel - 1) * 5}%`,
					left: `${(props.boxDeepLevel - 1) * 5}%`,
				}}
			>
				<div
					className="borders-container"
					onPointerDown={(event) => {
						event.stopPropagation();

						// setMenuIsOpen('sideEdit', true);
						setIsOpen(true);
					}}
				>
					<div className="top"></div>
					<div className="right"></div>
					<div className="bottom"></div>
					<div className="left"></div>
				</div>
			</div>
			{isOpen && (
				<EditBoxModal
					EditSideMenuChildren={props.EditSideMenuChildren}
					ShowcaseBoxChildren={props.ShowcaseBoxChildren}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			)}
		</>
	);
}
