import { type ChangeEvent, useState } from 'react';

import { type NextPage } from 'next';

const TestUploadingPage: NextPage<null> = () => {
	const [imageUrl, setImageUrl] = useState(null);

	const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		const imageFile = event.target.files?.[0];

		if (!imageFile) return;

		const formData = new FormData();
		formData.append('image', imageFile);

		const response = await fetch('/api/upload-image', {
			method: 'POST',
			body: formData,
		});

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data = await response.json();

		if (response.ok) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			setImageUrl(data.imageUrl);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			console.error(data.error);
		}
	};

	return (
		<div>
			<h1>Upload Image</h1>
			{imageUrl && <img src={imageUrl} />}
			<input type="file" accept="image/*"
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onChange={handleUploadImage} />
		</div>
	);
};

export default TestUploadingPage;
