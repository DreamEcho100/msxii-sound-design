export { default as CustomPageBuilder_ } from "./_";
import { type ReactNode } from "react";

import { cx } from "class-variance-authority";
import customPageClasses from "~/app/styles/custom-page.module.css";
import {
  type CustomPage,
  type StandardSection,
} from "~/libs/utils/types/custom-page";
import { handleBoxVariants } from "~/libs/utils/appData";
import { SectionBodyBox } from "./SectionBodyBox";

type Props = {
  customPage: CustomPage;
  children?: ReactNode;
};

const CustomPageBuilder = (props: Props) => {
  return (
    <div
      className={handleBoxVariants({
        ...props.customPage.twClassNameVariants,
        className: "flex flex-col text-h6 text-text-primary-400",
      })}
    >
      {props.customPage.pageStructure.map((section, index) => (
        <SectionBody key={index} section={section} sectionIndex={index} />
      ))}
      {props.children}
    </div>
  );
};

const SectionBody = ({
  section,
  sectionIndex,
}: {
  section: StandardSection;
  sectionIndex: number;
}) => {
  return (
    <section
      className={cx(
        "flex flex-col",
        handleBoxVariants(section.twClassNameVariants),
        ...(section.customPageClassesKeys
          ? section.customPageClassesKeys.map((key) => customPageClasses[key])
          : []),
      )}
    >
      {!!(section.title ?? section.description) && (
        <header className="flex flex-col gap-8">
          {section.title && (
            <h2
              className={cx(
                sectionIndex === 0 ? "font-semibold" : "",
                "text-h3 text-text-primary-500",
              )}
            >
              {section.title}
            </h2>
          )}
          {section.description && <p>{section.description}</p>}
        </header>
      )}
      {section.body.map((box, index) => {
        return <SectionBodyBox key={index} box={box} />;
      })}
    </section>
  );
};

export default CustomPageBuilder;
