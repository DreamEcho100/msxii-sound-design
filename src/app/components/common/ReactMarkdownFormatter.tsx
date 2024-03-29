import { cx } from "class-variance-authority";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CustomNextImage from "./CustomNextImage";
import { getBaseUrl } from "~/libs/utils";

const ReactMarkdownFormatter = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        img: ({ node, src, ...props }) => {
          if (!src) return <></>;

          let url: URL;

          if (src.startsWith("/")) {
            url = new URL(`${getBaseUrl()}${src}`);
          } else url = new URL(src);

          const params = url.searchParams;
          const className = params.get("className")?.split(",").join(" "); // Outputs: "w40"

          return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <CustomNextImage
              {...props}
              src={src}
              className={cx(className, "object-contain")}
              unoptimized
              width={800}
              height={800}
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
