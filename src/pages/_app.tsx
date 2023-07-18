import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '~/utils/api';

import '~/styles/globals.css';
import '~/styles/swiper.css';
import MainLayout from '~/components/layouts/Main';
import { type ReactNode, useEffect } from 'react';
import { getCurrentThemeFromLocalStorage } from '~/store/utils';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useCheckAccessToken } from '~/utils/shopify/hooks';
import { useStore } from 'zustand';
import { globalStore } from '~/store';
import DashboardLayout from '../components/layouts/Dashboard';
import { usePathname } from 'next/navigation';

const LayoutsManager = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();

	if (pathname?.startsWith('/dashboard'))
		return <DashboardLayout>{children}</DashboardLayout>;

	return <MainLayout>{children}</MainLayout>;
};

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	const changeCurrentTheme = useStore(
		globalStore,
		(store) => store.themeConfig.changeCurrentTheme,
	);

	useCheckAccessToken();

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const oldHost = 'msxii-sound-design.vercel.app';
		const newHost = 'msxaudio.vercel.app';

		if (window.location.host === oldHost) {
			window.location.host = newHost;
		}
	}, []);

	useEffect(
		() => changeCurrentTheme(getCurrentThemeFromLocalStorage()),
		[changeCurrentTheme],
	);

	useEffect(() => {
		setTimeout(
			() =>
				typeof document !== 'undefined' &&
				(
					document.querySelectorAll('button a')[0] as HTMLElement | null
				)?.focus(),
			100,
		);
	}, []);

	return (
		<SessionProvider session={session}>
			<LayoutsManager>
				<Component {...pageProps} />
			</LayoutsManager>
			<ReactQueryDevtools initialIsOpen={false} />
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
