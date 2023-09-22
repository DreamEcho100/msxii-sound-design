import { type PropsWithChildren } from 'react';

const SectionLoaderContainer = (props: PropsWithChildren) => {
	return (
		<div className="p-8 min-h-[30rem] h-[70vh] sm:h-[50vh] max-h-[100rem] flex items-center justify-center">
			{props.children}
		</div>
	);
};

export default SectionLoaderContainer;
