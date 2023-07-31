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

	if (!router.pathname.startsWith('/dashboard')) return <></>;

	return (
		<>
			<div
				className="box-edit-overlay"
				style={{
					zIndex: props.boxDeepLevel.toString(),
					top: `${(props.boxDeepLevel - 1) * 2}rem`,
					right: `${(props.boxDeepLevel - 1) * 2}rem`,
					bottom: `${(props.boxDeepLevel - 1) * 2}rem`,
					left: `${(props.boxDeepLevel - 1) * 2}rem`,
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
