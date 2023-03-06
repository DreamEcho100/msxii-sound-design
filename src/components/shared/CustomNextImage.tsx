import Image from 'next/image';

type NextImageProps = Parameters<typeof Image>[0];

type Props = Omit<NextImageProps, 'alt'> & {
	alt?: NextImageProps['alt'];
};

const CustomNextImage = (props: Props) => {
	return <Image alt="" unoptimized {...props} />;
};

export default CustomNextImage;
