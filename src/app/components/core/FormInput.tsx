import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  Dispatch,
  SetStateAction,
} from "react";
import { useId } from "react";

export default function FormInput<FormValues extends Record<string, unknown>>({
  name,
  label,
  labelProps = {},
  setFormValues,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  name: keyof FormValues;
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  setFormValues: Dispatch<SetStateAction<FormValues>>;
}) {
  const baseId = useId();
  return (
    <div className="flex flex-col gap-2">
      {(labelProps || label) && (
        <label htmlFor={baseId} {...labelProps}>
          {label}
        </label>
      )}
      <input
        className="rounded-t-sm border-[0.0625rem] border-transparent border-b-text-primary-500/50 px-3 py-2 hover:border-b-text-primary-500/75 focus:border-b-text-primary-500 focus:outline-none"
        id={baseId}
        onChange={(event) =>
          setFormValues((prev) => ({
            ...prev,
            [name]: event.target.value,
          }))
        }
        {...props}
        name={name}
      />
    </div>
  );
}
