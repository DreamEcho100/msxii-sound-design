import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CustomNextImage from '~/components/shared/CustomNextImage';

const ReactMarkdownFormatter = ({ content }: { content: string }) => {
	return (
		<ReactMarkdown
			components={{
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				img: ({ node, src, ...props }) => {
					if (!src) return <></>;

					let url: URL;

					if (src.startsWith('/')) {
						url = new URL(`http://localhost:3000${src}`);
					} else url = new URL(src);

					const params = url.searchParams;
					const className = params.get('className')?.split(',').join(' '); // Outputs: "w40"

					return (
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						<CustomNextImage
							{...props}
							src={src}
							className={className}
							unoptimized
							width={800}
							height={800}
							weservNlOptimized={false}
							// onLoadingComplete={(img) => {
							// 	img.width = img.naturalWidth;
							// 	img.height = img.naturalHeight;
							// }}
						/>
					);
				},
			}}
			remarkPlugins={[remarkGfm]}
		>
			{content}
		</ReactMarkdown>
	);
};

export default ReactMarkdownFormatter;
