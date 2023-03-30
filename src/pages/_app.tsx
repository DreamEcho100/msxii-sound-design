import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '~/utils/api';

import '~/styles/globals.css';
import '~/styles/swiper.css';
import MainLayout from '~/components/layouts/Main';
import { useGlobalStore } from '~/store';
import { useEffect } from 'react';
import { getCurrentThemeFromLocalStorage } from '~/store/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	const { changeCurrentTheme } = useGlobalStore((store) => store.themeConfig);

	useEffect(
		() => changeCurrentTheme(getCurrentThemeFromLocalStorage()),
		[changeCurrentTheme]
	);

	useEffect(() => {
		setTimeout(
			() =>
				typeof document !== 'undefined' &&
				(
					document.querySelectorAll('button a')[0] as HTMLElement | null
				)?.focus(),
			100
		);
	}, []);

	return (
		<SessionProvider session={session}>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
			<ReactQueryDevtools initialIsOpen={false} />
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
