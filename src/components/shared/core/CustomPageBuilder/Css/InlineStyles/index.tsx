export * from './utils';
export * from './types';

import { useCreateFormStore } from '@de100/form-echo';
import { toast } from 'react-toastify';
import Form from '~/components/shared/common/@de100/form-echo/Forms';
import { CreateOneInlineStyleCssSchema } from '~/server/utils/validations-schemas/dashboard/css/inlineStyles';
import { api } from '~/utils/api';

import {
	type GridTemplateData,
	type InlineStylesFormSchema,
	type InlineStylesFormStore,
} from './types';
import {
	useState,
	useCallback,
	useRef,
	useEffect,
	useId,
	PropsWithChildren,
	LabelHTMLAttributes,
} from 'react';
import {
	getGridTemplateData,
	getGridTemplateDataTypeEmpty,
	gridTemplateDataTypesList,
	gridTemplateDataTypesMap,
} from './utils';
import CustomCombobox from '~/components/shared/common/@de100/form-echo/Fields/Base/Combobox';
import {
	getGridTemplateDataTypeRepeatWithoutType,
	getGridTemplateDataTrackListWithoutType,
} from './utils/index';
import Input from '../../../FieldForm/Input';
import { splitByCamelCase } from '~/utils/string';

const FieldContainer = (
	props: PropsWithChildren<{
		labelProps: LabelHTMLAttributes<HTMLLabelElement>;
	}>,
) => {
	return (
		<div className="flex flex-col flex-grow max-w-full">
			<label {...props.labelProps} className="capitalize font-semibold" />
			{props.children}
		</div>
	);
};

export const GridTemplateManager = (props: {
	gridTemplate?: string | null;
	setGridTemplate: (gridTemplate: string | null) => void;
	name: string;
}) => {
	const id = useId();
	const config = useRef<{
		initialGridTemplateData: GridTemplateData | null;
	}>({
		initialGridTemplateData: null,
	});
	const [gridTemplateData, setGridTemplateData] = useState<GridTemplateData>({
		type: gridTemplateDataTypesMap.empty,
	});

	const handleSetExternalGridTemplate = useCallback(
		(gridTemplateData: GridTemplateData) => {
			if (gridTemplateData.type === gridTemplateDataTypesMap.empty)
				return props.setGridTemplate(null);

			if (gridTemplateData.type === gridTemplateDataTypesMap.repeatCount)
				return props.setGridTemplate(
					`repeat(${gridTemplateData.repeatCount}, ${gridTemplateData.trackList})`,
				);

			return props.setGridTemplate(gridTemplateData.trackList);
		},
		[props.setGridTemplate],
	);

	useEffect(() => {
		if (config.current.initialGridTemplateData) return;

		config.current.initialGridTemplateData = getGridTemplateData(
			props.gridTemplate,
		);
		setGridTemplateData(config.current.initialGridTemplateData);
	}, [props.gridTemplate]);

	const generateId = (str: string) => `${id}-${props.name}-${str}`;

	return (
		<div className="flex flex-col gap-4">
			<FieldContainer
				labelProps={{
					children: 'type',
					htmlFor: generateId('type'),
				}}
			>
				<CustomCombobox
					id={generateId('type')}
					name={'type'}
					data={gridTemplateDataTypesList}
					getOptionChildren={(value) => (
						<span className="capitalize">{splitByCamelCase(value)}</span>
					)}
					getDisplayValue={(value) => splitByCamelCase(value)}
					getOptionKey={(value) => value}
					value={gridTemplateData.type}
					setSelected={(value) => {
						if (value === gridTemplateData.type) return;

						let data: GridTemplateData;

						if (value === gridTemplateDataTypesMap.empty)
							data = getGridTemplateDataTypeEmpty();
						else if (value === gridTemplateDataTypesMap.repeatCount)
							data = {
								type: gridTemplateDataTypesMap.repeatCount,
								...getGridTemplateDataTypeRepeatWithoutType(),
							};
						else if (value === gridTemplateDataTypesMap.trackList)
							data = {
								type: gridTemplateDataTypesMap.trackList,
								...getGridTemplateDataTrackListWithoutType(),
							};
						else {
							throw new Error('value is not defined');
						}

						setGridTemplateData(data);
						handleSetExternalGridTemplate(data);
					}}
				/>
			</FieldContainer>
			{gridTemplateData.type !== gridTemplateDataTypesMap.empty && (
				<div className="grid grid-cols-2 gap-2">
					{gridTemplateData.type === gridTemplateDataTypesMap.repeatCount && (
						<FieldContainer
							labelProps={{
								children: splitByCamelCase(
									gridTemplateDataTypesMap.repeatCount,
								),
								htmlFor: generateId(gridTemplateDataTypesMap.repeatCount),
							}}
						>
							<Input
								id={generateId(gridTemplateDataTypesMap.repeatCount)}
								name={splitByCamelCase(gridTemplateDataTypesMap.repeatCount)}
								value={gridTemplateData.repeatCount}
								onChange={(event) => {
									setGridTemplateData((prev) => {
										const data = {
											...prev,
											[gridTemplateDataTypesMap.repeatCount]:
												event.target.value,
										};

										handleSetExternalGridTemplate(data);
										return data;
									});
								}}
							/>
						</FieldContainer>
					)}
					gridTemplateData.type !==
					<FieldContainer
						labelProps={{
							children: splitByCamelCase(gridTemplateDataTypesMap.trackList),
							htmlFor: generateId(gridTemplateDataTypesMap.trackList),
						}}
					>
						<Input
							id={generateId(gridTemplateDataTypesMap.trackList)}
							name={splitByCamelCase(gridTemplateDataTypesMap.trackList)}
							value={gridTemplateData.trackList}
							onChange={(event) => {
								setGridTemplateData((prev) => {
									const data = {
										...prev,
										[gridTemplateDataTypesMap.trackList]: event.target.value,
									};

									handleSetExternalGridTemplate(data);
									return data;
								});
							}}
						/>
					</FieldContainer>
				</div>
			)}
		</div>
	);
};

export const useInlineStylesFormStore = (inlineStyles?: unknown) => {
	return useCreateFormStore({
		initValues: {
			...((inlineStyles ?? {}) as InlineStylesFormSchema),
		},
		validationSchema: CreateOneInlineStyleCssSchema,
	}) satisfies InlineStylesFormStore;
};

export const InlineStylesForm = (props: {
	store: InlineStylesFormStore;
	cssId: string;
	onSuccess: (params: {
		validatedValues: InlineStylesFormSchema | null;
	}) => void;
}) => {
	const setOneRequest = api.dashboard.css.inlineStyles.setOne.useMutation({
		onError(error) {
			toast(error.message, { type: 'error' });
		},
		onSuccess() {
			toast('Successful submission!', { type: 'success' });
		},
	});

	// const inlineStyles = useStore(
	// 	props.store,
	// 	(store) => store.fields.inlineStyles.value,
	// );

	return (
		<Form
			onSubmit={async (event, params) => {
				event.preventDefault();
				await setOneRequest.mutateAsync({
					cssId: props.cssId,
					inlineStyles: params.validatedValues,
				});

				props.onSuccess(params);
			}}
			store={props.store}
		>
			<fieldset className="min-w-[unset] flex flex-col gap-2"></fieldset>
			<button
				type="submit"
				disabled={setOneRequest.isLoading}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				submit
			</button>
		</Form>
	);
};
