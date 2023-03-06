import { VariantProps, cva } from 'class-variance-authority';
import { default as ClickableBase, ClickableTypes } from '../Clickable';
import type { ClickableProps } from '../Clickable';
import { useCallback } from 'react';

const sharedAnimationClasses =
	'duration-150 transition-all hover:-translate-y-[7.5%]';

const handleClickableVariants = cva('', {
	variants: {
		btn: {
			primary: `bg-initial-primary-900 text-initial-secondary-0 hover:bg-initial-primary-100 hover:text-initial-secondary-900 ${sharedAnimationClasses}`,
			secondary: `bg-initial-primary-200 text-initial-secondary-0 hover:bg-initial-primary-900 hover:text-initial-primary-0 ${sharedAnimationClasses}`,
			'light:primary_dark:secondary': [
				sharedAnimationClasses,
				'bg-initial-primary-900 text-initial-secondary-0 hover:bg-initial-primary-100 hover:text-initial-secondary-900',
				'dark:bg-initial-primary-200 dark:text-initial-secondary-0 dark:hover:bg-initial-primary-900 dark:hover:text-initial-primary-0'
			]
		},
		w: { fit: 'w-fit', full: 'w-full' },
		py: {
			'extra-sm': 'py-1',
			sm: 'py-2',
			'semi-sm': 'py-3',
			md: 'py-4',
			lg: 'py-6',
			xl: 'py-8',
			'2xl': 'py-10',
			'3xl': 'py-12'
		},
		px: {
			'extra-sm': 'px-1',
			sm: 'px-2',
			'semi-sm': 'px-3',
			md: 'px-4',
			lg: 'px-6',
			xl: 'px-8',
			'2xl': 'px-10',
			'3xl': 'px-12'
		},
		rounded: {
			md: 'rounded-md',
			'3xl': 'rounded-3xl',
			'3xl.2': 'rounded-[1.75rem]'
		},
		'font-weight': {
			normal: 'font-normal'
		}
	},
	defaultVariants: { 'font-weight': 'normal' }
});

type Props = {
	variants?: VariantProps<typeof handleClickableVariants> | null;
	className?: string;
} & ClickableProps;

const Clickable = ({ variants = {}, className, ...props }: Props) => {
	const handleClassName = useCallback(
		(clickableType: ClickableTypes) => {
			type Variants = typeof variants;
			const handleDefaultVariant = <
				VariantKey extends keyof NonNullable<Variants>
			>({
				variantDefaultValue,
				variantDefaultValueCondition,
				passedVariantValue
			}: {
				passedVariantValue?: NonNullable<Variants>[VariantKey];
				variantDefaultValue: NonNullable<Variants>[VariantKey];
				variantDefaultValueCondition: () => boolean;
			}) =>
				typeof passedVariantValue !== 'undefined'
					? passedVariantValue
					: variantDefaultValueCondition()
					? variantDefaultValue
					: null;

			return handleClickableVariants(
				typeof variants !== 'undefined' && !variants
					? { className }
					: {
							...variants,
							btn: handleDefaultVariant<'btn'>({
								passedVariantValue: variants.btn,
								variantDefaultValue: 'primary',
								variantDefaultValueCondition: () => clickableType === 'button'
							}),
							px: handleDefaultVariant<'px'>({
								passedVariantValue: variants.px,
								variantDefaultValue: '2xl',
								variantDefaultValueCondition: () => clickableType === 'button'
							}),
							py: handleDefaultVariant<'py'>({
								passedVariantValue: variants.py,
								variantDefaultValue: 'md',
								variantDefaultValueCondition: () => clickableType === 'button'
							}),
							rounded: handleDefaultVariant<'rounded'>({
								passedVariantValue: variants?.rounded,
								variantDefaultValue: '3xl',
								variantDefaultValueCondition: () => true
							}),
							w: handleDefaultVariant<'w'>({
								passedVariantValue: variants?.w,
								variantDefaultValue: 'fit',
								variantDefaultValueCondition: () => true
							}),
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
