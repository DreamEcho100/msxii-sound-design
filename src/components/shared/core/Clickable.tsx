import { VariantProps, cva } from 'class-variance-authority';
import { default as ClickableBase, ClickableTypes } from '../Clickable';
import type { ClickableProps } from '../Clickable';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

const sharedAnimationClasses = 'duration-150 transition-all';

const handleClickableVariants = cva('', {
	variants: {
		btn: {
			primary: `bg-initial-primary-900 text-initial-secondary-0 hover:bg-initial-primary-100 hover:text-initial-secondary-900 ${sharedAnimationClasses}`,
			secondary: `bg-initial-primary-300 dark:bg-initial-primary-300 text-initial-secondary-0 hover:bg-initial-primary-500 hover:text-initial-primary-0 ${sharedAnimationClasses}`,
			'light:primary_dark:secondary': [
				sharedAnimationClasses,
				'bg-initial-primary-900 text-initial-secondary-0 hover:bg-initial-primary-100 hover:text-initial-secondary-900',
				'dark:bg-initial-primary-300 dark:text-initial-secondary-0 dark:hover:bg-initial-primary-500 dark:hover:text-initial-primary-0',
			],
		},
		transform: {
			'hover:x0-y-7.5%': 'hover:-translate-y-[7.5%]',
		},
		w: { fit: 'w-fit', full: 'w-full' },
		py: {
			'extra-sm': 'py-1',
			sm: 'py-2',
			'semi-md': 'py-3',
			md: 'py-4',
			lg: 'py-6',
			xl: 'py-8',
			'2xl': 'py-10',
			'3xl': 'py-12',
		},
		px: {
			'extra-sm': 'px-1',
			sm: 'px-2',
			'semi-md': 'px-3',
			md: 'px-4',
			lg: 'px-6',
			xl: 'px-8',
			'2xl': 'px-10',
			'3xl': 'px-12',
		},
		rounded: {
			md: 'rounded-md',
			'3xl': 'rounded-3xl',
			'3xl.2': 'rounded-[1.75rem]',
			full: 'rounded-full',
		},
		'font-weight': {
			light: 'font-light',
			normal: 'font-normal',
			medium: 'font-medium',
		},
		disabled: {
			true: 'bg-opacity-75 brightness-50 backdrop-grayscale grayscale backdrop-blur-sm backdrop-opacity-75 cursor-not-allowed',
		},
	},
	defaultVariants: { transform: 'hover:x0-y-7.5%' },
});

type Props = {
	variants?: VariantProps<typeof handleClickableVariants> | null;
	className?: string;
	disabled?: boolean;
} & ClickableProps;

const Clickable = ({ variants = {}, className, ...props }: Props) => {
	const pathname = usePathname();
	const isInDashboard = pathname?.startsWith('/dashboard');

	const handleClassName = useCallback(
		(clickableType: ClickableTypes) => {
			type Variants = typeof variants;
			const handleDefaultVariant = <
				VariantKey extends keyof NonNullable<Variants>,
			>({
				variantDefaultValue,
				variantDefaultValueCondition,
				passedVariantValue,
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
							disabled:
								variants.disabled === null
									? false
									: handleDefaultVariant<'disabled'>({
											passedVariantValue: variants.disabled || !!props.disabled,
											variantDefaultValue: null,
											variantDefaultValueCondition: () =>
												clickableType === 'button',
									  }),
							btn: handleDefaultVariant<'btn'>({
								passedVariantValue: variants.btn,
								variantDefaultValue: 'primary',
								variantDefaultValueCondition: () => clickableType === 'button',
							}),
							px: handleDefaultVariant<'px'>({
								passedVariantValue: variants.px,
								variantDefaultValue: '2xl',
								variantDefaultValueCondition: () => clickableType === 'button',
							}),
							py: handleDefaultVariant<'py'>({
								passedVariantValue: variants.py,
								variantDefaultValue: 'md',
								variantDefaultValueCondition: () => clickableType === 'button',
							}),
							rounded: handleDefaultVariant<'rounded'>({
								passedVariantValue: variants?.rounded,
								variantDefaultValue: '3xl',
								variantDefaultValueCondition: () => clickableType === 'button',
							}),
							w: handleDefaultVariant<'w'>({
								passedVariantValue: variants?.w,
								variantDefaultValue: 'fit',
								variantDefaultValueCondition: () => true,
							}),
							transform: handleDefaultVariant<'transform'>({
								passedVariantValue: variants.transform,
								variantDefaultValue: 'hover:x0-y-7.5%',
								variantDefaultValueCondition: () => clickableType === 'button',
							}),
							className,
					  },
			);
		},
		[className, props.disabled, variants],
	);

	if (isInDashboard && props.href && props.isA === 'next-js')
		props.href = `/dashboard/custom-pages${props.href}`;

	return <ClickableBase {...props} className={handleClassName} />;
};

export default Clickable;
