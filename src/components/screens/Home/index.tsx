import HeroHomeSection from './sections/Hero';
import HomeShowcaseSection from './sections/Showcase';
import HomeLatestBlogsSection from './sections/LatestBlogs';
import AboutMSXIISoundDesign from './sections/AboutMSXIISoundDesign';
import HomeIOSAppsSection from './sections/IOSApps';
import { ShopifyProduct } from '~/utils/types';
import { RouterOutputs } from '~/utils/api';

export interface HomeScreenProps {
	collectionsBasic: RouterOutputs['shopify']['collections']['getAllBasic'];
}

const HomeScreen = ({ collectionsBasic }: HomeScreenProps) => {
	return (
		<>
			<HeroHomeSection />
			<HomeShowcaseSection collectionsBasic={collectionsBasic} />
			<HomeIOSAppsSection />
			<HomeLatestBlogsSection />
			<AboutMSXIISoundDesign />
		</>
	);
};

export default HomeScreen;
