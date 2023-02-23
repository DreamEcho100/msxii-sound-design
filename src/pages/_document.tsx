import { Html, Head, Main, NextScript } from 'next/document';

import { cx } from 'class-variance-authority';
import { ralewayFont } from '~/utils/fonts';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="UTF-8" />
			</Head>
			<body
				className={cx('light', ralewayFont.className)}
				style={{ fontFamily: "'Raleway', sans-serif" }}
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
