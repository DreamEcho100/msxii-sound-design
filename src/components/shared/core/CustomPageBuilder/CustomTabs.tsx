import {
	Box,
	PageStoreApi,
	SectionBoxContainer,
	type TabsHolderBox,
} from './_';

import { type ReactNode } from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { cx } from 'class-variance-authority';

export default function CustomTabs(props: {
	box: TabsHolderBox;
	className: string;
	boxDeepLevel: number;
	childrenAfter?: ReactNode;
	path: (string | number)[];
	pageStore: PageStoreApi;
}) {
	const newBoxDeepLevel = props.boxDeepLevel + 1;

	return (
		<div>
			<Tabs.Root
				className={cx('flex flex-col gap-5 leading-7 w-full', props.className)}
				defaultValue={props.box.boxesToTabsHolders[0]?.title}
			>
				<Tabs.List
					className="w-full flex gap-4 items-center justify-center md:justify-start md:items-start"
					aria-label="Manage your account"
				>
					{props.box.boxesToTabsHolders.map((boxToTabsHolder) => (
						<Tabs.Trigger
							key={boxToTabsHolder.id}
							className={cx(
								'text-h4 font-light border-[0.125rem] border-solid border-transparent',
								'data-[state=active]:font-bold data-[state=active]:border-solid data-[state=active]:pb-1 data-[state=active]:border-b-text-primary-400 data-[state=active]:text-text-primary-600',
								props.childrenAfter && 'relative z-[99]',
							)}
							value={boxToTabsHolder.title}
						>
							{boxToTabsHolder.title}
						</Tabs.Trigger>
					))}
				</Tabs.List>

				{props.box.boxesToTabsHolders.map(
					(boxToTabsHolder, boxToTabsHolderIndex) => (
						<Tabs.Content
							key={boxToTabsHolder.boxId}
							className=""
							value={boxToTabsHolder.title}
						>
							<SectionBoxContainer
								box={boxToTabsHolder.box as Box}
								boxDeepLevel={newBoxDeepLevel}
								path={[
									...props.path,
									'tabsHolder',
									'boxesToTabsHolders',
									boxToTabsHolderIndex,
									'box',
								]}
								pageStore={props.pageStore}
							/>
						</Tabs.Content>
					),
				)}
			</Tabs.Root>
			{props.childrenAfter}
		</div>
	);
}
