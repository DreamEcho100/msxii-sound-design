import { type QuoteBox } from './_';

import { type ReactNode, type CSSProperties, useState } from 'react';

import CustomNextImage from '../../CustomNextImage';
import { cx } from 'class-variance-authority';

export default function Quote(props: {
	// HTMLAttributes<HTMLDivElement> &
	box: QuoteBox;
	childAfter?: ReactNode;
	className?: string;
	style?: CSSProperties
}) {
	const TEXT_MAX_LENGTH = 200;
	const isTextLong = props.box.content.length > TEXT_MAX_LENGTH;

	const [isFullTextActive, setIsFullTextActive] = useState(!isTextLong);

	return (
		<div className={cx(props.className, 'group')} style={props.style}>
			<CustomNextImage
				src={`https://api.dicebear.com/6.x/initials/svg?seed=${props.box.cite}`}
				alt={props.box.cite}
				width={150}
				height={150}
				className="w-16 h-16 rounded-full relative -translate-x-2/3 left-0"
			/>
			<div className="flex flex-col -ml-8 pt-2">
				<cite>
					<strong
						className={cx(
							'text-text-primary-500 font-semibold text-[75%]',
							'group-hover:text-special-primary-600 group-focus-within:text-special-primary-600',
							'group-hover:text-special-primary-400 group-focus-within:text-special-primary-400',
						)}
					>
						{props.box.cite}
					</strong>
				</cite>
				<q className="text-[70%] flex-grow font-medium">
					<pre
						className="whitespace-pre-wrap inline"
						style={{ fontFamily: 'inherit' }}
					>
						{isFullTextActive
							? props.box.content
							: props.box.content.slice(0, TEXT_MAX_LENGTH)}
					</pre>
					{isTextLong && (
						<>
							{isFullTextActive ? (
								<>&nbsp;&nbsp;&nbsp;&nbsp;</>
							) : (
								<>...&nbsp;</>
							)}
							<button
								className={cx(
									'text-[90%] capitalize',
									'text-special-primary-800 hover:text-special-primary-600 focus:text-special-primary-600',
									'dark:text-special-primary-600 dark:hover:text-special-primary-400 dark:focus:text-special-primary-400',
								)}
								onClick={() => setIsFullTextActive((prev) => !prev)}
							>
								<strong className="font-semibold">
									<em>see {isFullTextActive ? 'less' : 'more'}</em>
								</strong>
							</button>
						</>
					)}
				</q>
			</div>
			{props.childAfter}
		</div>
	);
}
