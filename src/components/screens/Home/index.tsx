import React from "react";
import HeroHomeSection from "./sections/Hero";
import HomeShowcaseSection from "./sections/Showcase";
import HomeLatestBlogsSection from "./sections/LatestBlogs";
import AboutMSXIISoundDesign from "./sections/AboutMSXIISoundDesign";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <>
      <HeroHomeSection />
      <HomeShowcaseSection />
      <HomeLatestBlogsSection />
      <AboutMSXIISoundDesign />
    </>
  );
};

export default HomeScreen;
