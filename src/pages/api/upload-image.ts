import { type NextApiRequest, type NextApiResponse } from 'next';
// import fetch from 'isomorphic-unfetch';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'POST') {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const imageFile = req.body;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const imageUrl = await uploadImageToShopify(imageFile as File);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			res.status(200).json({ imageUrl });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Failed to upload image to Shopify' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}

async function uploadImageToShopify(imageFile: File) {
	// Set up Shopify API authentication
	const API_KEY = 'your-shopify-api-key';
	const API_PASSWORD = 'your-shopify-api-password';
	const storeName = 'your-shopify-store.myshopify.com';
	const authorizationHeader = btoa(`${API_KEY}:${API_PASSWORD}`);

	// Base64-encode the image file
	const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
	const base64Image = imageBuffer.toString('base64');

	// Create a new product with the image
	const response = await fetch(
		`https://${storeName}/admin/api/2021-07/products.json`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${authorizationHeader}`,
			},
			body: JSON.stringify({
				product: {
					title: 'New Product',
					body_html: 'Product description',
					images: [
						{
							attachment: base64Image,
							filename: 'image.jpg',
						},
					],
				},
			}),
		},
	);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data = await response.json();

	if (response.ok) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
		return data.product.images[0].src;
	} else {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		throw new Error(`Failed to upload image to Shopify: ${data.errors}`);
	}
}