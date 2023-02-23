import { VariantProps, cva } from 'class-variance-authority';
import { default as ClickableBase, ClickableTypes } from '../Clickable';
import type { ClickableProps } from '../Clickable';
import { useCallback } from 'react';

const handleClickableVariants = cva('', {
	variants: {
		btn: {
			primary:
				'font-medium bg-basic-primary-900 text-basic-secondary-900 hover:bg-basic-primary-200 hover:text-basic-secondary-200 duration-150 transition-all',
			secondary:
				'font-medium bg-basic-primary-300 text-basic-secondary-300 hover:bg-basic-primary-900 hover:text-basic-primary-100 duration-150 transition-all'
		},
		w: { fit: 'w-fit', full: 'w-full' },
		p: {
			'v1-sm': 'px-4 py-2',
			'v1-md': 'px-6 py-2',
			'v1-lg': 'px-8 py-2',
			'v1-xl': 'px-10 py-2',
			//
			'v2-sm': 'px-4 py-1',
			'v2-md': 'px-6 py-1',
			'v2-lg': 'px-8 py-1',
			'v2-xl': 'px-10 py-1'
		},
		rounded: { '3xl': 'rounded-3xl' }
	}
	// defaultVariants: { btn: 'primary', w: 'fit', rounded: '3xl' }
});

type Props = {
	variants?: VariantProps<typeof handleClickableVariants> | null;
	className?: string;
} & ClickableProps;

const Clickable = ({ variants = {}, className, ...props }: Props) => {
	const handleClassName = useCallback(
		(clickableType: ClickableTypes) => {
			return handleClickableVariants(
				typeof variants !== 'undefined' && !variants
					? { className }
					: {
							btn:
								typeof variants.btn !== 'undefined'
									? variants.btn
									: clickableType === 'button'
									? 'primary'
									: null,
							p:
								typeof variants.p !== 'undefined'
									? variants.p
									: clickableType === 'button'
									? 'v1-lg'
									: null,
							rounded:
								typeof variants.rounded !== 'undefined'
									? variants.rounded
									: clickableType === 'button'
									? '3xl'
									: null,
							...variants,
							className
					  }
			);
		},
		[className, variants]
	);

	return (
		<ClickableBase
			{...props}
			// className={(clickableType) => {
			// 	return handleClickableVariants({
			// 		...variants, className
			// 	})
			// }}
			className={handleClassName}
		/>
	);
};

export default Clickable;
