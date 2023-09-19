import { usePathname } from 'next/navigation';
import { useState } from 'react';

export type BordersContainerBaseProps = {
	setIsOpen: (UpdaterOrValue: boolean | ((isOpen: boolean) => boolean)) => void;
	isOpen: boolean;
};

export type BordersContainerProps = {
	boxDeepLevel: number;
	borderAtTheEnd?: boolean;
};

const BordersContainer = <CompProps extends BordersContainerBaseProps>(
	props: {
		Component: (props: CompProps) => React.JSX.Element;
	} & BordersContainerProps &
		Omit<CompProps, 'isOpen' | 'setIsOpen'>,
) => {
	const { boxDeepLevel, Component, borderAtTheEnd, ..._props } = props;
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	if (!pathname.startsWith('/dashboard')) return <></>;

	return (
		<>
			<div
				className="box-edit-overlay"
				style={{
					zIndex: boxDeepLevel.toString(),
					top: boxDeepLevel === 0 ? 0 : '3.5%', // `${(boxDeepLevel - 1) * boundaryMulti}rem`,
					right: boxDeepLevel === 0 ? 0 : '3.5%', // `${(boxDeepLevel - 1) * boundaryMulti}rem`,
					bottom: boxDeepLevel === 0 ? 0 : '3.5%', // `${(boxDeepLevel - 1) * boundaryMulti}rem`,
					left: borderAtTheEnd ? '50%' : boxDeepLevel === 0 ? 0 : '3.5%', // `${(boxDeepLevel - 1) * boundaryMulti}rem`,
				}}
			>
				<button
					className="cursor-pointer borders-container flex"
					type="button"
					onClick={() => setIsOpen(true)}
				>
					<div className="top"></div>
					<div className="right"></div>
					<div className="bottom"></div>
					<div className="left"></div>
				</button>
			</div>
			{isOpen && (
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				<Component {..._props} setIsOpen={setIsOpen} isOpen={isOpen} />
			)}
		</>
	);
};

export default BordersContainer;
