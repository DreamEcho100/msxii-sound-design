import HeroHomeSection from "./sections/Hero";
import HomeShowcaseSection from "./sections/Showcase";
import HomeLatestBlogsSection from "./sections/LatestBlogs";
import AboutMSXIISoundDesign from "./sections/AboutMSXIISoundDesign";
import HomeIOSAppsSection from "./sections/IOSApps";
import { type HomePageProps } from "~/pages";

const HomeScreen = (props: HomePageProps) => {
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
