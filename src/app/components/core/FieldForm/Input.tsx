import type { VariantProps } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';
import type { ISharedFieldProps } from '.';

import { cva } from 'class-variance-authority';

export type TFormFieldInput<T> = InputHTMLAttributes<HTMLInputElement> &
	ISharedFieldProps<T> & {
		isATextarea?: false;
		isAComboBox?: false;
		variants?: VariantProps<typeof handleInputVariants>;
	};

const handleInputVariants = cva(
	'font-medium outline-none cursor-pointer border-0 flex-grow',
	{
		variants: {
			theme: {
				default: [
					'border-b border-b-gray-400 rounded-sm bg-transparent',
					'transition-all duration-150',
					'hover:ring hover:ring-inset hover:ring-gray-500 hover:ring-opacity-30 hover:duration-300',
					'focus:rounded-none focus:ring focus:ring-inset focus:ring-gray-500 hover:ring-opacity-30 focus:duration-500'
				]
			},
			p: {
				sm: 'px-3 py-2'
			}
		},
		defaultVariants: {
			theme: 'default',
			p: 'sm'
		}
	}
);

const Input = <T,>({ variants, ...props }: TFormFieldInput<T>) => {
	return <input className={handleInputVariants(variants)} {...props} />;
};

export default Input;
