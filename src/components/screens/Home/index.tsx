import { type RouterInputs } from "~/utils/api";

import HeroHomeSection from "./sections/Hero";
import HomeShowcaseSection from "./sections/Showcase";
import HomeLatestBlogsSection from "./sections/LatestBlogs";
import AboutMSXIISoundDesign from "./sections/AboutMSXIISoundDesign";
import HomeIOSAppsSection from "./sections/IOSApps";

const HomeScreen = (props: {
  input: RouterInputs["shopify"]["collections"]["getAllBasic"];
}) => {
  return (
    <>
      <HeroHomeSection />
      <HomeShowcaseSection input={props.input} />
      <HomeIOSAppsSection />
      <HomeLatestBlogsSection />
      <AboutMSXIISoundDesign />
    </>
  );
};

export default HomeScreen;
