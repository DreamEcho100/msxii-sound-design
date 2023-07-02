import { type ShopifyProductVariant } from '~/utils/shopify/types';
import { type ButtonProps } from '~/components/shared/Clickable';

import Clickable from '~/components/shared/core/Clickable';
import { useMutateCart } from '~/utils/shopify/hooks';

type Props = {
	productVariant?: ShopifyProductVariant;
	selectedQuantity?: number;
	className?: string;
	variants?: Parameters<typeof Clickable>[0]['variants'];
} & Partial<Omit<ButtonProps, 'className'>>;

const AddToCartButton = ({
	productVariant,
	selectedQuantity,
	...props
}: Props) => {
	const { addToCart } = useMutateCart();

	return (
		<Clickable
			className="lg:whitespace-nowrap text-sm uppercase"
			onClick={async () => {
				productVariant &&
					addToCart.mutateAsync({
						lineItems: [
							{ quantity: selectedQuantity || 1, variantId: productVariant.id }
						]
					});
			}}
			{...props}
			disabled={!productVariant || addToCart.isLoading || props.disabled}
			variants={{
				btn: 'secondary',
				py: 'sm',
				px: 'lg',
				...(props.variants || {})
			}}
		>
			add to cart
		</Clickable>
	);
};

export default AddToCartButton;
