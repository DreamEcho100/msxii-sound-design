import React from 'react';
import ReactMarkdownFormatter from '~/components/shared/ReactMarkdownFormatter';
import BoxEditOverlay from './BoxEditOverlay';
import { BoxTypeMd, PageStoreApi } from './_';
import { BoxTypes } from '@prisma/client';
import { useStore } from 'zustand';
import { getValueByPathArray } from '~/utils/obj/update';

type Props = {
	box: BoxTypeMd;
	parentBox?: BoxTypes;
	boxDeepLevel: number;
	path: (string | number)[];
	pageStore: PageStoreApi;
	className?: string;
};

const MdBoxComp = (props: Props) => {
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeMd,
	);

	console.log('____ box', box);

	return (
		<div className={props.className}>
			<ReactMarkdownFormatter content={props.box.mdBox.content} />
			<BoxEditOverlay
				boxDeepLevel={props.boxDeepLevel}
				box={props.box}
				path={[...props.path, 'mdBox']}
				pageStore={props.pageStore}
			/>
		</div>
	);
};

export default MdBoxComp;
