"use client";
import SectionPrimaryLoader from "~/app/components/common/Loaders/SectionPrimary";
import SectionLoaderContainer from "~/app/components/common/LoadersContainers/Section";

function Loading() {
  return (
    <SectionLoaderContainer>
      <SectionPrimaryLoader />
    </SectionLoaderContainer>
  );
}

export default Loading;
