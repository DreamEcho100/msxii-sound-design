import React from 'react';
import Clickable from '../Clickable';
import { BsArrowRight } from 'react-icons/bs';

type Props = {
	text: string;
} & Parameters<typeof Clickable>[0];

const CTAButton = ({ text, ...props }: Props) => {
	return (
		<Clickable
			{...props}
			className="flex flex-wrap items-center gap-2 text-xl hover:gap-x-4 group-hover:gap-x-4 transition-all duration-150"
		>
			{text}{' '}
			<BsArrowRight className="scale-x-125 scale-y-110 text-special-primary-500 rtl:rotate-180" />
		</Clickable>
	);
};

export default CTAButton;
