import React from 'react';
import HeroHomeSection from './sections/Hero';
import HomeShowcaseSection from './sections/Showcase';
import HomeLatestBlogsSection from './sections/LatestBlogs';
import AboutMSXIISoundDesign from './sections/AboutMSXIISoundDesign';
import HomeIOSAppsSection from './sections/IOSApps';
import { ShopifyProduct } from '~/utils/types';

const HomeScreen = ({ products }: { products: ShopifyProduct[] }) => {
	return (
		<>
			<HeroHomeSection />
			<HomeShowcaseSection products={products} />
			<HomeIOSAppsSection />
			<HomeLatestBlogsSection />
			<AboutMSXIISoundDesign />
		</>
	);
};

export default HomeScreen;
