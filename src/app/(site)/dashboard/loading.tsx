"use client";
import SectionPrimaryLoader from "~/app/components/common/Loaders/SectionPrimary";
import SectLoaderContainer from "~/app/components/common/LoadersContainers/Section";

function Loading() {
  return (
    <SectLoaderContainer>
      <SectionPrimaryLoader />
    </SectLoaderContainer>
  );
}

export default Loading;
