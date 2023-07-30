import { type HTMLAttributes } from 'react';
import FieldContainer, { type FieldContainerProps } from '../Container/Field';

import DropdownField, {
	type TSelectType,
	type DropdownFieldProps,
} from '../Dropdown';

type Props<
	Fields,
	ValidatedFields,
	Name extends keyof Fields,
	SelectType extends TSelectType = undefined,
	TData = unknown,
	FormattedData = undefined,
> = DropdownFieldProps<
	Fields,
	ValidatedFields,
	Name,
	SelectType,
	TData,
	FormattedData
> &
	Omit<
		FieldContainerProps<Fields, ValidatedFields>,
		'store' | 'name' | 'children' | 'className'
	> & {
		containerProps?: HTMLAttributes<HTMLDivElement>;
		validationName?: keyof ValidatedFields & string;
	};

const ContainedDropdownField = <
	Fields,
	ValidatedFields,
	Name extends keyof Fields,
	SelectType extends TSelectType = undefined,
	TData = unknown,
	FormattedData = undefined,
>(
	props: Props<Fields, ValidatedFields, Name, SelectType, TData, FormattedData>,
) => {
	const {
		classVariants,
		labelAndFieldContainerClassVariants,
		labelClassVariants,
		labelProps,
		htmlFor,
		containerProps = {},
		validationName,
		...formFieldProps
	} = props;

	return (
		<FieldContainer
			{...containerProps}
			store={props.store}
			name={props.name}
			validationName={validationName}
			classVariants={classVariants}
			labelAndFieldContainerClassVariants={labelAndFieldContainerClassVariants}
			labelClassVariants={labelClassVariants}
			labelProps={labelProps}
			htmlFor={htmlFor}
		>
			<DropdownField
				{
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					...(formFieldProps as any)
					// 	as unknown as DropdownFieldProps<
					//   Fields,
					//   ValidatedFields,
					//   Name,
					//   SelectType,
					//   FormattedData
					// >
				}
			/>
		</FieldContainer>
	);
};

export default ContainedDropdownField;
