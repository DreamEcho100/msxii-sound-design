import HeroHomeSection from './sections/Hero';
import HomeShowcaseSection from './sections/Showcase';
import HomeLatestBlogsSection from './sections/LatestBlogs';
import AboutMSXIISoundDesign from './sections/AboutMSXIISoundDesign';
import HomeIOSAppsSection from './sections/IOSApps';
import { RouterOutputs } from '~/utils/api';

export type HomeScreenProps =
	| {
			error: { message: string };
			isError: true;
			collectionsBasic: null;
			isLoading: false;
			isSuccess: false;
	  }
	| {
			error: null;
			isError: false;
			collectionsBasic: RouterOutputs['shopify']['collections']['getAllBasic'];
			isSuccess: true;
			isLoading: false;
	  }
	| {
			error: null;
			isError: false;
			collectionsBasic: null;
			isSuccess: false;
			isLoading: true;
	  };

const HomeScreen = (props: HomeScreenProps) => {
	return (
		<>
			<HeroHomeSection />
			<HomeShowcaseSection {...props} />
			<HomeIOSAppsSection />
			<HomeLatestBlogsSection />
			<AboutMSXIISoundDesign />
		</>
	);
};

export default HomeScreen;
