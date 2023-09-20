export { default as CustomPageBuilder_ } from "./_";
import { type CSSProperties, type ReactNode } from "react";

import * as Tabs from "@radix-ui/react-tabs";
import { cx } from "class-variance-authority";
import { SwiperSlide } from "swiper/react";
import customPageClasses from "~/styles/custom-page.module.css";
import {
  type BOXES_TYPE,
  BOXES_TYPES_map,
  type Box,
  type CustomPage,
  SUB_BOXES_TYPES_map,
  type StandardSection,
  TabsBox,
} from "~/libs/utils/types/custom-page";
import {
  InstagramIframe,
  SoundCloudIframe,
  YouTubeIFrame,
} from "../../common/Iframes";
import { handleBoxVariants } from "~/libs/utils/appData";
import Slider from "../Shopify/Cards/Slider";
import CustomNextImage from "../../common/CustomNextImage";
import ReactMarkdownFormatter from "../../common/ReactMarkdownFormatter";
import Quote from "./Quote";

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

const TabsBox = ({ box, className }: { box: TabsBox; className: string }) => (
  <Tabs.Root
    className={cx("flex w-full flex-col gap-5 leading-7", className)}
    defaultValue={box.tabs[0]?.title}
  >
    <Tabs.List
      className="flex w-full items-center justify-center gap-4 md:items-start md:justify-start"
      aria-label="Manage your account"
    >
      {box.tabs.map((tab) => (
        <Tabs.Trigger
          key={tab.title}
          className={cx(
            "border-[0.125rem] border-solid border-transparent text-h4 font-light",
            "data-[state=active]:border-solid data-[state=active]:border-b-text-primary-400 data-[state=active]:pb-1 data-[state=active]:font-bold data-[state=active]:text-text-primary-600",
          )}
          value={tab.title}
        >
          {tab.title}
        </Tabs.Trigger>
      ))}
    </Tabs.List>

    {box.tabs.map((tab) => (
      <Tabs.Content key={tab.title} className="" value={tab.title}>
        <SectionBodyBox box={tab.data} />
      </Tabs.Content>
    ))}
  </Tabs.Root>
);

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

const createBoxTypeClass = (___type: string) =>
  `${customPageClasses[`${___type}-box`]} ${customPageClasses.box}`;

const SectionBodyBox = ({
  box,
  parentBox,
}: {
  box: Box;
  parentBox?: BOXES_TYPE;
}) => {
  const customPageClassName = cx(
    createBoxTypeClass(box.___type),
    handleBoxVariants(box.twClassNameVariants),
    ...(box.customPageClassesKeys
      ? box.customPageClassesKeys?.map((key) => customPageClasses[key])
      : []),
  );

  if (box.___type === BOXES_TYPES_map["two-columns"])
    return (
      <div className={cx(customPageClassName)}>
        {box.columns.map((column, index) => (
          <SectionBodyBox key={index} box={column} parentBox={box.___type} />
        ))}
      </div>
    );

  if (box.___type === BOXES_TYPES_map["rows-only"])
    return (
      <div className={cx(customPageClassName)}>
        {box.rows.map((row, index) => (
          <SectionBodyBox key={index} box={row} parentBox={box.___type} />
        ))}
      </div>
    );

  if (box.___type === BOXES_TYPES_map["image-only"])
    return (
      <div className={cx(customPageClassName)}>
        <CustomNextImage src={box.src} width={800} height={800} />
      </div>
    );

  if (box.___type === BOXES_TYPES_map.md)
    return (
      <div className={cx(customPageClassName)}>
        <ReactMarkdownFormatter content={box.content} />
      </div>
    );

  if (box.___type === BOXES_TYPES_map.quote)
    return (
      <Quote
        className={cx(customPageClassName)}
        style={{ "--divider": 1 / 3, "--w": "3rem" } as CSSProperties}
        box={box}
      />
    );

  if (box.___type === BOXES_TYPES_map.tabs) {
    return <TabsBox box={box} className={cx(customPageClassName)} />;
  }

  if (box.___type === BOXES_TYPES_map.iframe) {
    if (box.___subType === SUB_BOXES_TYPES_map.youtube)
      return (
        <YouTubeIFrame
          containerProps={{
            className: cx(
              "w-full rounded-3xl overflow-hidden relative isolate",
              customPageClassName,
            ),
          }}
          youTubeIconVariants={{
            fontSize: parentBox === BOXES_TYPES_map.slider ? "small" : "medium",
          }}
          width={parentBox === BOXES_TYPES_map.slider ? "200" : "550"}
          height={parentBox === BOXES_TYPES_map.slider ? "200" : "550"}
          src={box.src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      );
    if (box.___subType === SUB_BOXES_TYPES_map.instagram)
      return <InstagramIframe src={box.src} className={customPageClassName} />;
    if (box.___subType === SUB_BOXES_TYPES_map.soundcloud)
      return <SoundCloudIframe src={box.src} className={customPageClassName} />;
  }

  if (box.___type === BOXES_TYPES_map.slider) {
    return (
      <div className={customPageClassName}>
        <Slider
          swiperProps={{
            className: cx(
              customPageClassName,
              customPageClasses.swiper,
              "swiper-fluid",
            ),
            breakpoints:
              box.slidesPerViewType === "large-slides"
                ? {
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                  }
                : box.slidesPerViewType === "one-slide"
                ? { 0: { slidesPerView: 1 } }
                : {
                    400: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                  },
          }}
        >
          {box.slides.map((slide, index) => (
            <SwiperSlide key={index} className="flex flex-col">
              <SectionBodyBox box={slide} parentBox={box.___type} />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    );
  }

  if (box.___type === BOXES_TYPES_map.grid) {
    return (
      <div
        className={customPageClassName}
        style={{
          gridTemplateColumns: box.gridTemplateColumns,
          gridTemplateRows: box.gridTemplateRows,
        }}
      >
        {box.items.map((item, index) => (
          <SectionBodyBox key={index} box={item} parentBox={box.___type} />
        ))}
      </div>
    );
  }

  return <></>;
};

export default CustomPageBuilder;
