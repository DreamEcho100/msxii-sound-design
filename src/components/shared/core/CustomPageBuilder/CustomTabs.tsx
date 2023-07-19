import { Box, SectionBoxContainer, type TabsHolder } from './_';

import { type ReactNode } from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { cx } from 'class-variance-authority';

export default function CustomTabs({
	box,
	className,
	boxDeepLevel,
	childAfter,
}: {
	box: TabsHolder;
	className: string;
	boxDeepLevel: number;
	childAfter?: ReactNode;
}) {
	const newBoxDeepLevel = boxDeepLevel + 1;

	return (
		<div>
			<Tabs.Root
				className={cx('flex flex-col gap-5 leading-7 w-full', className)}
				defaultValue={box.boxesToTabsHolders[0]?.title}
			>
				<Tabs.List
					className="w-full flex gap-4 items-center justify-center md:justify-start md:items-start"
					aria-label="Manage your account"
				>
					{box.boxesToTabsHolders.map((boxToTabsHolder) => (
						<Tabs.Trigger
							key={boxToTabsHolder.id}
							className={cx(
								'text-h4 font-light border-[0.125rem] border-solid border-transparent',
								'data-[state=active]:font-bold data-[state=active]:border-solid data-[state=active]:pb-1 data-[state=active]:border-b-text-primary-400 data-[state=active]:text-text-primary-600',
							)}
							value={boxToTabsHolder.title}
						>
							{boxToTabsHolder.title}
						</Tabs.Trigger>
					))}
				</Tabs.List>

				{box.boxesToTabsHolders.map((boxToTabsHolder) => (
					<Tabs.Content
						key={boxToTabsHolder.boxId}
						className=""
						value={boxToTabsHolder.title}
					>
						<SectionBoxContainer
							box={boxToTabsHolder.box as Box}
							boxDeepLevel={newBoxDeepLevel}
						/>
					</Tabs.Content>
				))}
			</Tabs.Root>
			{childAfter}
		</div>
	);
}
