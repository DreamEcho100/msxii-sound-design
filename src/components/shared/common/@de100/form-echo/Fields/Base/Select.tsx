import type { Key, SelectHTMLAttributes, OptionHTMLAttributes } from "react";

import React from "react";

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
    <select {...props} className="px-3 py-2 text-base-secondary-900">
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
              key={option.key || String(option.value)}
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
