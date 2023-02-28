import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '~/utils/api';

import '~/styles/globals.css';
import '~/styles/swiper.css';
import MainLayout from '~/components/layouts/Main';
import { useGlobalStore } from '~/utils/store';
import { useEffect } from 'react';
import { z } from 'zod';

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	const { changeCurrentTheme } = useGlobalStore((store) => store.themeConfig);

	useEffect(() => {
		let lsCurrentTheme: 'light' | 'dark';

		try {
			lsCurrentTheme = z
				.enum(['light', 'dark'])
				.parse(localStorage.getItem('currentTheme'));
		} catch (error) {
			lsCurrentTheme = 'light';
		}

		changeCurrentTheme(lsCurrentTheme);
	}, [changeCurrentTheme]);

	return (
		<SessionProvider session={session}>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
