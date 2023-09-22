import type {
	OptionHTMLAttributes,
	LabelHTMLAttributes,
	HTMLAttributes,
	TextareaHTMLAttributes,
	Dispatch,
	SetStateAction,
	SelectHTMLAttributes,
} from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { TFormFieldInput } from './Input';

import { useMemo, useId } from 'react';
import { cva } from 'class-variance-authority';
import { BiChevronDown } from 'react-icons/bi';
import Input from './Input';

export interface ISharedFieldProps<T> {
	labelVariants?: VariantProps<typeof handleLabelVariants>;
	labelTextVariants?: VariantProps<typeof handleLabelTextVariants>;
	selectVariants?: VariantProps<typeof handleSelectVariants>;
	textareaVariants?: VariantProps<typeof handleTextareaVariants>;
	setValues?: Dispatch<SetStateAction<T>>;
	values?: T;
	// name?: keyof T;
	labelText?: string;
	labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
	labelChildrenHolder?: HTMLAttributes<HTMLSpanElement>;
	separatorProps?: HTMLAttributes<HTMLSpanElement>;
}

type TFormFieldComboBox<T> = SelectHTMLAttributes<HTMLSelectElement> &
	ISharedFieldProps<T> & {
		options?: OptionHTMLAttributes<HTMLOptionElement>[];
		isATextarea?: false;
		isAComboBox: true;
		selectHolderVariants?: VariantProps<typeof handleSelectHolderVariants>;
		selectArrowVariants?: VariantProps<typeof handleSelectArrowVariants>;
		selectHolderProps?: HTMLAttributes<HTMLDivElement>;
		selectArrowProps?: HTMLAttributes<HTMLSpanElement>;
	};

type TFormFieldTextarea<T> = TextareaHTMLAttributes<HTMLTextAreaElement> &
	ISharedFieldProps<T> & {
		isATextarea: true;
		isAComboBox?: false;
	};

const TextareaField = <T,>({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isATextarea,
	...props
}: TFormFieldTextarea<T>) => {
	return <textarea rows={7.5} {...props} />;
};

const ComboBoxField = <T,>({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isAComboBox,
	children,
	selectHolderVariants,
	selectArrowVariants,
	selectHolderProps = {},
	selectArrowProps = {},
	options,
	...props
}: TFormFieldComboBox<T>) => {
	return (
		<div
			{...selectHolderProps}
			className={handleSelectHolderVariants(selectHolderVariants)}
		>
			<select {...props}>
				{options
					? options.map((option, index) => <option key={index} {...option} />)
					: children}
			</select>
			<span
				{...selectArrowProps}
				className={handleSelectArrowVariants(selectArrowVariants)}
			>
				<BiChevronDown />
			</span>
		</div>
	);
};

const handleLabelVariants = cva(
	'max-w-full font-semibold flex cursor-pointer',
	{
		variants: {
			display: {
				dynamicOnSmScreens: 'flex-col sm:flex-row',
				col: 'flex-col',
				row: 'flex-row',
			},
		},
		defaultVariants: {
			display: 'dynamicOnSmScreens',
		},
	},
);
const handleLabelTextVariants = cva('font-semibold flex cursor-pointer', {
	variants: {
		items: {
			center: 'flex items-center justify-center',
			centerX: 'flex justify-center',
			centerY: 'flex items-center',
		},
		w: {
			fit: 'w-fit',
			'20%max-8rem': 'w-[20%] max-w-[8rem]',
			'20%max-6rem': 'w-[20%] max-w-[6rem]',
			'20%max-4rem': 'w-[20%] max-w-[4rem]',
		},
		case: {
			capitalize: 'capitalize',
			'keep-case': 'keep-case',
		},
	},
	defaultVariants: {
		w: 'fit',
		case: 'capitalize',
	},
});
const handleSelectVariants = cva(
	'w-full outline-none border-0 cursor-pointer appearance-none font-medium overflow-hidden',
	{
		variants: {
			theme: {
				default: [
					'ring-1 ring-inset ring-gray-400 rounded-md',
					'transition-all duration-150',
					'hover:ring-2 dover:ring-gray-100 hover:duration-300',
					'focus-within:rounded-none focus-within:ring-1 ring-inset focus-within:duration-500',
				],
			},
			p: {
				sm: 'py-2 pr-8 pl-3 rtl:pl-8 rtl:pr-3',
			},
		},
		defaultVariants: {
			theme: 'default',
			p: 'sm',
		},
	},
);
const handleSelectHolderVariants = cva('flex-grow relative');
const handleSelectArrowVariants = cva('flex justify-center absolute top-0 ', {
	variants: {
		forSelectP: {
			sm: 'w-8 h-8 translate-y-[20%] right-0 rtl:left-0',
		},
	},
	defaultVariants: {
		forSelectP: 'sm',
	},
});

const handleTextareaVariants = cva(
	'font-medium outline-none cursor-pointer border-0 flex-grow',
	{
		variants: {
			theme: {
				default: [
					'ring-1 ring-inset ring-gray-400 rounded-md',
					'transition-all duration-150',
					'hover:ring-2 dover:ring-gray-100 hover:duration-300',
					'focus:rounded-none focus:ring-1 ring-inset focus:duration-500',
				],
			},
			p: {
				sm: 'px-3 py-2',
			},
		},
		defaultVariants: {
			theme: 'default',
			p: 'sm',
		},
	},
);

const FormField = <T,>({
	labelVariants,
	labelTextVariants,
	selectVariants,
	textareaVariants,
	//
	labelProps: { children: labelChildren, ...labelProps } = {},
	labelText,
	labelChildrenHolder,
	separatorProps,
	setValues,
	values,
	...props
}: TFormFieldInput<T> | TFormFieldTextarea<T> | TFormFieldComboBox<T>) => {
	const id = useId();

	const onChange = useMemo(() => {
		let onChange = props.onChange;

		if (setValues && typeof props.name === 'string') {
			const name = props.name;

			onChange = (event: Parameters<NonNullable<typeof onChange>>[0]) => {
				setValues((prev) => {
					if (typeof prev !== 'object') return prev;

					return {
						...prev,
						[name]: event.target.value,
					};
				});
			};
		}

		return onChange;
	}, [props.name, props.onChange, setValues]);

	const value = useMemo(() => {
		let value = undefined;

		if (
			values &&
			typeof values === 'object' &&
			typeof props.name === 'string' &&
			props.name in values
		) {
			const name = props.name as keyof typeof values;

			const valuesTarget = values[name];
			if (typeof valuesTarget === 'string' || typeof valuesTarget === 'number')
				value = valuesTarget || '';
		}

		return value;
	}, [props.name, values]);

	const doesLabelExist = labelText ?? labelChildren ?? labelChildrenHolder;

	return (
		<label
			htmlFor={id}
			className={handleLabelVariants(labelVariants)}
			{...labelProps}
		>
			{doesLabelExist && (
				<span
					{...labelChildrenHolder}
					className={handleLabelTextVariants(labelTextVariants)}
				>
					{labelText ?? labelChildren}
				</span>
			)}
			{doesLabelExist && <span {...separatorProps} className="p-1" />}
			{props.isATextarea ? (
				<TextareaField
					id={id}
					className={handleTextareaVariants(textareaVariants)}
					{...props}
					onChange={onChange as typeof props.onChange}
					value={value}
				/>
			) : props.isAComboBox ? (
				<ComboBoxField
					id={id}
					className={handleSelectVariants(selectVariants)}
					{...props}
					onChange={onChange as typeof props.onChange}
					value={value}
				/>
			) : (
				<Input
					type="text"
					id={id}
					{...props}
					onChange={onChange as typeof props.onChange}
					value={value}
				/>
			)}
		</label>
	);
};

export default FormField;
