import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '~/utils/api';

import '~/styles/globals.css';
import '~/styles/swiper.css';
import MainLayout from '~/components/layouts/Main';
import { useGlobalStore } from '~/utils/store';
import { useEffect } from 'react';

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	const { setCurrentThemeFromLocalStorage } = useGlobalStore(
		(store) => store.themeConfig
	);

	useEffect(
		() => setCurrentThemeFromLocalStorage(),
		[setCurrentThemeFromLocalStorage]
	);

	return (
		<SessionProvider session={session}>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
