import { type StoreApi, createStore } from 'zustand';

export const sideEditMenuId = 'edit-side-menu';
export const showcaseBoxId = 'showcase-box-id';

type DashboardStore = {
	menu: {
		sideMain: { isOpen: boolean };
		sideEdit: { isOpen: boolean };
	};
	utils: {
		setMenuIsOpen: (
			menuName: keyof DashboardStore['menu'],
			UpdaterOrValue: boolean | ((UpdaterOrValue: boolean) => boolean),
		) => void;
	};
};

// const menuName: (keyof DashboardStore['menu'])[] = ['sideMain', 'sideEdit'];
// menuName;

export type DashboardStoreApi = StoreApi<DashboardStore>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const dashboardStore = createStore<DashboardStore>((set) => ({
	menu: {
		sideMain: { isOpen: false },
		sideEdit: { isOpen: false },
	},
	utils: {
		setMenuIsOpen: (menuName, UpdaterOrValue) =>
			set((prevState: DashboardStore) => ({
				menu: {
					...prevState.menu,
					[menuName]: {
						...prevState.menu[menuName],
						isOpen:
							typeof UpdaterOrValue === 'function'
								? UpdaterOrValue(prevState.menu[menuName].isOpen)
								: UpdaterOrValue,
					},
				},
			})),
	},
}));
