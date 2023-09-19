"use client";
import type { Key, SelectHTMLAttributes, OptionHTMLAttributes } from "react";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  isLoading?: boolean;
  error?: { message: string } | null;
  options?: (OptionHTMLAttributes<HTMLOptionElement> & {
    value: NonNullable<OptionHTMLAttributes<HTMLOptionElement>["value"]>;
    key?: Key;
  })[];
};

const SelectFormField = ({
  isLoading,
  error,
  options = [],
  value,
  ...props
}: SelectProps) => {
  if (error) {
    return (
      <div className="px-3 py-2">
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <select {...props} className="text-base-secondary-900 px-3 py-2">
      {isLoading ? (
        <option disabled selected value="">
          Loading...
        </option>
      ) : (
        <>
          <option value="" disabled selected={!value}>
            ---select---
          </option>
          {options.map((option) => (
            <option
              key={option.key ?? String(option.value)}
              {...option}
              selected={option.value === value}
            />
          ))}
        </>
      )}
    </select>
  );
};

export default SelectFormField;
