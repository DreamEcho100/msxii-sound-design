"use client";
import SectionPrimaryLoader from "~/app/components/common/Loaders/SectionPrimary";
import SectLoaderContainer from "~/app/components/common/LoadersContainers/Section";

export default function LoadingSection() {
  return (
    <SectLoaderContainer>
      <SectionPrimaryLoader />
    </SectLoaderContainer>
  );
}

