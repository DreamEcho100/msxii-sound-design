import { shopifyFakeProductsData } from '~/utils/appData';
import CustomProductScreen from '~/components/shared/core/CustomProductScreen';
import { championHoodieMerch as productData } from '~/utils/appData/merch';

const media = productData.media[0]!;

const medias = '_'
	.repeat(4)
	.split('_')
	.map(() => media);

const products = shopifyFakeProductsData.filter(
	(product) => product.id !== productData.id
);

const TempPreviewProductPage = () => {
	return (
		<CustomProductScreen
			productData={productData}
			medias={medias}
			products={products}
		>
			<section className="w-full mx-auto max-w-[140ch] flex flex-col py-16 gap-16">
				<div className="px-8 mx-auto max-w-[131ch] flex flex-col gap-4">
					<h2 className="font-normal text-text-primary-400 text-h3">Details</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Necessitatibus amet tempore delectus voluptatibus perspiciatis, et
						tempora non, deserunt molestias sint unde at debitis obcaecati nobis
						incidunt asperiores. Fugit, doloremque voluptates.
					</p>
				</div>
			</section>
		</CustomProductScreen>
	);
};

export default TempPreviewProductPage;
