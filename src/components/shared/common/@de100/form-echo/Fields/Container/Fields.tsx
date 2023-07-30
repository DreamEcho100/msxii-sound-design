import { type HTMLAttributes } from "react";

export type FieldsContainerProps = HTMLAttributes<HTMLDivElement>;

const FieldsContainer = (props: FieldsContainerProps) => {
  return <div className="flex flex-col gap-1" {...props} />;
};

export default FieldsContainer;
