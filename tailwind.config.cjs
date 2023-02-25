/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				'xl-3-sm': '250px',
				// // => @media (min-width: 250px) { ... }
				'xl-2-sm': '400px',
				// // => @media (min-width: 400px) { ... }
				'xl-sm': '512px',
				// => @media (min-width: 512px) { ... }

				sm: '640px',
				// => @media (min-width: 640px) { ... }
				md: '768px',
				// => @media (min-width: 768px) { ... }
				lg: '1024px',
				// => @media (min-width: 1024px) { ... }
				// ...defaultTheme,

				xl: '1280px',
				// => @media (min-width: 1280px) { ... }
				'2xl': '1536px'
				// => @media (min-width: 1536px) { ... }
			},
			colors: {
				basic: {
					primary: {
						0: 'rgba(var(--color-basic-primary-0) / <alpha-value>)',
						100: 'rgba(var(--color-basic-primary-100) / <alpha-value>)',
						200: 'rgba(var(--color-basic-primary-200) / <alpha-value>)',
						300: 'rgba(var(--color-basic-primary-300) / <alpha-value>)',
						400: 'rgba(var(--color-basic-primary-400) / <alpha-value>)',
						500: 'rgba(var(--color-basic-primary-500) / <alpha-value>)',
						600: 'rgba(var(--color-basic-primary-600) / <alpha-value>)',
						700: 'rgba(var(--color-basic-primary-700) / <alpha-value>)',
						800: 'rgba(var(--color-basic-primary-800) / <alpha-value>)',
						900: 'rgba(var(--color-basic-primary-900) / <alpha-value>)',
						1000: 'rgba(var(--color-basic-primary-1000) / <alpha-value>)'
					},
					secondary: {
						0: 'rgba(var(--color-basic-secondary-0) / <alpha-value>)',
						100: 'rgba(var(--color-basic-secondary-100) / <alpha-value>)',
						200: 'rgba(var(--color-basic-secondary-200) / <alpha-value>)',
						300: 'rgba(var(--color-basic-secondary-300) / <alpha-value>)',
						400: 'rgba(var(--color-basic-secondary-400) / <alpha-value>)',
						500: 'rgba(var(--color-basic-secondary-500) / <alpha-value>)',
						600: 'rgba(var(--color-basic-secondary-600) / <alpha-value>)',
						700: 'rgba(var(--color-basic-secondary-700) / <alpha-value>)',
						800: 'rgba(var(--color-basic-secondary-800) / <alpha-value>)',
						900: 'rgba(var(--color-basic-secondary-900) / <alpha-value>)',
						1000: 'rgba(var(--color-basic-secondary-1000) / <alpha-value>)'
					}
				},
				special: {
					primary: {
						100: 'rgba(var(--color-special-primary-100) / <alpha-value>)',
						200: 'rgba(var(--color-special-primary-200) / <alpha-value>)',
						300: 'rgba(var(--color-special-primary-300) / <alpha-value>)',
						400: 'rgba(var(--color-special-primary-400) / <alpha-value>)',
						500: 'rgba(var(--color-special-primary-500) / <alpha-value>)',
						600: 'rgba(var(--color-special-primary-600) / <alpha-value>)',
						700: 'rgba(var(--color-special-primary-700) / <alpha-value>)',
						800: 'rgba(var(--color-special-primary-800) / <alpha-value>)',
						900: 'rgba(var(--color-special-primary-900) / <alpha-value>)'
					},
					secondary: {
						100: 'rgba(var(--color-special-secondary-100) / <alpha-value>)',
						200: 'rgba(var(--color-special-secondary-200) / <alpha-value>)',
						300: 'rgba(var(--color-special-secondary-300) / <alpha-value>)',
						400: 'rgba(var(--color-special-secondary-400) / <alpha-value>)',
						500: 'rgba(var(--color-special-secondary-500) / <alpha-value>)',
						600: 'rgba(var(--color-special-secondary-600) / <alpha-value>)',
						700: 'rgba(var(--color-special-secondary-700) / <alpha-value>)',
						800: 'rgba(var(--color-special-secondary-800) / <alpha-value>)',
						900: 'rgba(var(--color-special-secondary-900) / <alpha-value>)'
					}
				}
			},
			fontSize: {
				h1: 'var(--size-h1)',
				h2: 'var(--size-h2)',
				h3: 'var(--size-h3)',
				h4: 'var(--size-h4)',
				h5: 'var(--size-h5)',
				h6: 'var(--size-h6)'
			},
			spacing: {
				'main-header-h': 'var(--main-header-h)',
				h1: 'var(--size-h1)',
				h2: 'var(--size-h2)',
				h3: 'var(--size-h3)',
				h4: 'var(--size-h4)',
				h5: 'var(--size-h5)',
				h6: 'var(--size-h6)',
				'main-p-1': 'var(--main-p-1)',
				'main-p-2': 'var(--main-p-2)',
				'main-p-3': 'var(--main-p-3)',
				'main-p-4': 'var(--main-p-4)'
			},
			minHeight: {
				'main-content': 'var(--main-content-min-h)'
			},
			maxWidth: {
				main: 'var(--main-max-w)'
			},
			lineHeight: {
				h1: 'var(--leading-h1)',
				h2: 'var(--leading-h2)',
				'primary-1': 'var(--leading-primary-1)',
				'primary-2': 'var(--leading-primary-2)',
				'primary-3': 'var(--leading-primary-3)',
				'primary-4': 'var(--leading-primary-4)',
				'primary-5': 'var(--leading-primary-5)'
			}
		}
	},
	plugins: []
};
