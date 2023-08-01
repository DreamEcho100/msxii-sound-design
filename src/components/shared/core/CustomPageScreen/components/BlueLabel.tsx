import { api } from '~/utils/api';
import { ProductCard } from '~/components/shared/core/Shopify/Cards/Card';
import Head from 'next/head';

const BlueLabel = () => {
	const collectionQuery = api.shopify.collections.getOneByHandle.useQuery({
		handle: 'blue-label',
	});

	if (collectionQuery.isLoading) return <>Loading...</>;

	if (collectionQuery.isError) return <>{collectionQuery.error?.message}</>;

	const collectionData = collectionQuery.data!;

	return (
		<>
			<Head>
				<title>{collectionData.title}</title>
				<meta name="description" content={collectionData.description} />
			</Head>
			<div
				className="grid gap-8 justify-items-center"
				style={{
					gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
				}}
			>
				{collectionData.products.edges.map(({ node }) => (
					<ProductCard
						key={node.handle}
						product={node}
						// routeBase="/merch"
						containerVariants={{ w: null }}
						imageVariants={{ 'object-fit': 'contain' }}
					/>
				))}
			</div>
		</>
	);
};
export default BlueLabel;
