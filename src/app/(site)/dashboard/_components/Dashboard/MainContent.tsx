"use client";
import { useRouter } from "next/navigation";
import { useEffect, type PropsWithChildren } from "react";
import SectionPrimaryLoader from "~/app/components/common/Loaders/SectionPrimary";
import SectionLoaderContainer from "~/app/components/common/LoadersContainers/Section";
import { useCheckIsAdmin } from "~/app/libs/hooks";

function MainContent(props: PropsWithChildren) {
  const router = useRouter();
  const { customerStatus, isAdmin } = useCheckIsAdmin();

  useEffect(() => {
    if (customerStatus !== "loading" && !isAdmin) router.push("/");
  }, [customerStatus, isAdmin, router]);

  if (customerStatus === "loading")
    return (
      <SectionLoaderContainer>
        <SectionPrimaryLoader />
      </SectionLoaderContainer>
    );

  if (!isAdmin) return <>Not Authorized</>;

  return (
    <main className="mx-auto flex w-full max-w-main flex-grow flex-col overflow-y-auto overflow-x-hidden px-4 py-8 sm:px-8">
      {props.children}
    </main>
  );
}

export default MainContent;
