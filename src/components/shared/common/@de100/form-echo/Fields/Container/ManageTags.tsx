import { type PropsWithChildren, type Key } from "react";
import { cx } from "class-variance-authority";

type SelectManyCardProps = {
  onClick: () => void;
  name: string | number;
};

type Props<TData extends Record<string, unknown>[]> = {
  data: TData;
  getTagKey: (tag: TData[number]) => Key;
  getTagName: (tag: TData[number]) => SelectManyCardProps["name"];
  handleRemoveTag: (tag: TData[number]) => void;
};

const SelectManyCard = (props: SelectManyCardProps) => {
  return (
    <div className="group overflow-hidden rounded-md">
      <button
        type="button"
        className={cx(
          "bg-special-primary-500 px-2 py-0.5 text-white",
          "group-hover:bg-special-primary-400",
          "group-focus:bg-special-primary-600",
        )}
        onClick={props.onClick}
      >
        x
      </button>
      <span
        className={cx(
          "inline-block bg-special-primary-100 px-1 py-0.5",
          "group-hover:bg-special-primary-100/75",
          "group-focus:bg-special-primary-200",
        )}
      >
        {props.name}
      </span>
    </div>
  );
};

const ManageTagsContainer = <TData extends Record<string, unknown>[]>(
  props: PropsWithChildren<Props<TData>>,
) => {
  return (
    <fieldset className="flex max-w-full flex-grow flex-col gap-4">
      <div className="flex flex-wrap gap-1">
        {props.data.map((tag) => (
          <SelectManyCard
            key={props.getTagKey(tag)}
            name={props.getTagName(tag)}
            onClick={() => {
              props.handleRemoveTag(tag);
            }}
          />
        ))}
      </div>
      {props.children}
    </fieldset>
  );
};

export default ManageTagsContainer;
