import { FaMinus, FaPlus } from 'react-icons/fa';
import { z } from 'zod';
import Clickable from '~/components/shared/core/Clickable';

const ProductQuantityControllers = ({
	handleIncreaseByOne,
	handleDecreaseByOne,
	handleSetSelectedQuantity,
	quantity
}: {
	handleIncreaseByOne(): void;
	handleDecreaseByOne(): void;
	handleSetSelectedQuantity(value: number): void;
	quantity: number;
}) => {
	return (
		<div className="flex rounded-xl overflow-hidden">
			<Clickable
				variants={{ btn: null, px: null, py: null, rounded: null }}
				className="bg-bg-primary-600 px-2 flex items-center justify-center"
				onClick={handleDecreaseByOne}
				disabled={quantity === 0}
			>
				<FaMinus className="text-[60%]" />
			</Clickable>
			<input
				className="w-fit px-2 focus:outline-none"
				style={{
					width: `${quantity.toString().length + 2}ch`
				}}
				value={quantity}
				onChange={(event) => {
					const valueAsNumberSchema = z
						.number()
						.min(0)
						.finite()
						.safeParse(Number(event.target.value));

					if (valueAsNumberSchema.success)
						handleSetSelectedQuantity(valueAsNumberSchema.data);
				}}
				name="quantity"
			/>
			<Clickable
				variants={{ btn: null, px: null, py: null, rounded: null }}
				className="bg-bg-primary-600 px-2 flex items-center justify-center"
				onClick={handleIncreaseByOne}
			>
				<FaPlus className="text-[60%]" />
			</Clickable>
		</div>
	);
};

export default ProductQuantityControllers;
