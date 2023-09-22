import { type HTMLAttributes } from "react";
import FieldContainer, {
  type FieldContainerSpecialProps,
} from "../Container/Field";

import DropdownField, {
  type TSelectType,
  type DropdownFieldProps,
} from "../Dropdown";
import { useStore } from "zustand";

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
  Pick<
    FieldContainerSpecialProps<Fields, ValidatedFields>,
    | "labelAndFieldContainerClassVariants"
    | "labelClassVariants"
    | "labelProps"
    | "htmlFor"
  > & {
    containerProps?: HTMLAttributes<HTMLDivElement>;
    containerClassVariants?: FieldContainerSpecialProps<
      Fields,
      ValidatedFields
    >["classVariants"];
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
    containerClassVariants,
    labelAndFieldContainerClassVariants,
    labelClassVariants,
    labelProps,
    htmlFor,
    containerProps = {},
    validationName,
    ...formFieldProps
  } = props;

  const id = useStore(
    props.store,
    (state) => state.fields[props.name].metadata.id,
  );

  return (
    <FieldContainer
      {...containerProps}
      store={props.store}
      name={props.name}
      validationName={validationName}
      classVariants={containerClassVariants}
      labelAndFieldContainerClassVariants={labelAndFieldContainerClassVariants}
      labelClassVariants={labelClassVariants}
      labelProps={labelProps}
      htmlFor={htmlFor ?? id}
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
