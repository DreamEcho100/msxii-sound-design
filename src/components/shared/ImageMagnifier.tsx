import { type HTMLAttributes, useState } from 'react';
import CustomNextImage from './CustomNextImage';

function ImageMagnifier({
	src,
	width,
	height,
	className,
	priority,
	containerProps = {},
	magnifierHeight = 100,
	magnifieWidth = 100,
	zoomLevel = 1.5
}: {
	containerProps?: HTMLAttributes<HTMLDivElement>;
	src: string;
	className?: string;
	width: number;
	height: number;
	priority?: boolean;
	magnifierHeight?: number;
	magnifieWidth?: number;
	zoomLevel?: number;
}) {
	const [[x, y], setXY] = useState([0, 0]);
	const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
	const [showMagnifier, setShowMagnifier] = useState(false);
	return (
		<div
			style={{
				position: 'relative'
			}}
			{...containerProps}
		>
			<CustomNextImage
				src={src}
				className={className}
				// style={{ height: height, width: width }}
				width={width}
				height={height}
				priority={priority}
				onMouseEnter={(e) => {
					// update image size and turn-on magnifier
					const elem = e.currentTarget;
					const { width, height } = elem.getBoundingClientRect();
					setSize([width, height]);
					setShowMagnifier(true);
				}}
				onMouseMove={(e) => {
					// update cursor position
					const elem = e.currentTarget;
					const { top, left } = elem.getBoundingClientRect();

					// calculate cursor position on the image
					const x = e.pageX - left - window.pageXOffset;
					const y = e.pageY - top - window.pageYOffset;
					setXY([x, y]);
				}}
				onMouseLeave={() => {
					// close magnifier
					setShowMagnifier(false);
				}}
				alt={'img'}
			/>

			<div
				style={{
					display: showMagnifier ? '' : 'none',
					position: 'absolute',

					// prevent magnifier blocks the mousemove event of img
					pointerEvents: 'none',
					// set size of magnifier
					height: `${magnifierHeight}px`,
					width: `${magnifieWidth}px`,
					// move element center to cursor pos
					top: `${y - magnifierHeight / 2}px`,
					left: `${x - magnifieWidth / 2}px`,
					opacity: '1', // reduce opacity so you can verify position
					border: '1px solid lightgray',
					backgroundColor: 'white',
					backgroundImage: `url('${src}')`,
					backgroundRepeat: 'no-repeat',

					//calculate zoomed image size
					backgroundSize: `${imgWidth * zoomLevel}px ${
						imgHeight * zoomLevel
					}px`,

					//calculate position of zoomed image.
					backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
					backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
				}}
			></div>
		</div>
	);
}

export default ImageMagnifier;
