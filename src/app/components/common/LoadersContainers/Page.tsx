import { type PropsWithChildren } from 'react';

const PageLoaderContainer = (props: PropsWithChildren) => {
	return (
		<div className="p-8 h-screen flex items-center justify-center">
			{props.children}
		</div>
	);
};

export default PageLoaderContainer;
