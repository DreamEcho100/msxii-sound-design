import { DefaultSeoProps } from 'next-seo';

export const websiteBasePath = `https://${process.env.NEXT_PUBLIC_APP_DOMAINE}`;

export const defaultSiteName = 'MSXII Sound';
// export const defaultSiteName2 = 'DRUMS THAT KNOCK';
// export const defaultSiteName3 = 'KNOCK Plugin - Make Your Drums Knock';
const defaultDescription =
	'MSXIISound, MSX Audio, MSXII, MSXII Sound Design, Drum Kits, Lo-Fly Dirt, Fly Tape, Chomplr, Fly Tape 2, Akai MPC, Soul Provider Expansion, Sound Design, Drum Broker, Ableton, Native Instruments, Sierra Grove, Aquarius Earth, Faded Reels, Lo-Fi Glow, Soul Magic, Soul Sessions, Producers, Samples, Vinyl, beats';
const defaultTitle = `
Sound Design, Hiphop Drums, Samples, Drum Samples, Sample Packs, Lofi | ${defaultSiteName}`;

const SEODefaults: DefaultSeoProps = {
	canonical: `${websiteBasePath}/`,
	description: defaultDescription,
	title: defaultTitle,
	openGraph: {
		type: 'website',
		locale: 'en_US',
		site_name: defaultSiteName,
		url: `${websiteBasePath}/`,
		description: defaultDescription,
		title: defaultTitle,
		images: [
			{
				url: `${websiteBasePath}/images/_.jpeg`,
				width: 700,
				height: 470,
				alt: `${defaultSiteName} Logo`
			}
		]
	},
	twitter: {
		handle: '@decapmusic',
		site: '@MSXIISound',
		cardType: 'summary_large_image'
	},
	additionalMetaTags: [
		{
			property: 'dc:creator',
			content: 'MSXIISound'
		},
		{
			name: 'application-name',
			content: defaultSiteName
		},
		{
			httpEquiv: 'x-ua-compatible',
			content: 'IE=edge, chrome=1'
		},
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1.0'
		},
		{
			name: 'color-scheme',
			content: 'dark'
		},
		{
			name: 'robots',
			content: 'index, follow'
		}
	]
};

export default SEODefaults;
