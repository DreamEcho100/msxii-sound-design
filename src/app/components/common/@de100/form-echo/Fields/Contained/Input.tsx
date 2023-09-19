"use client";
import { type HTMLAttributes } from "react";
import FieldContainer, {
  type FieldContainerSpecialProps,
} from "../Container/Field";

import InputField, { type InputFieldProps } from "../Input";
import { useStore } from "zustand";

type Props<Fields, ValidatedFields> = InputFieldProps<Fields, ValidatedFields> &
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

  const id = useStore(
    props.store,
    (state) => state.fields[props.name].metadata.id,
  );

  return (
    <FieldContainer
      {...containerProps}
      store={props.store}
      name={props.name}
      classVariants={containerClassVariants}
      labelAndFieldContainerClassVariants={labelAndInputContainerClassVariants}
      labelClassVariants={labelClassVariants}
      labelProps={labelProps}
      htmlFor={htmlFor ?? id}
    >
      <InputField {...formFieldProps} />
    </FieldContainer>
  );
};

export default ContainedInputField;
