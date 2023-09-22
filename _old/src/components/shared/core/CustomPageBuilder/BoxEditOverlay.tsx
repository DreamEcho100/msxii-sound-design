import { type PageStoreApi, type Box } from './_';
import { type ReactNode } from 'react';
import EditBoxModal from '~/components/layouts/Dashboard/components/Modals/EditBox';
import BordersContainer from './BordersContainer';

export default function BoxEditOverlay(props: {
	boxDeepLevel: number;
	box: Box;
	path: (string | number)[];
	pageStore: PageStoreApi;
	EditSideMenuChildren: ReactNode;
	ShowcaseBoxChildren: ReactNode;
	// boundaryMultiType?: 'sm' | 'semi-md';
}) {
	// if (!router.pathname.startsWith('/dashboard')) return <></>;

	return (
		<BordersContainer
			boxDeepLevel={props.boxDeepLevel}
			// boundaryMultiType={props.boundaryMultiType}
			Component={EditBoxModal}
			EditSideMenuChildren={props.EditSideMenuChildren}
			ShowcaseBoxChildren={props.ShowcaseBoxChildren}
		/>
	);
}
