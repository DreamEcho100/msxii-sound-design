import { type ChangeEvent, useState } from 'react';

import { NextPage } from 'next';

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

		const data = await response.json();

		if (response.ok) {
			setImageUrl(data.imageUrl);
		} else {
			console.error(data.error);
		}
	};

	return (
		<div>
			<h1>Upload Image</h1>
			{imageUrl && <img src={imageUrl} />}
			<input type="file" accept="image/*" onChange={handleUploadImage} />
		</div>
	);
};

export default TestUploadingPage;
