import type { ReactNode } from 'react';

import MainLayoutHeader from './Header';
import MainLayoutFooter from './Footer';
// import {  } from 'react-icons/fa'

type Props = {
	children: ReactNode;
};

const MainLayout = (props: Props) => {
	return (
		<>
			<MainLayoutHeader />
			{/* min-h-main-content */}
			<main className="mx-auto mt-main-header-h max-w-main">
				{props.children}
			</main>
			<MainLayoutFooter />
		</>
	);
};

export default MainLayout;
