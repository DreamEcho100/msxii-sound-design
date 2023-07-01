import { useEffect, useMemo, useState } from 'react';
import { type MoneyV2 } from 'shopify-buy';

const useIsMounted = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => setIsMounted(true), []);

	return isMounted;
};

type Props = {
	price: MoneyV2;
	compareAtPrice?: MoneyV2;
};

const formatPrice = (
	price: number | bigint,
	currency: string,
	isMounted = true
) =>
	new Intl.NumberFormat(
		!isMounted || typeof navigator === 'undefined'
			? 'en-US' // 'en-GB'
			: navigator.language,
		{ style: 'currency', currency }
	).format(price);

const ProductPrice = (props: Props) => {
	const isMounted = useIsMounted();
	const { price, compareAtPrice } = useMemo(() => {
		const price = formatPrice(
			Number(props.price.amount),
			props.price.currencyCode,
			isMounted
		);
		const compareAtPrice = props.compareAtPrice?.amount
			? formatPrice(
					Number(props.compareAtPrice.amount),
					props.compareAtPrice.currencyCode,
					isMounted
			  )
			: null;

		return { price, compareAtPrice };
	}, [props.price, props.compareAtPrice, isMounted]);

	return (
		<>
			{price}{' '}
			{compareAtPrice && <del className="text-red-500">{compareAtPrice}</del>}
		</>
	);
};

export default ProductPrice;
