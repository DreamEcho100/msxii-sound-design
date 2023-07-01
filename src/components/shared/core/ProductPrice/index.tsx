import { useMemo } from 'react';
import { ShopifyProduct } from '~/utils/types';

type Props = {
	price: ShopifyProduct['price'];
	compare_at_price: ShopifyProduct['compare_at_price'];
};

const ProductPrice = (props: Props) => {
	const { price, compare_at_price } = useMemo(() => {
		const price = Number(props.price).toFixed(2);
		const compare_at_price = props.compare_at_price
			? Number(props.compare_at_price).toFixed(2)
			: null;

		return { price, compare_at_price };
	}, [props.price, props.compare_at_price]);

	return (
		<>
			$ {price}{' '}
			{compare_at_price && (
				<del className="text-red-500">{compare_at_price}</del>
			)}
		</>
	);
};

export default ProductPrice;
