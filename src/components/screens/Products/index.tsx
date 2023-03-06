import { ProductCard } from '~/components/shared/core/Cards/Card';
import ProductsSlider from '~/components/shared/core/Cards/Slider';
import { ShopifyProduct } from '~/utils/types';

const ProductsScreen = ({ products }: { products: ShopifyProduct[] }) => {
	return (
		<section>
			<div className="">
				<h1>ProductsScreen</h1>

				<ProductsSlider
					products={products}
					CardElem={ProductCard}
					nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[225%]"
					previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[225%]"
				/>
			</div>
		</section>
	);
};

export default ProductsScreen;
