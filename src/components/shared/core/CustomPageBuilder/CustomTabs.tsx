import {
	Box,
	BoxTypeTabs,
	PageStoreApi,
	SectionBoxContainer,
	type TabsBox,
} from './_';

import { type ReactNode } from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { cx } from 'class-variance-authority';
import BordersContainer from './BordersContainer';
import { usePathname } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import Form from '../../common/@de100/form-echo/Forms';
import { useCreateFormStore } from '@de100/form-echo';
import { z } from 'zod';
import ContainedInputField from '../../common/@de100/form-echo/Fields/Contained/Input';
import { api } from '~/utils/api';
import { toast } from 'react-toastify';
import { getValueByPathArray, newUpdatedByPathArray } from '~/utils/obj/update';
import { useStore } from 'zustand';

const EditBoxModal = (props: {
	box: TabsBox;
	boxDeepLevel: number;
	path: (string | number)[];
	pageStore: PageStoreApi;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean | ((isOpen: boolean) => boolean)) => void;
	title: string;
	boxToTabsId: string;
	onSuccess: (
		// result: RouterOutputs['dashboard']['boxes']['types']['tabs']['updateOneName'],
		params: {
			validatedValues: { title: string };
		},
	) => void;
}) => {
	const formStore = useCreateFormStore({
		initValues: { title: props.title },
		validationSchema: { title: z.string().min(3) },
		validationEvents: { change: true },
	});
	const updateOneRequest =
		api.dashboard.boxes.types.tabs.updateOneName.useMutation({
			onError(error) {
				toast(error.message, { type: 'error' });
			},
			onSuccess() {
				toast('Successful submission!', { type: 'success' });
			},
		});

	return (
		<Dialog
			as="div"
			onClose={() => props.setIsOpen(false)}
			className={cx(
				'fixed inset-0 z-10 bg-black/50 w-full h-full flex',
				'block', // props.isOpen ? 'block' : 'hidden',
			)}
			open={props.isOpen}
		>
			<div className="flex-grow w-full h-full relative flex items-center justify-center">
				<Dialog.Overlay
					onClick={() => props.setIsOpen(false)}
					className="cursor-pointer absolute inset-0 bg-black/50 w-full h-full"
				/>
				<Dialog.Panel className="pointer-events-none relative">
					<div className="pointer-events-auto w-72 max-w-screen-sm bg-white p-8 rounded-md">
						<Form
							onSubmit={async (event, params) => {
								event.preventDefault();
								await updateOneRequest.mutateAsync({
									boxToTabsId: props.boxToTabsId,
									...params.validatedValues,
								});

								props.onSuccess(params);
							}}
							store={formStore}
						>
							<ContainedInputField
								store={formStore}
								name="title"
								labelProps={{ children: 'title' }}
							/>
							<button
								type="submit"
								disabled={updateOneRequest.isLoading}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								submit
							</button>
						</Form>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default function CustomTabs(props: {
	box: TabsBox;
	className: string;
	boxDeepLevel: number;
	childrenAfter?: ReactNode;
	path: (string | number)[];
	pageStore: PageStoreApi;
}) {
	const pathname = usePathname();
	const box = useStore(
		props.pageStore,
		(state) => getValueByPathArray(state.page, props.path) as BoxTypeTabs,
	);

	const isTabsEditable = pathname.startsWith('/dashboard');

	const newBoxDeepLevel = props.boxDeepLevel + 1;

	return (
		<div>
			<Tabs.Root
				className={cx('flex flex-col gap-5 leading-7 w-full', props.className)}
				defaultValue={box.tabs.boxesToTabs[0]?.title}
			>
				<Tabs.List
					className="w-full flex gap-4 items-center justify-center md:justify-start md:items-start box-container"
					aria-label="Manage your account"
				>
					{box.tabs.boxesToTabs.map((boxToTabs, boxesToTabsIndex) => (
						<div
							key={boxToTabs.id}
							className={cx(
								isTabsEditable || props.childrenAfter ? 'relative' : undefined,
								'inline',
							)}
						>
							<Tabs.Trigger
								className={cx(
									'text-h4 font-light border-[0.125rem] border-solid border-transparent',
									'data-[state=active]:font-bold data-[state=active]:border-solid data-[state=active]:pb-1 data-[state=active]:border-b-text-primary-400 data-[state=active]:text-text-primary-600',
									isTabsEditable || props.childrenAfter ? 'z-[99]' : undefined,
								)}
								value={boxToTabs.title}
							>
								{boxToTabs.title}
							</Tabs.Trigger>
							{isTabsEditable && (
								<BordersContainer
									borderAtTheEnd
									// boundaryMultiType={props.boundaryMultiType}
									Component={EditBoxModal}
									// EditSideMenuChildren={props.EditSideMenuChildren}
									// ShowcaseBoxChildren={props.ShowcaseBoxChildren}
									// childrenAfter={props.childrenAfter}
									onSuccess={(params: {
										validatedValues: {
											title: string;
										};
									}) => {
										props.pageStore.getState().utils.setPage((page) => {
											return newUpdatedByPathArray<
												// eslint-disable-next-line @typescript-eslint/ban-types
												Exclude<typeof page, Function>
											>(
												[
													...props.path,
													'tabs',
													'boxesToTabs',
													boxesToTabsIndex,
												],
												page,
												(prev: BoxTypeTabs['tabs']['boxesToTabs'][number]) => ({
													...prev,
													title: params.validatedValues.title,
												}),
											);
										});
									}}
									box={box.tabs}
									boxDeepLevel={props.boxDeepLevel}
									path={[
										...props.path,
										'tabs',
										'boxesToTabs',
										boxesToTabsIndex,
									]}
									pageStore={props.pageStore}
									// isOpen: boolean;
									// setIsOpen: (isOpen: boolean | ((isOpen: boolean) => boolean)) => void;
									title={boxToTabs.title}
									boxToTabsId={boxToTabs.id}
								/>
							)}
						</div>
					))}
				</Tabs.List>

				{box.tabs.boxesToTabs.map((boxToTabs, boxToTabsIndex) => (
					<Tabs.Content
						key={boxToTabs.boxId}
						className=""
						value={boxToTabs.title}
					>
						<SectionBoxContainer
							box={boxToTabs.box as Box}
							boxDeepLevel={newBoxDeepLevel}
							path={[
								...props.path,
								'tabs',
								'boxesToTabs',
								boxToTabsIndex,
								'box',
							]}
							pageStore={props.pageStore}
						/>
					</Tabs.Content>
				))}
			</Tabs.Root>
			{props.childrenAfter}
		</div>
	);
}
