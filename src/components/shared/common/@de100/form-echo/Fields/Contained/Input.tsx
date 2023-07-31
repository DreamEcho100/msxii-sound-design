import { type HTMLAttributes } from 'react';
import FieldContainer, {
	type FieldContainerSpecialProps,
} from '../Container/Field';

import InputField, { type InputFieldProps } from '../Input';

type Props<Fields, ValidatedFields> = InputFieldProps<Fields, ValidatedFields> &
	Omit<
		FieldContainerSpecialProps<Fields, ValidatedFields>,
		'store' | 'name' | 'classVariants'
	> & {
		containerProps?: HTMLAttributes<HTMLDivElement>;
		containerClassVariants?: FieldContainerSpecialProps<
			Fields,
			ValidatedFields
		>['classVariants'];
	};

const ContainedInputField = <Fields, ValidatedFields>(
	props: Props<Fields, ValidatedFields>,
) => {
	const {
		containerClassVariants,
		labelAndFieldContainerClassVariants: labelAndInputContainerClassVariants,
		labelClassVariants,
		labelProps,
		htmlFor,
		containerProps = {},
		...formFieldProps
	} = props;

	return (
		<FieldContainer
			{...containerProps}
			store={props.store}
			name={props.name}
			classVariants={containerClassVariants}
			labelAndFieldContainerClassVariants={labelAndInputContainerClassVariants}
			labelClassVariants={labelClassVariants}
			labelProps={labelProps}
			htmlFor={htmlFor}
		>
			<InputField {...formFieldProps} />
		</FieldContainer>
	);
};

export default ContainedInputField;
