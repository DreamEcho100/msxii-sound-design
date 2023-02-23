import React from 'react';
import HeroHomeSection from './sections/Hero';
import HomeShowcaseSection from './sections/Showcase';
import HomeLatestBlogsSection from './sections/LatestBlogs';
import AboutMSXIISoundDesign from './sections/AboutMSXIISoundDesign';
import HomeIOSAppsSection from './sections/IOSApps';

const HomeScreen = () => {
	return (
		<>
			<HeroHomeSection />
			<HomeShowcaseSection />
			<HomeIOSAppsSection />
			<HomeLatestBlogsSection />
			<AboutMSXIISoundDesign />
		</>
	);
};

export default HomeScreen;
