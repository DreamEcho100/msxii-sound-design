import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes } from "react";

const handleClassVariants = cva("flex", {
  variants: {
    gap: {
      sm: "gap-2",
      md: "gap-4",
    },
    dir: {
      "row-wrap": "flex-row flex-wrap",
      col: "flex-col",
    },
  },
  defaultVariants: { gap: "md", dir: "col" },
});

export type FieldsContainerProps = HTMLAttributes<HTMLDivElement> & {
  classVariants?: VariantProps<typeof handleClassVariants>;
};

const FieldsContainer = (props: FieldsContainerProps) => {
  const { classVariants = {}, ..._props } = props;
  return (
    <div
      {..._props}
      className={handleClassVariants({
        ...classVariants,
        className: _props.className,
      })}
    />
  );
};

export default FieldsContainer;
