import {
	Combobox,
	Transition,
	type ComboboxProps as TComboboxProps,
} from '@headlessui/react';
import {
	Fragment,
	type Key,
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
	type ElementType,
} from 'react';
import { type VariantProps, cva, cx } from 'class-variance-authority';

import React from 'react';
import { RiArrowUpDownFill } from 'react-icons/ri';

const handleClassVariants = cva(
	'bg-transparent text-lg outline-none group-[.disabled-field]:pointer-events-none',
);

type GetData<
	TData = unknown,
	FormattedData = undefined,
> = FormattedData extends unknown[]
	? FormattedData
	: TData extends unknown[]
	? TData
	: never;

// type GetItemBySelectType<
//   SelectType extends TSelectType = undefined,
//   TData = unknown,
// > = SelectType extends "multiple" ? TData : TData[];

export type ComboboxProps<
	TData = unknown,
	FormattedData = undefined,
> = TComboboxProps<
	NonNullable<GetData<TData, FormattedData>>[number],
	false,
	false,
	ElementType
> & {
	data?: TData;
	formatDataToOptions?: (data: TData) => FormattedData;

	classVariants?: VariantProps<typeof handleClassVariants>;

	setSelected?: (
		value:
			| NonNullable<GetData<TData, FormattedData>>[number]
			| ((value: NonNullable<GetData<TData, FormattedData>>[number]) => void),
	) => void; // Exclude<unknown, ((...params: any) => any)> | ((value: unknown) => unknown);
	isLoading?: boolean;
	isSuccess?: boolean;
	debounceTime?: number;
	// removeQueryOnSelect?: boolean;

	getOptionChildren: (
		value: NonNullable<GetData<TData, FormattedData>[number]>,
		index: number,
	) => React.ReactNode;
	getDisplayValue: (
		value: GetData<TData, FormattedData>[number],
	) => string | null | undefined;
	getOptionKey: (
		value: NonNullable<GetData<TData, FormattedData>[number]>,
		index: number,
	) => Key;

	getInitialValue?: (
		data: NonNullable<GetData<TData, FormattedData>>,
	) => GetData<TData, FormattedData>[number] | undefined;
	getInitialQuery?: (
		data: NonNullable<GetData<TData, FormattedData>[number]>,
	) => string;
	setQuery?: (UpdaterOrValue: string | undefined) => void;
	query?: string | undefined;
};

const handleGetData = <TData, FormattedData = undefined>(
	data?: TData,
	// selectType: SelectType,
	formatDataToOptions?: (data: TData) => FormattedData,
): NonNullable<GetData<TData, FormattedData>> => {
	if (!formatDataToOptions) {
		if (Array.isArray(data))
			return data as NonNullable<GetData<TData, FormattedData>>;
		return [] as NonNullable<GetData<TData, FormattedData>>;
	}

	return formatDataToOptions(
		(data || []) as unknown as NonNullable<TData>,
	) as NonNullable<GetData<TData, FormattedData>>; //! as unknown as NonNullable<FormattedData>;
};

const CustomCombobox = <TData, FormattedData = undefined>(
	props: ComboboxProps<TData, FormattedData>,
) => {
	const {
		data,
		formatDataToOptions,
		getDisplayValue,
		getOptionChildren,
		getOptionKey,
		getInitialValue,
		getInitialQuery,
		setQuery,

		query,
		classVariants,
		setSelected: externallySetSelected,
		isLoading = false,
		isSuccess = true,
		debounceTime = 500,
		..._props
	} = props;

	const configRef = useRef<{
		initialSelectSetCounter: number;
		queryTimeoutId?: NodeJS.Timeout;
	}>({
		initialSelectSetCounter: 0,
		queryTimeoutId: undefined,
	});

	const comboboxProps = useMemo(
		() => ({
			..._props,
			className: handleClassVariants(classVariants),
		}),
		[_props, classVariants],
	);

	const locallySelectedState = useState<
		GetData<TData, FormattedData>[number] | undefined
	>(getInitialValue ? undefined : props.value);
	const locallySelected = externallySetSelected
		? props.value
		: locallySelectedState[0];
	const setLocallySelected = externallySetSelected
		? externallySetSelected
		: locallySelectedState[1];

	const [localQuery, setLocalQuery] = useState<string | undefined>(query);
	const options = handleGetData(data, formatDataToOptions);

	const handleSetQuery = useCallback(
		(value: string) => {
			if (!setQuery) return;

			clearInterval(configRef.current.queryTimeoutId);

			setLocalQuery(value);
			configRef.current.queryTimeoutId = setTimeout(
				() => setQuery?.(value),
				debounceTime,
			);
		},
		[debounceTime, setQuery],
	);

	const handleSetSelected = useCallback(
		(value: NonNullable<GetData<TData, FormattedData>>[number]) => {
			setLocallySelected(value);
			comboboxProps.onChange?.(value);
			setQuery?.(undefined);
		},
		[comboboxProps, setLocallySelected, setQuery],
	);

	useEffect(() => {
		if (
			options &&
			options.length > 0 &&
			configRef.current.initialSelectSetCounter === 0 &&
			getInitialValue &&
			!isLoading &&
			isSuccess
		) {
			const selectedValue = getInitialValue(options);

			if (!selectedValue) return;

			handleSetSelected(selectedValue);

			const _query = getInitialQuery?.(selectedValue) || query;
			if (_query) handleSetQuery(_query);

			configRef.current.initialSelectSetCounter++;
		}
	}, [
		getInitialQuery,
		getInitialValue,
		handleSetQuery,
		handleSetSelected,
		isLoading,
		isSuccess,
		options,
		query,
	]);

	return (
		<Combobox
			{...comboboxProps}
			value={locallySelected}
			onChange={(value) => handleSetSelected(value)}
		>
			<div className="relative">
				<div className="relative w-full cursor-default overflow-hidden bg-transparent text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
					{isLoading ? (
						'Loading...'
					) : !setQuery ? (
						<Combobox.Button className="flex w-full flex-grow items-center justify-between bg-transparent">
							<span>
								{typeof locallySelected === 'undefined'
									? ''
									: getDisplayValue(locallySelected)}
							</span>
							<RiArrowUpDownFill
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</Combobox.Button>
					) : (
						<>
							<Combobox.Input
								className="w-full border-none bg-transparent px-1 py-1 text-sm leading-5 text-gray-900 outline-none focus:ring-0"
								displayValue={(
									value: GetData<TData, FormattedData>[number] | undefined,
								) =>
									typeof value === 'undefined'
										? ''
										: getDisplayValue(value) ?? ''
								}
								onChange={(event) => handleSetQuery(event.target.value)}
								readOnly={!setQuery}
							/>
							<Combobox.Button className="absolute inset-y-0 right-0 flex items-center bg-transparent pr-2">
								<RiArrowUpDownFill
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</Combobox.Button>
						</>
					)}
				</div>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					afterLeave={() => handleSetQuery('')}
				>
					<Combobox.Options className="absolute z-[1] mt-1 max-h-60 w-full overflow-auto rounded-b-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{options.length === 0 && localQuery !== '' ? (
							<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
								Nothing found.
							</div>
						) : (
							<>
								<div className="relative cursor-default select-none px-4 py-2">
									--- select ---
								</div>
								{options.map((option, index) =>
									!option ? (
										<Fragment key={index} />
									) : (
										<Combobox.Option
											key={getOptionKey(option, index)}
											className={({ active }) =>
												`relative cursor-default select-none px-4 py-2 ${
													active ? 'bg-teal-500 text-white' : ''
												}`
											}
											value={option}
										>
											{({ selected, active }) => (
												<span
													className={cx(
														'block truncate',
														selected ? 'font-medium' : 'font-normal',
														active ? 'text-white' : 'font-normal',
													)}
												>
													{getOptionChildren(option, index)}
												</span>
											)}
										</Combobox.Option>
									),
								)}
							</>
						)}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
};

export default CustomCombobox;
